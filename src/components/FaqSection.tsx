import React from 'react';
import { HelpCircle, BookOpen, Sparkles, Palette, GraduationCap, ShieldCheck } from 'lucide-react';
import { HOME_FAQS } from '../data/seoRoutes';

const FAQ_ICONS = [
  { icon: Sparkles, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { icon: BookOpen, color: 'text-sky-600 bg-sky-50 border-sky-200' },
  { icon: GraduationCap, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { icon: ShieldCheck, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { icon: Palette, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  { icon: Sparkles, color: 'text-amber-700 bg-amber-50 border-amber-200' },
];

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-12 sm:py-16 bg-amber-50/40 border-t border-amber-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Dudas Frecuentes
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            ¿Tienes dudas sobre Cuentos y Valores? Preguntas frecuentes
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Respuestas claras sobre edades recomendadas, uso educativo en colegios y descarga gratuita de nuestros materiales.
          </p>
        </div>

        <div className="space-y-4">
          {HOME_FAQS.map((faq, idx) => {
            const style = FAQ_ICONS[idx % FAQ_ICONS.length];
            const Icon = style.icon;
            return (
              <details
                key={faq.question}
                open
                className="group bg-white rounded-2xl border border-amber-200/80 shadow-2xs p-5 transition-all hover:border-amber-300"
              >
                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none font-display font-bold text-base sm:text-lg text-slate-900">
                  <span className="flex items-center gap-3">
                    <span className={`p-2 rounded-xl border shrink-0 ${style.color}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span>{faq.question}</span>
                  </span>
                </summary>
                <p className="mt-3 pl-12 text-sm text-slate-700 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
};
