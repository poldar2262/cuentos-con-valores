import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Palette, Clock, Users, Heart } from 'lucide-react';
import { Story } from '../types';
import { AudioPlayer } from './AudioPlayer';
import { getStoryUrl, getValueUrl } from '../data/seoRoutes';

interface StoryCardProps {
  story: Story;
  onOpenColoring: (story: Story) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onOpenColoring }) => {
  const fullText = story.pages.map((p) => p.text).join(' ');
  const storyHref = getStoryUrl(story.id);
  const valueHref = getValueUrl(story.value === 'Todos' ? 'honestidad' : story.value);

  return (
    <article
      id={`story-card-${story.id}`}
      className="group bg-white rounded-3xl overflow-hidden border-2 border-amber-100 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Story Illustration Header */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-amber-50">
          <Link
            to={storyHref}
            className="block w-full h-full"
            aria-label={`Leer el cuento completo ${story.title}`}
          >
            <img
              src={story.coverImage}
              alt={`Ilustración infantil sobre la ${story.value.toLowerCase()} en el cuento ${story.title}`}
              width={800}
              height={600}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </Link>

          {/* Value Badge Top Left */}
          <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
            <Link
              to={valueHref}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs border ${story.valueBadgeBg} ${story.valueBadgeColor} ${story.valueBorderColor} hover:opacity-90`}
            >
              <Heart className="w-3.5 h-3.5 fill-current opacity-80" />
              Valor: {story.value}
            </Link>
          </div>

          {/* Age range badge Top Right */}
          <div className="absolute top-3.5 right-3.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-slate-700 shadow-xs backdrop-blur-xs">
              <Users className="w-3 h-3 text-amber-500" />
              {story.ageRange}
            </span>
          </div>

          {/* Reading time chip bottom right */}
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-900/75 text-white backdrop-blur-xs">
              <Clock className="w-3 h-3 text-amber-300" />
              {story.readingTime}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {story.author && (
            <p className="text-xs font-bold text-amber-700 tracking-wide uppercase mb-1">
              De {story.author}
            </p>
          )}

          <h3
            id={`story-title-${story.id}`}
            className="font-display text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-snug group-hover:text-amber-600 transition-colors"
          >
            <Link to={storyHref} className="hover:underline">
              {story.title}
            </Link>
          </h3>

          <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
            {story.summary}
          </p>

          {/* Moral badge snippet */}
          <div className="mt-3.5 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/50 text-xs text-amber-900 flex items-start gap-2">
            <span className="text-amber-600 font-bold shrink-0">✨ Moraleja:</span>
            <span className="italic">{story.moralLesson}</span>
          </div>

          {/* Native HTML5 & Narration Audio Player */}
          <div className="mt-4">
            <AudioPlayer
              id={story.id}
              audioUrl={story.audioUrl}
              durationLabel={story.audioDuration}
              storyTitle={story.title}
              storyFullText={fullText}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="p-5 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <Link
          id={`btn-read-${story.id}`}
          to={storyHref}
          className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white font-bold text-sm shadow-xs hover:shadow-md transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span>Leer Cuento Completo</span>
        </Link>

        <button
          id={`btn-color-${story.id}`}
          type="button"
          onClick={() => onOpenColoring(story)}
          className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 active:scale-[0.98] text-white font-bold text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <Palette className="w-4 h-4" />
          <span>Colorear / Lámina</span>
        </button>
      </div>
    </article>
  );
};
