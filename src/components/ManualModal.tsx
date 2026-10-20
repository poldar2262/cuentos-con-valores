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
  Code2,
  Wand2,
  MessageSquare,
  Bot
} from 'lucide-react';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDriveGuide?: () => void;
  onOpenChatbot?: () => void;
}

type TabType = 'resumen' | 'valerio' | 'cuentos' | 'colorear' | 'oraciones' | 'faq';

export const ManualModal: React.FC<ManualModalProps> = ({
  isOpen,
  onClose,
  onOpenChatbot,
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
            onClick={() => setActiveTab('valerio')}
            className={`py-3 px-3.5 border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'valerio'
                ? 'border-amber-600 text-amber-950 bg-gradient-to-r from-amber-100 to-amber-50 rounded-t-xl font-black shadow-2xs'
                : 'border-transparent text-amber-800 hover:text-amber-950 hover:bg-amber-100/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>✨ Valerio (Creador IA)</span>
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
                  Esta plataforma es un espacio educativo, cultural y familiar pensado para que niños, familias, colegios y comunidades disfruten de la lectura de cuentos con valores morales y virtudes, escuchen narraciones en audio, creen historias personalizadas con Inteligencia Artificial, descarguen materiales y coloreen láminas interactivas.
                </p>
              </div>

              {/* 4 Pilares Principales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-slate-900 text-base">1. Leer y Escuchar</h4>
                  <p className="text-xs text-slate-600">
                    Cuentos completos página a página con letra grande para primeros lectores, narrador en audio y preguntas de reflexión familiar.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-300 shadow-2xs space-y-2 relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-black uppercase">¡Nuevo!</span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                    <Wand2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-amber-950 text-base">2. Valerio IA</h4>
                  <p className="text-xs text-slate-700">
                    Crea cuentos a medida con el nombre de tu hijo/a, su edad y el valor a trabajar, con narración en voz y formato para imprimir.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-sky-200 shadow-2xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-slate-900 text-base">3. Taller de Dibujo</h4>
                  <p className="text-xs text-slate-600">
                    Colorea online con el Relleno Mágico (bote de pintura por clic), pincel libre a mano alzada y descarga directa de láminas PDF.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-indigo-200 shadow-2xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-slate-900 text-base">4. Valores & Oraciones</h4>
                  <p className="text-xs text-slate-600">
                    Filtro por virtudes morales (honestidad, valentía...), guía familiar y sección con 4 oraciones infantiles con narración.
                  </p>
                </div>
              </div>

              {/* Acceso Rápido */}
              <div className="p-4.5 rounded-2xl bg-slate-900 text-slate-100 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    ¿Qué sección quieres explorar en este manual?
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('valerio')}
                    className="p-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-left flex items-center justify-between text-amber-200 font-bold cursor-pointer transition-colors col-span-1 sm:col-span-2"
                  >
                    <span className="flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-amber-400" />
                      ✨ ¿Cómo crear cuentos con Valerio (IA personalizada para tu hijo/a)?
                    </span>
                    <ChevronRight className="w-4 h-4 text-amber-300 shrink-0" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('cuentos')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left flex items-center justify-between text-slate-200 cursor-pointer transition-colors"
                  >
                    <span>📖 Aprender a usar el Lector Interactivo y Audio</span>
                    <ChevronRight className="w-4 h-4 text-amber-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('colorear')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left flex items-center justify-between text-slate-200 cursor-pointer transition-colors"
                  >
                    <span>🎨 ¿Cómo funciona el Relleno Mágico del Dibujo?</span>
                    <ChevronRight className="w-4 h-4 text-sky-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('oraciones')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left flex items-center justify-between text-slate-200 cursor-pointer transition-colors"
                  >
                    <span>🕊️ Guía de Oraciones Infantiles</span>
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('faq')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left flex items-center justify-between text-slate-200 cursor-pointer transition-colors"
                  >
                    <span>❓ Preguntas más frecuentes</span>
                    <ChevronRight className="w-4 h-4 text-indigo-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: VALERIO - CREADOR DE CUENTOS CON IA */}
          {activeTab === 'valerio' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Header Hero Banner for Valerio */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-500 via-amber-400 to-amber-300 text-slate-900 border-2 border-amber-300 shadow-md relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center shrink-0 border-2 border-amber-200 text-3xl">
                    📖
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-amber-950 font-black text-xs uppercase tracking-wider mb-2">
                      <Wand2 className="w-3.5 h-3.5 text-amber-800" />
                      <span>Inteligencia Artificial Educativa & Segura</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                      Valerio • El Cuentacuentos Mágico
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-950 font-medium mt-1 max-w-2xl">
                      Un asistente inteligente creado para que las familias, maestros y catequistas puedan inventar cuentos donde el niño o la niña es el héroe de la historia y aprende valores fundamentales para la vida.
                    </p>
                  </div>
                </div>

                {/* Direct Action Button to Launch Valerio */}
                {onOpenChatbot && (
                  <div className="mt-5 pt-4 border-t border-amber-600/20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/40 p-3.5 rounded-2xl">
                    <span className="text-xs font-bold text-amber-950 text-center sm:text-left">
                      💡 ¿Quieres inventar un cuento ahora con el nombre de tu hijo/a?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenChatbot();
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>¡Hablar con Valerio en la Web!</span>
                    </button>
                  </div>
                )}
              </div>

              {/* ¿Dónde encontrar a Valerio? */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-3">
                <h4 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">1</span>
                  ¿Cómo acceder a Valerio en la página web?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Valerio siempre está disponible y a mano mientras navegas por la web a través de dos accesos directos:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                    <strong className="text-amber-950 font-bold block flex items-center gap-1.5">
                      <span className="text-base">🪄</span> Botón Mágico Flotante
                    </strong>
                    <p className="text-slate-600">
                      En la esquina inferior derecha de tu pantalla verás una varita mágica parpadeante. Al hacer clic o tocarla, Valerio se despliega al instante sin salir de la página.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                    <strong className="text-amber-950 font-bold block flex items-center gap-1.5">
                      <span className="text-base">✨</span> Botón en el Menú y Cabecera
                    </strong>
                    <p className="text-slate-600">
                      En la barra superior de la web y en la portada principal encontrarás el botón dorado <strong>&quot;Habla con Valerio (IA)&quot;</strong> para iniciarlo directamente.
                    </p>
                  </div>
                </div>
              </div>

              {/* Las 2 Formas de Crear Cuentos */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                  Dos métodos para crear el cuento: Guiado o Conversación Libre
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Modo 1: Creador Rápido */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-amber-300 shadow-2xs space-y-3">
                    <div className="flex items-center gap-2 text-amber-900">
                      <Wand2 className="w-5 h-5 text-amber-600" />
                      <h5 className="font-display font-bold text-base">Modo 1: Creador Guiado (Recomendado)</h5>
                    </div>
                    <p className="text-xs text-slate-600">
                      Un formulario intuitivo paso a paso para configurar la historia en menos de un minuto:
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 pl-1">
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">A</span>
                        <span><strong>Nombre del niño/a:</strong> El personaje principal llevará su nombre (o el de dos hermanos/amigos).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">B</span>
                        <span><strong>Edad:</strong> Adaptará el vocabulario, ritmo y longitud para niños de 3 a 12 años.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">C</span>
                        <span><strong>Valor o Virtud:</strong> Generosidad, valentía, sinceridad, paciencia, empatía, agradecimiento, perdón o amistad.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">D</span>
                        <span><strong>Escenario y Detalles:</strong> Puedes elegir bosques mágicos, dinosaurios, estrellas... o detalles de la vida real (ej: <em>&quot;tiene miedo a la oscuridad&quot;</em> o <em>&quot;le cuesta compartir sus pinturas&quot;</em>).</span>
                      </li>
                    </ul>
                  </div>

                  {/* Modo 2: Chat Conversacional */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center gap-2 text-slate-900">
                      <MessageSquare className="w-5 h-5 text-sky-600" />
                      <h5 className="font-display font-bold text-base">Modo 2: Chat Libre con Valerio</h5>
                    </div>
                    <p className="text-xs text-slate-600">
                      Si prefieres expresarte con tus propias palabras, cambia a la pestaña <strong>&quot;Modo Chat&quot;</strong> y habla con Valerio con total libertad:
                    </p>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs italic text-slate-700 space-y-1">
                      <p className="text-amber-800 font-bold not-italic">Ejemplo de petición:</p>
                      &quot;Valerio, por favor escribe un cuento para Sofía de 5 años. Se ha enfadado hoy en el parque porque otro niño cogió su pelota y quiero que aprenda a calmarse y compartir.&quot;
                    </div>
                    <p className="text-xs text-slate-600">
                      Valerio responderá con cariño, empatía y generará el cuento adaptado exactamente a esa situación.
                    </p>
                  </div>
                </div>
              </div>

              {/* Superpoderes del Cuento Creado */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <h4 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">3</span>
                  ¿Qué puedes hacer con el cuento una vez generado?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Volume2 className="w-4 h-4 text-amber-600" />
                      <span>🔊 Escuchar con Voz</span>
                    </div>
                    <p className="text-slate-600">
                      Pulsa el botón de Play para que el navegador lea el cuento en voz alta con entonación pausada y serena antes de dormir.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Download className="w-4 h-4 text-emerald-600" />
                      <span>📥 Descargar para Guardar o Imprimir</span>
                    </div>
                    <p className="text-slate-600">
                      Descarga el cuento en tu dispositivo en un archivo limpio. Puedes guardarlo, leerlo sin internet o imprimirlo cuando tu impresora esté lista, sin bloqueos ni errores.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span>📋 Copiar Texto</span>
                    </div>
                    <p className="text-slate-600">
                      Copia todo el cuento con un clic para enviarlo por WhatsApp a los abuelos o guardarlo en tus notas del móvil.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Sparkles className="w-4 h-4 text-rose-500" />
                      <span>✏️ Pedir Retoques</span>
                    </div>
                    <p className="text-slate-600">
                      Botones rápidos para pedir <em>&quot;Hazlo más corto&quot;</em>, <em>&quot;Más diálogos&quot;</em> o escribir cualquier cambio que desees.
                    </p>
                  </div>
                </div>
              </div>

              {/* Seguridad y Valores */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3 text-xs text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold text-sm mb-0.5">
                    Seguridad y Compromiso Pedagógico 100% Infantil
                  </strong>
                  Valerio está diseñado bajo un estricto filtro pedagógico: no admite contenido hostil, violento ni inapropiado. Cada cuento generado concluye con un desenlace positivo, una <strong>Moraleja o Enseñanza Clave</strong> y 3 preguntas guiadas para fomentar el diálogo afectuoso en familia.
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
                <p>• <strong>Descargar Ficha:</strong> Genera y descarga una ficha limpia para guardar o imprimir a tu ritmo en la mesilla del niño.</p>
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
                <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-300 shadow-2xs">
                  <h4 className="font-bold text-amber-950 text-sm mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    ¿Es gratis usar a Valerio para crear cuentos personalizados?
                  </h4>
                  <p className="text-xs text-slate-700">
                    <strong>Sí, es 100% gratuito</strong> para todas las familias, profesores y catequistas. No necesitas registrarte ni introducir contraseñas. Puedes inventar tantos cuentos como quieras para tus hijos, escucharlos en audio o descargarlos directamente a tu dispositivo para leerlos o imprimirlos cuando quieras.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">
                    ¿Es seguro el contenido generado por Valerio para niños?
                  </h4>
                  <p className="text-xs text-slate-600">
                    Absolutamente. Valerio está entrenado y configurado con directrices estrictas para crear únicamente relatos con valores positivos, lenguaje limpio, amable y adecuado para la infancia. Cada historia concluye siempre con una enseñanza constructiva y preguntas para conversar en familia.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">
                    ¿Se puede usar la web desde el móvil o tablet?
                  </h4>
                  <p className="text-xs text-slate-600">
                    Sí, el 100% de la web está optimizada para móviles y tablets. El lector de cuentos se adapta automáticamente al tamaño de pantalla, el taller de dibujo funciona con el dedo en pantallas táctiles y Valerio se abre con su botón flotante en cualquier dispositivo.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">
                    ¿Puedo imprimir las láminas para colorear en casa?
                  </h4>
                  <p className="text-xs text-slate-600">
                    Por supuesto. Puedes pulsar <strong>&quot;Descargar Lámina&quot;</strong> para obtener el archivo limpio de alta resolución en tu ordenador o móvil. Así puedes imprimirlo cuando tu impresora esté lista, sin bloqueos del navegador.
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
