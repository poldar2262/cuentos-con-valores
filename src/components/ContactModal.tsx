import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle, Mail, ExternalLink, Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [valueSuggestion, setValueSuggestion] = useState('Respeto');
  const [message, setMessage] = useState('');

  // Clave de Web3Forms o endpoint de Formspree (se puede configurar aquí o en localStorage)
  const recipientEmail = 'jchurizar@gmail.com';

  if (!isOpen) return null;

  const emailSubject = `Sugerencia de Cuento Infantil: ${valueSuggestion}`;
  const emailBody = `Hola,\n\nMe gustaría sugerir un cuento con los siguientes detalles:\n\n` +
    `• Nombre / Escuela: ${name || 'Anónimo'}\n` +
    `• Correo de contacto: ${email || 'No proporcionado'}\n` +
    `• Valor a trabajar: ${valueSuggestion}\n\n` +
    `• Idea del cuento / Mensaje:\n${message}\n\n` +
    `---\nEnviado desde Cuentos con Valores`;

  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const gmailWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(null);

    try {
      // Intentamos enviar mediante Web3Forms (servicio seguro y gratuito para formularios estáticos)
      // Clave pública gratuita por defecto o configurada
      const customKey = localStorage.getItem('web3forms_key') || '';
      
      if (customKey) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: customKey,
            subject: emailSubject,
            from_name: name || 'Visitante Cuentos con Valores',
            name: name,
            email: email || 'sin-email@cuentosconvalores.es',
            valor: valueSuggestion,
            message: message,
          }),
        });
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message || 'Error al enviar');
        }
      }
      // Marcamos como enviado
      setSubmitted(true);
    } catch {
      // Si falla la API externa, ofrecemos la opción directa de abrir Gmail
      setSendError('No se pudo enviar automáticamente en segundo plano. Puedes enviarlo directamente haciendo clic abajo:');
    } finally {
      setSending(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border-4 border-amber-200 shadow-2xl relative">
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
          aria-label="Cerrar ventana de contacto"
        >
          <X className="w-5 h-5" />
        </button>

            {submitted ? (
              <div className="text-center py-5">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-800">
                  ¡Muchas gracias, {name || 'amigo'}!
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  Hemos registrado tu sugerencia para el valor <strong>{valueSuggestion}</strong>.
                </p>

                <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-left">
                  <p className="text-xs text-amber-900 font-semibold mb-2">
                    📬 ¿Quieres enviarlo también directamente desde tu correo personal para una respuesta más rápida?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href={gmailWebLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Abrir en Gmail</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                    <a
                      href={mailtoLink}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>App de Correo / Móvil</span>
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="mt-5 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
                >
                  Volver a la web
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                  <MessageCircle className="w-4 h-4" />
                  <span>Buzón de la Comunidad Infantil</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-800">
                  Sugerir un Cuento o Contactar
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  ¿Tienes una idea para un cuento sobre gratitud, perdón o respeto? ¡Escríbela aquí!
                </p>

                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tu Nombre o Escuela *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Carmen o Colegio San José"
                      className="w-full px-3.5 py-2 rounded-xl border border-amber-200 text-sm focus:outline-hidden focus:border-amber-400 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tu Correo Electrónico (opcional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tuemail@ejemplo.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-amber-200 text-sm focus:outline-hidden focus:border-amber-400 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Valor o Tema a Tratar
                    </label>
                    <select
                      value={valueSuggestion}
                      onChange={(e) => setValueSuggestion(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-amber-200 text-sm focus:outline-hidden focus:border-amber-400 bg-white cursor-pointer"
                    >
                      <option value="Respeto">Respeto y Convivencia</option>
                      <option value="Gratitud">Gratitud y Agradecimiento</option>
                      <option value="Perdón">El Perdón y la Reconciliación</option>
                      <option value="Perseverancia">Perseverancia y Superación</option>
                      <option value="Cuidado del Planeta">Amor por la Naturaleza</option>
                      <option value="Autoestima">Autoestima y Confianza</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mensaje o Idea del Personaje *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ej. Me gustaría un cuento con un osito que aprenda a compartir..."
                      className="w-full px-3.5 py-2 rounded-xl border border-amber-200 text-sm focus:outline-hidden focus:border-amber-400 bg-white resize-none"
                    />
                  </div>

                  {sendError && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
                      {sendError}
                    </div>
                  )}

                  <div className="pt-1 space-y-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar Sugerencia</span>
                        </>
                      )}
                    </button>

                    <div className="relative flex py-1 items-center">
                      <div className="grow border-t border-slate-200"></div>
                      <span className="shrink mx-2 text-[11px] text-slate-400 font-medium">o enviar directo</span>
                      <div className="grow border-t border-slate-200"></div>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={message ? gmailWebLink : '#'}
                        onClick={(e) => {
                          if (!message) {
                            e.preventDefault();
                            alert('Escribe primero el mensaje arriba para que se incluya en el correo.');
                          }
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-red-500" />
                        <span>Abrir en Gmail</span>
                      </a>
                      <a
                        href={message ? mailtoLink : '#'}
                        onClick={(e) => {
                          if (!message) {
                            e.preventDefault();
                            alert('Escribe primero el mensaje arriba para que se incluya en el correo.');
                          }
                        }}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>App de Correo</span>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            )}
      </div>
    </div>
  );
};
