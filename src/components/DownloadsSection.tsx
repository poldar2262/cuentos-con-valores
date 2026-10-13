import React from 'react';
import { Download, Printer, Palette, Sparkles, Heart } from 'lucide-react';
import { Story } from '../types';
import { COLORING_DESIGNS } from '../data/coloringSvgData';

interface DownloadsSectionProps {
  stories: Story[];
  onOpenColoring: (story: Story) => void;
}

export const DownloadsSection: React.FC<DownloadsSectionProps> = ({
  stories,
  onOpenColoring,
}) => {
  return (
    <section id="descargas" className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/50 to-sky-50/50 border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-3">
            <Palette className="w-3.5 h-3.5" />
            Rincón de Material Imprimible
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Descargas Directas: Dibujos para Colorear (PDF)
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Todas las láminas listas para imprimir en casa o en el aula escolar. Fomenta la creatividad motriz mientras los pequeños interiorizan valores esenciales.
          </p>
        </div>

        {/* Grid of Printable Sheets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => {
            const design = COLORING_DESIGNS[story.coloringSheet.svgId];

            return (
              <div
                key={story.id}
                id={`download-card-${story.id}`}
                className="bg-white rounded-3xl p-5 border-2 border-slate-200/80 hover:border-sky-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Drawing preview banner */}
                  <div className="relative aspect-square w-full rounded-2xl bg-white border border-slate-200 p-2 flex items-center justify-center overflow-hidden group-hover:border-sky-300 transition-colors">
                    {story.coloringSheet.lineartImage ? (
                      <img
                        src={story.coloringSheet.lineartImage}
                        alt={story.coloringSheet.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : design ? (
                      <svg
                        viewBox={design.viewBox}
                        className="w-full h-full stroke-slate-800 stroke-[3] fill-white group-hover:scale-105 transition-transform duration-300"
                        style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                      >
                        {design.elements.map((el) => {
                          if (el.d) {
                            return <path key={el.id} d={el.d} fill={el.fillDefault || '#ffffff'} />;
                          }
                          if (el.cx !== undefined && el.cy !== undefined && el.r !== undefined) {
                            return (
                              <circle
                                key={el.id}
                                cx={el.cx}
                                cy={el.cy}
                                r={el.r}
                                fill={el.fillDefault || '#ffffff'}
                              />
                            );
                          }
                          if (el.cx !== undefined && el.cy !== undefined && el.rx !== undefined) {
                            return (
                              <ellipse
                                key={el.id}
                                cx={el.cx}
                                cy={el.cy}
                                rx={el.rx}
                                ry={el.ry}
                                fill={el.fillDefault || '#ffffff'}
                              />
                            );
                          }
                          return null;
                        })}
                      </svg>
                    ) : null}

                    {/* Value pill */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${story.valueBadgeBg} ${story.valueBadgeColor} ${story.valueBorderColor}`}>
                        {story.value}
                      </span>
                    </div>

                    {/* Printable tag */}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/75 text-white">
                        Formato A4 / PDF
                      </span>
                    </div>
                  </div>

                  {/* Title and character */}
                  <div className="mt-4">
                    <h3 className="font-display font-bold text-lg text-slate-800 group-hover:text-sky-600 transition-colors">
                      {story.coloringSheet.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Personaje: <strong>{story.coloringSheet.characterName}</strong> • Del cuento &quot;{story.title}&quot;
                    </p>
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenColoring(story)}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Lámina Imprimible / Pintar</span>
                  </button>
                  {story.coloringPdfUrl && (
                    <a
                      href={story.coloringPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition-colors"
                      title="Descargar archivo original desde Google Drive"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-700" />
                      <span>Drive</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
