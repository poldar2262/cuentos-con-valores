import { STORIES } from './stories';
import { Story, ValueCategory } from '../types';

export const SITE_URL = 'https://cuentosyvalores.es';

export interface FaqEntry {
  question: string;
  answer: string;
}

// Todas las respuestas FAQ tienen menos de 40 palabras para optimización GEO y fragmentos destacados.
export const HOME_FAQS: FaqEntry[] = [
  {
    question: '¿Los cuentos ilustrados y las láminas para colorear son gratuitos?',
    answer:
      'Sí. Todos los cuentos, audiocuentos, oraciones, el Belén recortable y las láminas para colorear son gratuitos y de acceso libre para familias, docentes y catequistas sin registro.',
  },
  {
    question: '¿Para qué edades están recomendados estos cuentos infantiles?',
    answer:
      'Abarcan de 3 a 12 años: relatos breves para Infantil (3-5 años), historias ilustradas con moraleja para primeros lectores (6-8 años) y cuentos reflexivos para Primaria (9-12 años).',
  },
  {
    question: '¿Cómo puedo usar los cuentos y actividades en el aula o en casa?',
    answer:
      'Lee la historia o escucha el audio, comenta las tres preguntas finales para reflexionar en grupo y completa la actividad práctica imprimiendo o pintando su lámina.',
  },
  {
    question: '¿Es seguro el asistente de cuentos Valerio para niños?',
    answer:
      'Valerio redacta historias amables y educativas libres de violencia. Como con cualquier herramienta de inteligencia artificial, recomendamos el acompañamiento de un adulto y evitar datos personales.',
  },
  {
    question: '¿Cómo descargo los cuentos y dibujos para imprimir?',
    answer:
      'En cada ficha de cuento, lámina para colorear u oración encontrarás botones directos de descarga en imagen, texto o formato imprimible A4 listos para usar en clase o casa.',
  },
  {
    question: '¿Tenéis recursos con valores cristianos para catequesis y Navidad?',
    answer:
      'Sí. Disponemos de oraciones infantiles cortas, el cuento bíblico para colorear La Luz de Nazaret y un Belén recortable de 16 piezas para imprimir en Adviento.',
  },
];

export interface ValueSeoInfo {
  slug: string;
  category: Exclude<ValueCategory, 'Todos'> | 'Respeto' | 'Esfuerzo' | 'Gestión Emocional';
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subtitle: string;
  badgeColor: string;
  badgeBg: string;
  introParagraphs: string[];
  practicalTips: string[];
  catechesisNote: string;
  relatedCategories?: Exclude<ValueCategory, 'Todos'>[];
}

export const VALUE_SLUG_MAP: Record<Exclude<ValueCategory, 'Todos'>, string> = {
  Honestidad: 'honestidad',
  Valentía: 'valentia',
  Empatía: 'empatia',
  Generosidad: 'generosidad',
  Paciencia: 'paciencia',
  Amistad: 'amistad',
  Cooperación: 'cooperacion',
};

