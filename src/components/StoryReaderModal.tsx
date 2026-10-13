import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Printer, Sparkles, HelpCircle, Heart, Volume2, Type, Download, ExternalLink } from 'lucide-react';
import { Story } from '../types';

interface StoryReaderModalProps {
  story: Story | null;
  onClose: () => void;
  onOpenColoring: (story: Story) => void;
}

export const StoryReaderModal: React.FC<StoryReaderModalProps> = ({
  story,
  onClose,
  onOpenColoring,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');

  if (!story) return null;

  const totalPages = story.pages.length;
  const currentPage = story.pages[currentPageIndex];

  const handlePrint = () => {
    window.print();
  };

  const readPageAloud = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentPage.text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const fontClasses = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl md:text-2xl leading-relaxed',
    xlarge: 'text-xl sm:text-2xl md:text-3xl leading-relaxed font-medium',
  }[fontSize];

  return (
    <div
      id="story-reader-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-amber-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header (No print) */}
        <div className="no-print bg-amber-50 px-4 sm:px-6 py-4 border-b border-amber-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${story.valueBadgeBg} ${story.valueBadgeColor} ${story.valueBorderColor}`}
            >
              Valor: {story.value}
            </span>
            <span className="hidden sm:inline text-xs font-medium text-slate-500">
              {story.ageRange}
            </span>
          </div>

          {/* Controls: Font size, Print PDF, Narration, Close */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Font size toggle */}
            <div className="flex items-center bg-white rounded-xl border border-amber-200 p-0.5">
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 text-xs rounded-lg font-bold transition-colors ${
                  fontSize === 'normal'
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 hover:bg-amber-100'
                }`}
                title="Texto normal"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 text-xs rounded-lg font-bold transition-colors ${
                  fontSize === 'large'
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 hover:bg-amber-100'
                }`}
                title="Texto grande"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 text-xs rounded-lg font-bold transition-colors ${
                  fontSize === 'xlarge'
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 hover:bg-amber-100'
                }`}
                title="Texto gigante"
              >
                A++
              </button>
            </div>

            {/* Read aloud button */}
            {'speechSynthesis' in window && (
              <button
                type="button"
                onClick={readPageAloud}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold transition-colors cursor-pointer"
                title="Escuchar esta página leída en voz alta"
              >
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span className="hidden md:inline">Voz</span>
              </button>
            )}

            {/* External PDF / Drive link if available */}
            {story.pdfUrl && (
              <a
                href={story.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                title="Abrir o descargar archivo PDF original en Google Drive"
              >
                <Download className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">PDF Original (Drive)</span>
              </a>
            )}

            {/* Print / Save PDF button */}
            <button
              id="btn-print-story"
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-colors cursor-pointer"
              title="Imprimir el cuento completo o guardar como PDF"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Imprimir / PDF</span>
            </button>

            {/* Close button */}
            <button
              id="btn-close-reader"
              type="button"
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Cerrar lector"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Story Content (Interactive View) */}
        <div className="overflow-y-auto p-5 sm:p-8 flex-1 bg-amber-50/20">
          {/* Print Only Header (Visible exclusively when printing to PDF) */}
          <div className="hidden print-only mb-6 text-center border-b pb-4">
            <h1 className="text-2xl font-bold text-slate-900">{story.title}</h1>
            <p className="text-sm text-slate-600 mt-1">
              Valor que enseña: <strong>{story.value}</strong> • {story.ageRange}
            </p>
          </div>

          {/* Interactive Screen View */}
          <div className="no-print max-w-2xl mx-auto flex flex-col items-center">
            {/* Story title */}
            <h2 className="font-display text-2xl sm:text-3xl text-center font-bold text-slate-800 mb-4">
              {story.title}
            </h2>

            {/* Book Illustration Banner */}
            <div className="w-full relative aspect-16/9 rounded-2xl overflow-hidden shadow-md border-2 border-amber-200 mb-6 bg-amber-100">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <p className="text-xs sm:text-sm text-white/95 italic bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-xl">
                  🎨 {currentPage.illustrationDescription}
                </p>
              </div>
            </div>

            {/* Book Page Box */}
            <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-xs">
              <div className="flex items-center justify-between text-xs text-amber-700 font-semibold mb-3">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Página {currentPageIndex + 1} de {totalPages}
                </span>
                <span className="text-slate-400">Lectura guiada infantil</span>
              </div>

              <p className={`text-slate-800 ${fontClasses}`}>
                {currentPage.text}
              </p>
            </div>

            {/* Page Navigation Buttons */}
            <div className="flex items-center justify-between w-full mt-6 gap-3">
              <button
                type="button"
                onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentPageIndex === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 disabled:opacity-40 disabled:cursor-not-allowed text-amber-900 font-bold text-sm transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Página Anterior</span>
              </button>

              <div className="flex items-center gap-1.5">
                {story.pages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentPageIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                      currentPageIndex === idx
                        ? 'bg-amber-500 w-6'
                        : 'bg-amber-200 hover:bg-amber-300'
                    }`}
                    aria-label={`Ir a página ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPageIndex((prev) => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPageIndex === totalPages - 1}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
              >
                <span>Siguiente Página</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Moral Lesson & Educational Activities (Shows on final page or scroll) */}
            {currentPageIndex === totalPages - 1 && (
              <div className="w-full mt-8 space-y-4">
                {/* Moral lesson box */}
                <div className="bg-amber-100/70 border-2 border-amber-300 rounded-2xl p-5 text-amber-950">
                  <div className="flex items-center gap-2 font-display text-lg font-bold text-amber-900 mb-2">
                    <Heart className="w-5 h-5 fill-amber-500 text-amber-500" />
                    <span>La Moraleja del Cuento</span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed">
                    {story.moralLesson}
                  </p>
                </div>

                {/* Family discussion questions */}
                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 text-sky-950">
                  <div className="flex items-center gap-2 font-display text-base font-bold text-sky-900 mb-2">
                    <HelpCircle className="w-5 h-5 text-sky-600" />
                    <span>Preguntas para conversar en familia</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-sky-800">
                    {story.discussionQuestions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>

                {/* Direct CTA to coloring sheet */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <div>
                    <h4 className="font-display font-bold text-emerald-900 text-base">
                      ¿Quieres colorear a {story.coloringSheet.characterName}?
                    </h4>
                    <p className="text-xs text-emerald-700">
                      Descarga o colorea online la lámina de este cuento.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenColoring(story);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
                  >
                    Abrir Lámina para Colorear
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Full Text View for Printing (Formats every page clean and sequential for PDF export) */}
          <div className="hidden print-only space-y-6">
            <div className="space-y-4">
              {story.pages.map((page, index) => (
                <div key={index} className="p-4 border-b border-slate-200">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Página {page.pageNumber}
                  </p>
                  <p className="text-base text-slate-800 leading-relaxed">
                    {page.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-slate-50 border border-slate-300 rounded-xl">
              <h3 className="font-bold text-slate-900 mb-1">Moraleja:</h3>
              <p className="text-sm text-slate-700">{story.moralLesson}</p>
            </div>

            <div className="mt-4 p-4 border border-slate-300 rounded-xl">
              <h3 className="font-bold text-slate-900 mb-2">Preguntas de reflexión:</h3>
              <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
                {story.discussionQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ol>
            </div>

            <div className="mt-8 text-center text-xs text-slate-400">
              Cuentos con Valores y Dibujos para Colorear • Material educativo para padres y docentes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
