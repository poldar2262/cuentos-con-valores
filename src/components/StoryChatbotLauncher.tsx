import React from 'react';
import { Sparkles, Wand2 } from 'lucide-react';

interface StoryChatbotLauncherProps {
  onClick: () => void;
}

export const StoryChatbotLauncher: React.FC<StoryChatbotLauncherProps> = ({ onClick }) => {
  return (
    <aside
      aria-label="Hablar con Valerio, Cuentacuentos con IA"
      className="fixed bottom-5 right-5 z-40 flex items-center group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative flex items-center">
        {/* Tooltip / Speech bubble that invites user */}
        <div className="hidden sm:flex items-center gap-1.5 mr-3 py-2 px-3.5 bg-white/95 text-slate-800 text-xs font-bold rounded-2xl shadow-lg border border-amber-300 backdrop-blur-md transition-all group-hover:scale-105 group-hover:border-amber-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-amber-900">✨ Habla con Valerio: ¡Crea tu cuento con valores!</span>
        </div>

        {/* Main Floating Button */}
        <button
          type="button"
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-500 text-white shadow-xl shadow-amber-500/30 flex items-center justify-center border-2 border-white transition-all transform group-hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Hablar con Valerio, Cuentacuentos de Cuentos con Valores"
        >
          {/* Subtle outer glow ring */}
          <span className="absolute -inset-1 rounded-full bg-amber-400/30 animate-pulse pointer-events-none" />

          <Wand2 className="w-7 h-7 sm:w-8 sm:h-8 text-amber-950 transition-transform group-hover:rotate-12" />

          {/* Sparkle badge */}
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-black border-2 border-white shadow-xs">
            IA
          </span>
        </button>
      </div>
    </aside>
  );
};
