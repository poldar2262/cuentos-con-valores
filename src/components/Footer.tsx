import React from 'react';
import { Heart, BookOpen, Mail, Sparkles, Share2, Printer, HelpCircle, Lock } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  onOpenManual?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onOpenManual, onOpenAdmin }) => {
  return (
    <footer className="bg-white border-t border-amber-200 mt-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-amber-950 font-bold">
                <BookOpen className="w-5 h-5 text-amber-900" />
              </div>
              <span className="font-display text-xl font-bold text-slate-900">
                Cuentos con Valores
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Un proyecto educativo y cultural concebido con amor para ayudar a padres, madres y docentes a cultivar virtudes esenciales en la infancia mediante la imaginación, la palabra hablada y el dibujo creativo.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl inline-flex border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>100% de libre acceso para hogares y escuelas</span>
            </div>
          </div>

          {/* Col 2: Secciones Rápidas */}
          <div>
            <h4 className="font-display font-bold text-slate-900 text-sm mb-3">
              Explorar el Sitio
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-semibold">
              <li>
                <a href="#cuentos" className="hover:text-amber-600 transition-colors">
                  Catálogo de Cuentos
                </a>
              </li>
              <li>
                <a href="#descargas" className="hover:text-amber-600 transition-colors">
                  Dibujos para Colorear (PDF)
                </a>
              </li>
              <li>
                <a href="#oraciones" className="hover:text-indigo-600 text-indigo-900 transition-colors">
                  🕊️ Oraciones para Niños
                </a>
              </li>
              <li>
                <a href="#valores" className="hover:text-amber-600 transition-colors">
                  Guía de Valores y Virtudes
                </a>
              </li>
              {onOpenManual && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenManual}
                    className="hover:text-indigo-600 text-indigo-900 font-bold transition-colors cursor-pointer text-left flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-600 inline" />
                    <span>Manual de la Web</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-amber-600 transition-colors cursor-pointer text-left"
                >
                  Sugerir una historia o valor
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Valores destacados */}
          <div>
            <h4 className="font-display font-bold text-slate-900 text-sm mb-3">
              Valores del Proyecto
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-amber-100/70 text-amber-800 font-bold">
                Honestidad
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-100/70 text-rose-800 font-bold">
                Valentía
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-sky-100/70 text-sky-800 font-bold">
                Empatía
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100/70 text-emerald-800 font-bold">
                Generosidad
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-teal-100/70 text-teal-800 font-bold">
                Paciencia
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-100/70 text-indigo-800 font-bold">
                Cooperación
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              Compatible para imprimir en cualquier impresora estándar doméstica o escolar.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1 text-center sm:text-left">
            Hecho con <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" /> para JCH y todas las familias amantes de la lectura.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-center sm:text-right">
              © {new Date().getFullYear()} Cuentos con Valores. Todos los materiales son de uso educativo gratuito.
            </p>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                title="Acceso de administración"
              >
                <Lock className="w-3 h-3" />
                <span className="text-[11px]">Administración</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
