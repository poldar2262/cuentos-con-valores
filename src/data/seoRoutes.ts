import { STORIES } from './stories';
import { Story, ValueCategory } from '../types';

export const SITE_URL = 'https://www.cuentosyvalores.es';

export interface ValueSeoInfo {
  slug: string;
  category: Exclude<ValueCategory, 'Todos'>;
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

export function getValueSlug(category: Exclude<ValueCategory, 'Todos'>): string {
  return VALUE_SLUG_MAP[category];
}

export const VALUES_SEO: ValueSeoInfo[] = [
  {
    slug: 'honestidad',
    category: 'Honestidad',
    title: 'Honestidad',
    metaTitle: 'Cuentos infantiles sobre la honestidad | Valores para niños',
    metaDescription:
      'Cuentos infantiles cortos sobre la honestidad y el valor de decir la verdad, con audiocuento, preguntas de reflexión y dibujo para colorear gratis.',
    headline: 'Cuentos sobre la Honestidad para Niños',
    subtitle:
      'Historias cercanas para ayudar a los niños a decir la verdad con valentía, asumir sus errores y cuidar la confianza familiar y escolar.',
    badgeColor: 'text-amber-900',
    badgeBg: 'bg-amber-100 border-amber-300',
    introParagraphs: [
      'Educar en la honestidad durante la infancia es mucho más que pedir a los niños que no digan mentiras. Significa crear un clima de afecto donde equivocarse o sufrir un accidente no despierte miedo al castigo, sino el deseo sincero de dar la cara y reparar lo que se haya estropeado.',
      'A través de relatos cotidianos en el aula o en casa —como cuando Mateo rompe sin querer el antiguo telescopio de ciencias—, los niños comprenden qué ocurre por dentro cuando sentimos ese "nudo en la barriga" antes de confesar un fallo, y descubren la paz que llega después de ser sinceros.',
      'Estos cuentos sobre la honestidad están diseñados para leerse en voz alta en familia, trabajarse en tutorías de Educación Infantil y Primaria o acompañarse en sesiones de catequesis infantil sobre la verdad y la coherencia del corazón.',
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
    metaTitle: 'Cuentos infantiles sobre la valentía | Vencer el miedo',
    metaDescription:
      'Lee cuentos sobre la valentía para niños de 4 a 11 años. Aprende con Valerio y Elara que el valor consiste en ayudar y actuar a pesar del miedo.',
    headline: 'Cuentos sobre la Valentía y Superación del Miedo',
    subtitle:
      'Relatos llenos de ternura para descubrir que ser valiente no significa no sentir miedo, sino hacer lo correcto para proteger y ayudar.',
    badgeColor: 'text-rose-900',
    badgeBg: 'bg-rose-100 border-rose-300',
    introParagraphs: [
      'Muchos niños creen que ser valiente significa no asustarse nunca, por lo que se frustran o se sienten débiles cuando algo les da temor. Nuestros cuentos sobre la valentía desmontan ese mito con delicadeza: sentir miedo es humano, pero el verdadero valor aparece cuando damos un paso al frente para cuidar de un amigo o hacer el bien.',
      'Mediante aventuras simbólicas llenas de emoción, como el viaje de Valerio y Elara por el Desfiladero de las Sombras, los pequeños lectores comprueban que el coraje cotidiano nace de la compasión, la amistad y la confianza.',
      'Después de escuchar el audiocuento o leerlo en pantalla, las preguntas de diálogo y la lámina para colorear permiten hablar sin tabúes sobre los miedos infantiles nocturnos, la timidez escolar o el respeto ante situaciones nuevas.',
    ],
    practicalTips: [
      'Normaliza el miedo explicando que incluso las personas valientes sienten nervios.',
      'Recuerda pequeños momentos en los que el niño superó algo difícil.',
      'Anima a usar el dibujo para colorear mientras conversáis sobre qué le da fuerza.',
    ],
    catechesisNote:
      'Ideal para trabajar en familia y catequesis la fortaleza interior, la confianza en Dios y el coraje puesto al servicio del prójimo.',
  },
  {
    slug: 'empatia',
    category: 'Empatía',
    title: 'Empatía',
    metaTitle: 'Cuentos infantiles sobre la empatía | Educación emocional',
    metaDescription:
      'Cuentos ilustrados sobre la empatía para enseñar a los niños a escuchar, acompañar emociones tristes y cuidar de sus compañeros en el colegio.',
    headline: 'Cuentos sobre la Empatía y Escucha Emocional',
    subtitle:
      'Historias pensadas para entrenar la mirada atenta en el patio del colegio, aprender a validar las emociones ajenas y acompañar sin juzgar.',
    badgeColor: 'text-sky-900',
    badgeBg: 'bg-sky-100 border-sky-300',
    introParagraphs: [
      'La empatía es una de las competencias emocionales más transformadoras de la niñez. Cuando un niño aprende a detener su propio juego para mirar a un compañero callado o entristecido, el aula y el hogar se convierten en lugares seguros y fraternos.',
      'En historias ambientadas en el recreo como El Mapa de los Sentimientos, los niños observan cómo Sofía y Lucas dejan a un lado su cohete de cartón para escuchar la preocupación de Tomás por su abuelo enfermo. No intentan forzar su alegría, sino ofrecerle compañía verdadera.',
      'Este recurso resulta especialmente útil para maestros de Primaria, orientadores escolares y catequistas que buscan dinámicas sencillas contra la exclusión infantil y en favor del buen trato.',
    ],
    practicalTips: [
      'Practica en clase o casa el juego de adivinar cómo se siente alguien mirando su gesto.',
      'Enseña frases de acompañamiento amable: "¿Quieres contármelo?" o "Me quedo contigo".',
      'Evita minimizar la tristeza infantil con prisas; valida primero la emoción.',
    ],
    catechesisNote:
      'La empatía refleja de forma concreta la compasión cristiana y la regla de oro de tratar a los demás como deseamos ser tratados.',
  },
  {
    slug: 'generosidad',
    category: 'Generosidad',
    title: 'Generosidad',
    metaTitle: 'Cuentos sobre la generosidad y compartir | Cuentos y Valores',
    metaDescription:
      'Descubre cuentos infantiles sobre la generosidad, el compartir panes y peces y no dejar a nadie jugando solo. Lectura, audio y láminas gratis.',
    headline: 'Cuentos sobre la Generosidad para Niños',
    subtitle:
      'Relatos infantiles e inspirados en la bondad de Jesús de Nazaret para descubrir que compartir tiempo, juegos y cariño multiplica la alegría.',
    badgeColor: 'text-emerald-900',
    badgeBg: 'bg-emerald-100 border-emerald-300',
    introParagraphs: [
      'La generosidad infantil va mucho más allá de prestar un juguete por obligación. Nace cuando el corazón se ensancha para incluir al que observa desde la valla o para ofrecer lo poco que tenemos confiando en que el bien se multiplica.',
      'En esta sección reunimos cuentos cotidianos sobre inclusión en el juego —como Una Misión para Todos— junto con propuestas bíblicas ilustradas pensadas para catequesis y familias cristianas como La Luz de Nazaret, donde un niño comparte cinco panes y dos peces.',
      'Cada cuento incluye texto íntegro adaptado a lectores de 4 a 10 años, preguntas de diálogo familiar y láminas en blanco y negro listas para imprimir y colorear en casa, en clase de Religión o en parroquia.',
    ],
    practicalTips: [
      'Distingue entre "dejar un objeto por obligación" e invitar con alegría a participar.',
      'Propón pequeños gestos diarios de generosidad invisible en casa o en el colegio.',
      'Colorea la lámina del cuento y escribe detrás un gesto bonito para alguien de la familia.',
    ],
    catechesisNote:
      'Un pilar fundamental para sesiones de catequesis infantil, Adviento, Cuaresma y Primera Comunión sobre el mandamiento del amor y el compartir.',
  },
  {
    slug: 'paciencia',
    category: 'Paciencia',
    title: 'Paciencia',
    metaTitle: 'Cuentos sobre la paciencia para niños | Calma y constancia',
    metaDescription:
      'Cuento ilustrado sobre la paciencia y saber esperar sin impacientarse. Ideal para leer antes de dormir con audio relajante y ficha para colorear.',
    headline: 'Cuentos sobre la Paciencia y la Calma Interior',
    subtitle:
      'Historias tranquilas para ayudar a los niños impacientes a disfrutar de la espera, respirar hondo y respetar el ritmo natural de las cosas.',
    badgeColor: 'text-teal-900',
    badgeBg: 'bg-teal-100 border-teal-300',
    introParagraphs: [
      'Vivimos rodeados de pantallas rápidas y recompensas inmediatas, por lo que cultivar la paciencia en los niños es hoy un auténtico reto educativo. Saber esperar no significa aburrirse en silencio, sino aprender a mirar el mundo con atención mientras llega el momento oportuno.',
      'En Mateo y el Secreto de la Paciencia Estelar, el maestro Don Julián utiliza un sencillo reloj de arena dorado para mostrar que las estrellas y los cometas necesitan oscuridad y calma para brillar. Si nos rendimos por prisa, nos perdemos lo más asombroso.',
      'Leer este cuento antes de dormir ayuda a bajar las revoluciones del día, mejora la autorregulación infantil y abre conversaciones serenas sobre la constancia en el estudio y la convivencia.',
    ],
    practicalTips: [
      'Usa metáforas visuales como el reloj de arena o plantar una semilla en un vaso.',
      'Acompaña la lectura nocturna con respiración pausada mientras escucháis el audiocuento.',
      'Celebra los momentos en los que el niño espera su turno con tranquilidad.',
    ],
    catechesisNote:
      'Favorece el cultivo del silencio interior, la escucha serena y la esperanza alegre tan valoradas en la educación espiritual infantil.',
  },
  {
    slug: 'amistad',
    category: 'Amistad',
    title: 'Amistad',
    metaTitle: 'Cuentos infantiles sobre la amistad | Lealtad y juego',
    metaDescription:
      'Cuentos cortos ilustrados sobre la verdadera amistad para niños. Descubre con Leo y Maya cómo la imaginación y el respeto unen a los amigos.',
    headline: 'Cuentos sobre la Amistad Verdadera para Niños',
    subtitle:
      'Relatos alegres sobre escuchar ideas ajenas, coordinarse en el juego y transformar una tarde de lluvia en recuerdos inolvidables.',
    badgeColor: 'text-indigo-900',
    badgeBg: 'bg-indigo-100 border-indigo-300',
    introParagraphs: [
      'La amistad en la infancia es el primer laboratorio donde los niños practican el respeto, los turnos, el perdón y la alegría compartida. Un buen amigo no es quien siempre hace lo que uno quiere, sino quien rema al mismo compás incluso cuando no todo sale perfecto.',
      'En Una Misión para Dos, Leo y Maya convierten una caja de cartón vacía en una nave espacial durante una tarde lluviosa. Cuando Leo intenta girar el timón por su cuenta y la nave casi vuelca, aprende que escuchar a su amiga hace que el viaje llegue mucho más lejos.',
      'Además de leer la historia completa y disfrutar del audiocuento, podéis descargar la lámina para colorear de los dos amigos y usarla como tarjeta de regalo para un compañero especial.',
    ],
    practicalTips: [
      'Hablad sobre qué cosas hacen que alguien sea un buen amigo además de compartir juguetes.',
      'Practica cómo pedir perdón o ponerse de acuerdo cuando dos amigos quieren mandar.',
      'Recortad o regalad el dibujo coloreado del cuento a un amigo del colegio.',
    ],
    catechesisNote:
      'Ideal para fomentar la fraternidad, la acogida y el respeto mutuo en grupos infantiles escolares y parroquiales.',
  },
  {
    slug: 'cooperacion',
    category: 'Cooperación',
    title: 'Cooperación',
    metaTitle: 'Cuentos sobre la cooperación y trabajo en equipo para niños',
    metaDescription:
      'Recursos y cuentos infantiles sobre cooperación, amistad y generosidad para trabajar el equipo en clase y en familia.',
    headline: 'Cuentos sobre Cooperación y Trabajo en Equipo',
    subtitle:
      'Historias para enseñar a niños de infantil y primaria que remar juntos multiplica las fuerzas y transforma los retos en juegos compartidos.',
    badgeColor: 'text-cyan-900',
    badgeBg: 'bg-cyan-100 border-cyan-300',
    introParagraphs: [
      'Aprender a cooperar permite a los niños descubrir que cada persona aporta un talento distinto al grupo. Frente a la competitividad excesiva, los relatos de trabajo en equipo demuestran que todos ganamos cuando coordinamos esfuerzos y cuidamos del ritmo del compañero.',
      'En nuestras aventuras de la flota espacial de cartón y en la reparación conjunta del telescopio del aula, niños y adultos suman manos, cinta adhesiva, tizas e imaginación para alcanzar metas imposibles en solitario.',
      'Recomendamos combinar estas lecturas con retos cooperativos en el aula o en familia, como construir un portal navideño recortable entre varios hermanos o montar un mural colectivo.',
    ],
    practicalTips: [
      'Asigna pequeñas responsabilidades complementarias durante una manualidad en grupo.',
      'Destaca cómo cada personaje contribuye con algo único dentro de la historia.',
      'Fomenta actividades sin ganadores ni perdedores como el Belén recortable en equipo.',
    ],
    catechesisNote:
      'Ayuda a comprender el sentido de comunidad y corresponsabilidad desde edades tempranas.',
  },
];

export type ResolvedRoute =
  | { type: 'home' }
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
  const cleaned = pathname.split('?')[0].split('#')[0];
  return cleaned.endsWith('/') ? cleaned : `${cleaned}/`;
}

export function getStoriesForValue(info: ValueSeoInfo, allStories: Story[] = STORIES): Story[] {
  if (info.category === 'Cooperación') {
    return allStories.filter((s) =>
      ['Amistad', 'Generosidad', 'Empatía', 'Cooperación'].includes(s.value)
    );
  }
  return allStories.filter((s) => s.value.toLowerCase() === info.category.toLowerCase());
}

export function resolveRoute(pathname: string, allStories: Story[] = STORIES): ResolvedRoute {
  const path = normalizePathname(pathname);

  if (path === '/') {
    return { type: 'home' };
  }
  if (path === '/belen-recortable/') {
    return { type: 'belen' };
  }
  if (path === '/dibujos-para-colorear/') {
    return { type: 'coloring' };
  }
  if (path === '/oraciones/') {
    return { type: 'prayers' };
  }
  if (path === '/sobre-el-autor/') {
    return { type: 'about' };
  }
  if (path === '/privacidad-y-aviso-legal/') {
    return { type: 'legal' };
  }

  if (path.startsWith('/cuentos/')) {
    const slug = path.replace('/cuentos/', '').replace(/\/$/, '');
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
    { path: '/belen-recortable/', priority: '0.95', changefreq: 'weekly' },
    { path: '/dibujos-para-colorear/', priority: '0.9', changefreq: 'weekly' },
    { path: '/oraciones/', priority: '0.9', changefreq: 'weekly' },
    { path: '/sobre-el-autor/', priority: '0.7', changefreq: 'monthly' },
    { path: '/privacidad-y-aviso-legal/', priority: '0.4', changefreq: 'yearly' },
  ];

  for (const story of STORIES) {
    routes.push({
      path: `/cuentos/${story.id}/`,
      priority: '0.9',
      changefreq: 'monthly',
    });
  }

  for (const val of VALUES_SEO) {
    routes.push({
      path: `/valores/${val.slug}/`,
      priority: '0.85',
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
    '@id': `${SITE_URL}/sobre-el-autor/#person`,
  },
};

const AUTHOR_SCHEMA = {
  '@type': 'Person',
  '@id': `${SITE_URL}/sobre-el-autor/#person`,
  name: 'Juancar Hidalgo',
  url: `${SITE_URL}/sobre-el-autor/`,
  jobTitle: 'Autor de literatura infantil educativa y creador de Cuentos y Valores',
};

const WEBSITE_SCHEMA = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: 'Cuentos y Valores',
  description:
    'Cuentos infantiles ilustrados con valores, audiocuentos, oraciones y actividades educativas gratuitas para familias, colegios y catequesis.',
  inLanguage: 'es',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
};

export function getRouteSeoMeta(pathname: string): RouteSeoMeta {
  const path = normalizePathname(pathname);
  const resolved = resolveRoute(path);
  const canonical = `${SITE_URL}${path}`;

  if (resolved.type === 'story') {
    const { story } = resolved;
    const storyImage = story.coverImage.startsWith('/')
      ? `${SITE_URL}${story.coverImage}`
      : `${SITE_URL}/assets/og-cuentos-y-valores.jpg`;

    return {
      title: `${story.title} | Cuento sobre la ${story.value}`,
      description: `${story.summary} Incluye texto completo ilustrado, audiocuento narrado, preguntas de reflexión y dibujo para colorear gratis.`,
      canonical,
      ogType: 'article',
      ogImage: storyImage,
      ogImageAlt: `Ilustración del cuento infantil ${story.title} sobre ${story.value}`,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          ORG_SCHEMA,
          AUTHOR_SCHEMA,
          WEBSITE_SCHEMA,
          {
            '@type': 'Book',
            '@id': `${canonical}#book`,
            name: story.title,
            author: { '@id': `${SITE_URL}/sobre-el-autor/#person` },
            publisher: { '@id': `${SITE_URL}/#organization` },
            inLanguage: 'es',
            genre: `Cuento infantil sobre la ${story.value}`,
            typicalAgeRange: story.ageRange,
            description: story.summary,
            image: storyImage,
            url: canonical,
            isAccessibleForFree: true,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
              {
                '@type': 'ListItem',
                position: 2,
                name: story.value,
                item: `${SITE_URL}/valores/${VALUE_SLUG_MAP[story.value === 'Todos' ? 'Honestidad' : story.value] || 'honestidad'}/`,
              },
              { '@type': 'ListItem', position: 3, name: story.title, item: canonical },
            ],
          },
        ],
      },
    };
  }

  if (resolved.type === 'value') {
    const { valueInfo } = resolved;
    return {
      title: valueInfo.metaTitle,
      description: valueInfo.metaDescription,
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
            name: valueInfo.metaTitle,
            description: valueInfo.metaDescription,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            inLanguage: 'es',
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: `Valor: ${valueInfo.title}`, item: canonical },
            ],
          },
        ],
      },
    };
  }

  if (resolved.type === 'belen') {
    return {
      title: 'Belén recortable para niños | Gratis para imprimir y armar',
      description:
        'Descarga gratis nuestro Belén recortable para imprimir en A4 con 16 figuras (Portal, Jesús, María, José, Reyes Magos y pastores). Ideal para familia, colegio y catequesis.',
      canonical,
      ogType: 'article',
      ogImage: `${SITE_URL}/assets/belen_recortable.webp`,
      ogImageAlt: 'Lámina completa del Belén recortable para niños con figuras para imprimir',
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
            description:
              'Guía paso a paso para imprimir en cartulina, recortar y armar en 3D un pesebre navideño infantil con 16 piezas.',
            image: `${SITE_URL}/assets/belen_recortable.webp`,
            supply: [
              { '@type': 'HowToSupply', name: 'Cartulina blanca de 180g-200g o papel A4' },
              { '@type': 'HowToSupply', name: 'Pegamento de barra y base de cartón' },
            ],
            tool: [{ '@type': 'HowToTool', name: 'Tijeras escolares de punta redonda' }],
            step: [
              { '@type': 'HowToStep', name: 'Recortar las figuras', text: 'Recorta por la línea discontinua exterior con tijeras infantiles.' },
              { '@type': 'HowToStep', name: 'Doblar las pestañas', text: 'Dobla hacia atrás la solapa blanca inferior para formar una base de apoyo de 90 grados.' },
              { '@type': 'HowToStep', name: 'Pegar sobre la base', text: 'Aplica pegamento en la solapa y coloca las figuras en tu escenario navideño.' },
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
    return {
      title: 'Dibujos para colorear con valores para niños | Láminas gratis',
      description:
        'Descarga e imprime láminas infantiles para colorear gratis sobre honestidad, amistad, generosidad y cuentos bíblicos. Ideal para hogar, escuela y catequesis.',
      canonical,
      ogType: 'website',
      ogImage: `${SITE_URL}/assets/og-cuentos-y-valores.jpg`,
      ogImageAlt: 'Galería de dibujos para colorear de Cuentos y Valores',
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
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Dibujos para Colorear', item: canonical },
            ],
          },
        ],
      },
    };
  }

  if (resolved.type === 'prayers') {
    return {
      title: 'Oraciones infantiles cortas para niños | Catequesis y familia',
      description:
        'Oraciones dulces y breves para niños antes de dormir, al despertar, en la mesa y por la familia. Recurso gratuito para hogares cristianos y catequesis.',
      canonical,
      ogType: 'website',
      ogImage: `${SITE_URL}/assets/la-luz-de-nazaret.webp`,
      ogImageAlt: 'Oraciones cortas para niños y recursos cristianos de Cuentos y Valores',
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
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Oraciones para Niños', item: canonical },
            ],
          },
        ],
      },
    };
  }

  if (resolved.type === 'about') {
    return {
      title: 'Sobre Juancar Hidalgo y el proyecto | Cuentos y Valores',
      description:
        'Conoce a Juancar Hidalgo, creador de Cuentos y Valores: misión educativa, criterios pedagógicos, enfoque familiar y recursos cristianos gratuitos.',
      canonical,
      ogType: 'website',
      ogImage: `${SITE_URL}/assets/og-cuentos-y-valores.jpg`,
      ogImageAlt: 'Juancar Hidalgo — Cuentos y Valores',
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          ORG_SCHEMA,
          AUTHOR_SCHEMA,
          WEBSITE_SCHEMA,
          {
            '@type': 'ProfilePage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            mainEntity: { '@id': `${SITE_URL}/sobre-el-autor/#person` },
            inLanguage: 'es',
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Sobre el Autor', item: canonical },
            ],
          },
        ],
      },
    };
  }

  if (resolved.type === 'legal') {
    return {
      title: 'Política de privacidad, aviso legal y seguridad | Cuentos y Valores',
      description:
        'Aviso legal, política de privacidad, uso educativo gratuito y normas de seguridad infantil para el asistente Valerio en Cuentos y Valores.',
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
            name: 'Política de privacidad y aviso legal',
            inLanguage: 'es',
          },
        ],
      },
    };
  }

  const isNotFound = resolved.type === 'not-found';
  return {
    title: isNotFound
      ? 'Página no encontrada | Cuentos y Valores'
      : 'Cuentos con valores para niños | Ilustrados y educativos',
    description:
      'Lee cuentos infantiles ilustrados con valores y descarga actividades educativas para niños. Recursos ideales para familias, colegios y catequesis. ¡Explóralos!',
    canonical: `${SITE_URL}/`,
    ogType: 'website',
    ogImage: `${SITE_URL}/assets/og-cuentos-y-valores.jpg`,
    ogImageAlt: 'Ilustración de portada de Cuentos y Valores con cuentos infantiles educativos',
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
          name: 'Cuentos con valores para niños | Ilustrados y educativos',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: {
            '@type': 'Thing',
            name: 'Educación en valores y recursos cristianos mediante cuentos infantiles ilustrados',
          },
          audience: {
            '@type': 'EducationalAudience',
            educationalRole: 'parent, teacher',
          },
          inLanguage: 'es',
        },
        {
          '@type': 'FAQPage',
          '@id': `${SITE_URL}/#faq`,
          mainEntity: [
            {
              '@type': 'Question',
              name: '¿Los cuentos ilustrados y las láminas para colorear son gratuitos?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Sí, el 100% de los cuentos con valores, los audiocuentos narrados, las oraciones infantiles, el Belén recortable y las láminas para colorear son de libre acceso y gratuitos para familias, docentes y catequistas.',
              },
            },
            {
              '@type': 'Question',
              name: '¿Para qué edades están recomendados estos cuentos infantiles?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'La colección acompaña desde los 3 hasta los 12 años: historias breves y visuales para Infantil (3-5 años), relatos con moraleja para primeros lectores (6-8 años) y narraciones reflexivas para Primaria (9-12 años).',
              },
            },
            {
              '@type': 'Question',
              name: '¿Cómo puedo usar los cuentos y actividades en el aula o en familia?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Cada historia combina lectura HTML completa, audio narrado, preguntas de reflexión y un dibujo descargable para trabajar la virtud mediante conversación y creatividad.',
              },
            },
            {
              '@type': 'Question',
              name: '¿Es seguro el contenido generado por Valerio para los niños?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Está diseñado con criterios pedagógicos estrictos para redactar historias amables y libres de violencia centradas en virtudes positivas. Como en cualquier asistente basado en IA, recomendamos la supervisión de un adulto durante su uso.',
              },
            },
          ],
        },
      ],
    },
  };
}
