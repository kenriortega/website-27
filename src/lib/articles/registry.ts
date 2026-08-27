import type { ArticleSummary } from "./types";

const articleLoaders = {
  "bienvenida-a-kenridev": () =>
    import("@/content/articles/bienvenida-a-kenridev.mdx"),
} as const;

type ArticleSlug = keyof typeof articleLoaders;

function isArticleSlug(slug: string): slug is ArticleSlug {
  return Object.prototype.hasOwnProperty.call(articleLoaders, slug);
}

export async function getArticle(slug: string) {
  if (!isArticleSlug(slug)) {
    return undefined;
  }

  const article = await articleLoaders[slug]();

  if (article.metadata.draft) {
    return undefined;
  }

  return {
    slug,
    ...article,
  };
}

export async function getAllArticles(): Promise<ArticleSummary[]> {
  const articles = await Promise.all(
    Object.entries(articleLoaders).map(async ([slug, loadArticle]) => {
      const { metadata } = await loadArticle();

      return {
        ...metadata,
        slug,
      };
    }),
  );

  return articles
    .filter((article) => !article.draft)
    .sort((first, second) =>
      second.publishedAt.localeCompare(first.publishedAt),
    );
}

export async function getFeaturedArticles(
  limit = 3,
): Promise<ArticleSummary[]> {
  const articles = await getAllArticles();

  return articles
    .filter((article) => article.featured)
    .slice(0, limit);
}
