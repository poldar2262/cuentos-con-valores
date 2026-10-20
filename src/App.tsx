import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StoryCard } from './components/StoryCard';
import { DownloadsSection } from './components/DownloadsSection';
import { BelenRecortableSection } from './components/BelenRecortableSection';
import { ValuesGuideSection } from './components/ValuesGuideSection';
import { PrayersSection } from './components/PrayersSection';
import { StoryReaderModal } from './components/StoryReaderModal';
import { ColoringStudioModal } from './components/ColoringStudioModal';
import { ContactModal } from './components/ContactModal';
import { ManualModal } from './components/ManualModal';
import { AdminModal } from './components/AdminModal';
import { StoryChatbotModal } from './components/StoryChatbotModal';
import { StoryChatbotLauncher } from './components/StoryChatbotLauncher';
import { Footer } from './components/Footer';
import { STORIES } from './data/stories';
import { Story, ValueCategory } from './types';
import { BookOpen, Sparkles, Filter, Smile } from 'lucide-react';

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

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ValueCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Stories list state with local storage persistence for admin additions
  const [storiesList, setStoriesList] = useState<Story[]>(() => {
    try {
      const saved = localStorage.getItem('cuentos_custom_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Clean out placeholder demo links from earlier testing versions if present
          const cleaned = parsed.map((item: Story) => {
            let updated = { ...item };
            if (updated.pdfUrl && updated.pdfUrl.includes('_demo/view')) {
              updated.pdfUrl = '';
            }
            if (updated.coloringPdfUrl && updated.coloringPdfUrl.includes('_demo/view')) {
              updated.coloringPdfUrl = '';
            }
            return updated;
          });
          localStorage.setItem('cuentos_custom_list', JSON.stringify(cleaned));
          return cleaned;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return STORIES;
  });

  // Modals state
  const [readingStory, setReadingStory] = useState<Story | null>(null);
  const [coloringStory, setColoringStory] = useState<Story | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isManualOpen, setIsManualOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);

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
      // Category match
      const matchesCategory =
        selectedCategory === 'Todos' ||
        story.value.toLowerCase() === selectedCategory.toLowerCase();

      // Search match
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

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800 font-sans">
      {/* Top Navigation */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenManual={() => setIsManualOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenChatbot={() => setIsChatbotOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Banner with Title, Intro and Filter Pills */}
        <Hero
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={ALL_CATEGORIES}
          totalStories={filteredStories.length}
          onOpenChatbot={() => setIsChatbotOpen(true)}
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
                    ? 'Colección de Cuentos Infantiles'
                    : `Cuentos de ${selectedCategory}`}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Escucha el audiocuento en el reproductor o abre el libro para leer en familia
              </p>
            </div>

            {/* Active filter badge / reset */}
            {(selectedCategory !== 'Todos' || searchQuery) && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">
                  Filtro activo: {selectedCategory !== 'Todos' ? selectedCategory : ''}{' '}
                  {searchQuery ? `"${searchQuery}"` : ''}
                </span>
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

        {/* Section of Direct Downloads (Coloring sheets and printable PDFs) */}
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

        {/* Guide of values and virtues for parents and teachers */}
        <ValuesGuideSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onOpenManual={() => setIsManualOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenChatbot={() => setIsChatbotOpen(true)}
      />

      {/* Interactive Story Reader Modal */}
      {readingStory && (
        <StoryReaderModal
          story={readingStory}
          onClose={() => setReadingStory(null)}
          onOpenColoring={(s) => {
            setReadingStory(null);
            setColoringStory(s);
          }}
        />
      )}

      {/* Interactive Coloring Studio & Printable PDF Modal */}
      {coloringStory && (
        <ColoringStudioModal
          story={coloringStory}
          onClose={() => setColoringStory(null)}
        />
      )}

      {/* Contact / Suggestion Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Complete User Manual Modal */}
      <ManualModal
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
        onOpenChatbot={() => {
          setIsManualOpen(false);
          setIsChatbotOpen(true);
        }}
      />

      {/* Private Admin Panel Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        stories={storiesList}
        onAddStory={handleAddStory}
        onUpdateStory={handleUpdateStory}
        onDeleteStory={handleDeleteStory}
      />

      {/* Floating Magic Launcher for AI Story Chatbot */}
      <StoryChatbotLauncher onClick={() => setIsChatbotOpen(true)} />

      {/* Interactive AI Story Chatbot Modal */}
      <StoryChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </div>
  );
}
