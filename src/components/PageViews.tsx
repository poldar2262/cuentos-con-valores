import React from 'react';
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  Heart,
  HelpCircle,
  Home,
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
  getValueSlug,
} from '../data/seoRoutes';
import { AudioPlayer } from './AudioPlayer';
import { StoryCard } from './StoryCard';
import { DownloadsSection } from './DownloadsSection';
import { BelenRecortableSection } from './BelenRecortableSection';
import { PrayersSection } from './PrayersSection';

export type NavigateHandler = (href: string) => void;

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
  onNavigate: NavigateHandler;
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Ruta de navegación" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-600 font-semibold">
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('/');
        }}
        className="inline-flex items-center gap-1 hover:text-amber-700 transition-colors"
      >
        <Home className="w-3.5 h-3.5 text-amber-600" />
        <span>Inicio</span>
      </a>
      {items.map((item, idx) => (
        <React.Fragment key={`${item.label}-${idx}`}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {item.href ? (
            <a
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.href!);
              }}
              className="hover:text-amber-700 transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-slate-900 font-bold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

interface StoryDetailPageProps {
  story: Story;
  allStories: Story[];
  onNavigate: NavigateHandler;
  onOpenReaderModal: (story: Story) => void;
  onOpenColoring: (story: Story) => void;
}

export const StoryDetailPage: React.FC<StoryDetailPageProps> = ({
  story,
  allStories,
  onNavigate,
  onOpenReaderModal,
  onOpenColoring,
}) => {
  const fullText = story.pages.map((p) => p.text).join(' ');
  const valueSlug =
    story.value === 'Todos' ? 'honestidad' : getValueSlug(story.value);
  const relatedStories = allStories
    .filter((s) => s.id !== story.id)
    .slice(0, 3);

  const handleDownloadTxt = () => {
    try {
      const header = `CUENTO INFANTIL CON VALORES: ${story.title.toUpperCase()}\nValor: ${story.value} | Edad recomendada: ${story.ageRange}\nAutor: ${story.author || 'Juancar Hidalgo'}\n${'='.repeat(60)}\n\n`;
      const body = story.pages
        .map((p) => `Página ${p.pageNumber}:\n${p.text}\n`)
        .join('\n');
      const moral = `\n${'='.repeat(60)}\nMORALEJA:\n${story.moralLesson}\n\nPREGUNTAS PARA REFLEXIONAR EN FAMILIA O EN CLASE:\n${story.discussionQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\nFuente: https://www.cuentosyvalores.es/cuentos/${story.id}/\n`;
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
          { label: story.value, href: `/valores/${valueSlug}/` },
          { label: story.title },
        ]}
        onNavigate={onNavigate}
      />

      {/* Hero Header Card */}
      <article className="bg-white rounded-3xl border-2 border-amber-200/80 shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <div className="md:col-span-5 bg-amber-50/70 relative aspect-[4/3] md:aspect-auto">
            <img
              src={story.coverImage}
              alt={`Ilustración infantil del cuento ${story.title} sobre ${story.value}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <a
                  href={`/valores/${valueSlug}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/valores/${valueSlug}/`);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${story.valueBadgeBg} ${story.valueBadgeColor} ${story.valueBorderColor}`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current opacity-80" />
                  Valor: {story.value}
                </a>
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
                {story.title}
              </h1>

              <p className="mt-2 text-xs sm:text-sm font-semibold text-amber-700">
                Por{' '}
                <a
                  href="/sobre-el-autor/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/sobre-el-autor/');
                  }}
                  className="underline hover:text-amber-900"
                >
                  {story.author || 'Juancar Hidalgo'}
                </a>
              </p>

              <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                {story.summary}
              </p>
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

        {/* Full Story Text Body in HTML */}
        <section aria-label="Texto completo del cuento" className="p-6 sm:p-10 border-t border-amber-100 bg-amber-50/20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
                📖 Lectura Completa Online ({story.pages.length} escenas)
              </span>
            </div>

            <div className="space-y-6">
              {story.pages.map((page) => (
                <div
                  key={page.pageNumber}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-200/70 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                      Capítulo / Escena {page.pageNumber}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-serif">
                    {page.text}
                  </p>
                  <p className="mt-3 text-xs text-slate-500 italic border-t border-slate-100 pt-2">
                    Escena ilustrada: {page.illustrationDescription}
                  </p>
                </div>
              ))}
            </div>

            {/* Moral Lesson & Discussion Questions */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-amber-100/70 border-2 border-amber-300">
                <h2 className="font-display text-xl font-bold text-amber-950 flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-amber-700" />
                  <span>Moraleja y Enseñanza</span>
                </h2>
                <p className="text-sm sm:text-base text-amber-950/90 leading-relaxed">
                  {story.moralLesson}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-sky-50 border-2 border-sky-200">
                <h2 className="font-display text-xl font-bold text-sky-950 flex items-center gap-2 mb-3">
                  <MessageCircle className="w-5 h-5 text-sky-600" />
                  <span>Preguntas para Reflexionar</span>
                </h2>
                <ol className="space-y-2 list-decimal list-inside text-sm text-slate-700 leading-relaxed">
                  {story.discussionQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Coloring Sheet Preview CTA */}
            {story.coloringSheet.lineartImage && (
              <div className="mt-10 p-6 rounded-3xl bg-white border-2 border-sky-200 shadow-xs flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={story.coloringSheet.lineartImage}
                  alt={`Dibujo para colorear de ${story.coloringSheet.title}`}
                  className="w-40 h-40 object-contain rounded-2xl border border-slate-200 bg-white shrink-0"
                />
                <div className="space-y-3 text-center sm:text-left">
                  <h2 className="font-display text-xl font-bold text-slate-900">
                    Lámina para Colorear: {story.coloringSheet.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Completa la lectura con la actividad plástica de {story.coloringSheet.characterName}. Puedes pintarla directamente en el navegador o descargarla gratis para imprimir en formato A4.
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
            Otros cuentos con valores que te pueden gustar
          </h2>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="text-sm font-bold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ver catálogo completo</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedStories.map((rel) => (
            <StoryCard
              key={rel.id}
              story={rel}
              onOpenReader={onOpenReaderModal}
              onOpenColoring={onOpenColoring}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

interface ValueLandingPageProps {
  valueInfo: ValueSeoInfo;
  matchingStories: Story[];
  onNavigate: NavigateHandler;
  onOpenReaderModal: (story: Story) => void;
  onOpenColoring: (story: Story) => void;
}

export const ValueLandingPage: React.FC<ValueLandingPageProps> = ({
  valueInfo,
  matchingStories,
  onNavigate,
  onOpenReaderModal,
  onOpenColoring,
}) => {
  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: `Valor: ${valueInfo.title}` }]}
        onNavigate={onNavigate}
      />

      {/* Editorial Header */}
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

        {/* Rich 200+ word SEO Article */}
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

      {/* Filtered Stories */}
      <section className="mb-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Cuentos e ilustraciones sobre {valueInfo.title} ({matchingStories.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {matchingStories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onOpenReader={onOpenReaderModal}
              onOpenColoring={onOpenColoring}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>

      {/* Other Values Cross Links */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80">
        <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
          Explora otros valores esenciales para niños
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {VALUES_SEO.filter((v) => v.slug !== valueInfo.slug).map((v) => (
            <a
              key={v.slug}
              href={`/valores/${v.slug}/`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/valores/${v.slug}/`);
              }}
              className="px-4 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-950 font-bold text-xs sm:text-sm transition-colors"
            >
              ⭐ Cuentos de {v.title}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export const BelenRecortablePage: React.FC<{
  onNavigate: NavigateHandler;
  allStories: Story[];
}> = ({ onNavigate, allStories }) => {
  const luzStory = allStories.find((s) => s.id === 'la-luz-de-nazaret');

  return (
    <div className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ label: 'Belén Recortable para Niños' }]}
          onNavigate={onNavigate}
        />

        <header className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-200 shadow-sm mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <Scissors className="w-3.5 h-3.5" />
            <span>Manualidad Navideña Gratuita • Adviento y Catequesis</span>
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Belén recortable para niños: imprime, recorta y monta tu pesebre en casa
          </h1>
          <div className="mt-4 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
            <p>
              Montar el Belén en Navidad es una de las tradiciones más bonitas para compartir tiempo de calidad con los niños mientras conversamos sobre la humildad, la acogida y la alegría del nacimiento de Jesús. Esta lámina A4 lista para imprimir reúne 16 piezas ilustradas con trazos cálidos e infantiles pensadas para recortar con tijeras escolares y levantar cada figura en 3D gracias a sus solapas inferiores.
            </p>
            <p>
              Es un recurso gratuito especialmente valorado por padres, abuelos, maestras de Religión y catequistas parroquiales durante el Adviento: combina motricidad fina, trabajo cooperativo entre hermanos y educación en valores cristianos sin coste ni registros. Solo necesitas imprimir la imagen en cartulina blanca de 180g (o pegarla sobre cartón fino), recortar por la línea discontinua y ordenar el portal junto con María, San José, el Niño Jesús, el buey, la mula, los pastores y los Reyes Magos.
            </p>
          </div>
          {luzStory && (
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`/cuentos/${luzStory.id}/`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/cuentos/${luzStory.id}/`);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs sm:text-sm transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Leer cuento ilustrado: La Luz de Nazaret</span>
              </a>
              <a
                href="/oraciones/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/oraciones/');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-xs sm:text-sm transition-colors"
              >
                <span>🕊️ Ver oraciones infantiles para Navidad y familia</span>
              </a>
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
  onNavigate: NavigateHandler;
}> = ({ stories, onOpenColoring, onNavigate }) => {
  return (
    <div className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ label: 'Dibujos para Colorear' }]}
          onNavigate={onNavigate}
        />
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
              Colorear después de escuchar o leer un cuento ayuda a los niños de 3 a 10 años a reposar las emociones de la historia, fijar el mensaje moral en la memoria y desarrollar la coordinación ojo-mano sin pantallas. Todas las láminas de esta galería están vinculadas a nuestros relatos sobre honestidad, amistad, paciencia, empatía, valentía y generosidad.
            </p>
            <p>
              Puedes abrir cualquier lámina en nuestro estudio digital para pintarla con colores en tablet u ordenador, o descargarla directamente en tu dispositivo para imprimir copias para clase de Infantil, Primaria, tutorías o sesiones de catequesis infantil. También te invitamos a visitar nuestro{' '}
              <a
                href="/belen-recortable/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/belen-recortable/');
                }}
                className="font-bold text-sky-700 underline"
              >
                Belén recortable para imprimir
              </a>
              .
            </p>
          </div>
        </header>
      </div>

      <DownloadsSection stories={stories} onOpenColoring={onOpenColoring} />
    </div>
  );
};

export const PrayersPage: React.FC<{
  onNavigate: NavigateHandler;
}> = ({ onNavigate }) => {
  return (
    <div className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ label: 'Oraciones para Niños' }]}
          onNavigate={onNavigate}
        />
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
              Enseñar a los más pequeños a agradecer el día, pedir paz antes de dormir y bendecir los alimentos en la mesa crea recuerdos familiares imborrables. Estas oraciones infantiles escritas en verso sencillo por Juancar Hidalgo emplean un lenguaje cercano, luminoso y adaptado para edades tempranas.
            </p>
            <p>
              Son un complemento ideal para hogares cristianos, clases de Religión Católica y encuentros de catequesis infantil de despertar religioso y Primera Comunión. Cada oración incluye una breve &quot;Semillita de Paz&quot; para comentar en grupo o en familia y botones gratuitos para copiar el texto o descargar la ficha imprimible.
            </p>
          </div>
        </header>
      </div>

      <PrayersSection />
    </div>
  );
};