export function getValueSlug(category: Exclude<ValueCategory, 'Todos'> | string): string {
  if (category in VALUE_SLUG_MAP) {
    return VALUE_SLUG_MAP[category as Exclude<ValueCategory, 'Todos'>];
  }
  return category
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const VALUES_SEO: ValueSeoInfo[] = [
  {
    slug: 'honestidad',
    category: 'Honestidad',
    title: 'Honestidad',
    metaTitle: 'Cuentos sobre la honestidad para niños | Cuentos y Valores',
    metaDescription:
      'Cuentos infantiles cortos sobre la honestidad y decir la verdad, con audio, preguntas de reflexión y dibujo para colorear gratis.',
    headline: 'Cuentos sobre la Honestidad para Niños',
    subtitle:
      'Historias cercanas para ayudar a los niños a decir la verdad con valentía, asumir sus errores y cuidar la confianza familiar y escolar.',
    badgeColor: 'text-amber-900',
    badgeBg: 'bg-amber-100 border-amber-300',
    introParagraphs: [
      'Educar en la honestidad durante la infancia significa crear un clima de afecto donde equivocarse o sufrir un accidente no despierte miedo al castigo, sino el deseo sincero de dar la cara y reparar lo que se haya estropeado.',
      'A través de relatos cotidianos en el aula —como cuando Mateo rompe sin querer el antiguo telescopio de ciencias—, los niños comprenden qué ocurre por dentro antes de confesar un fallo y descubren la paz que llega al decir la verdad.',
      'Estos cuentos sobre la honestidad están diseñados para leerse en voz alta en familia, trabajarse en tutorías de Infantil y Primaria o acompañarse en sesiones de catequesis sobre la verdad.',
    ],
    practicalTips: [
      'Valora siempre la sinceridad antes de abordar las consecuencias de un accidente.',
      'Pregunta al niño cómo se sintió el protagonista antes y después de decir la verdad.',
      'Refuerza el compromiso de reparar juntos el daño en lugar de buscar culpables.',
    ],
    catechesisNote:
      'En clave de educación en la fe y valores cristianos, la honestidad nace de un corazón limpio que camina en la verdad y construye comunidad.',
  },
  {
    slug: 'valentia',
    category: 'Valentía',
    title: 'Valentía',
    metaTitle: 'Cuentos sobre la valentía para niños | Cuentos y Valores',
    metaDescription:
      'Lee cuentos sobre la valentía para niños de 4 a 11 años. Descubre con Valerio y Elara que el valor consiste en ayudar a pesar del miedo.',
    headline: 'Cuentos sobre la Valentía y Superación del Miedo',
    subtitle:
      'Relatos llenos de ternura para descubrir que ser valiente no significa no sentir miedo, sino hacer lo correcto para proteger y ayudar.',
    badgeColor: 'text-rose-900',
    badgeBg: 'bg-rose-100 border-rose-300',
    introParagraphs: [
      'Muchos niños creen que ser valiente significa no asustarse nunca, por lo que se frustran cuando algo les da temor. Nuestros cuentos desmontan ese mito: sentir miedo es humano, y el verdadero valor nace al ayudar a quien lo necesita.',
      'Mediante aventuras simbólicas llenas de emoción, como el viaje de Valerio y Elara por el Desfiladero de las Sombras, los pequeños comprueban que el coraje cotidiano nace de la compasión y la confianza.',
      'Las preguntas de diálogo y la lámina para colorear permiten conversar con naturalidad sobre los miedos nocturnos, la timidez escolar o los cambios nuevos.',
    ],
    practicalTips: [
      'Normaliza el miedo explicando que incluso las personas valientes sienten nervios.',
      'Recuerda pequeños momentos en los que el niño superó algo difícil.',
      'Anima a usar el dibujo para colorear mientras conversáis sobre qué le da fuerza.',
    ],
    catechesisNote:
      'Ideal para trabajar en familia y catequesis la fortaleza interior, la confianza en Dios y el coraje al servicio del prójimo.',
  },
  {
    slug: 'empatia',
    category: 'Empatía',
    title: 'Empatía',
    metaTitle: 'Cuentos sobre la empatía para niños | Cuentos y Valores',
    metaDescription:
      'Cuentos ilustrados sobre la empatía para enseñar a los niños a escuchar, acompañar emociones tristes y cuidar de sus compañeros.',
    headline: 'Cuentos sobre la Empatía y Escucha Emocional',
    subtitle:
      'Historias pensadas para entrenar la mirada atenta en el patio del colegio, validar las emociones ajenas y acompañar sin juzgar.',
    badgeColor: 'text-sky-900',
    badgeBg: 'bg-sky-100 border-sky-300',
    introParagraphs: [
      'La empatía es una de las competencias emocionales más transformadoras de la niñez. Cuando un niño detiene su juego para escuchar a un compañero callado, el aula y el hogar se vuelven lugares seguros.',
      'En historias como El Mapa de los Sentimientos, Sofía y Lucas dejan a un lado su cohete de cartón para escuchar la preocupación de Tomás y ofrecerle compañía verdadera.',
      'Un recurso práctico para maestros de Infantil y Primaria, orientadores y familias que trabajan la prevención del acoso y el buen trato.',
    ],
    practicalTips: [
      'Practica el juego de adivinar cómo se siente alguien observando su expresión.',
      'Enseña frases de apoyo amable: "¿Quieres contármelo?" o "Me quedo contigo".',
      'Valida primero la emoción del niño antes de darle consejos rápidos.',
    ],
    catechesisNote:
      'La empatía refleja de forma concreta la compasión cristiana y la regla de oro de tratar a los demás como deseamos ser tratados.',
  },
  {
    slug: 'generosidad',
    category: 'Generosidad',
    title: 'Generosidad',
    metaTitle: 'Cuentos sobre la generosidad infantil | Cuentos y Valores',
    metaDescription:
      'Descubre cuentos sobre la generosidad, compartir e incluir a todos los niños. Lectura completa, audio narrado y láminas gratis.',
    headline: 'Cuentos sobre la Generosidad para Niños',
    subtitle:
      'Relatos cotidianos e inspirados en Jesús de Nazaret para descubrir que compartir tiempo, juegos y cariño multiplica la alegría.',
    badgeColor: 'text-emerald-900',
    badgeBg: 'bg-emerald-100 border-emerald-300',
    introParagraphs: [
      'La generosidad infantil va mucho más allá de prestar un juguete por obligación. Nace cuando el corazón se ensancha para invitar al que observa desde la valla o para ofrecer lo que tenemos.',
      'Reunimos historias cotidianas como Una Misión para Todos junto con propuestas bíblicas ilustradas pensadas para catequesis y familias como La Luz de Nazaret.',
      'Cada historia incluye lectura completa HTML, audio, preguntas abiertas y láminas listas para imprimir en casa o en clase.',
    ],
    practicalTips: [
      'Distingue entre prestar por obligación e invitar con alegría a participar.',
      'Propón pequeños gestos diarios de generosidad invisible en casa o en el colegio.',
      'Colorea la lámina del cuento y escribe detrás un gesto bonito para alguien cercano.',
    ],
    catechesisNote:
      'Fundamental para sesiones de catequesis infantil, Adviento, Cuaresma y Primera Comunión sobre el compartir.',
  },
  {
    slug: 'paciencia',
    category: 'Paciencia',
    title: 'Paciencia',
    metaTitle: 'Cuentos sobre la paciencia para niños | Cuentos y Valores',
    metaDescription:
      'Cuento ilustrado sobre la paciencia y saber esperar con calma. Ideal antes de dormir con audio narrado y ficha para colorear.',
    headline: 'Cuentos sobre la Paciencia y la Calma Interior',
    subtitle:
      'Historias tranquilas para ayudar a los niños impacientes a disfrutar de la espera, respirar hondo y respetar el ritmo natural.',
    badgeColor: 'text-teal-900',
    badgeBg: 'bg-teal-100 border-teal-300',
    introParagraphs: [
      'Rodeados de pantallas rápidas y recompensas inmediatas, cultivar la paciencia en los niños es hoy un reto educativo esencial. Esperar con calma enseña a mirar el mundo con atención.',
      'En Mateo y el Secreto de la Paciencia Estelar, Don Julián usa un sencillo reloj de arena dorado para mostrar que las estrellas y los cometas necesitan calma para brillar.',
      'Leer este cuento antes de dormir mejora la autorregulación infantil y abre conversaciones serenas sobre la constancia.',
    ],
    practicalTips: [
      'Usa metáforas visuales como el reloj de arena o plantar una semilla en un vaso.',
      'Acompaña la lectura nocturna con respiración pausada mientras escucháis el audio.',
      'Celebra los momentos en los que el niño espera su turno con tranquilidad.',
    ],
    catechesisNote:
      'Favorece el cultivo del silencio interior, la escucha serena y la esperanza alegre en la educación infantil.',
  },
  {
    slug: 'amistad',
    category: 'Amistad',
    title: 'Amistad',
    metaTitle: 'Cuentos sobre la amistad para niños | Cuentos y Valores',
    metaDescription:
      'Cuentos cortos ilustrados sobre la amistad verdadera. Descubre con Leo y Maya cómo el respeto y la imaginación unen a los amigos.',
    headline: 'Cuentos sobre la Amistad Verdadera para Niños',
    subtitle:
      'Relatos alegres sobre escuchar ideas ajenas, coordinarse en el juego y transformar una tarde de lluvia en recuerdos inolvidables.',
    badgeColor: 'text-indigo-900',
    badgeBg: 'bg-indigo-100 border-indigo-300',
    introParagraphs: [
      'La amistad en la infancia es el primer espacio donde los niños practican el respeto, los turnos, el perdón y la alegría compartida.',
      'En Una Misión para Dos, Leo y Maya convierten una caja de cartón en una nave espacial y descubren que escuchar a tu compañero hace llegar más lejos.',
      'Podéis leer la historia completa, escuchar el audio y descargar la lámina para colorear y regalar a un amigo del colegio.',
    ],
    practicalTips: [
      'Hablad sobre qué hace que alguien sea un buen amigo más allá de los juguetes.',
      'Practica cómo pedir perdón o ponerse de acuerdo cuando dos amigos quieren dirigir el juego.',
      'Regalad el dibujo coloreado del cuento a un compañero especial.',
    ],
    catechesisNote:
      'Ideal para fomentar la fraternidad, la acogida y el respeto mutuo en grupos escolares y parroquiales.',
  },
  {
    slug: 'cooperacion',
    category: 'Cooperación',
    title: 'Cooperación',
    metaTitle: 'Cuentos sobre cooperación en equipo | Cuentos y Valores',
    metaDescription:
      'Recursos y cuentos infantiles sobre cooperación, amistad y trabajo en equipo para educar en el aula de Infantil y Primaria.',
    headline: 'Cuentos sobre Cooperación y Trabajo en Equipo',
    subtitle:
      'Historias para enseñar a los niños que remar juntos multiplica las fuerzas y transforma los retos en juegos compartidos.',
    badgeColor: 'text-cyan-900',
    badgeBg: 'bg-cyan-100 border-cyan-300',
    introParagraphs: [
      'Aprender a cooperar permite descubrir que cada persona aporta un talento distinto al grupo. Frente a la competitividad, el equipo muestra que todos ganamos al coordinarnos.',
      'En nuestras aventuras de la flota espacial de cartón y en la reparación conjunta del telescopio del aula, niños y adultos suman manos e imaginación.',
      'Recomendamos combinar estas lecturas con retos cooperativos en clase o en casa, como construir juntos el Belén recortable.',
    ],
    practicalTips: [
      'Asigna pequeñas responsabilidades complementarias durante una manualidad en grupo.',
      'Destaca cómo cada personaje contribuye con algo único dentro de la historia.',
      'Fomenta actividades sin ganadores ni perdedores.',
    ],
    catechesisNote:
      'Ayuda a comprender el sentido de comunidad y corresponsabilidad desde edades tempranas.',
    relatedCategories: ['Amistad', 'Generosidad', 'Empatía'],
  },
  {
    slug: 'respeto',
    category: 'Respeto',
    title: 'Respeto',
    metaTitle: 'Cuentos sobre el respeto para niños | Cuentos y Valores',
    metaDescription:
      'Cuentos infantiles sobre el respeto al material escolar, a los compañeros y a los sentimientos ajenos, con audio y actividad gratis.',
    headline: 'Cuentos sobre el Respeto y el Buen Trato para Niños',
    subtitle:
      'Relatos para enseñar a cuidar las cosas comunes, respetar los turnos en el juego y tratar con amabilidad a todas las personas.',
    badgeColor: 'text-amber-900',
    badgeBg: 'bg-amber-100 border-amber-300',
    introParagraphs: [
      'El respeto se aprende en los gestos cotidianos: cuidar el material del aula, escuchar sin interrumpir cuando un amigo habla y no dejar a nadie al margen del patio.',
      'Historias como Mateo y el Misterio del Telescopio Roto o El Mapa de los Sentimientos invitan a reflexionar sobre el respeto a las normas, a los profesores y a las emociones de los demás.',
      'Ideales para asambleas escolares de Infantil y tutorías de Primaria enfocadas en la convivencia positiva.',
    ],
    practicalTips: [
      'Acordad entre todos tres normas sencillas de respeto basadas en cuidar y escuchar.',
      'Conversad sobre qué significa reparar un daño cuando nos equivocamos.',
      'Refuerza con elogios concretos los gestos de trato amable diario.',
    ],
    catechesisNote:
      'El respeto reconoce la dignidad única de cada persona como base de la convivencia fraterna.',
    relatedCategories: ['Honestidad', 'Empatía', 'Amistad'],
  },
  {
    slug: 'esfuerzo',
    category: 'Esfuerzo',
    title: 'Esfuerzo',
    metaTitle: 'Cuentos sobre el esfuerzo infantil | Cuentos y Valores',
    metaDescription:
      'Cuentos infantiles sobre el esfuerzo, la constancia y no rendirse ante las dificultades. Incluye audio narrado y preguntas guía.',
    headline: 'Cuentos sobre el Esfuerzo y la Constancia para Niños',
    subtitle:
      'Historias motivadoras para descubrir que las metas valiosas se alcanzan paso a paso, superando las prisas y los pequeños tropiezos.',
    badgeColor: 'text-rose-900',
    badgeBg: 'bg-rose-100 border-rose-300',
    introParagraphs: [
      'El valor del esfuerzo ayuda a los niños a no rendirse al primer obstáculo y a disfrutar del proceso de aprender algo nuevo con constancia.',
      'En relatos como Mateo y el Secreto de la Paciencia Estelar o El Destello del Corazón Valiente, los protagonistas avanzan paso a paso a pesar del cansancio o las dudas.',
      'Perfectos para trabajar la tolerancia a la frustración, los hábitos de estudio y la superación personal en clase o en familia.',
    ],
    practicalTips: [
      'Elogia el proceso y la constancia del niño, no solo el resultado final.',
      'Divide las tareas grandes en pequeños pasos alcanzables.',
      'Recuerda que los errores forman parte natural de aprender cualquier habilidad.',
    ],
    catechesisNote:
      'La constancia en el bien educa el carácter y nos prepara para servir con alegría.',
    relatedCategories: ['Paciencia', 'Valentía'],
  },
  {
    slug: 'gestion-emocional',
    category: 'Gestión Emocional',
    title: 'Gestión Emocional',
    metaTitle: 'Cuentos sobre gestión emocional | Cuentos y Valores',
    metaDescription:
      'Cuentos para enseñar gestión emocional infantil: miedo, tristeza, impaciencia y calma con audio, preguntas y actividades para niños.',
    headline: 'Cuentos sobre Gestión Emocional para Niños',
    subtitle:
      'Relatos cálidos para poner nombre a la tristeza, el miedo o la impaciencia y aprender herramientas sencillas de calma y diálogo.',
    badgeColor: 'text-sky-900',
    badgeBg: 'bg-sky-100 border-sky-300',
    introParagraphs: [
      'Antes de controlar una emoción intensa, el niño necesita identificarla y sentir que es aceptado. Los cuentos crean una distancia segura para hablar de lo que ocurre por dentro.',
      'Esta selección une nuestras historias sobre empatía, paciencia y superación del miedo para ayudar a niños de 3 a 12 años a reconocer sus emociones.',
      'Incluyen audiocuento calmante, preguntas de diálogo emocional y dinámicas plásticas para trabajar en casa o en orientación escolar.',
    ],
    practicalTips: [
      'Nombra la emoción que ves sin juzgar: "Veo que estás triste o nervioso".',
      'Usa la respiración pausada o el reloj de arena antes de hablar en un enfado.',
      'Dibuja cómo se siente hoy cada miembro de la familia usando colores.',
    ],
    catechesisNote:
      'Acompañar el mundo interior infantil fomenta la paz del corazón, el perdón y la gratitud.',
    relatedCategories: ['Empatía', 'Paciencia', 'Valentía'],
  },
];

export type ResolvedRoute =
  | { type: 'home' }
  | { type: 'catalog' }
  | { type: 'guide' }
  | { type: 'story'; story: Story }
  | { type: 'value'; valueInfo: ValueSeoInfo; stories: Story[] }
  | { type: 'belen' }
  | { type: 'coloring' }
  | { type: 'prayers' }
  | { type: 'about' }
  | { type: 'legal' }
  | { type: 'not-found' };

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const cleaned = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return cleaned || '/';
}

