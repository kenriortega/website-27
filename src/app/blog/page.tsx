import type { Metadata } from "next";

import { ArticleCard } from "@/components/articles/article-card";
import { getAllArticles } from "@/lib/articles/registry";

export const metadata: Metadata = {
  title: "Artículos",
  description:
    "Artículos sobre desarrollo de software, DevOps y Data Engineering explicados mediante experiencias prácticas.",
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
