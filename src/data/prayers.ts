export interface Prayer {
  id: string;
  title: string;
  category: 'dormir' | 'manana' | 'gratitud' | 'familia';
  categoryLabel: string;
  momentIcon: string; // emoji or identifier
  recommendedAge: string;
  subtitle: string;
  lines: string[];
  reflection: string;
  audioDuration?: string;
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
      'Tómame en tus brazos con tierno calor,',
      'y cuida mis sueños con manto de amor.'
    ],
    reflection: 'Antes de cerrar los ojitos, respira hondo: nunca estás solo en la noche. Hay un ángel bueno que vela por tu descanso.',
    audioDuration: '1:10 min',
    bgGradient: 'from-indigo-900/90 via-slate-900 to-indigo-950',
    borderColor: 'border-indigo-400/40',
    textColor: 'text-indigo-100'
  },
  {
    id: 'bendicion-de-la-manana',
    title: 'Buenos Días, Nuevo Sol',
    category: 'manana',
    categoryLabel: 'Al despertar',
    momentIcon: '☀️',
    recommendedAge: '3 a 9 años',
    subtitle: 'Para empezar la jornada con alegría, ganas de aprender y sonreír',
    lines: [
      'Gracias por la luz que entra a mi ventana,',
      'gracias por el aire de esta fresca mañana.',
      'Dame hoy ojos limpios para mirar el bien,',
      'manos listas que ayuden al amigo también.',
      'Que juegue con ganas, que aprenda con paz,',
      'y lleve conmigo la risa y la paz.'
    ],
    reflection: 'Cada mañana es una hoja en blanco de aventuras. Saludar al nuevo día con gratitud llena el corazón de luz.',
    audioDuration: '1:05 min',
    bgGradient: 'from-amber-500/90 via-orange-500 to-amber-600',
    borderColor: 'border-amber-300/40',
    textColor: 'text-amber-50'
  },
  {
    id: 'gratitud-en-la-mesa',
    title: 'Gracias por los Alimentos',
    category: 'gratitud',
    categoryLabel: 'En la mesa',
    momentIcon: '🥖',
    recommendedAge: 'Todas las edades',
    subtitle: 'Agradecer el plato en la mesa y pensar en quienes lo prepararon',
    lines: [
      'Bendice, Señor, el pan que nos das,',
      'la mesa redonda donde reina la paz.',
      'Bendice las manos que con gran cariño,',
      'cocinan los frutos que nutren al niño.',
      'Y dale a quien pasa hambre o dolor,',
      'un plato caliente y abrigo de amor.'
    ],
    reflection: 'La comida sabe mucho más rica cuando antes nos miramos a los ojos y agradecemos tenerla juntos.',
    audioDuration: '0:55 min',
    bgGradient: 'from-emerald-700/90 via-teal-800 to-emerald-900',
    borderColor: 'border-emerald-400/40',
    textColor: 'text-emerald-50'
  },
  {
    id: 'oracion-por-la-familia',
    title: 'Protege a Quienes Amo',
    category: 'familia',
    categoryLabel: 'Por la familia y amigos',
    momentIcon: '❤️',
    recommendedAge: '4 a 10 años',
    subtitle: 'Un abrazo en oración por los abuelos, papás, hermanos y amigos',
    lines: [
      'Cuida a mis papás que trabajan con esmero,',
      'a mis abuelitos a quienes tanto quiero.',
      'Si alguno está triste o le duele la espalda,',
      'cúbrelo suave con tu alegre falda.',
      'Haz que en nuestra casa no falte el perdón,',
      'y que siempre reine la unión y el perdón.'
    ],
    reflection: 'Pensar con ternura en las personas que nos quieren es la mejor forma de abrazarlas con el corazón.',
    audioDuration: '1:15 min',
    bgGradient: 'from-rose-800/90 via-pink-900 to-purple-950',
    borderColor: 'border-rose-300/40',
    textColor: 'text-rose-100'
  },
  {
    id: 'estrellita-de-la-calma',
    title: 'Estrellita de la Paz',
    category: 'dormir',
    categoryLabel: 'Para calmar los temores',
    momentIcon: '✨',
    recommendedAge: '3 a 8 años',
    subtitle: 'Para cuando da un poco de miedo la oscuridad o hay tormenta',
    lines: [
      'Si la noche es oscura y ruge el canal,',
      'sé tú mi lucecita, mi guardia leal.',
      'Se van los temores, se apaga el pesar,',
      'mi cama es un barco dispuesto a soñar.',
      'Bajo las estrellas descanso feliz,',
      'hasta que el lucero me dé un buen cariz.'
    ],
    reflection: 'El miedo se hace chiquitito cuando encendemos una sonrisa y recordamos que siempre estamos protegidos.',
    audioDuration: '1:00 min',
    bgGradient: 'from-sky-900/90 via-blue-950 to-indigo-950',
    borderColor: 'border-sky-400/40',
    textColor: 'text-sky-100'
  },
  {
    id: 'corazon-generoso',
    title: 'Pequeñas Manos que Comparten',
    category: 'gratitud',
    categoryLabel: 'Sembrando bondad',
    momentIcon: '🌱',
    recommendedAge: '5 a 10 años',
    subtitle: 'Para recordar compartir nuestros juguetes y ayudar a los demás',
    lines: [
      'Señor, hazme un niño alegre y sincero,',
      'que no guarde todo para mí primero.',
      'Si un amigo llora en el recreo escolar,',
      'dame una palabra que lo haga calmar.',
      'Que donde haya enfados yo ponga sonrisas,',
      'y vuele la envidia como suave brisa.'
    ],
    reflection: 'Compartir lo que tenemos no nos quita nada: multiplica las risas y nos hace tener amigos de verdad.',
    audioDuration: '1:05 min',
    bgGradient: 'from-amber-700/90 via-yellow-800 to-stone-900',
    borderColor: 'border-amber-400/40',
    textColor: 'text-amber-100'
  }
];