export function getStoryUrl(storyId: string): string {
  return `/cuento/${storyId}`;
}

export function getValueUrl(slugOrCategory: string): string {
  const slug = getValueSlug(slugOrCategory);
  return `/valores/${slug}`;
}

export function getStoriesForValue(info: ValueSeoInfo, allStories: Story[] = STORIES): Story[] {
  if (info.relatedCategories && info.relatedCategories.length > 0) {
    return allStories.filter((s) =>
      info.relatedCategories!.some((cat) => cat.toLowerCase() === s.value.toLowerCase())
    );
  }
  return allStories.filter((s) => s.value.toLowerCase() === info.category.toLowerCase());
}

export function resolveRoute(pathname: string, allStories: Story[] = STORIES): ResolvedRoute {
  const path = normalizePathname(pathname);

  if (path === '/') return { type: 'home' };
  if (path === '/cuentos') return { type: 'catalog' };
  if (path === '/guia-padres-docentes') return { type: 'guide' };
  if (path === '/sobre-nosotros' || path === '/sobre-el-autor') return { type: 'about' };
  if (path === '/belen-recortable') return { type: 'belen' };
  if (path === '/dibujos-para-colorear') return { type: 'coloring' };
  if (path === '/oraciones') return { type: 'prayers' };
  if (path === '/privacidad-y-aviso-legal') return { type: 'legal' };

  if (path.startsWith('/cuento/') || path.startsWith('/cuentos/')) {
    const slug = path.replace(/^\/cuentos?\//, '').replace(/\/$/, '');
    const found = allStories.find((s) => s.id === slug);
    if (found) {
      return { type: 'story', story: found };
    }
  }

  if (path.startsWith('/valores/')) {
    const slug = path.replace('/valores/', '').replace(/\/$/, '');
    const foundValue = VALUES_SEO.find((v) => v.slug === slug);
    if (foundValue) {
      return {
        type: 'value',
        valueInfo: foundValue,
        stories: getStoriesForValue(foundValue, allStories),
      };
    }
  }

  return { type: 'not-found' };
}

export interface StaticRouteMeta {
  path: string;
  priority: string;
  changefreq: string;
}

export function getAllStaticRoutes(): StaticRouteMeta[] {
  const routes: StaticRouteMeta[] = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/cuentos', priority: '0.95', changefreq: 'weekly' },
    { path: '/guia-padres-docentes', priority: '0.9', changefreq: 'monthly' },
    { path: '/belen-recortable', priority: '0.9', changefreq: 'weekly' },
    { path: '/dibujos-para-colorear', priority: '0.85', changefreq: 'weekly' },
    { path: '/oraciones', priority: '0.85', changefreq: 'weekly' },
    { path: '/sobre-nosotros', priority: '0.75', changefreq: 'monthly' },
    { path: '/privacidad-y-aviso-legal', priority: '0.4', changefreq: 'yearly' },
  ];

  for (const val of VALUES_SEO) {
    routes.push({
      path: `/valores/${val.slug}`,
      priority: '0.85',
      changefreq: 'monthly',
    });
  }

  for (const story of STORIES) {
    routes.push({
      path: `/cuento/${story.id}`,
      priority: '0.9',
      changefreq: 'monthly',
    });
  }

  return routes;
}

