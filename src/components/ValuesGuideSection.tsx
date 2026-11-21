import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Smile, Gift, Hourglass, Users } from 'lucide-react';

const VALUES_DATA = [
  {
    title: 'Honestidad',
    slug: 'honestidad',
    icon: ShieldCheck,
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    description:
      'Aprender a decir la verdad con valentía, asumiendo los errores sin miedo y construyendo confianza mutua.',
    characterRef: 'Mateo y Mei (Mateo y el Misterio del Telescopio Roto)',
  },
  {
    title: 'Valentía',
    slug: 'valentia',
    icon: Heart,
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    description:
      'Enfrentar los temores cotidianos para hacer lo correcto y tender una mano compasiva a quien lo necesita.',
    characterRef: 'Valerio y Elara (El Destello del Corazón Valiente)',
  },
  {
    title: 'Empatía',
    slug: 'empatia',
    icon: Smile,
    color: 'bg-sky-100 text-sky-800 border-sky-300',
    description:
      'Saber escuchar en silencio, ponerse en los zapatos del compañero y comprender cómo se siente antes de juzgar.',
    characterRef: 'Lucas, Sofía y Tomás (El Mapa de los Sentimientos)',
  },
  {
    title: 'Generosidad',
    slug: 'generosidad',
    icon: Gift,
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description:
      'Compartir lo bueno que tenemos, desde sonrisas y juegos hasta dar una mano sin esperar nada a cambio.',
    characterRef: 'La Luz de Nazaret y Una Misión para Todos',
  },
  {
    title: 'Paciencia',
    slug: 'paciencia',
    icon: Hourglass,
    color: 'bg-teal-100 text-teal-800 border-teal-300',
    description:
      'Comprender que las cosas hermosas necesitan tiempo. Paso a pasito y con constancia se alcanzan las metas.',
    characterRef: 'Mateo y Don Julián (La Paciencia Estelar)',
  },
  {
    title: 'Respeto y Amistad',
    slug: 'respeto',
    icon: Users,
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description:
      'Descubrir que escuchar, cuidar el aula y remar en equipo hace las cargas ligeras y une a los amigos.',
    characterRef: 'Leo, Maya y Oliver (Una Misión para Dos)',
  },
];

export const ValuesGuideSection: React.FC = () => {
  return (
    <section id="valores" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3">
            ✨ Educación Emocional y Catequesis Familiar
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800">
            ¿Por qué educar en valores con cuentos desde Infantil y Primaria?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Cada historia escrita por Juancar Hidalgo está pensada como recurso pedagógico para familias, colegios de Infantil y Primaria y catequesis. Enseñar empatía, respeto, esfuerzo o sinceridad resulta natural cuando los niños se identifican con los personajes y dialogan después en familia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES_DATA.map((v) => {
            const Icon = v.icon;
            return (
              <Link
                key={v.title}
                to={`/valores/${v.slug}`}
                className="block p-6 rounded-3xl border-2 border-slate-100 bg-amber-50/20 hover:border-amber-300 hover:bg-amber-50/50 transition-all shadow-xs group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-2xl border ${v.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-800 group-hover:text-amber-700 transition-colors">
                    {v.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {v.description}
                </p>
                <div className="text-xs font-bold text-amber-700 bg-amber-100/60 px-3 py-1 rounded-xl inline-block mb-3">
                  Ejemplificado por: {v.characterRef}
                </div>
                <span className="block text-xs font-bold text-amber-800 group-hover:underline">
                  Explorar cuentos de {v.title} →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
