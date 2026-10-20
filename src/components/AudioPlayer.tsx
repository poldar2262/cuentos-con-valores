import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Mic } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  durationLabel: string;
  storyTitle: string;
  storyFullText?: string;
  id: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  durationLabel,
  storyTitle,
  storyFullText,
  id,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [useSpeechSynthesis, setUseSpeechSynthesis] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      // Fallback cleanly to synthesized narration if external audio link is unavailable or blocked
      console.info(`Audio fallback activated for story: ${storyTitle}`);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [storyTitle]);

  const togglePlay = () => {
    if (useSpeechSynthesis) {
      handleSpeechNarration();
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser policy or connection issues prevent audio, offer speech synthesis
          setUseSpeechSynthesis(true);
          handleSpeechNarration();
        });
    }
  };

  const handleSpeechNarration = () => {
    if (!('speechSynthesis' in window) || !storyFullText) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel(); // cancel any active utterance
      const utterance = new SpeechSynthesisUtterance(storyFullText);
      utterance.lang = 'es-ES';
      utterance.rate = 0.92; // Slightly slower, calm storytelling speed for kids
      utterance.pitch = 1.05; // Friendly warm pitch

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const restartAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true));
      }
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      id={`audio-player-${id}`}
      className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-3 shadow-xs hover:border-amber-300 transition-colors"
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-200/70 text-amber-800 text-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-semibold text-amber-900 tracking-wide">
            {isSpeaking ? 'Voz Narradora Infantil' : 'Audiocuento'}
          </span>
        </div>

        {/* TTS Toggle option */}
        {'speechSynthesis' in window && storyFullText && (
          <button
            type="button"
            onClick={() => {
              if (isPlaying && !useSpeechSynthesis) {
                audioRef.current?.pause();
                setIsPlaying(false);
              }
              const nextMode = !useSpeechSynthesis;
              setUseSpeechSynthesis(nextMode);
              if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }
            }}
            className={`text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors ${
              useSpeechSynthesis
                ? 'bg-amber-200 text-amber-900 font-medium'
                : 'text-amber-700/80 hover:text-amber-900 hover:bg-amber-100'
            }`}
            title="Cambiar entre música/audiocuento y voz cuentacuentos en español"
          >
            <Mic className="w-3 h-3" />
            <span>{useSpeechSynthesis ? 'Voz activa' : 'Escuchar voz'}</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Play/Pause button */}
        <button
          id={`play-btn-${id}`}
          type="button"
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-white flex items-center justify-center shadow-xs transition-all flex-shrink-0 cursor-pointer"
          aria-label={isPlaying ? 'Pausar audiocuento' : 'Reproducir audiocuento'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-white" />
          ) : (
            <Play className="w-4 h-4 fill-white ml-0.5" />
          )}
        </button>

        {/* Progress bar or status */}
        <div className="flex-1 flex flex-col justify-center">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            disabled={useSpeechSynthesis}
            className="w-full h-2 bg-amber-200/80 rounded-lg appearance-none cursor-pointer accent-amber-600 disabled:opacity-50"
            aria-label="Progreso del audio"
          />
          <div className="flex justify-between items-center text-[11px] text-amber-800/80 mt-1 font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{duration > 0 ? formatTime(duration) : durationLabel}</span>
          </div>
        </div>

        {/* Quick controls */}
        {!useSpeechSynthesis && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={restartAudio}
              className="p-1.5 rounded-full text-amber-700 hover:bg-amber-200/60 transition-colors cursor-pointer"
              title="Volver al inicio"
              aria-label="Reiniciar audio"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 rounded-full text-amber-700 hover:bg-amber-200/60 transition-colors cursor-pointer"
              title={isMuted ? 'Activar sonido' : 'Silenciar'}
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
