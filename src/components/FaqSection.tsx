import React from 'react';
import { HelpCircle, BookOpen, Sparkles, Palette, GraduationCap, ShieldCheck } from 'lucide-react';

const FAQS = [
  {
    question: '¿Los cuentos ilustrados y las láminas para colorear son gratuitos?',
    answer:
      'Sí, el 100% de los cuentos con valores, los audiocuentos narrados, las oraciones infantiles, el Belén recortable y las láminas para colorear son de libre acceso y gratuitos para familias, docentes y catequistas. No necesitas registrarte ni crear cuentas.',
    icon: Sparkles,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    question: '¿Para qué edades están recomendados estos cuentos infantiles?',
    answer:
      'Las historias están pensadas para acompañar desde los 3 hasta los 12 años: cuentos breves y visuales para Infantil (3-5 años), relatos con moraleja y diálogo para primeros lectores (6-8 años) y narraciones más profundas para Primaria (9-12 años).',
    icon: BookOpen,
    color: 'text-sky-600 bg-sky-50 border-sky-200',
  },
  {
    question: '¿Cómo puedo usar los cuentos y actividades en el aula o en familia?',
    answer:
      'Cada historia combina lectura digital, narración en audio, preguntas de reflexión al final del cuento y un dibujo descargable relacionado con la trama para trabajar el valor mediante la creatividad manual y la conversación.',
    icon: GraduationCap,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    question: '¿Es seguro el contenido generado por Valerio para los niños?',
    answer:
      'Totalmente. Valerio está configurado con criterios pedagógicos estrictos para redactar historias amables, respetuosas y libres de violencia, siempre enfocadas en virtudes positivas como la empatía, la honestidad, la paciencia o la amistad.',
    icon: ShieldCheck,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
  },
  {
    question: '¿Cómo se descargan los cuentos y dibujos para leer o imprimir en casa?',
    answer:
      'En cada lector de cuento, lámina de dibujo, oración o en el Belén recortable encontrarás botones de descarga directa para guardar los archivos en tu ordenador, tablet o móvil y poder leerlos sin conexión o imprimirlos cuando quieras.',
    icon: Palette,
    color: 'text-rose-600 bg-rose-50 border-rose-200',
  },
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
            Preguntas frecuentes sobre Cuentos y Valores
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Información práctica sobre edades recomendadas, uso en colegios y descarga gratuita de nuestros recursos educativos.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => {
            const Icon = faq.icon;
            return (
              <details
                key={faq.question}
                open
                className="group bg-white rounded-2xl border border-amber-200/80 shadow-2xs p-5 transition-all hover:border-amber-300"
              >
                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none font-display font-bold text-base sm:text-lg text-slate-900">
                  <span className="flex items-center gap-3">
                    <span className={`p-2 rounded-xl border shrink-0 ${faq.color}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span>{faq.question}</span>
                  </span>
                </summary>
                <p className="mt-3 pl-12 text-sm text-slate-600 leading-relaxed">
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
