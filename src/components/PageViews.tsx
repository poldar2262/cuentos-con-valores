import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  GraduationCap,
  Heart,
  HelpCircle,
  Home,
  Mail,
  MessageCircle,
  Palette,
  Scissors,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from 'lucide-react';
import { Story } from '../types';
import {
  VALUES_SEO,
  ValueSeoInfo,
  getStoryUrl,
  getValueSlug,
  getValueUrl,
} from '../data/seoRoutes';
import { AudioPlayer } from './AudioPlayer';
import { StoryCard } from './StoryCard';
import { DownloadsSection } from './DownloadsSection';
import { BelenRecortableSection } from './BelenRecortableSection';
import { PrayersSection } from './PrayersSection';

interface BreadcrumbProps {
  items: { label: string; to?: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav
      aria-label="Ruta de navegación"
      className="mb-6 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-600 font-semibold"
    >
      <Link to="/" className="inline-flex items-center gap-1 hover:text-amber-700 transition-colors">
        <Home className="w-3.5 h-3.5 text-amber-600" />
        <span>Inicio</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={`${item.label}-${idx}`}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {item.to ? (
            <Link to={item.to} className="hover:text-amber-700 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-bold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

/* ============================================================
   1. FICHA INDIVIDUAL DE CUENTO (/cuento/:slugCuento)
   ============================================================ */
interface StoryDetailPageProps {
  story: Story;
  allStories: Story[];
  onOpenReaderModal: (story: Story) => void;
  onOpenColoring: (story: Story) => void;
}

export const StoryDetailPage: React.FC<StoryDetailPageProps> = ({
  story,
  allStories,
  onOpenReaderModal,
  onOpenColoring,
}) => {
  const fullText = story.pages.map((p) => p.text).join(' ');
  const valueSlug = getValueSlug(story.value === 'Todos' ? 'Honestidad' : story.value);
  const relatedStories = allStories.filter((s) => s.id !== story.id).slice(0, 3);
  const reflectionQuestions = story.discussionQuestions.slice(0, 3);
  const practicalActivityText =
    story.practicalActivity ||
    `Después de leer "${story.title}", comentad una situación real de esta semana donde practicar la ${story.value.toLowerCase()} y completad juntos la lámina para colorear de ${story.coloringSheet.characterName}.`;

  const handleDownloadTxt = () => {
    try {
      const header = `CUENTO INFANTIL CON VALORES: ${story.title.toUpperCase()}\nValor principal: ${story.value} | Edad recomendada: ${story.ageRange} | Tiempo de lectura: ${story.readingTime}\nAutor: ${story.author || 'Juancar Hidalgo'}\n${'='.repeat(60)}\n\n`;
      const body = story.pages
        .map((p) => `Escena ${p.pageNumber}:\n${p.text}\n`)
        .join('\n');
      const moral = `\n${'='.repeat(60)}\nMORALEJA EN UNA FRASE:\n${story.moralLesson}\n\nPREGUNTAS PARA REFLEXIONAR DESPUÉS DE LEER:\n${reflectionQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\nACTIVIDAD PRÁCTICA PARA CASA O EL AULA:\n${practicalActivityText}\n\nFuente: https://cuentosyvalores.es${getStoryUrl(story.id)}\n`;
      const blob = new Blob([header + body + moral], {
        type: 'text/plain;charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${story.id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error al descargar cuento en texto:', err);
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Cuentos', to: '/cuentos' },
          { label: story.value, to: `/valores/${valueSlug}` },
          { label: story.title },
        ]}
      />

      <article className="bg-white rounded-3xl border-2 border-amber-200/80 shadow-md overflow-hidden">
        {/* Top Story Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <div className="md:col-span-5 bg-amber-50/70 relative aspect-[4/3] md:aspect-auto">
            <img
              src={story.coverImage}
              alt={`Ilustración infantil sobre la ${story.value.toLowerCase()} en el cuento ${story.title}`}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Link
                  to={`/valores/${valueSlug}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${story.valueBadgeBg} ${story.valueBadgeColor} ${story.valueBorderColor}`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current opacity-80" />
                  Valor: {story.value}
                </Link>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  <Users className="w-3.5 h-3.5 text-amber-500" />
                  {story.ageRange}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  {story.readingTime}
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                {story.title}: cuento infantil sobre la {story.value}
              </h1>

              <p className="mt-2 text-xs sm:text-sm font-semibold text-amber-700">
                Por{' '}
                <Link to="/sobre-nosotros" className="underline hover:text-amber-900">
                  {story.author || 'Juancar Hidalgo'}
                </Link>
              </p>

              <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                {story.summary}
              </p>

              {/* Ficha resumen inicial estructurada en HTML (<dl>) para extracción GEO e IA */}
              <aside
                aria-label="Ficha pedagógica del cuento"
                className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200"
              >
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <dt className="font-bold text-amber-900 uppercase tracking-wide text-[11px]">
                      Valor principal
                    </dt>
                    <dd className="font-semibold text-slate-900">{story.value}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-amber-900 uppercase tracking-wide text-[11px]">
                      Edad recomendada
                    </dt>
                    <dd className="font-semibold text-slate-900">{story.ageRange}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-amber-900 uppercase tracking-wide text-[11px]">
                      Tiempo de lectura
                    </dt>
                    <dd className="font-semibold text-slate-900">{story.readingTime}</dd>
                  </div>
                  <div className="sm:col-span-2 pt-1 border-t border-amber-200/70">
                    <dt className="font-bold text-amber-900 uppercase tracking-wide text-[11px]">
                      Moraleja en una frase
                    </dt>
                    <dd className="font-medium text-slate-800 italic mt-0.5">
                      «{story.moralLesson}»
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>

            <div className="mt-6 space-y-4">
              <AudioPlayer
                id={`page-${story.id}`}
                audioUrl={story.audioUrl}
                durationLabel={story.audioDuration}
                storyTitle={story.title}
                storyFullText={fullText}
              />

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => onOpenReaderModal(story)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Abrir Modo Libro</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenColoring(story)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer transition-colors"
                >
                  <Palette className="w-4 h-4" />
                  <span>Colorear Lámina</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadTxt}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Texto (.txt)</span>
                </button>
                {story.pdfUrl && (
                  <a
                    href={story.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>PDF Original</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full Story Body with semantic headings */}
        <section
          aria-label="Texto completo del cuento"
          className="p-6 sm:p-10 border-t border-amber-100 bg-amber-50/20"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              Lectura completa del cuento ({story.pages.length} escenas)
            </h2>

            <div className="space-y-6">
              {story.pages.map((page) => (
                <section
                  key={page.pageNumber}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-200/70 shadow-2xs"
                >
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-700 mb-2">
                    Escena {page.pageNumber}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-serif">
                    {page.text}
                  </p>
                  <p className="mt-3 text-xs text-slate-500 italic border-t border-slate-100 pt-2">
                    Ilustración: {page.illustrationDescription}
                  </p>
                </section>
              ))}
            </div>

            {/* Obligatory GEO Closing Blocks: 3 Open Reflection Questions + Practical Activity */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="p-6 rounded-3xl bg-sky-50 border-2 border-sky-200">
                <h2 className="font-display text-xl font-bold text-sky-950 flex items-center gap-2 mb-3">
                  <MessageCircle className="w-5 h-5 text-sky-600 shrink-0" />
                  <span>Preguntas para reflexionar después de leer</span>
                </h2>
                <ol className="space-y-2.5 list-decimal list-inside text-sm text-slate-700 leading-relaxed">
                  {reflectionQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ol>
              </section>

              <section className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-200">
                <h2 className="font-display text-xl font-bold text-emerald-950 flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>Actividad práctica para casa o el aula</span>
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  {practicalActivityText}
                </p>
                <Link
                  to="/guia-padres-docentes"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline"
                >
                  <span>Ver más dinámicas en la Guía para Padres y Docentes →</span>
                </Link>
              </section>
            </div>

            {/* Coloring Sheet Preview CTA */}
            {story.coloringSheet.lineartImage && (
              <div className="mt-10 p-6 rounded-3xl bg-white border-2 border-sky-200 shadow-xs flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={story.coloringSheet.lineartImage}
                  alt={`Ilustración infantil para colorear sobre la ${story.value.toLowerCase()} del cuento ${story.title}`}
                  width={400}
                  height={535}
                  loading="lazy"
                  className="w-40 h-40 object-contain rounded-2xl border border-slate-200 bg-white shrink-0"
                />
                <div className="space-y-3 text-center sm:text-left">
                  <h2 className="font-display text-xl font-bold text-slate-900">
                    Lámina para Colorear: {story.coloringSheet.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Completa la lectura con la actividad plástica de {story.coloringSheet.characterName}. Puedes pintarla online o descargarla gratis en formato A4.
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenColoring(story)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm cursor-pointer transition-colors"
                  >
                    <Palette className="w-4 h-4" />
                    <span>Abrir Estudio para Colorear</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </article>

      {/* Related Stories */}
      <section className="mt-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Otros cuentos con valores recomendados
          </h2>
          <Link
            to="/cuentos"
            className="text-sm font-bold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ver catálogo completo</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedStories.map((rel) => (
            <StoryCard key={rel.id} story={rel} onOpenColoring={onOpenColoring} />
          ))}
        </div>
      </section>
    </div>
  );
};

/* ============================================================
   2. CATÁLOGO COMPLETO CON FILTROS POR VALOR Y EDAD (/cuentos)
   ============================================================ */
export const CatalogPage: React.FC<{
  stories: Story[];
  onOpenColoring: (story: Story) => void;
}> = ({ stories, onOpenColoring }) => {
  const [selectedValue, setSelectedValue] = useState<string>('Todos');
  const [selectedAge, setSelectedAge] = useState<'todas' | '3-5' | '6-8' | '9-12'>('todas');

  const valueOptions = ['Todos', 'Honestidad', 'Valentía', 'Empatía', 'Generosidad', 'Paciencia', 'Amistad'];

  const matchesAge = (ageRange: string, bucket: 'todas' | '3-5' | '6-8' | '9-12'): boolean => {
    if (bucket === 'todas') return true;
    const nums = ageRange.match(/\d+/g)?.map(Number) || [4, 10];
    const min = nums[0] ?? 4;
    const max = nums[1] ?? min;
    if (bucket === '3-5') return min <= 5;
    if (bucket === '6-8') return min <= 8 && max >= 6;
    return max >= 9;
  };

  const filtered = useMemo(() => {
    return stories.filter((s) => {
      const okValue = selectedValue === 'Todos' || s.value.toLowerCase() === selectedValue.toLowerCase();
      const okAge = matchesAge(s.ageRange, selectedAge);
      return okValue && okAge;
    });
  }, [stories, selectedValue, selectedAge]);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Catálogo de Cuentos' }]} />

      <header className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-200 shadow-sm mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Biblioteca Infantil Gratuita · 3 a 12 años</span>
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          Catálogo completo de cuentos infantiles con valores
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Filtra nuestros relatos ilustrados según la virtud que deseas trabajar o la franja de edad de Educación Infantil y Primaria. Cada ficha incluye texto completo HTML, audio narrado, tres preguntas de reflexión y actividad práctica.
        </p>

        {/* Value & Age Interactive Filters */}
        <div className="mt-6 pt-6 border-t border-amber-100 space-y-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Filtrar por valor:
            </h2>
            <div className="flex flex-wrap gap-2">
              {valueOptions.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSelectedValue(val)}
                  className={`px-3.5 py-1.5 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                    selectedValue === val
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-amber-50 text-slate-700 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Filtrar por edad recomendada:
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'todas', label: 'Todas las edades (3-12 años)' },
                { id: '3-5', label: 'Infantil (3-5 años)' },
                { id: '6-8', label: 'Primeros lectores (6-8 años)' },
                { id: '9-12', label: 'Primaria (9-12 años)' },
              ].map((age) => (
                <button
                  key={age.id}
                  type="button"
                  onClick={() => setSelectedAge(age.id as typeof selectedAge)}
                  className={`px-3.5 py-1.5 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                    selectedAge === age.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {age.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section aria-label="Listado de cuentos filtrados">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Cuentos disponibles ({filtered.length})
          </h2>
          {(selectedValue !== 'Todos' || selectedAge !== 'todas') && (
            <button
              type="button"
              onClick={() => {
                setSelectedValue('Todos');
                setSelectedAge('todas');
              }}
              className="text-xs font-bold text-amber-700 underline cursor-pointer"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((story) => (
            <StoryCard key={story.id} story={story} onOpenColoring={onOpenColoring} />
          ))}
        </div>
      </section>

      {/* Crawlable Links to All Value Pages */}
      <section className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80">
        <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
          ¿Qué colección temática por valores quieres explorar?
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {VALUES_SEO.map((val) => (
            <Link
              key={val.slug}
              to={getValueUrl(val.slug)}
              className="px-4 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-950 font-bold text-xs sm:text-sm transition-colors"
            >
              Cuentos de {val.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

/* ============================================================
   3. PÁGINA POR VALOR (/valores/:slugValor)
   ============================================================ */
interface ValueLandingPageProps {
  valueInfo: ValueSeoInfo;
  matchingStories: Story[];
  onOpenColoring: (story: Story) => void;
}

export const ValueLandingPage: React.FC<ValueLandingPageProps> = ({
  valueInfo,
  matchingStories,
  onOpenColoring,
}) => {
  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Cuentos', to: '/cuentos' },
          { label: `Valor: ${valueInfo.title}` },
        ]}
      />

      <header className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-200/80 shadow-sm mb-10">
        <span
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold border mb-4 ${valueInfo.badgeBg} ${valueInfo.badgeColor}`}
        >
          <Heart className="w-3.5 h-3.5 fill-current opacity-80" />
          <span>Educación en Valores • Familias, Colegios y Catequesis</span>
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          {valueInfo.headline}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          {valueInfo.subtitle}
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-amber-100">
          <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            {valueInfo.introParagraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs sm:text-sm text-indigo-950">
              <strong>Enfoque cristiano y catequesis:</strong> {valueInfo.catechesisNote}
            </div>
          </div>

          <aside className="lg:col-span-4 bg-amber-50/70 rounded-2xl p-5 border border-amber-200">
            <h2 className="font-display font-bold text-base text-amber-950 mb-3">
              Claves prácticas para educar la {valueInfo.title.toLowerCase()}
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 list-disc list-inside leading-relaxed">
              {valueInfo.practicalTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </aside>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Cuentos e ilustraciones sobre {valueInfo.title} ({matchingStories.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {matchingStories.map((story) => (
            <StoryCard key={story.id} story={story} onOpenColoring={onOpenColoring} />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80">
        <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
          Explora otros valores esenciales para niños
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {VALUES_SEO.filter((v) => v.slug !== valueInfo.slug).map((v) => (
            <Link
              key={v.slug}
              to={`/valores/${v.slug}`}
              className="px-4 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-950 font-bold text-xs sm:text-sm transition-colors"
            >
              Cuentos de {v.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

/* ============================================================
   4. GUÍA PRÁCTICA PARA PADRES Y DOCENTES (/guia-padres-docentes)
   ============================================================ */
export const ParentsTeachersGuidePage: React.FC = () => {
  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Guía para Padres y Docentes' }]} />

      <article className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-200 shadow-sm space-y-8">
        <header className="border-b border-emerald-100 pb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Metodología Didáctica · Infantil, Primaria y Familia</span>
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            Guía práctica para trabajar cuentos con valores en casa y en el aula
          </h1>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Cómo transformar un relato ilustrado de 5 minutos en una conversación significativa y una experiencia memorable para niños de 3 a 12 años.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            ¿Cómo estructurar una sesión de cuento con valores en 3 pasos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <span className="text-xs font-black text-amber-700 uppercase">Paso 1 · Lectura o Audio</span>
              <h3 className="font-bold text-slate-900 text-lg mt-1 mb-2">Escucha atenta</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Lee en voz alta haciendo pausas en las escenas ilustradas o reproduce el audiocuento integrado antes de dormir o en la asamblea del aula.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200">
              <span className="text-xs font-black text-sky-700 uppercase">Paso 2 · Diálogo Abierto</span>
              <h3 className="font-bold text-slate-900 text-lg mt-1 mb-2">Preguntas sin juzgar</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Utiliza las tres preguntas finales de cada cuento. Pregunta cómo se sintió el personaje en lugar de dar un sermón moral directo.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-xs font-black text-emerald-700 uppercase">Paso 3 · Acción Plástica</span>
              <h3 className="font-bold text-slate-900 text-lg mt-1 mb-2">Lámina y reto</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Cierra con la actividad práctica propuesta y la lámina para colorear para fijar el aprendizaje mediante el juego y la creatividad.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            ¿Qué trabajar según cada etapa de edad?
          </h2>
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Educación Infantil (3 a 5 años):</strong>
              Prioriza historias visuales con un conflicto sencillo sobre compartir o esperar turnos como{' '}
              <Link to="/cuento/una-mision-para-dos" className="text-amber-700 font-bold underline">
                Una Misión para Dos
              </Link>{' '}
              o{' '}
              <Link to="/cuento/una-mision-para-todos" className="text-amber-700 font-bold underline">
                Una Misión para Todos
              </Link>.
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Primeros Lectores (6 a 8 años):</strong>
              Ideal para nombrar emociones en el patio escolar y manejar los nervios con{' '}
              <Link to="/cuento/el-mapa-de-los-sentimientos" className="text-amber-700 font-bold underline">
                El Mapa de los Sentimientos
              </Link>{' '}
              y{' '}
              <Link to="/cuento/mateo-y-el-secreto-de-la-paciencia-estelar" className="text-amber-700 font-bold underline">
                Mateo y el Secreto de la Paciencia Estelar
              </Link>.
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Primaria y Catequesis (9 a 12 años):</strong>
              Fomenta el debate sobre la reparación de errores, el coraje moral y la solidaridad con{' '}
              <Link to="/cuento/mateo-y-el-misterio-del-telescopio-roto" className="text-amber-700 font-bold underline">
                Mateo y el Misterio del Telescopio Roto
              </Link>{' '}
              y{' '}
              <Link to="/cuento/el-destello-del-corazon-valiente" className="text-amber-700 font-bold underline">
                El Destello del Corazón Valiente
              </Link>.
            </div>
          </div>
        </section>

        <footer className="pt-6 border-t border-emerald-100 flex flex-wrap gap-3 items-center justify-between">
          <Link
            to="/cuentos"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explorar catálogo por edad y valor</span>
          </Link>
          <Link to="/" className="text-sm font-bold text-amber-800 hover:underline">
            ← Volver a la página principal
          </Link>
        </footer>
      </article>
    </div>
  );
};

/* ============================================================
   5. BLOQUE E-E-A-T EN PORTADA ("Sobre el proyecto / Enfoque pedagógico")
   ============================================================ */
export const HomePedagogicalSection: React.FC<{ onOpenContact: () => void }> = ({
  onOpenContact,
}) => {
  return (
    <section
      id="enfoque-pedagogico"
      className="py-12 sm:py-16 bg-white border-t border-amber-100"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/50 rounded-3xl p-6 sm:p-10 border-2 border-amber-200/80">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Autoría, Transparencia y Criterio Educativo</span>
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            ¿Cuál es nuestro enfoque pedagógico y quién crea Cuentos y Valores?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-5">
            <strong>Cuentos y Valores</strong> es una iniciativa cultural y educativa creada por{' '}
            <strong>Juancar Hidalgo</strong>. Cada historia combina lectura cercana sin sermones, audio narrado, tres preguntas abiertas de reflexión y una actividad plástica para que padres, maestros y catequistas eduquen virtudes esenciales de forma gratuita y segura.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-xs sm:text-sm">
            <div className="bg-white p-4 rounded-2xl border border-amber-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Relatos revisados por etapas educativas de 3 a 12 años y libres de violencia.</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-amber-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Acceso 100% libre para imprimir en hogares, colegios y parroquias sin registro.</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-amber-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Contacto editorial directo para sugerencias de familias y profesorado.</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/sobre-nosotros"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm transition-colors"
            >
              Conocer el proyecto y enfoque pedagógico
            </Link>
            <Link
              to="/guia-padres-docentes"
              className="px-4 py-2 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs sm:text-sm transition-colors"
            >
              Leer Guía para Padres y Docentes
            </Link>
            <button
              type="button"
              onClick={onOpenContact}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Contactar con el autor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   6. BELÉN RECORTABLE, COLOREAR, ORACIONES, SOBRE NOSOTROS, LEGAL
   ============================================================ */
export const BelenRecortablePage: React.FC<{ allStories: Story[] }> = ({ allStories }) => {
  const luzStory = allStories.find((s) => s.id === 'la-luz-de-nazaret');

  return (
    <div className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Belén Recortable para Niños' }]} />

        <header className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-200 shadow-sm mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <Scissors className="w-3.5 h-3.5" />
            <span>Manualidad Navideña Gratuita • Adviento y Catequesis</span>
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Belén recortable para niños: imprime, recorta y monta tu pesebre
          </h1>
          <div className="mt-4 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
            <p>
              Montar el Belén en Navidad es una tradición entrañable para compartir con los niños mientras conversamos sobre la humildad, la acogida y el nacimiento de Jesús. Esta lámina A4 reúne 16 piezas ilustradas pensadas para recortar con tijeras escolares y levantar cada figura en 3D gracias a sus solapas inferiores.
            </p>
            <p>
              Es un recurso gratuito para familias, maestras de Religión y catequistas: imprime la lámina en cartulina de 180g, recorta por la línea discontinua y ordena el portal junto a María, San José, el Niño Jesús, los pastores y los Reyes Magos.
            </p>
          </div>
          {luzStory && (
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={getStoryUrl(luzStory.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs sm:text-sm transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Leer cuento ilustrado: La Luz de Nazaret</span>
              </Link>
              <Link
                to="/oraciones"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-xs sm:text-sm transition-colors"
              >
                <span>🕊️ Ver oraciones infantiles para Navidad y familia</span>
              </Link>
            </div>
          )}
        </header>
      </div>

      <BelenRecortableSection />
    </div>
  );
};

export const ColoringGalleryPage: React.FC<{
  stories: Story[];
  onOpenColoring: (story: Story) => void;
}> = ({ stories, onOpenColoring }) => {
  return (
    <div className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Dibujos para Colorear' }]} />
        <header className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-sky-200 shadow-sm mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold mb-3">
            <Palette className="w-3.5 h-3.5" />
            <span>Recursos Plásticos A4 • Gratis</span>
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Dibujos para colorear con valores para niños
          </h1>
          <div className="mt-4 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
            <p>
              Colorear después de escuchar o leer un cuento ayuda a los niños de 3 a 10 años a reposar las emociones de la historia, fijar la moraleja en la memoria y desarrollar la motricidad fina.
            </p>
            <p>
              Puedes pintar cada lámina online o descargarla gratis para imprimir en clase de Infantil, Primaria o catequesis. También puedes descargar el{' '}
              <Link to="/belen-recortable" className="font-bold text-sky-700 underline">
                Belén recortable para imprimir
              </Link>
              .
            </p>
          </div>
        </header>
      </div>

      <DownloadsSection stories={stories} onOpenColoring={onOpenColoring} />
    </div>
  );
};

export const PrayersPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Oraciones para Niños' }]} />
        <header className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-indigo-200 shadow-sm mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catequesis Familiar y Espiritualidad Infantil</span>
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Oraciones cortas para niños: dormir, dar gracias y catequesis
          </h1>
          <div className="mt-4 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
            <p>
              Oraciones infantiles escritas en verso sencillo por Juancar Hidalgo para agradecer el día, pedir paz antes de dormir y bendecir los alimentos en familia.
            </p>
          </div>
        </header>
      </div>

      <PrayersSection />
    </div>
  );
};

export const AboutAuthorPage: React.FC<{
  onOpenContact: () => void;
}> = ({ onOpenContact }) => {
  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Sobre Nosotros y Enfoque Pedagógico' }]} />

      <article className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-200 shadow-sm space-y-8">
        <header className="border-b border-amber-100 pb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Autoría y Criterio Pedagógico (E-E-A-T)</span>
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            Sobre nosotros: Juancar Hidalgo y el enfoque pedagógico de Cuentos y Valores
          </h1>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Autoría transparente, criterios educativos para Infantil y Primaria y compromiso de acceso abierto y gratuito para familias, escuelas y parroquias.
          </p>
        </header>

        <section className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Nuestra misión educativa
          </h2>
          <p>
            <strong>Cuentos y Valores</strong> es un proyecto independiente creado y editado por{' '}
            <strong>Juancar Hidalgo</strong> para ofrecer a madres, padres, maestros y catequistas un espacio seguro, sin publicidad invasiva ni registros, donde la lectura compartida cultiva el diálogo familiar.
          </p>
          <p>
            Cada cuento nace de escenas reconocibles entre los 3 y los 12 años para trabajar virtudes esenciales: empatía, respeto, honestidad, esfuerzo, paciencia, valentía, amistad y generosidad.
          </p>
        </section>

        <section className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Criterios pedagógicos de cada publicación
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <h3 className="font-bold text-slate-900 mb-1">1. Narrativa respetuosa sin sermones</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Los personajes dudan, cometen errores cotidianos y aprenden con apoyo de amigos o docentes.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200">
              <h3 className="font-bold text-slate-900 mb-1">2. Estructura completa para el aula</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Lectura HTML completa, audio narrado, tres preguntas abiertas y una actividad práctica con lámina para colorear.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <h3 className="font-bold text-slate-900 mb-1">3. Valores universales y raíces cristianas</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Además de virtudes cívicas y educación emocional, incluimos recursos para catequesis como La Luz de Nazaret, Oraciones y el Belén recortable.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
              <h3 className="font-bold text-slate-900 mb-1">4. Uso responsable de la IA</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                El asistente Valerio cuenta con directrices pedagógicas estrictas y está pensado para usarse bajo supervisión adulta.
              </p>
            </div>
          </div>
        </section>

        <section className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
          <h2 className="font-display text-lg font-bold text-slate-900 mb-2">
            Contacto editorial directo
          </h2>
          <p className="mb-3">
            ¿Eres docente, catequista o padre y te gustaría proponer un valor o mejora pedagógica? Escríbenos directamente a{' '}
            <a
              href="mailto:jchurizar@gmail.com"
              className="font-bold text-amber-800 underline inline-flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>jchurizar@gmail.com</span>
            </a>{' '}
            o utiliza el buzón de sugerencias.
          </p>
        </section>

        <footer className="pt-6 border-t border-amber-100 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm cursor-pointer transition-colors"
          >
            <span>Enviar sugerencia a Juancar Hidalgo</span>
          </button>
          <Link
            to="/cuentos"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-800 hover:text-amber-950"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ir al catálogo de cuentos</span>
          </Link>
        </footer>
      </article>
    </div>
  );
};

export const LegalPrivacyPage: React.FC<{
  onOpenContact: () => void;
}> = ({ onOpenContact }) => {
  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Aviso Legal y Política de Privacidad' }]} />

      <article className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-sm space-y-7 text-sm sm:text-base text-slate-700 leading-relaxed">
        <header className="border-b border-slate-200 pb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Transparencia y Seguridad Infantil</span>
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900">
            Aviso Legal, Privacidad y Uso Seguro de Valerio (IA)
          </h1>
        </header>

        <section className="space-y-2">
          <h2 className="font-display text-xl font-bold text-slate-900">
            1. Titularidad y finalidad educativa
          </h2>
          <p>
            <strong>Cuentos y Valores</strong> (<code>https://cuentosyvalores.es</code>) es un portal cultural y educativo sin ánimo de lucro creado por <strong>Juancar Hidalgo</strong> (contacto:{' '}
            <a href="mailto:jchurizar@gmail.com" className="underline text-amber-800">
              jchurizar@gmail.com
            </a>
            ). Su finalidad exclusiva es difundir gratuitamente cuentos infantiles ilustrados, oraciones y manualidades recortables para familias, colegios y catequesis.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl font-bold text-slate-900">
            2. Política de privacidad y cero registros infantiles
          </h2>
          <p>
            No solicitamos registro ni datos personales a menores para leer los cuentos, escuchar audios o descargar láminas. Únicamente si un adulto utiliza voluntariamente el formulario de contacto, los datos aportados se emplean exclusivamente para responder a su sugerencia.
          </p>
        </section>

        <section className="space-y-2 p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200">
          <h2 className="font-display text-xl font-bold text-indigo-950 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>3. Normas de uso del asistente Valerio (Inteligencia Artificial)</span>
          </h2>
          <p>
            El asistente creativo &quot;Habla con Valerio&quot; utiliza inteligencia artificial configurada con directrices educativas amables y libres de contenido violento. Como en cualquier herramienta de IA, recomendamos que madres, padres o docentes acompañen a los menores y eviten introducir datos personales reales en el chat.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl font-bold text-slate-900">
            4. Propiedad intelectual y licencia educativa
          </h2>
          <p>
            Se autoriza libremente la impresión, lectura en voz alta y uso en aulas escolares, parroquias o domicilios particulares de todos los cuentos, oraciones y dibujos sin fines comerciales, citando la autoría del proyecto.
          </p>
        </section>

        <footer className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onOpenContact}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm cursor-pointer transition-colors"
          >
            Contactar con el responsable
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-800 hover:text-amber-950"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>
        </footer>
      </article>
    </div>
  );
};
