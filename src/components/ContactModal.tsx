import React, { useState } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  MessageCircle,
  Mail,
  ExternalLink,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [emailDelivered, setEmailDelivered] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [valueSuggestion, setValueSuggestion] = useState('Respeto');
  const [message, setMessage] = useState('');

  const recipientEmail = 'jchurizar@gmail.com';

  if (!isOpen) return null;

  const emailSubject = `Sugerencia de Cuento Infantil: ${valueSuggestion}`;
  const emailBody =
    `Hola,\n\nMe gustaría sugerir un cuento con los siguientes detalles:\n\n` +
    `• Nombre / Escuela: ${name.trim() || 'Anónimo'}\n` +
    `• Correo de contacto: ${email.trim() || 'No proporcionado'}\n` +
    `• Valor a trabajar: ${valueSuggestion}\n\n` +
    `• Idea del cuento / Mensaje:\n${message.trim()}\n\n` +
    `---\nEnviado desde Cuentos con Valores`;

  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const gmailWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const saveLocalBackup = (wasEmailSent: boolean) => {
    try {
      if (typeof window === 'undefined') return;
      const existing = JSON.parse(localStorage.getItem('cuentos_suggestions_inbox') || '[]');
      const list = Array.isArray(existing) ? existing : [];
      list.unshift({
        id: `local-${Date.now()}`,
        name: name.trim() || 'Anónimo',
        email: email.trim(),
        valueSuggestion,
        message: message.trim(),
        createdAt: new Date().toISOString(),
        read: false,
        emailSent: wasEmailSent,
        provider: wasEmailSent ? 'relay' : 'local',
      });
      localStorage.setItem('cuentos_suggestions_inbox', JSON.stringify(list.slice(0, 100)));
    } catch {
      // Ignore storage quota errors
    }
  };

  const handleCopyMessage = async () => {
    if (!message.trim()) {
      setSendError('Escribe primero tu idea o mensaje arriba antes de copiarlo.');
      return;
    }
    const textToCopy = `Para: ${recipientEmail}\nAsunto: ${emailSubject}\n\n${emailBody}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setSendError('Por favor, escribe tu idea o mensaje antes de enviar.');
      return;
    }

    setSending(true);
    setSendError(null);

    const customWeb3Key =
      typeof window !== 'undefined' ? localStorage.getItem('web3forms_key') || '' : '';
    const customFormspree =
      typeof window !== 'undefined' ? localStorage.getItem('formspree_endpoint') || '' : '';

    let deliveredByEmail = false;
    let savedOnServer = false;

    try {
      // 1. Envío principal al servidor propio (/api/suggestions): guarda en buzón y reenvía por correo si está configurado
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim() || 'Anónimo',
          email: email.trim(),
          valueSuggestion,
          message: message.trim(),
          web3formsKey: customWeb3Key || undefined,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        savedOnServer = Boolean(result?.saved || result?.success);
        deliveredByEmail = Boolean(result?.emailSent);
      }
    } catch {
      // Si la web está en un hosting estático sin /api/suggestions, probamos envío directo cliente
    }

    // 2. Si el servidor no lo reenvió y hay clave/endpoint configurado en cliente, intentar envío directo
    if (!deliveredByEmail && customFormspree) {
      try {
        const resp = await fetch(customFormspree, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: name.trim() || 'Anónimo',
            email: email.trim() || 'sin-email@cuentosyvalores.es',
            _subject: emailSubject,
            valor: valueSuggestion,
            message: message.trim(),
          }),
        });
        if (resp.ok) deliveredByEmail = true;
      } catch {
        // Ignorar error de red
      }
    }

    if (!deliveredByEmail && customWeb3Key) {
      try {
        const resp = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: customWeb3Key,
            subject: emailSubject,
            from_name: name.trim() || 'Visitante Cuentos con Valores',
            name: name.trim() || 'Anónimo',
            email: email.trim() || 'sin-email@cuentosyvalores.es',
            valor: valueSuggestion,
            message: message.trim(),
          }),
        });
        const data = await resp.json().catch(() => null);
        if (resp.ok && data?.success) deliveredByEmail = true;
      } catch {
        // Ignorar error de red
      }
    }

    if (!savedOnServer) {
      saveLocalBackup(deliveredByEmail);
    }

    setEmailDelivered(deliveredByEmail);
    setSubmitted(true);
    setSending(false);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setEmailDelivered(false);
    setSendError(null);
    setCopied(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 border-4 border-amber-200 shadow-2xl relative max-h-[92vh] overflow-y-auto my-auto">
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
          aria-label="Cerrar ventana de contacto"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-2xl text-slate-800">
              ¡Muchas gracias, {name.trim() || 'amigo'}!
            </h3>
            {emailDelivered ? (
              <p className="text-sm text-slate-600 mt-2">
                Tu sugerencia sobre <strong>{valueSuggestion}</strong> se ha enviado correctamente a{' '}
                <strong>{recipientEmail}</strong> y ha quedado registrada en el buzón de la web.
              </p>
            ) : (
              <p className="text-sm text-slate-600 mt-2">
                Tu sugerencia sobre <strong>{valueSuggestion}</strong> ha quedado guardada en el{' '}
                <strong>Buzón de Cuentos con Valores</strong> para que el autor la revise.
              </p>
            )}

            <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-left space-y-2.5">
              <p className="text-xs text-amber-900 font-semibold">
                {emailDelivered
                  ? '📬 ¿Quieres enviarte o mandar una copia desde tu propio correo?'
                  : `📬 ¿Quieres enviarla también ahora mismo a ${recipientEmail} desde tu correo?`}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={mailtoLink}
                  target="_top"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>App de Correo / Gmail</span>
                </a>
                <a
                  href={gmailWebLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Gmail Web</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-300 text-amber-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>¡Copiado! Pégalo en tu correo para {recipientEmail}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar mensaje y correo ({recipientEmail})</span>
                  </>
                )}
              </button>
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
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (sendError) setSendError(null);
                  }}
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
                  <span className="shrink mx-2 text-[11px] text-slate-400 font-medium">
                    o abrir en tu correo ({recipientEmail})
                  </span>
                  <div className="grow border-t border-slate-200"></div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={message.trim() ? mailtoLink : '#'}
                    target={message.trim() ? '_top' : undefined}
                    onClick={(e) => {
                      if (!message.trim()) {
                        e.preventDefault();
                        setSendError('Escribe primero tu idea o mensaje arriba antes de abrir tu app de correo.');
                      }
                    }}
                    className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs text-center flex items-center justify-center gap-1 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span className="truncate">App Correo</span>
                  </a>
                  <a
                    href={message.trim() ? gmailWebLink : '#'}
                    onClick={(e) => {
                      if (!message.trim()) {
                        e.preventDefault();
                        setSendError('Escribe primero tu idea o mensaje arriba antes de abrir Gmail.');
                      }
                    }}
                    target={message.trim() ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 font-semibold text-xs text-center flex items-center justify-center gap-1 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="truncate">Gmail Web</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-700 font-semibold text-xs text-center flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
