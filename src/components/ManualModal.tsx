import React, { useState } from 'react';
import {
  X,
  BookOpen,
  FolderOpen,
  Download,
  Palette,
  Sparkles,
  Volume2,
  Printer,
  ChevronRight,
  HelpCircle,
  FileText,
  Smartphone,
  Laptop,
  CheckCircle2,
  ExternalLink,
  Code2
} from 'lucide-react';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDriveGuide?: () => void;
}

type TabType = 'resumen' | 'cuentos' | 'colorear' | 'oraciones' | 'faq';

export const ManualModal: React.FC<ManualModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('resumen');

  if (!isOpen) return null;

  return (
    <div
      id="manual-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-print"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="manual-modal-container"
        className="bg-white rounded-3xl max-w-4xl w-full border-4 border-amber-200 shadow-2xl relative max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 p-5 sm:p-6 text-slate-900 flex items-center justify-between relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/90 text-amber-900 flex items-center justify-center shadow-md font-bold">
              <BookOpen className="w-6 h-6 text-amber-800" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/40 text-amber-950 font-bold text-[10px] uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3 text-amber-900" />
                <span>Manual de Uso & Guía Rápida</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                Guía Completa de &quot;Cuentos con Valores&quot;
              </h2>
              <p className="text-xs sm:text-sm text-amber-950/80 mt-1 font-medium">
                Todo lo que necesitas saber para disfrutar de la web, leer, colorear y descargar
              </p>
            </div>
          </div>

          <button
            id="btn-close-manual"
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/60 hover:bg-white text-slate-800 transition-colors cursor-pointer shadow-xs"
            aria-label="Cerrar manual"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-amber-200 bg-amber-50/70 px-4 sm:px-6 overflow-x-auto gap-1 text-xs sm:text-sm font-bold text-slate-600 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('resumen')}
            className={`py-3 px-3.5 border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'resumen'
                ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl font-black'
                : 'border-transparent hover:text-amber-800'
            }`}
          >
            <span>🌟 Resumen General</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cuentos')}
            className={`py-3 px-3.5 border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'cuentos'
                ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl font-black'
                : 'border-transparent hover:text-amber-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lector y Audio</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('colorear')}
            className={`py-3 px-3.5 border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'colorear'
                ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl font-black'
                : 'border-transparent hover:text-amber-800'
            }`}
          >
            <Palette className="w-4 h-4 text-sky-500" />
            <span>Taller de Dibujo</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('oraciones')}
            className={`py-3 px-3.5 border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'oraciones'
                ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl font-black'
                : 'border-transparent hover:text-amber-800'
            }`}
          >
            <span>🕊️ Oraciones</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`py-3 px-3.5 border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'faq'
                ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl font-black'
                : 'border-transparent hover:text-amber-800'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-indigo-500" />
            <span>Preguntas Frecuentes</span>
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6 text-slate-700 leading-relaxed text-sm">
          {/* TAB 1: RESUMEN GENERAL */}
          {activeTab === 'resumen' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-200">
                <h3 className="font-display font-bold text-lg text-slate-900 mb-1 flex items-center gap-2">
                  <span>👋 ¡Te damos la bienvenida a Cuentos con Valores!</span>
                </h3>
                <p className="text-sm text-slate-600">
                  Esta plataforma es un espacio educativo, cultural y familiar pensado para que niños, familias, colegios y parroquias disfruten de la lectura de cuentos infantiles con valores morales y virtudes, escuchen narraciones en audio, descarguen materiales y coloreen láminas interactivas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-slate-900 text-base">1. Leer y Escuchar</h4>
                  <p className="text-xs text-slate-600">
                    Cuentos completos página a página con letra grande para primeros lectores, narrador en audio y preguntas de reflexión familiar.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-sky-200 shadow-2xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-slate-900 text-base">2. Taller de Dibujo</h4>
                  <p className="text-xs text-slate-600">
                    Colorea online con el Relleno Mágico (bote de pintura por clic), usa el pincel libre, guarda la imagen coloreada o imprime en PDF.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-indigo-200 shadow-2xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-slate-900 text-base">3. Valores y Espiritualidad</h4>
                  <p className="text-xs text-slate-600">
                    Filtro por virtudes humanas (honestidad, valentía, generosidad...), guía para padres y una sección con 4 oraciones infantiles.
                  </p>
                </div>
              </div>

              {/* Acceso Rápido */}
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-xs uppercase tracking-wider">
                    ¿Qué quieres hacer ahora?
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('cuentos')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left flex items-center justify-between text-slate-200 cursor-pointer"
                  >
                    <span>📖 Aprender a usar el Lector Interactivo</span>
                    <ChevronRight className="w-4 h-4 text-amber-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('colorear')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left flex items-center justify-between text-slate-200 cursor-pointer"
                  >
                    <span>🎨 ¿Cómo funciona el Relleno Mágico?</span>
                    <ChevronRight className="w-4 h-4 text-sky-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('oraciones')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left flex items-center justify-between text-slate-200 cursor-pointer"
                  >
                    <span>🕊️ Guía de Oraciones Infantiles</span>
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('faq')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left flex items-center justify-between text-slate-200 cursor-pointer"
                  >
                    <span>❓ Preguntas más frecuentes</span>
                    <ChevronRight className="w-4 h-4 text-indigo-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LECTOR Y AUDIO */}
          {activeTab === 'cuentos' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Lector de Cuentos y Reproductor de Audio
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">1</span>
                    ¿Cómo abrir y navegar por un cuento?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    En la página principal, haz clic en el botón amarillo <strong>&quot;Leer Cuento&quot;</strong> de cualquiera de las tarjetas (como <em>&quot;El Destello del Corazón Valiente&quot;</em> o <em>&quot;La Luz de Nazaret&quot;</em>).
                  </p>
                  <ul className="text-xs text-slate-600 list-disc pl-5 space-y-1">
                    <li>Usa las flechas <strong>&quot;Anterior&quot;</strong> y <strong>&quot;Siguiente&quot;</strong> o las teclas de dirección del teclado.</li>
                    <li>La barra de progreso superior muestra el avance de lectura en porcentaje.</li>
                    <li>Al llegar a la última página, encontrarás la <strong>Moraleja o Enseñanza Clave</strong> y 3 preguntas guiadas para dialogar en familia.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                    Audiocuento & Narración
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Cada tarjeta incluye un reproductor con botón de <strong>Play/Pausa</strong>, barra de duración y control de volumen. Los niños pueden escucharlo mientras siguen el texto con la mirada o antes de dormir.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">3</span>
                    Descarga directa de PDFs de los Cuentos
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Si el cuento tiene un archivo PDF asociado (por ejemplo en Google Drive), aparece el botón azul <strong>&quot;Descargar PDF&quot;</strong> que abre el libro maquetado listo para leer en tablets o imprimirlo encuadernado.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TALLER DE DIBUJO */}
          {activeTab === 'colorear' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-sky-600" />
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Taller de Dibujo y Láminas para Colorear
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-200 space-y-3">
                <h4 className="font-display font-bold text-sky-950 text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  ¿Cómo funciona el Relleno Mágico (Cubo de Pintura)?
                </h4>
                <ol className="text-xs sm:text-sm text-slate-700 list-decimal pl-5 space-y-2">
                  <li>
                    Abre el taller pulsando <strong>&quot;Pintar Lámina&quot;</strong> en la tarjeta del cuento o en la sección de Dibujos.
                  </li>
                  <li>
                    Por defecto está activo el <strong>Relleno Mágico</strong>. Elige un color de la paleta (amarillo, azul, verde, rosa...).
                  </li>
                  <li>
                    <strong>Haz un solo clic sobre la zona del dibujo que quieras pintar</strong>. El algoritmo detecta automáticamente las líneas negras del dibujo y rellena toda esa silueta al instante.
                  </li>
                  <li>
                    Si te equivocas, pulsa <strong>&quot;Deshacer&quot;</strong> para retroceder, o selecciona el <strong>&quot;Borrador&quot;</strong> blanco.
                  </li>
                </ol>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-sky-500" />
                    Pincel Libre
                  </h5>
                  <p className="text-xs text-slate-600">
                    Cambia a modo <em>&quot;Pincel Libre&quot;</em> para dibujar a mano alzada, hacer firmas, añadir detalles pequeños o pintar con trazos. Puedes ajustar el grosor del trazo con el control deslizante.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-emerald-600" />
                    Guardar Mi Dibujo (PNG)
                  </h5>
                  <p className="text-xs text-slate-600">
                    Al terminar, pulsa el botón verde <strong>&quot;Guardar Mi Dibujo&quot;</strong> en la cabecera del taller. Se descargará una imagen en alta calidad combinando tus colores con el dibujo original para compartir o guardar de recuerdo.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-700 flex items-start gap-3">
                <Printer className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold mb-0.5">
                    ¿Prefieres pintar en papel con lápices o ceras?
                  </strong>
                  Pulsa el botón <strong>&quot;Descargar Lámina (PDF)&quot;</strong>. La aplicación generará automáticamente una hoja limpia en blanco y negro en formato A4 lista para imprimir en cualquier impresora.
                </div>
              </div>
            </div>
          )}



          {/* TAB 5: ORACIONES */}
          {activeTab === 'oraciones' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <span className="text-xl">🕊️</span>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Sección de Oraciones Infantiles
                </h3>
              </div>

              <p className="text-sm text-slate-600">
                Diseñada especialmente para cerrar el día en familia, fomentar momentos de recogimiento, serenidad y agradecimiento con los más pequeños.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <h4 className="font-bold text-slate-900 text-sm">👼 Ángel de mi Guarda</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Oración tradicional de protección, confianza y amparo para la noche.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
                  <h4 className="font-bold text-slate-900 text-sm">🌸 Jesús, Amigo Bueno</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Enfocada en pedir un corazón compasivo, generoso y pacificador con los demás.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200">
                  <h4 className="font-bold text-slate-900 text-sm">✨ Gracias por este Hermoso Día</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Oración para cultivar la gratitud por la familia, los alimentos y los amigos.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
                  <h4 className="font-bold text-slate-900 text-sm">🌿 Paz para el Mundo y la Familia</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Petición de armonía en el hogar y en todos los pueblos de la Tierra.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
                <strong className="text-slate-900 block font-semibold">Funciones en cada oración:</strong>
                <p>• <strong>Escuchar Narración:</strong> El reproductor de audio reproduce una lectura serena con música suave.</p>
                <p>• <strong>Imprimir Recordatorio:</strong> Genera una ficha elegante para colocar en la mesilla de noche del niño.</p>
              </div>
            </div>
          )}

          {/* TAB 6: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Preguntas Frecuentes
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">
                    ¿Se puede usar la web desde el móvil o tablet?
                  </h4>
                  <p className="text-xs text-slate-600">
                    Sí, el 100% de la web está optimizada para móviles y tablets. El lector de cuentos se adapta automáticamente al tamaño de pantalla y el taller de dibujo funciona tanto con el ratón en ordenador como con el dedo en pantallas táctiles.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">
                    ¿Puedo imprimir las láminas para colorear en casa?
                  </h4>
                  <p className="text-xs text-slate-600">
                    Por supuesto. Tanto en la tarjeta de cada cuento como dentro del taller de dibujo existe el botón <strong>&quot;Descargar Lámina (PDF)&quot;</strong>, que abre la ventana de impresión del navegador con el formato listo para papel A4.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">
                    ¿Cómo busco cuentos por valor o tema específico?
                  </h4>
                  <p className="text-xs text-slate-600">
                    En la barra superior tienes un buscador para escribir palabras clave (ej. &quot;valentía&quot;, &quot;estrellas&quot;, &quot;telescopio&quot;). Además, en la cabecera principal tienes botones para filtrar con un solo clic por: Honestidad, Valentía, Empatía, Generosidad, Paciencia, Cooperación o Amistad.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">
                    ¿Puedo compartir un enlace a un cuento directamente?
                  </h4>
                  <p className="text-xs text-slate-600">
                    Sí, puedes compartir la URL de la aplicación con familias, colegios o amigos; todo el contenido es accesible y de libre consulta sin necesidad de registro ni contraseñas.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-amber-50/80 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs">
          <span className="text-slate-600 text-center sm:text-left">
            📖 <strong>Cuentos con Valores</strong> • Una iniciativa cultural y educativa para todas las familias
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-colors cursor-pointer shadow-xs"
            >
              ¡Cerrar y Volver a la Web!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
