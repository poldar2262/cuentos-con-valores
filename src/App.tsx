import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StoryCard } from './components/StoryCard';
import { DownloadsSection } from './components/DownloadsSection';
import { BelenRecortableSection } from './components/BelenRecortableSection';
import { ValuesGuideSection } from './components/ValuesGuideSection';
import { PrayersSection } from './components/PrayersSection';
import { FaqSection } from './components/FaqSection';
import { StoryChatbotLauncher } from './components/StoryChatbotLauncher';
import { Footer } from './components/Footer';
import { STORIES } from './data/stories';
import { Story, ValueCategory } from './types';
import { BookOpen, Smile } from 'lucide-react';

import {
  StoryDetailPage,
  ValueLandingPage,
  BelenRecortablePage,
  ColoringGalleryPage,
  PrayersPage,
  AboutAuthorPage,
  LegalPrivacyPage,
} from './components/PageViews';
import {
  getRouteSeoMeta,
  getValueSlug,
  normalizePathname,
  resolveRoute,
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

interface AppProps {
  initialPathname?: string;
}

export default function App({ initialPathname = '/' }: AppProps) {
  const [selectedCategory, setSelectedCategory] = useState<ValueCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined'
      ? normalizePathname(window.location.pathname)
      : normalizePathname(initialPathname)
  );

  // Stories list state (initializes cleanly with STORIES for SSR/hydration, then syncs localStorage)
  const [storiesList, setStoriesList] = useState<Story[]>(STORIES);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cuentos_custom_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleaned = parsed.map((item: Story) => {
            const updated = { ...item };
            const baseStory = STORIES.find((s) => s.id === updated.id);
            if (updated.pdfUrl && updated.pdfUrl.includes('_demo/view')) {
              updated.pdfUrl = '';
            }
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

  // Listen to browser back/forward history
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      setCurrentPath(normalizePathname(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document head metadata dynamically on SPA navigation
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const seo = getRouteSeoMeta(currentPath);
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', seo.description);
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', seo.canonical);
  }, [currentPath]);

  const navigateTo = (href: string) => {
    if (typeof window === 'undefined') return;
    const [rawPath, hashPart] = href.split('#');
    const nextPath = normalizePathname(rawPath || '/');

    if (normalizePathname(window.location.pathname) !== nextPath || window.location.hash !== (hashPart ? `#${hashPart}` : '')) {
      window.history.pushState({}, '', hashPart ? `${nextPath}#${hashPart}` : nextPath);
    }
    setCurrentPath(nextPath);

    if (hashPart) {
      setTimeout(() => {
        const el = document.getElementById(hashPart);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
    if (q.trim() && currentPath !== '/') {
      navigateTo('/#cuentos');
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

  // Filtered stories
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

  const resolvedRoute = useMemo(
    () => resolveRoute(currentPath, storiesList),
    [currentPath, storiesList]
  );

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800 font-sans">
      {/* Top Navigation */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenManual={() => setIsManualOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenChatbot={openChatbot}
        onNavigate={navigateTo}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {resolvedRoute.type === 'story' ? (
          <StoryDetailPage
            story={resolvedRoute.story}
            allStories={storiesList}
            onNavigate={navigateTo}
            onOpenReaderModal={(s) => setReadingStory(s)}
            onOpenColoring={(s) => setColoringStory(s)}
          />
        ) : resolvedRoute.type === 'value' ? (
          <ValueLandingPage
            valueInfo={resolvedRoute.valueInfo}
            matchingStories={resolvedRoute.stories}
            onNavigate={navigateTo}
            onOpenReaderModal={(s) => setReadingStory(s)}
            onOpenColoring={(s) => setColoringStory(s)}
          />
        ) : resolvedRoute.type === 'belen' ? (
          <BelenRecortablePage onNavigate={navigateTo} allStories={storiesList} />
        ) : resolvedRoute.type === 'coloring' ? (
          <ColoringGalleryPage
            stories={storiesList}
            onOpenColoring={(s) => setColoringStory(s)}
            onNavigate={navigateTo}
          />
        ) : resolvedRoute.type === 'prayers' ? (
          <PrayersPage onNavigate={navigateTo} />
        ) : resolvedRoute.type === 'about' ? (
          <AboutAuthorPage
            onNavigate={navigateTo}
            onOpenContact={() => setIsContactOpen(true)}
          />
        ) : resolvedRoute.type === 'legal' ? (
          <LegalPrivacyPage
            onNavigate={navigateTo}
            onOpenContact={() => setIsContactOpen(true)}
          />
        ) : (
          <>
            {/* Hero Banner with Title, Intro and Filter Pills */}
            <Hero
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categories={ALL_CATEGORIES}
              totalStories={filteredStories.length}
              onOpenChatbot={openChatbot}
              onNavigate={navigateTo}
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
                        ? 'Explora nuestros cuentos según el valor que quieras enseñar'
                        : `Cuentos de ${selectedCategory}`}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Escucha el audiocuento en el reproductor o entra en el cuento para leerlo completo en familia
                  </p>
                </div>

                {/* Active filter badge / reset / direct value page link */}
                {(selectedCategory !== 'Todos' || searchQuery) && (
                  <div className="flex flex-wrap items-center gap-3">
                    {selectedCategory !== 'Todos' && (
                      <a
                        href={`/valores/${getValueSlug(selectedCategory)}/`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(`/valores/${getValueSlug(selectedCategory)}/`);
                        }}
                        className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors"
                      >
                        Abrir guía de {selectedCategory} →
                      </a>
                    )}
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
                  </div>
                )}
              </div>

              {/* Cards Grid */}
              {filteredStories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {filteredStories.map((story) => (
                    <StoryCard
                      key={story.id}
                      story={story}
                      onOpenReader={(s) => setReadingStory(s)}
                      onOpenColoring={(s) => setColoringStory(s)}
                      onNavigate={navigateTo}
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

            {/* Section of Direct Downloads (Coloring sheets and printable resources) */}
            <DownloadsSection
              stories={storiesList}
              onOpenColoring={(s) => setColoringStory(s)}
            />

            {/* Belén Recortable Navideño (Craft activity for children & families) */}
            <BelenRecortableSection
              onOpenColoringStory={(storyId) => {
                const found = storiesList.find((s) => s.id === storyId);
                if (found) setColoringStory(found);
              }}
            />

            {/* Dedicated Section for Children's Prayers & Moments of Family Calm */}
            <PrayersSection />

            {/* Guide of values and virtues for parents, teachers & catechesis */}
            <ValuesGuideSection onNavigate={navigateTo} />

            {/* Visible FAQ Section for families and schools */}
            <FaqSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onOpenManual={() => setIsManualOpen(true)}
        onOpenChatbot={openChatbot}
        onNavigate={navigateTo}
      />

      {/* Interactive Story Reader Modal */}
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

      {/* Interactive Coloring Studio Modal */}
      {coloringStory && (
        <Suspense fallback={null}>
          <ColoringStudioModal
            story={coloringStory}
            onClose={() => setColoringStory(null)}
          />
        </Suspense>
      )}

      {/* Contact / Suggestion Modal */}
      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
        </Suspense>
      )}

      {/* Complete User Manual Modal */}
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

      {/* Private Admin Panel Modal */}
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

      {/* Floating Magic Launcher for AI Story Chatbot */}
      <StoryChatbotLauncher onClick={openChatbot} />

      {/* Interactive AI Story Chatbot Modal (lazy-loaded on first open, then preserved) */}
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
