import React from 'react';
import { Heart, BookOpen, Sparkles, HelpCircle } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  onOpenManual?: () => void;
  onOpenChatbot?: () => void;
  onNavigate?: (href: string) => void;
}

const FOOTER_VALUES = [
  { label: 'Honestidad', slug: 'honestidad', cls: 'bg-amber-100/70 text-amber-800 hover:bg-amber-200' },
  { label: 'Valentía', slug: 'valentia', cls: 'bg-rose-100/70 text-rose-800 hover:bg-rose-200' },
  { label: 'Empatía', slug: 'empatia', cls: 'bg-sky-100/70 text-sky-800 hover:bg-sky-200' },
  { label: 'Generosidad', slug: 'generosidad', cls: 'bg-emerald-100/70 text-emerald-800 hover:bg-emerald-200' },
  { label: 'Paciencia', slug: 'paciencia', cls: 'bg-teal-100/70 text-teal-800 hover:bg-teal-200' },
  { label: 'Amistad', slug: 'amistad', cls: 'bg-indigo-100/70 text-indigo-800 hover:bg-indigo-200' },
  { label: 'Cooperación', slug: 'cooperacion', cls: 'bg-cyan-100/70 text-cyan-800 hover:bg-cyan-200' },
];

export const Footer: React.FC<FooterProps> = ({
  onOpenContact,
  onOpenManual,
  onOpenChatbot,
  onNavigate,
}) => {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <footer className="bg-white border-t border-amber-200 mt-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-2 space-y-3">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="inline-flex items-center gap-2.5"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-amber-950 font-bold">
                <BookOpen className="w-5 h-5 text-amber-900" />
              </div>
              <span className="font-display text-xl font-bold text-slate-900">
                Cuentos con Valores
              </span>
            </a>

            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Un proyecto educativo y cristiano concebido con amor por{' '}
              <a
                href="/sobre-el-autor/"
                onClick={(e) => handleLink(e, '/sobre-el-autor/')}
                className="font-semibold text-amber-800 underline hover:text-amber-950"
              >
                Juancar Hidalgo
              </a>{' '}
              para ayudar a padres, maestros y catequistas a cultivar virtudes esenciales mediante la lectura, el audio y el dibujo.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <div className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>100% libre acceso para familias y colegios</span>
              </div>
            </div>
          </div>

          {/* Col 2: Secciones Rápidas */}
          <div>
            <h3 className="font-display font-bold text-slate-900 text-sm mb-3">
              Explorar el Sitio
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-semibold">
              <li>
                <a
                  href="/#cuentos"
                  onClick={(e) => handleLink(e, '/#cuentos')}
                  className="hover:text-amber-600 transition-colors"
                >
                  Catálogo de Cuentos
                </a>
              </li>
              <li>
                <a
                  href="/belen-recortable/"
                  onClick={(e) => handleLink(e, '/belen-recortable/')}
                  className="hover:text-amber-700 text-amber-900 transition-colors"
                >
                  ✂️ Belén Recortable para Niños
                </a>
              </li>
              <li>
                <a
                  href="/dibujos-para-colorear/"
                  onClick={(e) => handleLink(e, '/dibujos-para-colorear/')}
                  className="hover:text-sky-700 transition-colors"
                >
                  🎨 Dibujos para Colorear
                </a>
              </li>
              <li>
                <a
                  href="/oraciones/"
                  onClick={(e) => handleLink(e, '/oraciones/')}
                  className="hover:text-indigo-600 text-indigo-900 transition-colors"
                >
                  🕊️ Oraciones y Catequesis
                </a>
              </li>
              <li>
                <a
                  href="/sobre-el-autor/"
                  onClick={(e) => handleLink(e, '/sobre-el-autor/')}
                  className="hover:text-amber-600 transition-colors"
                >
                  Sobre Juancar Hidalgo
                </a>
              </li>
              <li>
                <a
                  href="/privacidad-y-aviso-legal/"
                  onClick={(e) => handleLink(e, '/privacidad-y-aviso-legal/')}
                  className="hover:text-amber-600 transition-colors"
                >
                  Privacidad y Aviso Legal
                </a>
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
              {FOOTER_VALUES.map((val) => {
                const href = `/valores/${val.slug}/`;
                return (
                  <a
                    key={val.slug}
                    href={href}
                    onClick={(e) => handleLink(e, href)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${val.cls}`}
                  >
                    {val.label}
                  </a>
                );
              })}
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
            <a
              href="/sobre-el-autor/"
              onClick={(e) => handleLink(e, '/sobre-el-autor/')}
              className="hover:text-slate-800 underline"
            >
              Sobre el autor
            </a>
            <a
              href="/privacidad-y-aviso-legal/"
              onClick={(e) => handleLink(e, '/privacidad-y-aviso-legal/')}
              className="hover:text-slate-800 underline"
            >
              Privacidad y aviso legal
            </a>
            <span>
              © {new Date().getFullYear()} Cuentos con Valores
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
