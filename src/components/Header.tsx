import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Palette, Search, Sparkles, Menu, X, HelpCircle, Lock, GraduationCap } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenContact: () => void;
  onOpenManual: () => void;
  onOpenAdmin?: () => void;
  onOpenChatbot?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenContact,
  onOpenManual,
  onOpenAdmin,
  onOpenChatbot,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group focus:outline-hidden shrink-0"
            aria-label="Ir al inicio de Cuentos y Valores"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-300 border-2 border-amber-500/30 flex items-center justify-center text-amber-950 shadow-xs group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-amber-900" />
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-bold text-slate-800 tracking-tight block leading-tight">
                Cuentos y Valores
              </span>
              <span className="text-[11px] font-semibold text-amber-700 block">
                Por Juancar Hidalgo · Cuentos y Láminas
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-[210px] xl:max-w-xs relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar cuento o valor..."
              aria-label="Buscar cuento o valor"
              className="w-full pl-9 pr-3 py-2 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-amber-400 transition-all"
            />
          </div>

          {/* Navigation Links Desktop — real <a href="..."> rendered via React Router Link */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1 font-bold text-xs xl:text-sm text-slate-700">
            <Link
              to="/cuentos"
              className="px-2.5 py-2 rounded-xl hover:bg-amber-100/70 hover:text-amber-800 transition-colors"
            >
              Cuentos
            </Link>
            <Link
              to="/guia-padres-docentes"
              className="px-2.5 py-2 rounded-xl hover:bg-emerald-100/70 hover:text-emerald-900 transition-colors flex items-center gap-1"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Guía</span>
            </Link>
            <Link
              to="/dibujos-para-colorear"
              className="px-2.5 py-2 rounded-xl hover:bg-sky-100/70 hover:text-sky-800 transition-colors flex items-center gap-1"
            >
              <Palette className="w-4 h-4 text-sky-500" />
              <span>Colorear</span>
            </Link>
            <Link
              to="/belen-recortable"
              className="px-2.5 py-2 rounded-xl hover:bg-amber-100/80 hover:text-amber-950 transition-colors flex items-center gap-1 font-semibold text-amber-900 bg-amber-100/50 border border-amber-200/60"
            >
              <span>✂️ Belén</span>
            </Link>
            <Link
              to="/oraciones"
              className="px-2.5 py-2 rounded-xl hover:bg-indigo-100/70 hover:text-indigo-900 transition-colors"
            >
              Oraciones
            </Link>
            <Link
              to="/sobre-nosotros"
              className="px-2.5 py-2 rounded-xl hover:bg-amber-100/70 hover:text-amber-800 transition-colors"
            >
              Nosotros
            </Link>
            <button
              id="btn-nav-manual"
              type="button"
              onClick={onOpenManual}
              className="px-2 py-2 rounded-xl text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors flex items-center gap-1 cursor-pointer font-bold"
              title="Abrir el manual de uso de la web"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span className="hidden xl:inline">Manual</span>
            </button>
            {onOpenChatbot && (
              <button
                type="button"
                onClick={onOpenChatbot}
                className="px-2.5 py-2 rounded-xl text-amber-950 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 hover:from-amber-400 hover:to-amber-400 border border-amber-400/80 transition-all flex items-center gap-1 cursor-pointer font-bold shadow-xs active:scale-95"
                title="Hablar con Valerio: cuentos personalizados con valores"
              >
                <Sparkles className="w-4 h-4 text-amber-700 animate-pulse" />
                <span>Valerio (IA)</span>
              </button>
            )}
            <button
              type="button"
              onClick={onOpenContact}
              className="ml-1 px-3 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              Contacto
            </button>
            {onOpenAdmin && (
              <button
                id="btn-nav-admin"
                type="button"
                onClick={onOpenAdmin}
                className="p-2 rounded-xl text-slate-300 hover:text-slate-700 hover:bg-amber-100/60 transition-colors cursor-pointer"
                title="Acceso privado"
                aria-label="Acceso privado"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-amber-100 text-amber-900 cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar cuento o virtud..."
              aria-label="Buscar cuento o virtud"
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-amber-50/60 border border-amber-200 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-amber-200 p-4 space-y-2 font-bold text-sm">
          <Link
            to="/cuentos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl hover:bg-amber-100 text-slate-700"
          >
            📚 Catálogo de Cuentos
          </Link>
          <Link
            to="/guia-padres-docentes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl hover:bg-emerald-100 text-emerald-800"
          >
            🎓 Guía Padres y Docentes
          </Link>
          <Link
            to="/valores/empatia"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl hover:bg-amber-100 text-slate-700"
          >
            ✨ Cuentos por Valores
          </Link>
          <Link
            to="/dibujos-para-colorear"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl hover:bg-sky-100 text-sky-700"
          >
            🎨 Dibujos para Colorear
          </Link>
          <Link
            to="/belen-recortable"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold"
          >
            ✂️ Belén Recortable (Navidad)
          </Link>
          <Link
            to="/oraciones"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl hover:bg-indigo-100 text-indigo-800"
          >
            🕊️ Oraciones para Niños
          </Link>
          <Link
            to="/sobre-nosotros"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl hover:bg-amber-100 text-slate-700"
          >
            ✍️ Sobre Nosotros (Enfoque Pedagógico)
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenManual();
            }}
            className="w-full text-left px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-bold flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>📖 Manual de Uso de la Web</span>
          </button>
          {onOpenChatbot && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChatbot();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 font-bold flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-800 animate-pulse" />
              <span>✨ Habla con Valerio (Cuentos IA)</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full text-left px-3 py-2 rounded-xl bg-amber-500 text-white font-bold"
          >
            💌 Contacto / Sugerir Cuento
          </button>
        </div>
      )}
    </header>
  );
};