export const AboutAuthorPage: React.FC<{
  onNavigate: NavigateHandler;
  onOpenContact: () => void;
}> = ({ onNavigate, onOpenContact }) => {
  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: 'Sobre el Autor y el Proyecto' }]}
        onNavigate={onNavigate}
      />

      <article className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-200 shadow-sm space-y-8">
        <header className="border-b border-amber-100 pb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Autoría y Transparencia Editorial</span>
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            Sobre Juancar Hidalgo y Cuentos y Valores
          </h1>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Quién está detrás de cada relato, cómo se diseñan los recursos pedagógicos y por qué todo el material permanece abierto y gratuito para familias, escuelas y parroquias.
          </p>
        </header>

        <section className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Nuestra misión educativa
          </h2>
          <p>
            <strong>Cuentos y Valores</strong> nace de la ilusión de <strong>Juancar Hidalgo</strong> por ofrecer a padres, madres, abuelos, maestros y catequistas un rincón digital amable, libre de anuncios invasivos y sin necesidad de registros, donde la lectura compartida vuelva a ser el corazón de la tarde o del momento antes de dormir.
          </p>
          <p>
            Cada historia parte de situaciones reconocibles para niños de 3 a 12 años —un accidente con un objeto valioso en clase, un amigo tímido que mira desde la valla, los nervios antes de cruzar un puente o el asombro de la primera Navidad— para sembrar virtudes duraderas: honestidad, empatía, valentía, paciencia, amistad y generosidad.
          </p>
        </section>

        <section className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Criterios de calidad en cada cuento y actividad
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <h3 className="font-bold text-slate-900 mb-1">1. Lenguaje cercano y positivo</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Evitamos los sermones rígidos: los niños aprenden empatizando con personajes que dudan, se equivocan y rectifican con cariño.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200">
              <h3 className="font-bold text-slate-900 mb-1">2. Audio, diálogo y dibujo</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Cada cuento incluye lectura íntegra en pantalla, narración de audio, tres preguntas para conversar y una lámina propia para colorear.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <h3 className="font-bold text-slate-900 mb-1">3. Raíces cristianas abiertas a todos</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Además de virtudes cívicas universales, ofrecemos materiales específicos para catequesis y familias creyentes como La Luz de Nazaret, Oraciones y el Belén recortable.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
              <h3 className="font-bold text-slate-900 mb-1">4. Uso responsable de la IA</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Las herramientas de apoyo interactivo como Valerio están orientadas exclusivamente a inspirar relatos familiares y deben usarse con acompañamiento adulto.
              </p>
            </div>
          </div>
        </section>

        <footer className="pt-6 border-t border-amber-100 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm cursor-pointer transition-colors"
          >
            <span>Enviar sugerencia a Juancar Hidalgo</span>
          </button>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-800 hover:text-amber-950"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al catálogo principal</span>
          </a>
        </footer>
      </article>
    </div>
  );
};

