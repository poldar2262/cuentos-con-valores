import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  Loader2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Download,
  BookmarkPlus,
  RefreshCw,
  Wand2,
  MessageSquare,
  SlidersHorizontal,
  Smile,
  Heart,
  BookOpen,
  ArrowRight,
  Maximize2,
  Minimize2,
  AlertCircle,
  RotateCcw
} from 'lucide-react';

interface StoryChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStorySaved?: (storyText: string) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isStory?: boolean;
}

const POPULAR_VALUES = [
  { label: 'Generosidad y Compartir', icon: '🎁', desc: 'Aprender a compartir sin enfados' },
  { label: 'Paciencia y Calma', icon: '🐢', desc: 'Gestionar la frustración y rabietas' },
  { label: 'Valentía y Superación', icon: '🦁', desc: 'Vencer miedos nocturnos o al colegio' },
  { label: 'Empatía y Amabilidad', icon: '💖', desc: 'Ponerse en el lugar de los demás' },
  { label: 'Perdón y Reconciliación', icon: '🕊️', desc: 'Saber pedir disculpas y perdonar' },
  { label: 'Honestidad y Verdad', icon: '🌟', desc: 'Decir la verdad con valentía' },
  { label: 'Perseverancia', icon: '🌱', desc: 'No rendirse cuando algo cuesta' },
  { label: 'Gratitud y Agradecimiento', icon: '🙏', desc: 'Valorar la familia y lo que tenemos' },
  { label: 'Cooperación en Equipo', icon: '🐝', desc: 'Colaborar en casa y en el cole' },
  { label: 'Autoestima y Confianza', icon: '👑', desc: 'Sentirse seguro y querido' },
];

const AGE_GROUPS = [
  { label: '3 a 5 años', icon: '👶', desc: 'Preescolar (sencillo y dulce)' },
  { label: '6 a 8 años', icon: '🧒', desc: 'Primaria inicial (aventura y diálogo)' },
  { label: '9 a 12 años', icon: '👦', desc: 'Primaria superior (reflexión y trama)' },
];

const POPULAR_THEMES = [
  '🌳 Bosque Encantado y Animales',
  '🚀 Espacio, Estrellas y Astronautas',
  '🦖 Dinosaurios Bondadosos',
  '🏫 El Colegio y Amigos del Parque',
  '🏰 Castillo Mágico y Dragones Amables',
  '🌊 Fondo del Mar y Sirenas/Peces',
  '🐶 Cachorros y Mascotas Fieles',
  '🧁 Cocina Mágica de Galletas',
];

