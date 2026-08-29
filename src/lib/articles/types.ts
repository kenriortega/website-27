export type ArticleLevel =
  | "principiante"
  | "intermedio"
  | "avanzado";

export type ArticleLanguage = "es" | "en";

export type ArticleSeries = {
  slug: string;
  title: string;
  order: number;
};

export type ArticleMetadata = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  level: ArticleLevel;
  language: ArticleLanguage;
  draft: boolean;
  legacy?: boolean;
  featured?: boolean;
  series?: ArticleSeries;
  repositoryUrl?: string;
  youtubeUrl?: string;
};

export type ArticleReadingTime = {
  minutes: number;
  words: number;
};

export type ArticleSummary = ArticleMetadata & {
  slug: string;
};