export const LegalPrivacyPage: React.FC<{
  onNavigate: NavigateHandler;
  onOpenContact: () => void;
}> = ({ onNavigate, onOpenContact }) => {
  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: 'Aviso Legal y Política de Privacidad' }]}
        onNavigate={onNavigate}
      />

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
            <strong>Cuentos y Valores</strong> (<code>https://www.cuentosyvalores.es</code>) es un portal cultural y educativo sin ánimo de lucro creado por <strong>Juancar Hidalgo</strong>. Su finalidad exclusiva es difundir gratuitamente cuentos infantiles ilustrados, oraciones y manualidades recortables para familias, colegios y grupos de catequesis.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl font-bold text-slate-900">
            2. Política de privacidad y cero registros infantiles
          </h2>
          <p>
            No solicitamos registro, creación de cuentas ni datos personales a menores para leer los cuentos, escuchar audios o descargar láminas. Únicamente si un adulto utiliza voluntariamente el formulario de contacto o sugerencias, los datos proporcionados (nombre opcional, correo y mensaje) se emplean exclusivamente para responder a su consulta o valorar su propuesta pedagógica.
          </p>
          <p>
            Algunas preferencias de uso local (como favoritos o enlaces guardados en tu navegador) permanecen únicamente en el almacenamiento local de tu dispositivo.
          </p>
        </section>

        <section className="space-y-2 p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200">
          <h2 className="font-display text-xl font-bold text-indigo-950 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>3. Normas de uso del asistente Valerio (Inteligencia Artificial)</span>
          </h2>
          <p>
            El asistente creativo &quot;Habla con Valerio&quot; utiliza inteligencia artificial configurada con directrices educativas amables y libres de contenido violento o inapropiado. No obstante, <strong>ningún modelo de IA es infalible al 100%</strong>, por lo que recomendamos que madres, padres, tutores o docentes acompañen y supervisen a los menores cuando generen historias personalizadas y revisen no introducir datos personales reales en el chat.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl font-bold text-slate-900">
            4. Propiedad intelectual y licencia educativa
          </h2>
          <p>
            Se autoriza libremente la impresión, lectura en voz alta y reparto en aulas escolares, parroquias o domicilios particulares de todos los cuentos, oraciones y dibujos de la web, siempre que se realice sin fines comerciales y respetando la autoría del proyecto.
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
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-800 hover:text-amber-950"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </a>
        </footer>
      </article>
    </div>
  );
};
