import React, { useState } from 'react';
import {
  Scissors,
  Printer,
  Download,
  Eye,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  X,
  Star,
  Layers,
  Heart,
  FileText
} from 'lucide-react';

interface BelenRecortableSectionProps {
  onOpenColoringStory?: (storyId: string) => void;
}

export const BelenRecortableSection: React.FC<BelenRecortableSectionProps> = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Get custom drive link if saved by admin
  const [drivePdfUrl] = useState<string>(() => {
    return localStorage.getItem('belen_drive_pdf_url') || '';
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/belen_recortable.jpg';
    link.download = 'belen-recortable-cuentos-con-valores.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#belen-recortable`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const FIGURES_LIST = [
    { name: 'Portal de Belén', desc: 'Con vigas de madera, paja dorada y la gran Estrella de Oriente', icon: '⭐' },
    { name: 'El Niño Jesús', desc: 'En su pesebre de paja con halo luminoso', icon: '👶' },
    { name: 'Virgen María', desc: 'Con túnica azul y roja en actitud de oración', icon: '💙' },
    { name: 'San José', desc: 'Con su manto y bastón de pastor', icon: '🤎' },
    { name: 'Ángel de la Anunciación', desc: 'Con alas blancas y túnica celeste', icon: '🪽' },
    { name: 'Buey y Mula', desc: 'Los dos fieles animalitos que dan calor en el establo', icon: '🐮' },
    { name: 'Los Tres Reyes Magos', desc: 'Melchor, Gaspar y Baltasar con sus cofres de ofrendas', icon: '👑' },
    { name: 'Pastores y Corderos', desc: 'Con ovejas y corderitos en brazos', icon: '🐑' },
    { name: 'Palmera y Casas de Belén', desc: 'Para decorar el paisaje del pueblo de Judea', icon: '🌴' },
    { name: 'Muro de piedra y Rocas', desc: 'Para dar relieve y profundidad a la escena', icon: '🪨' },
  ];

  return (
    <section
      id="belen-recortable"
      className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/70 via-sky-50/40 to-amber-50/30 border-y border-amber-200/70 relative overflow-hidden"
    >
      {/* Background festive decorative elements */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs sm:text-sm mb-3 shadow-2xs">
            <Scissors className="w-4 h-4 text-amber-600" />
            <span>Taller de Manualidades Navideñas</span>
            <span className="text-amber-400">•</span>
            <span className="flex items-center gap-1 text-amber-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              ¡Gratis para imprimir!
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            ⭐ Belén Recortable para Niños
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Recorta, dobla y pega para que los más pequeños monten su propio pesebre en 3D.
            Una actividad llena de ilusión y creatividad para compartir en familia o en el aula escolar.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center: Interactive Preview & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-amber-200 shadow-md relative group">
              {/* Image Preview with Zoom Overlay */}
              <div
                onClick={() => setIsViewerOpen(true)}
                className="relative rounded-2xl overflow-hidden bg-slate-100 cursor-pointer aspect-[16/11] border border-amber-100 flex items-center justify-center group-hover:shadow-inner transition-all"
                title="Haz clic para ver la lámina en grande"
              >
                <img
                  src="/assets/belen_recortable.jpg"
                  alt="Lámina completa del Belén Recortable para niños con figuras y portal"
                  className="w-full h-full object-contain filter contrast-105 group-hover:scale-102 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm backdrop-blur-2xs">
                  <div className="px-4 py-2 rounded-xl bg-slate-900/80 shadow-lg flex items-center gap-2">
                    <Eye className="w-4 h-4 text-amber-300" />
                    <span>Ver en grande / pantalla completa</span>
                  </div>
                </div>

                {/* Corner Badge */}
                <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Lámina A4</span>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                    title="Imprimir directamente la lámina en tu impresora"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir en A4</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                    title="Descargar imagen en alta resolución"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar Imagen</span>
                  </button>

                  {drivePdfUrl && (
                    <a
                      href={drivePdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <FileText className="w-4 h-4" />
                      <span>PDF en Drive</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsViewerOpen(true)}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>Ampliar</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyShare}
                    className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs transition-colors cursor-pointer"
                    title="Copiar enlace directo al Belén Recortable"
                  >
                    {copiedLink ? '¡Enlace copiado!' : 'Compartir'}
                  </button>
                </div>
              </div>
            </div>

            {/* Printing advice card */}
            <div className="p-4 rounded-2xl bg-amber-100/60 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-200 text-amber-800 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <strong className="font-bold text-amber-950">Consejo para familias y profesores:</strong>
                <p className="text-amber-900/90 leading-relaxed">
                  Para que las figuras se mantengan de pie con mayor firmeza, recomendamos imprimir la lámina en <strong>cartulina blanca (de 180g o 200g)</strong>.
                  Si usas papel normal, también podéis pegar la hoja sobre una cartulina o cartón antes de recortar.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Step-by-Step Instructions & Included Figures (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Step-by-step Instructions Box */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-sm">
              <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                  123
                </span>
                <span>Instrucciones de Montaje</span>
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Recorta con cuidado:</strong>
                    <span>Sigue la línea discontinua exterior de cada figura con tijeras infantiles de punta redonda.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Dobla la solapa inferior:</strong>
                    <span>Dobla hacia atrás la pestaña blanca inferior (marcada como <em>&quot;Pegar aquí&quot;</em>) para formar una base en ángulo de 90 grados.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Pega la solapa de apoyo:</strong>
                    <span>Aplica un poco de pegamento de barra en la solapa y fíjala sobre una cartulina base, una tabla o una tapa de caja de cartón.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <strong className="text-emerald-950 block">¡Monta tu Belén navideño!</strong>
                    <span>Coloca el Portal al fondo, la cuna del Niño Jesús en el centro con María y José, y sitúa a los Reyes Magos, pastores y animalitos alrededor.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Included Figures Collapsible/List */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-sky-200 shadow-sm">
              <h3 className="font-display font-bold text-base text-slate-900 flex items-center justify-between mb-3">
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-600" />
                  <span>Figuras y Piezas incluidas (16)</span>
                </span>
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-100">
                  1 Lámina Completa
                </span>
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {FIGURES_LIST.map((fig) => (
                  <div
                    key={fig.name}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors flex items-start gap-1.5"
                  >
                    <span className="text-sm shrink-0">{fig.icon}</span>
                    <div className="leading-tight">
                      <strong className="text-slate-800 block">{fig.name}</strong>
                      <span className="text-[10px] text-slate-500 line-clamp-1">{fig.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Viewer Modal */}
      {isViewerOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-print animate-in fade-in"
          onClick={() => setIsViewerOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300 flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-amber-50 border-b border-amber-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Scissors className="w-5 h-5 text-amber-600" />
                <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg">
                  Lámina Completa del Belén Recortable
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsViewerOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Cerrar visor"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body */}
            <div className="p-4 overflow-auto flex-1 flex items-center justify-center bg-slate-900/5">
              <img
                src="/assets/belen_recortable.jpg"
                alt="Belén recortable en alta resolución con figuras y portal"
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-md border border-slate-200"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-amber-50/70 border-t border-amber-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-amber-900">🎄 Cuentos con Valores:</span>
                <span>Listo para recortar por la línea de puntos y montar tu Belén.</span>
              </div>
              <button
                type="button"
                onClick={() => setIsViewerOpen(false)}
                className="font-bold text-amber-700 hover:text-amber-900 cursor-pointer"
              >
                Volver a la página
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRINT-ONLY CONTAINER (Formatted cleanly for full A4 landscape sheet) */}
      <div className="hidden print-only fixed inset-0 bg-white p-4 z-[9999]">
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
          <img
            src="/assets/belen_recortable.jpg"
            alt="Lámina para recortar Belén infantil"
            className="w-full h-full object-contain max-h-[96vh]"
          />
        </div>
      </div>
    </section>
  );
};
