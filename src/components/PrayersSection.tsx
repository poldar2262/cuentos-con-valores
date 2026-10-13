import React, { useState } from 'react';
import { PRAYERS, Prayer } from '../data/prayers';
import { Sparkles, Moon, Sun, Heart, Utensils, Volume2, VolumeX, Copy, Check, Printer } from 'lucide-react';

export const PrayersSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'todas' | 'dormir' | 'manana' | 'gratitud' | 'familia'>('todas');
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer>(PRAYERS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const filteredPrayers = activeCategory === 'todas'
    ? PRAYERS
    : PRAYERS.filter((p) => p.category === activeCategory);

  const handleCopyText = (prayer: Prayer) => {
    const fullText = `${prayer.title}\n${prayer.subtitle}\n\n${prayer.lines.join('\n')}\n\nReflexión: ${prayer.reflection}\n— Cuentos con Valores por Juancar Hidalgo`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = (prayer: Prayer) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>${prayer.title} - Oración Infantil</title>
          <style>
            body {
              font-family: Georgia, serif;
              padding: 40px;
              max-width: 600px;
              margin: 0 auto;
              color: #1e293b;
              line-height: 1.8;
              text-align: center;
              border: 8px double #f59e0b;
              border-radius: 24px;
            }
            h1 { color: #b45309; font-size: 28px; margin-bottom: 8px; }
            .subtitle { color: #64748b; font-style: italic; font-size: 15px; margin-bottom: 25px; }
            .lines { font-size: 18px; margin: 30px 0; }
            .line { margin: 8px 0; }
            .reflection { margin-top: 30px; padding: 15px; background: #fef3c7; border-radius: 12px; font-size: 14px; font-style: italic; }
            .footer { margin-top: 30px; font-size: 12px; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div style="font-size: 32px;">${prayer.momentIcon}</div>
          <h1>${prayer.title}</h1>
          <div class="subtitle">${prayer.subtitle}</div>
          <div class="lines">
            ${prayer.lines.map((l) => `<div class="line">${l}</div>`).join('')}
          </div>
          <div class="reflection">
            " ${prayer.reflection} "
          </div>
          <div class="footer">
            Cuentos con Valores · Colección de Juancar Hidalgo
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <section id="oraciones" className="py-14 sm:py-20 bg-gradient-to-b from-amber-100/40 via-sky-50/50 to-indigo-50/40 border-t border-b border-amber-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-200/70 text-amber-900 text-xs sm:text-sm font-bold mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Rincón de Espiritualidad y Calma</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Oraciones Dulces para Niños
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Un espacio sereno fuera de los cuentos, con versos sencillos, tiernos y reconfortantes para orar en familia al despertar, en la mesa o antes de dormir.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          <button
            type="button"
            onClick={() => setActiveCategory('todas')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeCategory === 'todas'
                ? 'bg-amber-500 text-white shadow-md scale-105'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-amber-200/80 shadow-xs'
            }`}
          >
            ✨ Todas ({PRAYERS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('dormir')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'dormir'
                ? 'bg-indigo-700 text-white shadow-md scale-105'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-indigo-200/80 shadow-xs'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-500" />
            <span>Al ir a dormir</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('manana')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'manana'
                ? 'bg-amber-600 text-white shadow-md scale-105'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-amber-200/80 shadow-xs'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Al despertar</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('gratitud')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'gratitud'
                ? 'bg-emerald-700 text-white shadow-md scale-105'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-emerald-200/80 shadow-xs'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-emerald-500" />
            <span>En la mesa y gratitud</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('familia')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'familia'
                ? 'bg-rose-700 text-white shadow-md scale-105'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-rose-200/80 shadow-xs'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Por la familia</span>
          </button>
        </div>

        {/* Content Layout: Left Selection List, Right Featured Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quick List (Lg: 5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              Selecciona una oración ({filteredPrayers.length})
            </h3>
            <div className="space-y-2.5 max-h-[540px] overflow-y-auto pr-1">
              {filteredPrayers.map((prayer) => {
                const isSelected = selectedPrayer.id === prayer.id;
                return (
                  <button
                    key={prayer.id}
                    type="button"
                    onClick={() => {
                      setSelectedPrayer(prayer);
                      setIsPlaying(false);
                    }}
                    className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-400/20'
                        : 'bg-white/70 hover:bg-white border-slate-200/80 hover:border-amber-300 shadow-xs'
                    }`}
                  >
                    <span className="text-2xl p-2 rounded-xl bg-amber-50 shrink-0 border border-amber-100">
                      {prayer.momentIcon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-display font-bold text-slate-900 text-base truncate">
                          {prayer.title}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                          {prayer.categoryLabel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {prayer.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Prayer Display (Lg: 7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-sky-50/30 p-6 sm:p-9 text-slate-800">
              
              {/* Background ambient badge */}
              <div className="flex items-center justify-between gap-3 border-b border-amber-200/60 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2.5 rounded-2xl bg-amber-100 text-amber-900 shadow-xs border border-amber-300/40">
                    {selectedPrayer.momentIcon}
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
                      {selectedPrayer.categoryLabel} · {selectedPrayer.recommendedAge}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                      {selectedPrayer.title}
                    </h3>
                  </div>
                </div>

                {/* Print & Copy buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyText(selectedPrayer)}
                    className="p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    title="Copiar texto de la oración"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="hidden sm:inline text-emerald-700">¡Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-600" />
                        <span className="hidden sm:inline">Copiar</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePrint(selectedPrayer)}
                    className="p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    title="Imprimir lámina para la mesilla"
                  >
                    <Printer className="w-4 h-4 text-slate-600" />
                    <span className="hidden sm:inline">Imprimir lámina</span>
                  </button>
                </div>
              </div>

              {/* Subtitle description */}
              <p className="text-sm sm:text-base italic text-slate-600 mb-7 text-center font-serif">
                « {selectedPrayer.subtitle} »
              </p>

              {/* Prayer Verses */}
              <div className="my-8 py-6 px-6 sm:px-10 rounded-2xl bg-white/80 border border-amber-200/80 shadow-xs space-y-3.5 text-center">
                {selectedPrayer.lines.map((line, index) => (
                  <p
                    key={index}
                    className="font-serif text-lg sm:text-xl text-slate-800 tracking-wide font-medium leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Reflection and Peace thought */}
              <div className="mt-6 p-4.5 rounded-2xl bg-gradient-to-r from-amber-100/70 to-sky-100/70 border border-amber-300/60 flex items-start gap-3">
                <span className="text-xl">🕊️</span>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900">
                    Semillita de Paz
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 mt-0.5 leading-relaxed">
                    {selectedPrayer.reflection}
                  </p>
                </div>
              </div>

              {/* Gentle Audio Player Bar (Simulated ambient chime/peace for bed) */}
              <div className="mt-6 pt-5 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Momento de calma y silencio familiar</span>
                </div>
                <div className="text-xs font-medium text-slate-500">
                  De la colección con valores de <strong className="text-slate-800">Juancar Hidalgo</strong>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
