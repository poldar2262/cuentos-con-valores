import React from 'react';
import { Heart, ShieldCheck, Smile, Gift, Hourglass, Users } from 'lucide-react';

const VALUES_DATA = [
  {
    title: 'Honestidad',
    icon: ShieldCheck,
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Aprender a decir la verdad con valentía, asumiendo los errores sin miedo y construyendo confianza mutua.',
    characterRef: 'Mateo y Mei (El Telescopio Roto)',
  },
  {
    title: 'Valentía',
    icon: Heart,
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Enfrentar los temores cotidianos para hacer lo correcto y tender una mano compasiva a quien lo necesita.',
    characterRef: 'Valerio y Elara (El Destello del Corazón Valiente)',
  },
  {
    title: 'Empatía',
    icon: Smile,
    color: 'bg-sky-100 text-sky-800 border-sky-300',
    description: 'Saber escuchar en silencio, ponerse en los zapatos del compañero y comprender cómo se siente antes de juzgar.',
    characterRef: 'Lucas, Sofía y Tomás (El Mapa de los Sentimientos)',
  },
  {
    title: 'Generosidad',
    icon: Gift,
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Compartir lo bueno que tenemos, desde sonrisas y tiempo hasta dar una mano sin esperar nada a cambio.',
    characterRef: 'La Luz de Nazaret / Una Misión para Todos',
  },
  {
    title: 'Paciencia',
    icon: Hourglass,
    color: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Comprender que las cosas hermosas toman su tiempo. Paso a pasito y con constancia se logran las metas.',
    characterRef: 'Mateo y Don Julián (La Paciencia Estelar)',
  },
  {
    title: 'Amistad y Cooperación',
    icon: Users,
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: 'Descubrir que el trabajo en equipo hace los pesos más ligeros y convierte cualquier rincón en una gran aventura compartida.',
    characterRef: 'Leo, Maya y sus amigos',
  },
];

export const ValuesGuideSection: React.FC = () => {
  return (
    <section id="valores" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3">
            ✨ Educación Emocional
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800">
            Valores y Virtudes que Crecen con Ellos
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Cada historia está cuidadosamente estructurada para servir como disparador pedagógico en el hogar y en la escuela infantil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES_DATA.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="p-6 rounded-3xl border-2 border-slate-100 bg-amber-50/20 hover:border-amber-300 hover:bg-amber-50/50 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-2xl border ${v.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-800">
                    {v.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {v.description}
                </p>
                <div className="text-xs font-bold text-amber-700 bg-amber-100/60 px-3 py-1 rounded-xl inline-block">
                  Ejemplificado por: {v.characterRef}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
