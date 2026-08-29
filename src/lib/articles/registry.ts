import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";

import { estimateReadingTime } from "./reading-time";
import type { ArticleSummary } from "./types";

const articleLoaders = {
  "bienvenida-a-kenridev": () =>
    import("@/content/articles/bienvenida-a-kenridev.mdx"),
  "redis-serie-part-1": () =>
    import("@/content/articles/redis-serie-part-1.mdx"),
  "redis-serie-part-2": () =>
    import("@/content/articles/redis-serie-part-2.mdx"),
  "redis-serie-part-3": () =>
    import("@/content/articles/redis-serie-part-3.mdx"),
  "redis-serie-dev-part-1": () =>
    import("@/content/articles/redis-serie-dev-part-1.mdx"),
  "redis-serie-dev-part-2": () =>
    import("@/content/articles/redis-serie-dev-part-2.mdx"),
  "redis-serie-dev-part-3": () =>
    import("@/content/articles/redis-serie-dev-part-3.mdx"),
  "redis-serie-dev-part-4": () =>
    import("@/content/articles/redis-serie-dev-part-4.mdx"),
  "kafka-serie-part-1": () =>
    import("@/content/articles/kafka-serie-part-1.mdx"),
  "kafka-serie-part-2": () =>
    import("@/content/articles/kafka-serie-part-2.mdx"),
} as const;

type ArticleSlug = keyof typeof articleLoaders;

const canViewDrafts = process.env.NODE_ENV === "development";

function isArticleSlug(slug: string): slug is ArticleSlug {
  return Object.prototype.hasOwnProperty.call(articleLoaders, slug);
}

const loadArticle = cache(async function loadArticle(slug: ArticleSlug) {
  return articleLoaders[slug]();
});

async function readArticleSource(slug: ArticleSlug) {
  return readFile(
    join(process.cwd(), "src", "content", "articles", `${slug}.mdx`),
    "utf8",
  );
}

export const getArticleMetadata = cache(async function getArticleMetadata(
  slug: string,
) {
  if (!isArticleSlug(slug)) {
    return undefined;
  }

  const { metadata } = await loadArticle(slug);

  if (metadata.draft && !canViewDrafts) {
    return undefined;
  }

  return {
    slug,
    metadata,
  };
});

export const getArticle = cache(async function getArticle(slug: string) {
  const articleMetadata = await getArticleMetadata(slug);

  if (!articleMetadata) {
    return undefined;
  }

  const [article, source] = await Promise.all([
    loadArticle(articleMetadata.slug),
    readArticleSource(articleMetadata.slug),
  ]);

  return {
    slug,
    ...article,
    readingTime: estimateReadingTime(source),
  };
});

export const getAllArticles = cache(async function getAllArticles(): Promise<
  ArticleSummary[]
> {
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
    .filter((article) => canViewDrafts || !article.draft)
    .sort((first, second) =>
      second.publishedAt.localeCompare(first.publishedAt),
    );
});

export async function getSeriesNavigation(
  currentSlug: string,
  seriesSlug: string,
) {
  const articles = (await getAllArticles())
    .filter((article) => article.series?.slug === seriesSlug)
    .sort(
      (first, second) =>
        (first.series?.order ?? 0) - (second.series?.order ?? 0),
    );
  const currentIndex = articles.findIndex(
    (article) => article.slug === currentSlug,
  );

  if (currentIndex === -1) {
    return {};
  }

  return {
    previous: articles[currentIndex - 1],
    next: articles[currentIndex + 1],
  };
}

export async function getFeaturedArticles(
  limit = 3,
): Promise<ArticleSummary[]> {
  const articles = await getAllArticles();

  return articles
    .filter((article) => article.featured)
    .slice(0, limit);
}
