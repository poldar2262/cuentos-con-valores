import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Headphones, BookOpen, Palette, GraduationCap } from 'lucide-react';
import { ValueCategory } from '../types';
import { getValueUrl, VALUES_SEO } from '../data/seoRoutes';

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
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-amber-300/80 shadow-xs mb-5">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-amber-900 tracking-wide">
              Cuentos y Valores · Por Juancar Hidalgo · Lectura Gratuita (3 a 12 años)
            </span>
          </div>

          {/* Single Semantic H1 */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Cuentos infantiles con valores para educar en casa y en el colegio
          </h1>

          {/* Direct 48-word GEO Intro Block */}
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-3xl mx-auto">
            <strong>Cuentos y Valores</strong> es una biblioteca educativa gratuita de relatos ilustrados con audiocuento, guía de diálogo y láminas para colorear. Dirigida a niños de Educación Infantil y Primaria (3 a 12 años), ayuda a familias y docentes a trabajar virtudes como la empatía, el respeto y la honestidad.
          </p>

          {/* Feature Highlights with real crawlable <a> links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-bold text-slate-700">
            <Link
              to="/cuentos"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white border border-amber-200 shadow-xs hover:border-amber-400 transition-colors"
            >
              <Headphones className="w-4 h-4 text-amber-500" />
              <span>Catálogo y Audiocuentos</span>
            </Link>
            <Link
              to="/dibujos-para-colorear"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white border border-sky-200 shadow-xs hover:border-sky-400 transition-colors"
            >
              <Palette className="w-4 h-4 text-sky-500" />
              <span>Láminas para Colorear</span>
            </Link>
            <Link
              to="/guia-padres-docentes"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white border border-emerald-200 shadow-xs hover:border-emerald-400 transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Guía Padres y Docentes</span>
            </Link>
            <Link
              to="/belen-recortable"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-300 shadow-xs hover:bg-amber-100 text-amber-950 transition-colors"
            >
              <span>✂️ Belén Recortable</span>
            </Link>
          </div>

          {/* Primary CTAs */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/cuentos"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-md transition-all transform hover:scale-105 active:scale-95"
            >
              <BookOpen className="w-5 h-5 text-amber-300" />
              <span>Ver catálogo por valor y edad</span>
            </Link>

            {onOpenChatbot && (
              <button
                type="button"
                onClick={onOpenChatbot}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-white/60"
              >
                <Sparkles className="w-5 h-5 text-amber-100 animate-pulse" />
                <span>✨ Habla con Valerio: ¡Crea un cuento (IA)!</span>
              </button>
            )}
          </div>

          {/* Category Filter Chips + Crawlable Value Collection Links */}
          <div className="mt-10 pt-6 border-t border-amber-200/60">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              ¿Cómo elegir un cuento según el valor que quieres trabajar?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Filtra rápidamente en portada ({totalStories} cuentos disponibles) o entra en la colección completa de cada virtud:
            </p>

            {/* Quick Interactive Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
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
                    {category === 'Todos' ? '🌈 Todos' : category}
                  </button>
                );
              })}
            </div>

            {/* Real <a> links to every value collection route */}
            <nav aria-label="Colecciones por valor" className="flex flex-wrap items-center justify-center gap-2 text-xs">
              {VALUES_SEO.map((val) => (
                <Link
                  key={val.slug}
                  to={getValueUrl(val.slug)}
                  className="px-3 py-1 rounded-xl bg-amber-100/60 hover:bg-amber-200 text-amber-900 font-semibold transition-colors"
                >
                  Cuentos de {val.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};
