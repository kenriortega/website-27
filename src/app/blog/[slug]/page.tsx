import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllArticles, getArticle } from "@/lib/articles/registry";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPublishedAt(publishedAt: string) {
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(publishedAt));
}

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.metadata.title,
    description: article.metadata.description,
  };
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const { default: ArticleContent, metadata } = article;

  return (
    <article className="mx-auto max-w-3xl">
      <header className="border-b border-border pb-10">
        <div className="flex flex-wrap items-center gap-3 font-mono text-sm text-muted">
          <span className="text-accent">{metadata.level}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={metadata.publishedAt}>
            {formatPublishedAt(metadata.publishedAt)}
          </time>
        </div>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          {metadata.title}
        </h1>

        <p className="mt-5 text-lg leading-8 text-muted">
          {metadata.description}
        </p>

        <ul
          className="mt-6 flex flex-wrap gap-2"
          aria-label={`Etiquetas de ${metadata.title}`}
        >
          {metadata.tags.map((tag) => (
            <li
              key={tag}
              className="border border-border px-2.5 py-1 font-mono text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-10">
        <ArticleContent />
      </div>
    </article>
  );
}