export interface RouteSeoMeta {
  title: string;
  description: string;
  canonical: string;
  ogType: 'website' | 'article';
  ogImage: string;
  ogImageAlt: string;
  robots: string;
  jsonLd: Record<string, unknown>;
}

function clampMeta(text: string, maxLen: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  const sliced = clean.slice(0, maxLen - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  const safe = lastSpace > Math.floor(maxLen * 0.6) ? sliced.slice(0, lastSpace) : sliced;
  return `${safe.replace(/[,.;:]+$/, '')}…`;
}

function buildStoryTitle(story: Story): string {
  const withValue = `${story.title} | Cuento de ${story.value}`;
  if (withValue.length <= 60) return withValue;
  const shortValue = `${story.title} | ${story.value}`;
  if (shortValue.length <= 60) return shortValue;
  return clampMeta(story.title, 60);
}

const ORG_SCHEMA = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Cuentos y Valores',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/assets/og-cuentos-y-valores.jpg`,
  },
  founder: {
    '@id': `${SITE_URL}/sobre-nosotros#person`,
  },
};

const AUTHOR_SCHEMA = {
  '@type': 'Person',
  '@id': `${SITE_URL}/sobre-nosotros#person`,
  name: 'Juancar Hidalgo',
  url: `${SITE_URL}/sobre-nosotros`,
  jobTitle: 'Autor de literatura infantil educativa y creador de Cuentos y Valores',
};

