import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
  Link,
} from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StoryCard } from './components/StoryCard';
import { DownloadsSection } from './components/DownloadsSection';
import { BelenRecortableSection } from './components/BelenRecortableSection';
import { ValuesGuideSection } from './components/ValuesGuideSection';
import { PrayersSection } from './components/PrayersSection';
import { FaqSection } from './components/FaqSection';
import { SeoHead } from './components/SeoHead';
import { STORIES } from './data/stories';
import { Story, ValueCategory } from './types';
import { BookOpen, Smile } from 'lucide-react';
import { StoryChatbotLauncher } from './components/StoryChatbotLauncher';
import { Footer } from './components/Footer';
import {
  StoryDetailPage,
  CatalogPage,
  ValueLandingPage,
  ParentsTeachersGuidePage,
  HomePedagogicalSection,
  BelenRecortablePage,
  ColoringGalleryPage,
  PrayersPage,
  AboutAuthorPage,
  LegalPrivacyPage,
} from './components/PageViews';
import {
  VALUES_SEO,
  getStoriesForValue,
  getValueUrl,
} from './data/seoRoutes';

const StoryReaderModal = lazy(() =>
  import('./components/StoryReaderModal').then((m) => ({ default: m.StoryReaderModal }))
);
const ColoringStudioModal = lazy(() =>
  import('./components/ColoringStudioModal').then((m) => ({ default: m.ColoringStudioModal }))
);
const ContactModal = lazy(() =>
  import('./components/ContactModal').then((m) => ({ default: m.ContactModal }))
);
const ManualModal = lazy(() =>
  import('./components/ManualModal').then((m) => ({ default: m.ManualModal }))
);
const AdminModal = lazy(() =>
  import('./components/AdminModal').then((m) => ({ default: m.AdminModal }))
);
const StoryChatbotModal = lazy(() =>
  import('./components/StoryChatbotModal').then((m) => ({ default: m.StoryChatbotModal }))
);

const ALL_CATEGORIES: ValueCategory[] = [
  'Todos',
  'Honestidad',
  'Valentía',
  'Empatía',
  'Generosidad',
  'Paciencia',
  'Cooperación',
  'Amistad',
];

function StoryRouteView({
  storiesList,
  onOpenReaderModal,
  onOpenColoring,
}: {
  storiesList: Story[];
  onOpenReaderModal: (s: Story) => void;
  onOpenColoring: (s: Story) => void;
}) {
  const { slugCuento } = useParams<{ slugCuento: string }>();
  const story = storiesList.find((s) => s.id === slugCuento);

  if (!story) {
    return (
      <div className="py-16 max-w-xl mx-auto px-4 text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900 mb-3">
          Cuento no encontrado
        </h1>
        <p className="text-slate-600 mb-6">
          No encontramos ese cuento en nuestra biblioteca, pero puedes explorar todo nuestro catálogo gratuito.
        </p>
        <Link
          to="/cuentos"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 text-white font-bold text-sm"
        >
          Ver catálogo de cuentos
        </Link>
      </div>
    );
  }

  return (
    <StoryDetailPage
      story={story}
      allStories={storiesList}
      onOpenReaderModal={onOpenReaderModal}
      onOpenColoring={onOpenColoring}
    />
  );
}

