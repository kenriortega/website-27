import type { Metadata } from "next";
import Link from "next/link";

import { ArticleCard } from "@/components/articles/article-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProjectCard } from "@/components/projects/project-card";
import { getFeaturedArticles } from "@/lib/articles/registry";
import { getFeaturedProjects } from "@/lib/projects/registry";
import { siteConfig } from "@/lib/site";

const description = siteConfig.description;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: siteConfig.name,
    description,
    url: "/",
    siteName: siteConfig.name,
    locale: "es_ES",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "KenriDev: desarrollo de software, DevOps y Data Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description,
    images: ["/opengraph-image"],
  },
};

const contentAreas = [
  {
    id: "articulos",
    label: "01",
    title: "Artículos",
    description:
      "Explicaciones paso a paso sobre problemas reales, decisiones técnicas y aprendizajes.",
    href: "/blog",
    linkLabel: "Explorar artículos",
  },
  {
    id: "proyectos",
    label: "02",
    title: "Proyectos",
    description:
      "Código funcional y reproducible para explorar cada concepto con mayor profundidad.",
    href: "/proyectos",
    linkLabel: "Explorar proyectos",
  },
  {
    id: "vlogs",
    label: "03",
    title: "Vlogs",
    description:
      "El proceso detrás del código: experimentos, errores, decisiones y resultados.",
    href: "/vlogs",
    linkLabel: "Próximamente",
  },
] as const;

export default async function Home() {
  const featuredArticles = await getFeaturedArticles();
  const featuredProjects = getFeaturedProjects();

  return (
    <div
      id="inicio"
      className="min-h-screen bg-background text-foreground"
    >
      <SiteHeader />

      <main id="main-content">
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-6 w-fit border border-border bg-surface px-3 py-1.5 font-mono text-sm text-accent">
              <span aria-hidden="true">$ </span>
              whoami
            </p>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Aprendiendo en público.
              <span className="block text-accent">
                Construyendo con propósito.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Desarrollo de software, DevOps y Data Engineering explicados
              mediante artículos, proyectos reproducibles y vlogs en español.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-11 items-center justify-center bg-accent px-5 py-3 font-medium text-background transition-colors hover:bg-accent-strong"
                href="/blog"
              >
                Leer artículos
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center border border-border bg-surface px-5 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
                href="/proyectos"
              >
                Explorar proyectos
              </Link>
            </div>

            <ul
              className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm text-muted"
              aria-label="Temas principales"
            >
              <li>Software Development</li>
              <li>DevOps</li>
              <li>Data Engineering</li>
            </ul>
          </div>

          <aside
            className="border border-border bg-surface"
            aria-label="Perfil técnico de KenriDev"
          >
            <div
              className="flex items-center gap-2 border-b border-border px-5 py-4"
              aria-hidden="true"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
            </div>

            <div className="space-y-5 p-6 font-mono text-sm">
              <p className="text-muted">
                <span className="text-accent">kenri@dev</span>:~$ cat focus.json
              </p>

              <dl className="space-y-4">
                <div>
                  <dt className="text-muted">enfoque</dt>
                  <dd className="mt-1 text-foreground">
                    software · devops · data
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">compartiendo</dt>
                  <dd className="mt-1 text-foreground">
                    artículos · proyectos · vlogs
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">idioma</dt>
                  <dd className="mt-1 text-foreground">
                    español → english
                  </dd>
                </div>
              </dl>

              <p className="text-accent">
                <span aria-hidden="true">✓ </span>
                listo para aprender
              </p>
            </div>
          </aside>
        </section>

        <section
          className="border-t border-border"
          aria-labelledby="featured-projects-heading"
        >
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-sm text-accent">
                  Soluciones construidas
                </p>
                <h2
                  id="featured-projects-heading"
                  className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  Proyectos destacados
                </h2>
              </div>

              <Link
                href="/proyectos"
                className="inline-flex min-h-11 items-center font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Ver todos los proyectos
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  headingLevel="h3"
                />
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-t border-border bg-surface-elevated"
          aria-labelledby="content-heading"
        >
          <div className="mx-auto max-w-6xl px-6 py-20">
            <p className="font-mono text-sm text-accent">
              Tres formas de aprender
            </p>
            <h2
              id="content-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Del concepto a la práctica
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {contentAreas.map((area) => (
                <article
                  id={area.id}
                  key={area.id}
                  className="scroll-mt-8 flex flex-col border border-border bg-surface p-6"
                >
                  <p className="font-mono text-sm text-accent">{area.label}</p>
                  <h3 className="mt-8 text-xl font-semibold">{area.title}</h3>
                  <p className="mt-3 leading-7 text-muted">
                    {area.description}
                  </p>
                  {"href" in area ? (
                    <Link
                      href={area.href}
                      className="mt-auto inline-flex min-h-11 items-center pt-6 font-medium text-accent transition-colors hover:text-accent-strong"
                    >
                      {area.linkLabel}
                      <span className="ml-2" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-t border-border"
          aria-labelledby="featured-articles-heading"
        >
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-sm text-accent">
                  Publicaciones seleccionadas
                </p>
                <h2
                  id="featured-articles-heading"
                  className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  Artículos destacados
                </h2>
              </div>

              <Link
                href="/blog"
                className="inline-flex min-h-11 items-center font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Ver todos los artículos
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {featuredArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  headingLevel="h3"
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
