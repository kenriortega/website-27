import Link from "next/link";

import type { ArticleSummary } from "@/lib/articles/types";

type ArticleCardProps = {
  article: ArticleSummary;
  headingLevel?: "h2" | "h3";
};

function formatPublishedAt(publishedAt: string) {
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(publishedAt));
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="border border-border bg-surface p-6">
      <div className="flex flex-wrap items-center gap-3 font-mono text-sm text-muted">
        <span className="text-accent">{article.level}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={article.publishedAt}>
          {formatPublishedAt(article.publishedAt)}
        </time>
      </div>

      <h2 className="mt-5 text-2xl font-semibold tracking-tight">
        {article.title}
      </h2>

      <p className="mt-3 leading-7 text-muted">{article.description}</p>

      <ul
        className="mt-5 flex flex-wrap gap-2"
        aria-label={`Etiquetas de ${article.title}`}
      >
        {article.tags.map((tag) => (
          <li
            key={tag}
            className="border border-border px-2.5 py-1 font-mono text-xs text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>

      <Link
        href={`/blog/${article.slug}`}
        className="mt-6 inline-flex min-h-11 items-center font-medium text-accent transition-colors hover:text-accent-strong"
      >
        Leer artículo
        <span className="ml-2" aria-hidden="true">
          →
        </span>
      </Link>
    </article>
  );
}
