export interface Prayer {
  id: string;
  title: string;
  category: 'dormir' | 'manana' | 'gratitud' | 'familia';
  categoryLabel: string;
  momentIcon: string;
  recommendedAge: string;
  subtitle: string;
  lines: string[];
  reflection: string;
  audioDuration: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
}

export const PRAYERS: Prayer[] = [
  {
    id: 'angel-de-la-guarda',
    title: 'Ángel de mi Guarda',
    category: 'dormir',
    categoryLabel: 'Al ir a dormir',
    momentIcon: '🌙',
    recommendedAge: 'Para todas las edades',
    subtitle: 'Para descansar seguros, sintiendo el calor y cuidado celestial',
    lines: [
      'Ángel de mi guarda, dulce compañía,',
      'no me desampares ni de noche ni de día.',
      'Si me dejas solo, ¿qué será de mí?',
      'Ángel de mi guarda, ruega a Dios por mí.',
      'Guarda mis sueños bajo tu manto de paz,',
      'y enséñame mañana a querer un poco más.',
    ],
    reflection:
      'Cerrar los ojos sabiendo que alguien nos cuida con cariño convierte la noche en un descanso sereno y lleno de confianza.',
    audioDuration: '1:00 min',
    bgGradient: 'from-indigo-900 via-slate-900 to-indigo-950',
    borderColor: 'border-indigo-400/40',
    textColor: 'text-indigo-100',
  },
  {
    id: 'bendicion-de-la-manana',
    title: 'Buenos Días, Nuevo Sol',
    category: 'manana',
    categoryLabel: 'Al despertar',
    momentIcon: '☀️',
    recommendedAge: '3 - 10 años',
    subtitle: 'Para empezar el día con alegría, fuerza y buen ánimo',
    lines: [
      'Gracias por la luz de esta nueva mañana,',
      'por el sol que asoma tras mi ventana.',
      'Dame ojos atentos para ver lo bueno,',
      'y un corazón valiente, alegre y sereno.',
      'Que en casa y en clase sepa compartir,',
      'y con mis palabras haga sonreír.',
    ],
    reflection:
      'Agradecer el nuevo día nada más levantarnos nos ayuda a mirarlo como un regalo lleno de oportunidades para hacer el bien.',
    audioDuration: '1:05 min',
    bgGradient: 'from-amber-700 via-orange-700 to-amber-900',
    borderColor: 'border-amber-400/40',
    textColor: 'text-amber-50',
  },
  {
    id: 'gratitud-en-la-mesa',
    title: 'Bendición en la Mesa',
    category: 'gratitud',
    categoryLabel: 'En la mesa y gratitud',
    momentIcon: '🍞',
    recommendedAge: 'Para toda la familia',
    subtitle: 'Para dar gracias antes de comer por el alimento y quienes lo preparan',
    lines: [
      'Gracias por el pan y por este alimento,',
      'fruto de la tierra, del sol y del viento.',
      'Gracias por las manos que lo han cocinado,',
      'y por la familia que hoy está a mi lado.',
      'Que nunca nos falte mesa compartida,',
      'ni un gesto sincero de amor en la vida.',
    ],
    reflection:
      'Dar gracias antes de comer nos recuerda que cada plato es fruto del esfuerzo y del cariño de muchas personas.',
    audioDuration: '0:55 min',
    bgGradient: 'from-emerald-800 via-teal-800 to-emerald-950',
    borderColor: 'border-emerald-400/40',
    textColor: 'text-emerald-50',
  },
  {
    id: 'oracion-por-la-familia',
    title: 'Oración por mi Familia',
    category: 'familia',
    categoryLabel: 'Por la familia',
    momentIcon: '🏡',
    recommendedAge: '4 - 12 años',
    subtitle: 'Para pedir unión, paciencia y ternura en nuestro hogar',
    lines: [
      'Cuida de mi casa y de quien vive en ella,',
      'que brille el cariño como una gran estrella.',
      'Ayúdame a escuchar cuando alguien me hable,',
      'a pedir perdón y a ser más amable.',
      'Bendice a mis padres, hermanos y abuelos,',
      'que nuestro hogar sea un trocito de cielo.',
    ],
    reflection:
      'La familia crece en alegría cuando practicamos la escucha, el perdón rápido y las palabras amables cada día.',
    audioDuration: '1:10 min',
    bgGradient: 'from-rose-800 via-pink-900 to-rose-950',
    borderColor: 'border-rose-400/40',
    textColor: 'text-rose-50',
  },
  {
    id: 'estrellita-de-la-calma',
    title: 'Estrellita de la Calma',
    category: 'dormir',
    categoryLabel: 'Al ir a dormir',
    momentIcon: '✨',
    recommendedAge: '3 - 8 años',
    subtitle: 'Para soltar los nervios del día y dormir en paz',
    lines: [
      'Ya se apaga el ruido, llega el silencio,',
      'todo lo vivido hoy lo agradezco.',
      'Si me equivoqué, mañana aprendo más,',
      'y dejo mis miedos dormidos atrás.',
      'Brilla en lo alto una estrella serena,',
      'llenando mi cuarto de calma muy buena.',
    ],
    reflection:
      'Respira hondo tres veces antes de dormir: cada error de hoy es una semilla para hacerlo mejor mañana.',
    audioDuration: '1:00 min',
    bgGradient: 'from-sky-900 via-indigo-900 to-slate-950',
    borderColor: 'border-sky-400/40',
    textColor: 'text-sky-50',
  },
  {
    id: 'corazon-generoso',
    title: 'Oración del Corazón Generoso',
    category: 'gratitud',
    categoryLabel: 'En la mesa y gratitud',
    momentIcon: '🕊️',
    recommendedAge: '5 - 12 años',
    subtitle: 'Para aprender a compartir y consolar en el recreo y catequesis',
    lines: [
      'Dame un corazón ancho y sin rencor,',
      'que mire al que está solo con mucho amor.',
      'Si veo en el patio un amigo triste,',
      'ayúdame a ofrecerle la paz que me diste.',
      'Que donde haya enfados yo ponga sonrisas,',
      'y vuele la envidia como suave brisa.',
    ],
    reflection:
      'Compartir lo que tenemos no nos quita nada: multiplica las risas y nos hace tener amigos de verdad.',
    audioDuration: '1:05 min',
    bgGradient: 'from-amber-700/90 via-yellow-800 to-stone-900',
    borderColor: 'border-amber-400/40',
    textColor: 'text-amber-100',
  },
];
