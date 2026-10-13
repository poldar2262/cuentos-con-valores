import React from 'react';
import { X, FolderPlus, Link2, Eye, Download, CheckCircle2, Copy, Sparkles, BookOpen } from 'lucide-react';

interface DriveGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DriveGuideModal: React.FC<DriveGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border-4 border-amber-200 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
          aria-label="Cerrar guía"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Guía práctica de administración</span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          ¿Cómo añadir cuentos y PDFs desde Google Drive?
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Esta plataforma permite mantener la web limpia, rápida y moderna alojando los archivos pesados (PDFs completos y láminas para colorear) de forma directa y gratuita en **Google Drive**.
        </p>

        {/* Las 3 Formas de hacerlo */}
        <div className="space-y-4">
          {/* Opción 1: Enlace a Drive */}
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-7 h-7 rounded-xl bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-display font-bold text-slate-900 text-base">
                Opción Rápida: Solo Portada + Descarga desde Google Drive
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-3">
              Solo necesitas una imagen de portada y el enlace compartido de Google Drive. Cuando el usuario pulsa <em>&quot;Descargar PDF&quot;</em>, se abre o descarga directamente tu archivo.
            </p>

            <div className="bg-white p-3 rounded-xl border border-amber-200 text-xs text-slate-700 space-y-1.5 font-mono">
              <p className="font-bold text-amber-800 font-sans">Pasos en Google Drive:</p>
              <p>1. Sube tu PDF a Drive (ej. &quot;El Destello del Corazón Valiente.pdf&quot;).</p>
              <p>2. Haz clic derecho &gt; <strong>Compartir</strong> &gt; Cambiar a <em>&quot;Cualquier persona con el enlace puede ver&quot;</em>.</p>
              <p>3. Copia el enlace y pégalo en el campo <code>pdfUrl</code> de ese cuento.</p>
            </div>
          </div>

          {/* Opción 2: Lector Interactivo */}
          <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-200">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-7 h-7 rounded-xl bg-sky-500 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-display font-bold text-slate-900 text-base">
                Opción Interactiva: Leer página a página en la web
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-2">
              Pegar el texto de las páginas (como hemos hecho con <strong>&quot;El Destello del Corazón Valiente&quot;</strong> y <strong>&quot;La Luz de Nazaret&quot;</strong>). Esto permite que los niños lean en el móvil o tablet sin tener que descargar nada, ¡e incluso escuchar la narración en voz alta!
            </p>
          </div>

          {/* Opción 3: Híbrida (Recomendada) */}
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                ⭐
              </span>
              <h4 className="font-display font-bold text-slate-900 text-base">
                Opción Híbrida (La que ya tienes activa ahora)
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              La tarjeta muestra la portada y el valor. El niño puede hacer clic en <strong>&quot;Leer Cuento&quot;</strong> para verlo en pantalla, y si quieren el PDF maquetado original para imprimir, pulsan <strong>&quot;Descargar PDF (Drive)&quot;</strong>.
            </p>
          </div>
        </div>

        {/* Estructura de ejemplo en el código */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-amber-300">Ejemplo en /src/data/stories.ts:</span>
            <span className="text-[10px] text-slate-400">Muy fácil de añadir</span>
          </div>
          <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-300 font-mono">
{`{
  id: 'el-destello-del-corazon-valiente',
  title: 'El Destello del Corazón Valiente',
  author: 'Juancar Hidalgo',
  value: 'Valentía',
  summary: 'Valerio y el Cristal de los Ecos...',
  coverImage: 'https://tu-imagen-de-portada.jpg',
  pdfUrl: 'https://drive.google.com/file/d/TU_ID_DE_DRIVE/view',
  coloringPdfUrl: 'https://drive.google.com/file/d/TU_ID_COLOREAR/view',
}`}
          </pre>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
        >
          ¡Entendido, volver a los cuentos!
        </button>
      </div>
    </div>
  );
};
