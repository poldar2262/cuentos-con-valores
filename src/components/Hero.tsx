import React from 'react';
import { Sparkles, Headphones, BookOpen, Palette, CheckCircle2 } from 'lucide-react';
import { ValueCategory } from '../types';

interface HeroProps {
  selectedCategory: ValueCategory;
  onSelectCategory: (cat: ValueCategory) => void;
  categories: ValueCategory[];
  totalStories: number;
  onOpenChatbot?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedCategory,
  onSelectCategory,
  categories,
  totalStories,
  onOpenChatbot,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-amber-100/60 via-amber-50/40 to-transparent">
      {/* Playful background decorative shapes */}
      <div className="absolute top-6 left-10 w-24 h-24 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-12 right-12 w-32 h-32 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-4 left-1/3 w-40 h-40 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-amber-300/80 shadow-xs mb-5">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-amber-900 tracking-wide">
              Proyecto Educativo e Infantil • Lectura con Propósito
            </span>
          </div>

          {/* Main Hero Title */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Cuentos con Valores y{' '}
            <span className="text-amber-600 underline decoration-wavy decoration-amber-300 decoration-2">
              Dibujos para Colorear
            </span>
          </h1>

          {/* Intro Description */}
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Historias alegres y tiernas diseñadas para inspirar virtudes como la{' '}
            <strong className="text-slate-900 font-bold">honestidad</strong>, la{' '}
            <strong className="text-slate-900 font-bold">valentía</strong> y la{' '}
            <strong className="text-slate-900 font-bold">empatía</strong>. Cada cuento incluye{' '}
            <strong className="text-slate-900 font-bold">audiocuento integrado</strong>, lector digital en PDF y{' '}
            <strong className="text-slate-900 font-bold">láminas imprimibles para colorear</strong>.
          </p>

          {/* Feature Highlights Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-bold text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-amber-200 shadow-xs">
              <Headphones className="w-4 h-4 text-amber-500" />
              Audiocuentos Integrados
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-sky-200 shadow-xs">
              <Palette className="w-4 h-4 text-sky-500" />
              Láminas para Colorear (PDF)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-emerald-200 shadow-xs">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              Guía de Preguntas Familiares
            </span>
          </div>

          {/* Chatbot CTA Button */}
          {onOpenChatbot && (
            <div className="mt-7 flex justify-center">
              <button
                type="button"
                onClick={onOpenChatbot}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-white/60"
              >
                <Sparkles className="w-5 h-5 text-amber-100 animate-pulse" />
                <span>✨ Habla con Valerio: ¡Crea un cuento para tu hijo/a (IA)!</span>
              </button>
            </div>
          )}

          {/* Category Filter Chips */}
          <div className="mt-8 pt-6 border-t border-amber-200/60">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 mb-3">
              <span>Filtrar por Valor o Virtud:</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-200/60 text-amber-900 text-[11px]">
                {totalStories} disponibles
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => onSelectCategory(category)}
                    className={`px-3.5 py-1.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs ${
                      isActive
                        ? 'bg-amber-500 text-white scale-105 shadow-md'
                        : 'bg-white text-slate-700 hover:bg-amber-100/80 border border-amber-200'
                    }`}
                  >
                    {category === 'Todos' ? '🌈 Todos los Cuentos' : `⭐ ${category}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