const WEBSITE_SCHEMA = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: 'Cuentos y Valores',
  description:
    'Cuentos infantiles ilustrados con valores para educar en casa y en el colegio, con audiocuento, preguntas de reflexión y láminas para colorear.',
  inLanguage: 'es',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
};

export function getRouteSeoMeta(pathname: string, allStories: Story[] = STORIES): RouteSeoMeta {
  const path = normalizePathname(pathname);
  const resolved = resolveRoute(path, allStories);
  const canonicalPath =
    resolved.type === 'story'
      ? `/cuento/${resolved.story.id}`
      : resolved.type === 'about'
        ? '/sobre-nosotros'
        : path;
  const canonical = canonicalPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${canonicalPath}`;

  if (resolved.type === 'story') {
    const { story } = resolved;
    const storyImage = story.coverImage.startsWith('/')
      ? `${SITE_URL}${story.coverImage}`
      : `${SITE_URL}/assets/og-cuentos-y-valores.jpg`;
    const title = buildStoryTitle(story);
    const description = clampMeta(
      `Cuento sobre ${story.value} (${story.ageRange}): ${story.summary.replace(/"/g, '')}`,
      148
    );

    return {
      title,
      description,
      canonical,
      ogType: 'article',
      ogImage: storyImage,
      ogImageAlt: `Ilustración infantil sobre la ${story.value.toLowerCase()} en el cuento ${story.title}`,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          ORG_SCHEMA,
          AUTHOR_SCHEMA,
          WEBSITE_SCHEMA,
          {
            '@type': ['Article', 'CreativeWork'],
            '@id': `${canonical}#creativework`,
            headline: `${story.title}: cuento infantil sobre la ${story.value}`,
            name: story.title,
            description: story.summary,
            abstract: story.moralLesson,
            author: { '@id': `${SITE_URL}/sobre-nosotros#person` },
            publisher: { '@id': `${SITE_URL}/#organization` },
            inLanguage: 'es',
            educationalUse: 'Lectura comprensiva y educación en valores en casa y aula',
            learningResourceType: 'Cuento infantil ilustrado con actividades',
            typicalAgeRange: story.ageRange,
            audience: {
              '@type': 'EducationalAudience',
              educationalRole: 'student',
              audienceType: `Niños de ${story.ageRange}, familias y docentes`,
            },
            about: {
              '@type': 'Thing',
              name: story.value,
              description: story.valueDescription,
            },
            image: storyImage,
            url: canonical,
            mainEntityOfPage: canonical,
            isAccessibleForFree: true,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Cuentos', item: `${SITE_URL}/cuentos` },
              {
                '@type': 'ListItem',
                position: 3,
                name: story.value,
                item: `${SITE_URL}/valores/${getValueSlug(story.value)}`,
              },
              { '@type': 'ListItem', position: 4, name: story.title, item: canonical },
            ],
          },
        ],
      },
    };
  }

  if (resolved.type === 'value') {
    const { valueInfo } = resolved;
    return {
      title: clampMeta(valueInfo.metaTitle, 60),
      description: clampMeta(valueInfo.metaDescription, 155),
      canonical,
      ogType: 'website',
      ogImage: `${SITE_URL}/assets/og-cuentos-y-valores.jpg`,
      ogImageAlt: valueInfo.headline,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          ORG_SCHEMA,
          WEBSITE_SCHEMA,
          {
            '@type': 'CollectionPage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            name: valueInfo.headline,
            description: valueInfo.metaDescription,
            about: { '@type': 'Thing', name: valueInfo.title },
            isPartOf: { '@id': `${SITE_URL}/#website` },
            inLanguage: 'es',
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Cuentos', item: `${SITE_URL}/cuentos` },
              { '@type': 'ListItem', position: 3, name: valueInfo.title, item: canonical },
            ],
          },
        ],
      },
    };
  }

  if (resolved.type === 'catalog') {
    const title = 'Catálogo de cuentos con valores por edad | Juancar Hidalgo';
    const description =
      'Explora cuentos infantiles ilustrados filtrados por valor y edad (3 a 12 años), con audiocuento, preguntas de reflexión y láminas gratis.';
    return {
      title: clampMeta(title, 60),
      description: clampMeta(description, 155),
      canonical,
      ogType: 'website',
      ogImage: `${SITE_URL}/assets/og-cuentos-y-valores.jpg`,
      ogImageAlt: 'Catálogo de cuentos infantiles ilustrados de Cuentos y Valores',
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          ORG_SCHEMA,
          WEBSITE_SCHEMA,
          {
            '@type': 'CollectionPage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            name: 'Catálogo completo de cuentos con valores',
            description,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            inLanguage: 'es',
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Catálogo de Cuentos', item: canonical },
            ],
          },
        ],
      },
    };
  }

  if (resolved.type === 'guide') {
    const title = 'Guía para padres y docentes | Cuentos y Valores';
    const description =
      'Guía práctica para trabajar cuentos con valores en casa y en clase de Infantil o Primaria mediante diálogo, audio y actividades plásticas.';
    return {
      title: clampMeta(title, 60),
      description: clampMeta(description, 155),
      canonical,
      ogType: 'article',
      ogImage: `${SITE_URL}/assets/og-cuentos-y-valores.jpg`,
      ogImageAlt: 'Guía práctica para padres y docentes de Cuentos y Valores',
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          ORG_SCHEMA,
          AUTHOR_SCHEMA,
          WEBSITE_SCHEMA,
          {
            '@type': ['Article', 'CreativeWork'],
            '@id': `${canonical}#guide`,
            headline: 'Guía práctica para educar con cuentos en casa y en el aula',
            description,
            author: { '@id': `${SITE_URL}/sobre-nosotros#person` },
            publisher: { '@id': `${SITE_URL}/#organization` },
            educationalUse: 'Orientación metodológica para familias y docentes',
            audience: { '@type': 'EducationalAudience', educationalRole: 'parent, teacher' },
            inLanguage: 'es',
            url: canonical,
            isAccessibleForFree: true,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Guía Padres y Docentes', item: canonical },
            ],
          },
        ],
      },
    };
  }

  if (resolved.type === 'belen') {
    const title = 'Belén recortable para niños | Gratis para imprimir';
    const description =
      'Descarga gratis nuestro Belén recortable en A4 con 16 figuras para montar en familia, clase de Religión o catequesis navideña.';
    return {
      title: clampMeta(title, 60),
      description: clampMeta(description, 155),
      canonical,
      ogType: 'article',
      ogImage: `${SITE_URL}/assets/belen_recortable.webp`,
      ogImageAlt: 'Ilustración infantil del Belén recortable con 16 figuras para imprimir',
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          ORG_SCHEMA,
          AUTHOR_SCHEMA,
          WEBSITE_SCHEMA,
          {
            '@type': 'HowTo',
            '@id': `${canonical}#howto`,
            name: 'Cómo recortar y montar el Belén recortable para niños',
            description,
            image: `${SITE_URL}/assets/belen_recortable.webp`,
            step: [
              { '@type': 'HowToStep', name: 'Recortar', text: 'Recorta cada figura por la línea discontinua.' },
              { '@type': 'HowToStep', name: 'Doblar', text: 'Dobla la pestaña blanca inferior hacia atrás.' },
              { '@type': 'HowToStep', name: 'Montar', text: 'Pega las solapas sobre cartón o cartulina base.' },
            ],
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Belén Recortable', item: canonical },
            ],
          },
        ],
      },
    };
  }

  if (resolved.type === 'coloring') {
    const title = 'Dibujos para colorear con valores | Láminas gratis';
    const description =
      'Descarga e imprime láminas infantiles para colorear gratis sobre empatía, honestidad, generosidad y amistad para casa o aula.';
    return {
      title: clampMeta(title, 60),
      description: clampMeta(description, 155),
      canonical,
      ogType: 'website',
      ogImage: `${SITE_URL}/assets/og-cuentos-y-valores.jpg`,
      ogImageAlt: 'Galería de dibujos para colorear con valores infantiles',
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          ORG_SCHEMA,
          WEBSITE_SCHEMA,
          {
            '@type': 'CollectionPage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            name: 'Dibujos para colorear con valores para niños',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            inLanguage: 'es',
          },
        ],
      },
    };
  }

  if (resolved.type === 'prayers') {
    const title = 'Oraciones infantiles cortas | Catequesis y familia';
    const description =
      'Oraciones dulces y breves para niños antes de dormir, al despertar, en la mesa y por la familia. Gratis para hogares y catequesis.';
    return {
      title: clampMeta(title, 60),
      description: clampMeta(description, 155),
      canonical,
      ogType: 'website',
      ogImage: `${SITE_URL}/assets/la-luz-de-nazaret.webp`,
      ogImageAlt: 'Oraciones infantiles cortas ilustradas para familias y catequesis',
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          ORG_SCHEMA,
          AUTHOR_SCHEMA,
          WEBSITE_SCHEMA,
          {
            '@type': 'CollectionPage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            name: 'Oraciones infantiles cortas para niños y catequesis',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            inLanguage: 'es',
          },
        ],
      },
    };
  }

  if (resolved.type === 'about') {
    const title = 'Sobre nosotros y enfoque pedagógico | Cuentos y Valores';
    const description =
      'Conoce a Juancar Hidalgo y el criterio pedagógico de Cuentos y Valores: relatos gratuitos para familias, escuelas y catequesis.';
    return {
      title: clampMeta(title, 60),
      description: clampMeta(description, 155),
      canonical,
      ogType: 'website',
      ogImage: `${SITE_URL}/assets/og-cuentos-y-valores.jpg`,
      ogImageAlt: 'Juancar Hidalgo y enfoque pedagógico de Cuentos y Valores',
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          ORG_SCHEMA,
          AUTHOR_SCHEMA,
          WEBSITE_SCHEMA,
          {
            '@type': 'AboutPage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            mainEntity: { '@id': `${SITE_URL}/sobre-nosotros#person` },
            inLanguage: 'es',
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Sobre Nosotros', item: canonical },
            ],
          },
        ],
      },
    };
  }

  if (resolved.type === 'legal') {
    const title = 'Privacidad y aviso legal | Cuentos y Valores';
    const description =
      'Aviso legal, política de privacidad, licencia educativa gratuita y normas de uso seguro infantil en Cuentos y Valores.';
    return {
      title: clampMeta(title, 60),
      description: clampMeta(description, 155),
      canonical,
      ogType: 'website',
      ogImage: `${SITE_URL}/assets/og-cuentos-y-valores.jpg`,
      ogImageAlt: 'Aviso legal y privacidad de Cuentos y Valores',
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          ORG_SCHEMA,
          WEBSITE_SCHEMA,
          {
            '@type': 'WebPage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            name: 'Privacidad y aviso legal',
            inLanguage: 'es',
          },
        ],
      },
    };
  }

  const isNotFound = resolved.type === 'not-found';
  const homeTitle = 'Cuentos y Valores | Cuentos infantiles para educar';
  const homeDescription =
    'Lee cuentos infantiles ilustrados con valores y descarga audiocuentos y láminas para colorear gratis en casa o el colegio.';

  return {
    title: isNotFound ? 'Página no encontrada | Cuentos y Valores' : homeTitle,
    description: homeDescription,
    canonical: `${SITE_URL}/`,
    ogType: 'website',
    ogImage: `${SITE_URL}/assets/og-cuentos-y-valores.jpg`,
    ogImageAlt: 'Ilustración infantil de portada de Cuentos y Valores por Juancar Hidalgo',
    robots: isNotFound ? 'noindex, follow' : 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        ORG_SCHEMA,
        AUTHOR_SCHEMA,
        WEBSITE_SCHEMA,
        {
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/#webpage`,
          url: `${SITE_URL}/`,
          name: 'Cuentos infantiles con valores para educar en casa y en el colegio',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          audience: {
            '@type': 'EducationalAudience',
            educationalRole: 'parent, teacher',
          },
          inLanguage: 'es',
        },
        {
          '@type': 'FAQPage',
          '@id': `${SITE_URL}/#faq`,
          mainEntity: HOME_FAQS.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ],
    },
  };
}
