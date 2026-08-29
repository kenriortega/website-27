import Link from "next/link";

type SeriesArticleLink = {
  slug: string;
  title: string;
};

type ArticleSeriesNavigationProps = {
  previous?: SeriesArticleLink;
  next?: SeriesArticleLink;
};

export function ArticleSeriesNavigation({
  previous,
  next,
}: ArticleSeriesNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Navegación de la serie"
      className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          className="border border-border bg-surface p-5 transition-colors hover:border-accent"
        >
          <span className="font-mono text-xs uppercase tracking-wide text-muted">
            ← Artículo anterior
          </span>
          <span className="mt-2 block font-medium text-accent">
            {previous.title}
          </span>
        </Link>
      ) : null}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="border border-border bg-surface p-5 text-right transition-colors hover:border-accent sm:col-start-2"
        >
          <span className="font-mono text-xs uppercase tracking-wide text-muted">
            Artículo siguiente →
          </span>
          <span className="mt-2 block font-medium text-accent">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
