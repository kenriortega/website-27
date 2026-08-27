export type ArticleLevel =
  | "principiante"
  | "intermedio"
  | "avanzado";

export type ArticleLanguage = "es" | "en";

export type ArticleMetadata = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  level: ArticleLevel;
  language: ArticleLanguage;
  draft: boolean;
  featured?: boolean;
  repositoryUrl?: string;
  youtubeUrl?: string;
};

export type ArticleSummary = ArticleMetadata & {
  slug: string;
};
