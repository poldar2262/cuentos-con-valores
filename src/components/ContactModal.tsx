import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle, Heart } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [valueSuggestion, setValueSuggestion] = useState('Respeto');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-2xl text-slate-800">
              ¡Muchas gracias, {name || 'amigo'}!
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Hemos recibido tu sugerencia para el valor <strong>{valueSuggestion}</strong>. Seguiremos creando nuevos cuentos y láminas para colorear para toda la comunidad.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-6 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
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
              ¿Tienes una idea para un cuento sobre gratitud, perdón o respeto? ¡Cuéntanoslo!
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tu Nombre o Escuela
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Carmen o Colegio San José"
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-200 text-sm focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Correo Electrónico (opcional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tuemail@ejemplo.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-200 text-sm focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Valor o Tema a Tratar
                </label>
                <select
                  value={valueSuggestion}
                  onChange={(e) => setValueSuggestion(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-200 text-sm focus:outline-hidden focus:border-amber-400 bg-white"
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
                  Mensaje o Idea del Personaje
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ej. Me gustaría un cuento con un osito que aprenda a decir por favor y gracias..."
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-200 text-sm focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Sugerencia</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