export const StoryChatbotModal: React.FC<StoryChatbotModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'wizard' | 'chat'>('wizard');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Quick Wizard Form state
  const [childName, setChildName] = useState('');
  const [selectedAge, setSelectedAge] = useState(AGE_GROUPS[1].label);
  const [selectedValue, setSelectedValue] = useState(POPULAR_VALUES[0].label);
  const [selectedTheme, setSelectedTheme] = useState(POPULAR_THEMES[0]);
  const [customDetail, setCustomDetail] = useState('');

  // Chat conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content:
        '¡Hola! Soy **Valerio** 📖✨, tu asistente y cuentacuentos en *Cuentos con Valores*. ¿Qué aventura o cuento con valores te apetece crear o descubrir hoy? Dime el nombre de tu hijo/a y el valor que te gustaría transmitirle (la generosidad, la valentía, la paciencia, no tener miedo...) y te crearé una historia inolvidable.',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Audio speech synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedStories, setSavedStories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cuentos_ia_guardados');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  // Audio Speech Reader function
  const toggleSpeech = (text: string) => {
    if (!synthRef.current) return;

    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown characters for pleasant speech
    const cleanText = text
      .replace(/[#*_~`]/g, '')
      .replace(/🌟|👦|🎯|🎂|📖|💡|🎨|✨/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95; // Slightly slower, relaxing pace for storytelling
    utterance.pitch = 1.05; // Friendly, warm tone

    // Try finding a Spanish voice
    const voices = synthRef.current.getVoices();
    const esVoice = voices.find((v) => v.lang.startsWith('es') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Mónica') || v.name.includes('Jorge')));
    if (esVoice) {
      utterance.voice = esVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.cancel();
    synthRef.current.speak(utterance);
    setIsSpeaking(true);
  };

  // Copy text to clipboard
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Download story cleanly as a text file for offline reading or manual printing
  const handleDownload = (content: string) => {
    try {
      const lines = content.trim().split('\n').filter(Boolean);
      const titleCandidate = lines[0]?.replace(/[#*]/g, '').trim() || 'Cuento con Valores';
      const safeFileName = titleCandidate
        .toLowerCase()
        .replace(/[^a-z0-9áéíóúñ]+/gi, '_')
        .slice(0, 35);

      const header = `📖 CUENTOS CON VALORES • COLECCIÓN VALERIO\n${'='.repeat(55)}\n\n`;
      const footer = `\n\n${'='.repeat(55)}\n© Cuentos con Valores de Juancar Hidalgo\nGuardado para leer en familia o imprimir cuando quieras.\n`;
      const fullText = header + content + footer;

      const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${safeFileName || 'cuento_con_valores'}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error al descargar cuento:', err);
    }
  };

  // Save story to local list
  const handleSaveToMyStories = (storyText: string) => {
    try {
      const updated = [storyText, ...savedStories];
      setSavedStories(updated);
      localStorage.setItem('cuentos_ia_guardados', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Handler to start a fresh query or new story cleanly without needing to exit
  const handleNewQuery = (targetTab: 'chat' | 'wizard' = 'chat') => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
    setChildName('');
    setCustomDetail('');
    setInputValue('');
    setErrorMessage(null);
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'model',
        content:
          '¡Hola de nuevo! 📖✨ Estoy listo para una nueva consulta o aventura. ¿Qué te gustaría hacer?\n\nPuedes hacerme cualquier pregunta (por ejemplo: *"¿cómo enseñar la paciencia?"*, *"¿cómo evitar las rabietas?"* o *"¿cómo hablar del perdón?"*), pedirme un cuento nuevo escribiendo aquí abajo, o pulsar en **"Creador Rápido en 3 Pasos"** arriba si prefieres elegir los personajes y detalles paso a paso.',
        timestamp: new Date(),
      },
    ]);
    setActiveTab(targetTab);
    setTimeout(() => {
      if (targetTab === 'chat') {
        inputRef.current?.focus();
      }
    }, 150);
  };

  // Call the backend API for story generation
  const requestStory = async (payload: {
    messages?: { role: string; content: string }[];
    childName?: string;
    value?: string;
    ageGroup?: string;
    theme?: string;
    customPrompt?: string;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const endpoint = payload.childName ? '/api/story' : '/api/chat';
      const lastUserMsg = payload.messages?.[payload.messages.length - 1]?.content || '';
      const requestBody = payload.childName
        ? payload
        : {
            message: lastUserMsg,
            messages: payload.messages,
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al conectar con el servidor.');
      }

      const botReply = data.reply || '¡Aquí tienes tu cuento con valores!';
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'model',
        content: botReply,
        timestamp: new Date(),
        isStory: true,
      };

      setMessages((prev) => [...prev, newMsg]);
      setActiveTab('chat');
    } catch (err: any) {
      console.error(err);
      const friendlyError =
        '¡Vaya! Hubo una pequeña interferencia al redactar. No te preocupes, puedes volver a intentarlo o hacerme otra consulta.';
      setErrorMessage(friendlyError);
      setMessages((prev) => [
        ...prev,
        {
          id: 'error-' + Date.now(),
          role: 'model',
          content: `${friendlyError} 🌟 Puedes volver a escribir tu duda o pulsar en **Nueva consulta** para empezar de cero.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit from the Quick Wizard form
  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim()) {
      setErrorMessage('Por favor, indica el nombre del niño o niña.');
      return;
    }

    const userNote = `Crea un cuento para ${childName} (${selectedAge}) sobre ${selectedValue}, ambientado en ${selectedTheme}${
      customDetail ? `. Nota especial: ${customDetail}` : ''
    }`;

    // Switch to chat tab immediately so the user sees the request and the loader
    setActiveTab('chat');

    // Add user note to chat
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'user',
        content: userNote,
        timestamp: new Date(),
      },
    ]);

    requestStory({
      childName: childName.trim(),
      value: selectedValue,
      ageGroup: selectedAge,
      theme: selectedTheme,
      customPrompt: customDetail.trim(),
    });
  };

  // Submit from the chat input
  const handleSendMessage = (e?: React.FormEvent, directText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (directText || inputValue).trim();
    if (!textToSend || isLoading) return;

    setInputValue('');

    const newChatMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newChatMsg];
    setMessages(updatedMessages);

    // Map conversation history
    const conversationPayload = updatedMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    requestStory({
      messages: conversationPayload,
    });
  };

  // Quick suggestions buttons with auto-send
  const sendQuickPrompt = (promptText: string) => {
    handleSendMessage(undefined, promptText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`bg-white rounded-3xl shadow-2xl flex flex-col border-4 border-amber-200 transition-all duration-300 relative overflow-hidden ${
          isFullscreen ? 'w-full h-full max-w-none rounded-none' : 'w-full max-w-4xl h-[92vh] max-h-[850px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-5 py-4 text-white flex items-center justify-between border-b border-amber-300/50 shadow-xs shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-inner text-amber-950 font-black text-2xl">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                  Valerio • Cuentos con Valores
                </h3>
                <span className="bg-white/25 px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-950 uppercase tracking-wider">
                  Asistente IA
                </span>
              </div>
              <p className="text-xs text-amber-950/80 font-medium hidden sm:block">
                Habla con Valerio: crea e inspira cuentos personalizados para educar en virtudes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer"
              title={isFullscreen ? 'Reducir ventana' : 'Pantalla completa'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => {
                if (synthRef.current) synthRef.current.cancel();
                setIsSpeaking(false);
                onClose();
              }}
              className="p-2 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Cerrar ventana"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="bg-amber-50/80 px-4 py-2 border-b border-amber-200/80 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('wizard')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'wizard'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-amber-100'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span>Creador Rápido en 3 Pasos</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-amber-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hablar con Valerio ({messages.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Botón para iniciar una nueva consulta o limpiar sin salir de la pantalla */}
            <button
              type="button"
              onClick={() => handleNewQuery('chat')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-xs text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 border border-amber-400"
              title="Empezar una nueva consulta o pedir otro cuento sin salir de la pantalla"
            >
              <RotateCcw className="w-3.5 h-3.5 text-white" />
              <span>Nueva consulta</span>
            </button>

            {savedStories.length > 0 && (
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full hidden sm:inline-block">
                ⭐ {savedStories.length} cuentos guardados
              </span>
            )}
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/40">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-2 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* TAB 1: QUICK WIZARD FORM */}
          {activeTab === 'wizard' ? (
            <form onSubmit={handleWizardSubmit} className="max-w-2xl mx-auto space-y-5">
              {/* Step 1: Child Name & Age */}
              <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>¿Quién es el protagonista de la aventura?</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nombre del niño/a o hermanos <span className="text-amber-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Ej. Lucas, o Valeria y Mateo"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none text-sm transition-all bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Edad aproximada
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {AGE_GROUPS.map((age) => (
                        <button
                          key={age.label}
                          type="button"
                          onClick={() => setSelectedAge(age.label)}
                          className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            selectedAge === age.label
                              ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                              : 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="block text-sm">{age.icon}</span>
                          <span className="block text-[11px] leading-tight">{age.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Target Value */}
              <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                      2
                    </span>
                    <span>¿Qué valor o virtud deseas resaltar?</span>
                  </div>
                  <span className="text-xs text-amber-700 font-semibold">{selectedValue}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {POPULAR_VALUES.map((val) => {
                    const isSelected = selectedValue === val.label;
                    return (
                      <button
                        key={val.label}
                        type="button"
                        onClick={() => setSelectedValue(val.label)}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200 shadow-xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-base">{val.icon}</span>
                          <span className="text-xs font-bold text-slate-800 leading-tight">
                            {val.label}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 line-clamp-1">{val.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Setting & Special Details */}
              <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                    3
                  </span>
                  <span>Temática favorita y detalles (opcional)</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Ambiente o personajes que le encantan:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_THEMES.map((theme) => {
                      const isSelected = selectedTheme === theme;
                      return (
                        <button
                          key={theme}
                          type="button"
                          onClick={() => setSelectedTheme(theme)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                              : 'bg-slate-50 hover:bg-amber-100/60 border-slate-200 text-slate-700'
                          }`}
                        >
                          {theme}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Detalles especiales de la situación (opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={customDetail}
                    onChange={(e) => setCustomDetail(e.target.value)}
                    placeholder="Ej: 'A Lucas le da miedo la oscuridad y suele llorar por la noche' o 'No quiere compartir sus coches con su hermana'..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none text-xs transition-all bg-white resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !childName.trim()}
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-600 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/25 transition-all text-base flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Tejiendo el cuento mágico con valores...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-100" />
                    <span>¡Crear Cuento Mágico para {childName || 'mi peque'}!</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* TAB 2: CHAT CONVERSATION */
            <div className="space-y-4 max-w-3xl mx-auto pb-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'model' && (
                    <div className="w-9 h-9 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-xs shrink-0 mt-1">
                      <Sparkles className="w-5 h-5 text-amber-900" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-3xl p-4 sm:p-5 shadow-xs transition-all ${
                      msg.role === 'user'
                        ? 'bg-amber-500 text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-amber-200/80 rounded-tl-xs'
                    }`}
                  >
                    {/* Message Header */}
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-black/5 text-xs opacity-75">
                      <span className="font-bold">
                        {msg.role === 'user' ? 'Tú / Familia' : 'Valerio • Cuentos con Valores'}
                      </span>
                      <span>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {/* Story / Message Body */}
                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                      {msg.content}
                    </div>

                    {/* Action buttons for generated stories */}
                    {msg.role === 'model' && msg.id !== 'welcome' && (
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-600">
                        {/* Audio Reader */}
                        <button
                          type="button"
                          onClick={() => toggleSpeech(msg.content)}
                          className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isSpeaking
                              ? 'bg-amber-500 text-white border-amber-500'
                              : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
                          }`}
                          title="Escuchar audiocuento narrado"
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5" />
                              <span>Detener voz</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                              <span>Escuchar cuento</span>
                            </>
                          )}
                        </button>

                        {/* Copy */}
                        <button
                          type="button"
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>

                        {/* Download */}
                        <button
                          type="button"
                          onClick={() => handleDownload(msg.content)}
                          className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Descargar cuento para guardar o imprimir a tu ritmo"
                        >
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                          <span>Descargar</span>
                        </button>

                        {/* Save */}
                        <button
                          type="button"
                          onClick={() => handleSaveToMyStories(msg.content)}
                          className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Guardar en mis cuentos locales"
                        >
                          <BookmarkPlus className="w-3.5 h-3.5 text-amber-600" />
                          <span>Guardar</span>
                        </button>

                        {/* Nueva Consulta direct button */}
                        <button
                          type="button"
                          onClick={() => handleNewQuery('chat')}
                          className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer ml-auto font-bold"
                          title="Hacer una nueva consulta o pedir otro cuento"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                          <span>Nueva consulta</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 items-center text-xs text-amber-800 bg-amber-50 p-4 rounded-2xl border border-amber-200 max-w-md animate-pulse">
                  <div className="w-8 h-8 rounded-xl bg-amber-200 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-amber-700 animate-spin" />
                  </div>
                  <div>
                    <span className="font-bold block">Valerio está pensando y redactando...</span>
                    <span className="text-[11px] text-amber-700/80">
                      Eligiendo palabras dulces, virtudes y una moraleja inspiradora.
                    </span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Footer Area with Quick Suggestions & Chat Input (When in Chat Mode) */}
        {activeTab === 'chat' && (
          <div className="bg-white p-3 sm:p-4 border-t border-amber-200 shrink-0">
            {/* Quick chips to guide next question */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-[11px] text-slate-600 no-scrollbar">
              <span className="font-bold text-amber-800 shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Pedir rápido:
              </span>
              <button
                type="button"
                onClick={() => sendQuickPrompt('Hazlo un poco más corto para leerlo antes de dormir')}
                className="px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 shrink-0 cursor-pointer"
              >
                🌙 Más corto para dormir
              </button>
              <button
                type="button"
                onClick={() => sendQuickPrompt('¿Cómo puedo enseñar a mi hijo a tener más paciencia cuando se enfada?')}
                className="px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 shrink-0 cursor-pointer"
              >
                🐢 Consejo sobre paciencia
              </button>
              <button
                type="button"
                onClick={() => sendQuickPrompt('Crea un cuento divertido sobre dos hermanos que aprenden a compartir sus juguetes')}
                className="px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 shrink-0 cursor-pointer"
              >
                🎁 Cuento sobre compartir
              </button>
              <button
                type="button"
                onClick={() => sendQuickPrompt('Crea un cuento tierno para superar el miedo a la oscuridad y a los monstruos nocturnos')}
                className="px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 shrink-0 cursor-pointer"
              >
                🦁 Superar miedos
              </button>
              <button
                type="button"
                onClick={() => sendQuickPrompt('Añade a su mascota favorita en la historia anterior')}
                className="px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 shrink-0 cursor-pointer"
              >
                🐶 Añadir mascota
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={(e) => handleSendMessage(e)} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu consulta o pide un cuento a Valerio..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-amber-50/50 border border-amber-200 focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm text-slate-800 transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Enviar mensaje"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
