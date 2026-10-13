export interface Story {
  id: string;
  title: string;
  author?: string;
  value: string;
  valueDescription: string;
  valueBadgeColor: string;
  valueBadgeBg: string;
  valueBorderColor: string;
  ageRange: string;
  readingTime: string;
  summary: string;
  coverImage: string;
  pdfUrl?: string; // Enlace a Google Drive o archivo PDF descargable
  coloringPdfUrl?: string; // Enlace a Google Drive o archivo PDF para colorear
  bookType?: 'cuento' | 'colorear' | 'ambos';
  audioUrl: string;
  audioDuration: string;
  moralLesson: string;
  discussionQuestions: string[];
  pages: {
    pageNumber: number;
    text: string;
    illustrationDescription: string;
  }[];
  coloringSheet: {
    id: string;
    title: string;
    characterName: string;
    svgId: string;
    lineartImage?: string;
  };
}

export type ValueCategory =
  | 'Todos'
  | 'Honestidad'
  | 'Valentía'
  | 'Empatía'
  | 'Generosidad'
  | 'Paciencia'
  | 'Cooperación'
  | 'Amistad';
