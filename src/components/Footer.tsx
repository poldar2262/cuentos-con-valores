import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, Sparkles, HelpCircle, Mail } from 'lucide-react';
import { VALUES_SEO } from '../data/seoRoutes';

interface FooterProps {
  onOpenContact: () => void;
  onOpenManual?: () => void;
  onOpenChatbot?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenContact,
  onOpenManual,
  onOpenChatbot,
}) => {
  return (
    <footer className="bg-white border-t border-amber-200 mt-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand, Authorship & E-E-A-T Criteria */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-amber-950 font-bold">
                <BookOpen className="w-5 h-5 text-amber-900" />
              </div>
              <span className="font-display text-xl font-bold text-slate-900">
                Cuentos y Valores
              </span>
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Proyecto educativo independiente dirigido por{' '}
              <Link
                to="/sobre-nosotros"
                className="font-semibold text-amber-800 underline hover:text-amber-950"
              >
                Juancar Hidalgo
              </Link>
              . Cuentos ilustrados, audiocuentos y actividades gratuitas elaboradas con criterios pedagógicos positivos, libres de violencia y orientados a Educación Infantil, Primaria y catequesis familiar.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <div className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>100% gratuito · Sin registro · Apto Infantil y Primaria</span>
              </div>
              <a
                href="mailto:jchurizar@gmail.com"
                className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                <span>jchurizar@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Col 2: Secciones Rápidas */}
          <div>
            <h3 className="font-display font-bold text-slate-900 text-sm mb-3">
              Explorar el Sitio
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-semibold">
              <li>
                <Link to="/cuentos" className="hover:text-amber-600 transition-colors">
                  Catálogo de Cuentos por Edad
                </Link>
              </li>
              <li>
                <Link
                  to="/guia-padres-docentes"
                  className="hover:text-emerald-700 text-emerald-900 transition-colors"
                >
                  🎓 Guía para Padres y Docentes
                </Link>
              </li>
              <li>
                <Link
                  to="/belen-recortable"
                  className="hover:text-amber-700 text-amber-900 transition-colors"
                >
                  ✂️ Belén Recortable para Niños
                </Link>
              </li>
              <li>
                <Link
                  to="/dibujos-para-colorear"
                  className="hover:text-sky-700 transition-colors"
                >
                  🎨 Dibujos para Colorear
                </Link>
              </li>
              <li>
                <Link
                  to="/oraciones"
                  className="hover:text-indigo-600 text-indigo-900 transition-colors"
                >
                  🕊️ Oraciones y Catequesis
                </Link>
              </li>
              <li>
                <Link to="/sobre-nosotros" className="hover:text-amber-600 transition-colors">
                  Sobre Nosotros y Enfoque Pedagógico
                </Link>
              </li>
              <li>
                <Link
                  to="/privacidad-y-aviso-legal"
                  className="hover:text-amber-600 transition-colors"
                >
                  Privacidad y Aviso Legal
                </Link>
              </li>
              {onOpenChatbot && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenChatbot}
                    className="text-amber-700 font-bold hover:text-amber-900 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Cuentos Personalizados (IA)</span>
                  </button>
                </li>
              )}
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
                  Contacto / Sugerir historia
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Valores destacados */}
          <div>
            <h3 className="font-display font-bold text-slate-900 text-sm mb-3">
              Cuentos por Valores
            </h3>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {VALUES_SEO.map((val) => (
                <Link
                  key={val.slug}
                  to={`/valores/${val.slug}`}
                  className={`px-2.5 py-1 rounded-lg font-bold border transition-colors hover:opacity-90 ${val.badgeBg} ${val.badgeColor}`}
                >
                  {val.title}
                </Link>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              Todos los cuentos, oraciones y láminas pueden leerse online y descargarse gratis para imprimir en casa, colegio o parroquia.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1 text-center sm:text-left">
            Hecho con <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" /> por Juancar Hidalgo para familias, escuelas y catequesis.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4">
            <Link to="/guia-padres-docentes" className="hover:text-slate-800 underline">
              Guía educativa
            </Link>
            <Link to="/sobre-nosotros" className="hover:text-slate-800 underline">
              Sobre nosotros
            </Link>
            <Link to="/privacidad-y-aviso-legal" className="hover:text-slate-800 underline">
              Privacidad y aviso legal
            </Link>
            <span>© {new Date().getFullYear()} Cuentos y Valores · Juancar Hidalgo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
