import type { Metadata } from "next";

import { ArticleCard } from "@/components/articles/article-card";
import { getAllArticles } from "@/lib/articles/registry";
import { siteConfig } from "@/lib/site";

const description =
  "Artículos sobre desarrollo de software, DevOps y Data Engineering explicados mediante experiencias prácticas.";

export const metadata: Metadata = {
  title: "Artículos",
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    title: "Artículos",
    description,
    url: "/blog",
    siteName: siteConfig.name,
    locale: "es_ES",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Artículos de KenriDev sobre software, DevOps y datos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artículos de KenriDev",
    description,
    images: ["/opengraph-image"],
  },
};

export default async function BlogPage() {
  const articles = await getAllArticles();

  return (
    <>
      <header className="max-w-3xl">
        <p className="font-mono text-sm text-accent">
          <span aria-hidden="true">$ </span>
          ls ./articulos
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Artículos
        </h1>

        <p className="mt-5 text-lg leading-8 text-muted">
          Explicaciones paso a paso sobre desarrollo de software, DevOps y
          Data Engineering, acompañadas de proyectos y aprendizajes reales.
        </p>
      </header>

      <section
        className="mt-12 max-w-4xl space-y-6"
        aria-label="Listado de artículos"
      >
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))
        ) : (
          <p className="border border-border bg-surface p-6 text-muted">
            Todavía no hay artículos publicados.
          </p>
        )}
      </section>
    </>
  );
}
