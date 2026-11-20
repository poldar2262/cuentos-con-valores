import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Mic, Music } from 'lucide-react';
import { speakInChunks, stopSpeech } from '../utils/speech';

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
  const [speechProgress, setSpeechProgress] = useState(0);
  const [hasSpeechSynthesis, setHasSpeechSynthesis] = useState(false);
  const [audioFailed, setAudioFailed] = useState(false);

  useEffect(() => {
    const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    setHasSpeechSynthesis(supported);
    // Default to full Spanish voice narration whenever story text & browser TTS exist
    if (supported && storyFullText) {
      setUseSpeechSynthesis(true);
    }
  }, [storyFullText]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudioFailed(false);
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
      console.info(`Audio fallback activated for story: ${storyTitle}`);
      setAudioFailed(true);
      setIsPlaying(false);
      if (storyFullText && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        setUseSpeechSynthesis(true);
      }
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
  }, [storyTitle, storyFullText, audioUrl]);

  const handleSpeechNarration = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !storyFullText) return;

    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      setIsPlaying(false);
      return;
    }

    // Play soft background melody alongside narration if audio is available
    if (audioRef.current && !audioFailed && !isMuted) {
      audioRef.current.volume = 0.14;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    setIsSpeaking(true);
    setIsPlaying(true);
    setSpeechProgress(0);

    const textToRead = `${storyTitle}. ${storyFullText}`;
    speakInChunks(textToRead, {
      rate: 0.92,
      pitch: 1.05,
      onProgress: (idx, total) => {
        setSpeechProgress(Math.round(((idx + 1) / total) * 100));
      },
      onEnd: () => {
        audioRef.current?.pause();
        setIsSpeaking(false);
        setIsPlaying(false);
        setSpeechProgress(0);
      },
      onError: () => {
        audioRef.current?.pause();
        setIsSpeaking(false);
        setIsPlaying(false);
      },
    });
  };

  const togglePlay = () => {
    if (useSpeechSynthesis || audioFailed) {
      if (isSpeaking) {
        audioRef.current?.pause();
      }
      handleSpeechNarration();
      return;
    }

    const audio = audioRef.current;
    if (!audio) {
      if (hasSpeechSynthesis && storyFullText) {
        setUseSpeechSynthesis(true);
        handleSpeechNarration();
      }
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 0.65;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setAudioFailed(true);
          if (hasSpeechSynthesis && storyFullText) {
            setUseSpeechSynthesis(true);
            handleSpeechNarration();
          }
        });
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
      const nextMuted = !isMuted;
      audioRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const restartAudio = () => {
    if (useSpeechSynthesis) {
      audioRef.current?.pause();
      stopSpeech();
      setIsSpeaking(false);
      setIsPlaying(false);
      setSpeechProgress(0);
      setTimeout(() => handleSpeechNarration(), 60);
      return;
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            if (hasSpeechSynthesis && storyFullText) {
              setUseSpeechSynthesis(true);
              handleSpeechNarration();
            }
          });
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
      <audio ref={audioRef} src={audioUrl} preload="metadata" loop />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-200/70 text-amber-800 text-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-semibold text-amber-900 tracking-wide">
            {useSpeechSynthesis || isSpeaking ? 'Audiocuento Narrado' : 'Melodía Relajante'}
          </span>
        </div>

        {/* Mode Toggle option: Voice Narration vs Soft Melody */}
        {hasSpeechSynthesis && storyFullText && (
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
                audioRef.current?.pause();
                stopSpeech();
                setIsSpeaking(false);
                setIsPlaying(false);
                setSpeechProgress(0);
              }
            }}
            className={`text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer ${
              useSpeechSynthesis
                ? 'bg-amber-200 text-amber-900 font-medium'
                : 'bg-sky-100 text-sky-900 font-medium'
            }`}
            title="Cambiar entre narración completa del cuento y solo melodía relajante"
          >
            {useSpeechSynthesis ? <Music className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
            <span>{useSpeechSynthesis ? 'Solo melodía' : 'Narrar cuento'}</span>
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
            max={useSpeechSynthesis ? 100 : duration || 100}
            value={useSpeechSynthesis ? speechProgress : currentTime}
            onChange={handleSeek}
            disabled={useSpeechSynthesis}
            className="w-full h-2 bg-amber-200/80 rounded-lg appearance-none cursor-pointer accent-amber-600 disabled:opacity-75"
            aria-label="Progreso del audio"
          />
          <div className="flex justify-between items-center text-[11px] text-amber-800/80 mt-1 font-medium">
            <span>{useSpeechSynthesis ? `${speechProgress}%` : formatTime(currentTime)}</span>
            <span>{useSpeechSynthesis ? `Narración (${durationLabel})` : duration > 0 ? formatTime(duration) : durationLabel}</span>
          </div>
        </div>

        {/* Quick controls */}
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
            title={isMuted ? 'Activar música de fondo' : 'Silenciar música de fondo'}
            aria-label={isMuted ? 'Activar música de fondo' : 'Silenciar música de fondo'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