function ValueRouteView({
  storiesList,
  onOpenColoring,
}: {
  storiesList: Story[];
  onOpenColoring: (s: Story) => void;
}) {
  const { slugValor } = useParams<{ slugValor: string }>();
  const valueInfo = VALUES_SEO.find((v) => v.slug === slugValor) || VALUES_SEO[0];
  const matchingStories = getStoriesForValue(valueInfo, storiesList);

  return (
    <ValueLandingPage
      valueInfo={valueInfo}
      matchingStories={matchingStories}
      onOpenColoring={onOpenColoring}
    />
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<ValueCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [storiesList, setStoriesList] = useState<Story[]>(STORIES);

  // Sync localStorage custom stories cleanly after hydration
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cuentos_custom_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleaned = parsed.map((item: Story) => {
            const updated = { ...item };
            const baseStory = STORIES.find((s) => s.id === updated.id);
            if (updated.pdfUrl && updated.pdfUrl.includes('_demo/view')) updated.pdfUrl = '';
            if (updated.coloringPdfUrl && updated.coloringPdfUrl.includes('_demo/view')) {
              updated.coloringPdfUrl = '';
            }
            if (baseStory) {
              if (!updated.audioUrl || updated.audioUrl.endsWith('.wav') || updated.audioUrl.includes('freesound.org')) {
                updated.audioUrl = baseStory.audioUrl;
              }
              if (updated.coverImage?.startsWith('/assets/') && updated.coverImage.endsWith('.jpg')) {
                updated.coverImage = baseStory.coverImage;
              }
              if (
                updated.coloringSheet?.lineartImage?.startsWith('/assets/') &&
                updated.coloringSheet.lineartImage.endsWith('.jpg')
              ) {
                updated.coloringSheet = {
                  ...updated.coloringSheet,
                  lineartImage: baseStory.coloringSheet.lineartImage,
                };
              }
              if (!updated.practicalActivity && baseStory.practicalActivity) {
                updated.practicalActivity = baseStory.practicalActivity;
              }
            } else if (!updated.audioUrl || updated.audioUrl.endsWith('.wav') || updated.audioUrl.includes('freesound.org')) {
              updated.audioUrl = '/audio/telescopio-honestidad.mp3';
            }
            return updated;
          });
          localStorage.setItem('cuentos_custom_list', JSON.stringify(cleaned));
          setStoriesList(cleaned);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Scroll to top or hash when route changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  // Modals state
  const [readingStory, setReadingStory] = useState<Story | null>(null);
  const [coloringStory, setColoringStory] = useState<Story | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isManualOpen, setIsManualOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [hasOpenedChatbot, setHasOpenedChatbot] = useState<boolean>(false);

  const openChatbot = () => {
    setHasOpenedChatbot(true);
    setIsChatbotOpen(true);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (q.trim() && location.pathname !== '/') {
      navigate('/#cuentos');
    }
  };

  const handleAddStory = (newStory: Story) => {
    const updated = [newStory, ...storiesList];
    setStoriesList(updated);
    try {
      localStorage.setItem('cuentos_custom_list', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStory = (updatedStory: Story) => {
    const updated = storiesList.map((s) => (s.id === updatedStory.id ? updatedStory : s));
    setStoriesList(updated);
    try {
      localStorage.setItem('cuentos_custom_list', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteStory = (storyId: string) => {
    const updated = storiesList.filter((s) => s.id !== storyId);
    setStoriesList(updated);
    try {
      localStorage.setItem('cuentos_custom_list', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredStories = useMemo(() => {
    return storiesList.filter((story) => {
      const matchesCategory =
        selectedCategory === 'Todos' ||
        story.value.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        story.title.toLowerCase().includes(query) ||
        story.value.toLowerCase().includes(query) ||
        story.summary.toLowerCase().includes(query) ||
        story.coloringSheet.characterName.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [storiesList, selectedCategory, searchQuery]);

  const homeElement = (
    <>
      <Hero
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={ALL_CATEGORIES}
        totalStories={filteredStories.length}
        onOpenChatbot={openChatbot}
      />

      {/* Stories Section Grid */}
      <section id="cuentos" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-400 text-amber-950">
                <BookOpen className="w-5 h-5" />
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                {selectedCategory === 'Todos'
                  ? '¿Qué cuentos infantiles con valores puedes leer y escuchar hoy?'
                  : `Cuentos de ${selectedCategory}`}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Escucha el audiocuento en el reproductor o entra en el cuento para leerlo completo en familia
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {selectedCategory !== 'Todos' && (
              <Link
                to={getValueUrl(selectedCategory)}
                className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors"
              >
                Abrir guía de {selectedCategory} →
              </Link>
            )}
            {(selectedCategory !== 'Todos' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Todos');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-amber-600 hover:text-amber-800 underline cursor-pointer"
              >
                Ver todos
              </button>
            )}
            <Link
              to="/cuentos"
              className="text-xs sm:text-sm font-bold text-amber-800 hover:underline"
            >
              Catálogo completo por edad →
            </Link>
          </div>
        </div>

        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onOpenColoring={(s) => setColoringStory(s)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border-2 border-dashed border-amber-300 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Smile className="w-8 h-8" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-800">
              No encontramos ningún cuento con ese término
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Prueba buscando otro valor como &quot;Honestidad&quot;, &quot;Valentía&quot; o borra el filtro.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
              className="mt-5 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
            >
              Mostrar todos los cuentos
            </button>
          </div>
        )}
      </section>

      <DownloadsSection
        stories={storiesList}
        onOpenColoring={(s) => setColoringStory(s)}
      />

      <BelenRecortableSection
        onOpenColoringStory={(storyId) => {
          const found = storiesList.find((s) => s.id === storyId);
          if (found) setColoringStory(found);
        }}
      />

      <PrayersSection />

      <ValuesGuideSection />

      <HomePedagogicalSection onOpenContact={() => setIsContactOpen(true)} />

      <FaqSection />
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800 font-sans">
      <SeoHead stories={storiesList} />

      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenManual={() => setIsManualOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenChatbot={openChatbot}
      />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={homeElement} />
          <Route
            path="/cuentos"
            element={
              <CatalogPage
                stories={storiesList}
                onOpenColoring={(s) => setColoringStory(s)}
              />
            }
          />
          <Route
            path="/valores/:slugValor"
            element={
              <ValueRouteView
                storiesList={storiesList}
                onOpenColoring={(s) => setColoringStory(s)}
              />
            }
          />
          <Route
            path="/cuento/:slugCuento"
            element={
              <StoryRouteView
                storiesList={storiesList}
                onOpenReaderModal={(s) => setReadingStory(s)}
                onOpenColoring={(s) => setColoringStory(s)}
              />
            }
          />
          <Route
            path="/cuentos/:slugCuento"
            element={
              <StoryRouteView
                storiesList={storiesList}
                onOpenReaderModal={(s) => setReadingStory(s)}
                onOpenColoring={(s) => setColoringStory(s)}
              />
            }
          />
          <Route path="/guia-padres-docentes" element={<ParentsTeachersGuidePage />} />
          <Route
            path="/sobre-nosotros"
            element={<AboutAuthorPage onOpenContact={() => setIsContactOpen(true)} />}
          />
          <Route
            path="/sobre-el-autor"
            element={<AboutAuthorPage onOpenContact={() => setIsContactOpen(true)} />}
          />
          <Route
            path="/belen-recortable"
            element={<BelenRecortablePage allStories={storiesList} />}
          />
          <Route
            path="/dibujos-para-colorear"
            element={
              <ColoringGalleryPage
                stories={storiesList}
                onOpenColoring={(s) => setColoringStory(s)}
              />
            }
          />
          <Route path="/oraciones" element={<PrayersPage />} />
          <Route
            path="/privacidad-y-aviso-legal"
            element={<LegalPrivacyPage onOpenContact={() => setIsContactOpen(true)} />}
          />
          <Route path="*" element={homeElement} />
        </Routes>
      </main>

      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onOpenManual={() => setIsManualOpen(true)}
        onOpenChatbot={openChatbot}
      />

      {readingStory && (
        <Suspense fallback={null}>
          <StoryReaderModal
            story={readingStory}
            onClose={() => setReadingStory(null)}
            onOpenColoring={(s) => {
              setReadingStory(null);
              setColoringStory(s);
            }}
          />
        </Suspense>
      )}

      {coloringStory && (
        <Suspense fallback={null}>
          <ColoringStudioModal
            story={coloringStory}
            onClose={() => setColoringStory(null)}
          />
        </Suspense>
      )}

      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
        </Suspense>
      )}

      {isManualOpen && (
        <Suspense fallback={null}>
          <ManualModal
            isOpen={isManualOpen}
            onClose={() => setIsManualOpen(false)}
            onOpenChatbot={() => {
              setIsManualOpen(false);
              openChatbot();
            }}
          />
        </Suspense>
      )}

      {isAdminOpen && (
        <Suspense fallback={null}>
          <AdminModal
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            stories={storiesList}
            onAddStory={handleAddStory}
            onUpdateStory={handleUpdateStory}
            onDeleteStory={handleDeleteStory}
          />
        </Suspense>
      )}

      <StoryChatbotLauncher onClick={openChatbot} />

      {hasOpenedChatbot && (
        <Suspense fallback={null}>
          <StoryChatbotModal
            isOpen={isChatbotOpen}
            onClose={() => setIsChatbotOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
