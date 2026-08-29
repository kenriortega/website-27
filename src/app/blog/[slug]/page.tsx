import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleSeriesNavigation } from "@/components/articles/article-series-navigation";
import { LegacyArticleNotice } from "@/components/articles/legacy-article-notice";
import {
  getAllArticles,
  getArticle,
  getSeriesNavigation,
} from "@/lib/articles/registry";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

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

  const canonicalPath = `/blog/${slug}`;
  const publishedTime = new Date(article.metadata.publishedAt).toISOString();
  const modifiedTime = article.metadata.updatedAt
    ? new Date(article.metadata.updatedAt).toISOString()
    : undefined;

  return {
    title: article.metadata.title,
    description: article.metadata.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      title: article.metadata.title,
      description: article.metadata.description,
      url: canonicalPath,
      siteName: siteConfig.name,
      locale: article.metadata.language === "es" ? "es_ES" : "en_US",
      publishedTime,
      modifiedTime,
      authors: [siteConfig.author],
      tags: article.metadata.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.metadata.title,
      description: article.metadata.description,
    },
    robots: article.metadata.draft
      ? {
          index: false,
          follow: false,
        }
      : undefined,
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

  const { default: ArticleContent, metadata, readingTime } = article;
  const seriesNavigation = metadata.series
    ? await getSeriesNavigation(slug, metadata.series.slug)
    : undefined;
  const canonicalUrl = getAbsoluteUrl(`/blog/${slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: metadata.title,
    description: metadata.description,
    datePublished: metadata.publishedAt,
    dateModified: metadata.updatedAt ?? metadata.publishedAt,
    inLanguage: metadata.language,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url.toString(),
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url.toString(),
    },
    keywords: metadata.tags.join(", "),
    articleSection: metadata.series?.title ?? metadata.tags[0],
    timeRequired: `PT${readingTime.minutes}M`,
    isPartOf: metadata.series
      ? {
          "@type": "CreativeWorkSeries",
          name: metadata.series.title,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <article className="mx-auto max-w-3xl">
        <header className="border-b border-border pb-10">
          {metadata.draft ? (
            <p className="mb-5 w-fit border border-accent px-3 py-1 font-mono text-xs uppercase tracking-wide text-accent">
              Borrador
            </p>
          ) : null}

          {metadata.series ? (
            <p className="mb-4 font-mono text-sm text-accent">
              {metadata.series.title}
              <span className="text-muted">
                {" "}· Parte {metadata.series.order}
              </span>
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3 font-mono text-sm text-muted">
            <span className="text-accent">{metadata.level}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={metadata.publishedAt}>
              {formatPublishedAt(metadata.publishedAt)}
            </time>
            <span aria-hidden="true">·</span>
            <span>{readingTime.minutes} min de lectura</span>
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

          {metadata.repositoryUrl ? (
            <a
              href={metadata.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-11 items-center border border-border bg-surface px-4 py-2 font-medium text-accent transition-colors hover:border-accent hover:text-accent-strong"
            >
              Ver código del proyecto
              <span className="ml-2" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : null}
        </header>

        {metadata.legacy ? (
          <LegacyArticleNotice publishedAt={metadata.publishedAt} />
        ) : null}

        <div className="mt-10">
          <ArticleContent />
        </div>

        {metadata.series && seriesNavigation ? (
          <ArticleSeriesNavigation
            previous={seriesNavigation.previous}
            next={seriesNavigation.next}
          />
        ) : null}
      </article>
    </>
  );
}
