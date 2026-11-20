// Shared Web Speech API helper that splits long Spanish texts into safe chunks
// so browsers (especially Chromium) never cut off narration after ~15 seconds.

let activeSessionId = 0;

function splitIntoChunks(text: string, maxLen = 170): string[] {
  const cleaned = text
    .replace(/[#*_`>~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return [];

  const sentences = cleaned.match(/[^.!?\n]+[.!?\n]*/g) || [cleaned];
  const chunks: string[] = [];
  let current = '';

  for (const rawSentence of sentences) {
    const sentence = rawSentence.trim();
    if (!sentence) continue;

    if (sentence.length > maxLen) {
      if (current) {
        chunks.push(current.trim());
        current = '';
      }
      const words = sentence.split(' ');
      let part = '';
      for (const word of words) {
        if ((part + ' ' + word).trim().length > maxLen) {
          if (part) chunks.push(part.trim());
          part = word;
        } else {
          part = (part + ' ' + word).trim();
        }
      }
      if (part) chunks.push(part.trim());
    } else if ((current + ' ' + sentence).trim().length > maxLen) {
      if (current) chunks.push(current.trim());
      current = sentence;
    } else {
      current = (current + ' ' + sentence).trim();
    }
  }

  if (current) chunks.push(current.trim());
  return chunks;
}

function getPreferredSpanishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  return (
    voices.find((v) => v.lang.toLowerCase() === 'es-es' && !v.name.toLowerCase().includes('compact')) ||
    voices.find((v) => v.lang.toLowerCase().startsWith('es-es')) ||
    voices.find((v) => v.lang.toLowerCase().startsWith('es')) ||
    null
  );
}

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  onProgress?: (chunkIndex: number, totalChunks: number) => void;
  onEnd?: () => void;
  onError?: () => void;
}

export function stopSpeech(): void {
  activeSessionId += 1;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore synthesis cancel errors
    }
  }
}

export function speakInChunks(text: string, options: SpeakOptions = {}): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    options.onError?.();
    return false;
  }

  const chunks = splitIntoChunks(text);
  if (chunks.length === 0) {
    options.onEnd?.();
    return false;
  }

  stopSpeech();
  const sessionId = activeSessionId;
  const voice = getPreferredSpanishVoice();
  let idx = 0;

  const speakNext = () => {
    if (sessionId !== activeSessionId) return;

    if (idx >= chunks.length) {
      options.onEnd?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunks[idx]);
    utterance.lang = voice?.lang || 'es-ES';
    if (voice) utterance.voice = voice;
    utterance.rate = options.rate ?? 0.94;
    utterance.pitch = options.pitch ?? 1.04;

    options.onProgress?.(idx, chunks.length);

    utterance.onend = () => {
      if (sessionId !== activeSessionId) return;
      idx += 1;
      speakNext();
    };

    utterance.onerror = (ev) => {
      if (sessionId !== activeSessionId) return;
      // Ignore intentional interruptions/cancels
      if (ev.error === 'interrupted' || ev.error === 'canceled') return;
      options.onError?.();
    };

    window.speechSynthesis.speak(utterance);
  };

  speakNext();
  return true;
}
