import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectVideo } from "@/components/projects/project-video";
import { getArticleMetadata } from "@/lib/articles/registry";
import {
  getAllProjects,
  getProjectBySlug,
} from "@/lib/projects/registry";
import type { ProjectStatus } from "@/lib/projects/types";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const statusLabels: Record<ProjectStatus, string> = {
  active: "Activo",
  completed: "Completado",
  "case-study": "Caso de estudio",
  "open-source": "Open source",
};

const referenceTypeLabels = {
  documentation: "Documentación oficial",
  publication: "Publicación técnica",
} as const;

function formatReferenceDate(publishedAt: string) {
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(publishedAt));
}

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const canonicalPath = `/proyectos/${project.slug}`;
  const coverImage = project.images[0];

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      title: project.title,
      description: project.summary,
      url: canonicalPath,
      siteName: siteConfig.name,
      locale: "es_ES",
      images: coverImage
        ? [
            {
              url: coverImage.src,
              width: coverImage.width,
              height: coverImage.height,
              alt: coverImage.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: coverImage ? [coverImage.src] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedArticles = (
    await Promise.all(
      (project.relatedArticleSlugs ?? []).map((articleSlug) =>
        getArticleMetadata(articleSlug),
      ),
    )
  ).filter((article) => article !== undefined);
  const canonicalUrl = getAbsoluteUrl(`/proyectos/${project.slug}`);
  const narrativeSections = [
    {
      title: "El problema",
      content: project.challenge,
    },
    {
      title: "La solución",
      content: project.solution,
    },
    {
      title: "Mi participación",
      content: project.contribution,
    },
  ].filter(
    (section): section is { title: string; content: string } =>
      section.content !== undefined,
  );
  const hasEditorialContent =
    narrativeSections.length > 0 ||
    (project.learnings !== undefined && project.learnings.length > 0);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    url: canonicalUrl,
    codeRepository: project.repositoryUrl,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url.toString(),
    },
    keywords: project.technologies.join(", "),
    image: project.images[0]
      ? getAbsoluteUrl(project.images[0].src)
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

      <article className="mx-auto max-w-5xl">
        <Link
          href="/proyectos"
          className="inline-flex min-h-11 items-center font-medium text-accent transition-colors hover:text-accent-strong"
        >
          <span className="mr-2" aria-hidden="true">
            ←
          </span>
          Todos los proyectos
        </Link>

        <header className="mt-8 border-b border-border pb-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-sm text-muted">
            <span className="text-accent">
              {statusLabels[project.status]}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            {project.overview}
          </p>

          <ul
            className="mt-6 flex flex-wrap gap-2"
            aria-label={`Tecnologías de ${project.title}`}
          >
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="border border-border px-2.5 py-1 font-mono text-xs text-muted"
              >
                {technology}
              </li>
            ))}
          </ul>

          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-11 items-center border border-border bg-surface px-4 py-2 font-medium text-accent transition-colors hover:border-accent hover:text-accent-strong"
          >
            Ver repositorio
            <span className="ml-2" aria-hidden="true">
              ↗
            </span>
          </a>
        </header>

        {project.images.length > 0 ? (
          <section
            className="mt-12"
            aria-labelledby="project-gallery-heading"
          >
            <h2
              id="project-gallery-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Galería
            </h2>

            <div className="mt-6 grid gap-6">
              {project.images.map((image, index) => (
                <figure
                  key={image.src}
                  className="overflow-hidden border border-border bg-surface"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-auto w-full"
                  />
                  {image.caption ? (
                    <figcaption className="border-t border-border px-5 py-4 text-sm text-muted">
                      {image.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {hasEditorialContent ? (
          <section
            className="mt-12 border-t border-border pt-12"
            aria-labelledby="project-story-heading"
          >
            <h2
              id="project-story-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Historia del proyecto
            </h2>

            {narrativeSections.length > 0 ? (
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {narrativeSections.map((section) => (
                  <div
                    key={section.title}
                    className="border border-border bg-surface p-5"
                  >
                    <h3 className="text-lg font-semibold text-foreground">
                      {section.title}
                    </h3>
                    <p className="mt-3 leading-7 text-muted">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            {project.learnings && project.learnings.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground">
                  Aprendizajes
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.learnings.map((learning) => (
                    <li
                      key={learning}
                      className="border border-border bg-surface p-4 leading-7 text-muted"
                    >
                      <span className="mr-2 text-accent" aria-hidden="true">
                        →
                      </span>
                      {learning}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}

        <section
          className="mt-12 border-t border-border pt-12"
          aria-labelledby="project-highlights-heading"
        >
          <h2
            id="project-highlights-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Puntos destacados
          </h2>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="border border-border bg-surface p-5 leading-7 text-muted"
              >
                <span className="mr-2 text-accent" aria-hidden="true">
                  ✓
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        {project.references && project.references.length > 0 ? (
          <section
            className="mt-12 border-t border-border pt-12"
            aria-labelledby="project-references-heading"
          >
            <h2
              id="project-references-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Referencias y publicaciones
            </h2>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {project.references.map((reference) => (
                <a
                  key={reference.url}
                  href={reference.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col border border-border bg-surface p-5 transition-colors hover:border-accent"
                >
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
                    <span className="text-accent">
                      {referenceTypeLabels[reference.type]}
                    </span>
                    {reference.publishedAt ? (
                      <>
                        <span aria-hidden="true">·</span>
                        <time dateTime={reference.publishedAt}>
                          {formatReferenceDate(reference.publishedAt)}
                        </time>
                      </>
                    ) : null}
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {reference.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {reference.publisher}
                  </p>
                  <p className="mt-4 leading-7 text-muted">
                    {reference.description}
                  </p>
                  <span className="mt-auto inline-flex min-h-11 items-center pt-5 font-medium text-accent">
                    Abrir referencia
                    <span className="ml-2" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {project.videos.length > 0 ? (
          <section
            className="mt-12 border-t border-border pt-12"
            aria-labelledby="project-videos-heading"
          >
            <h2
              id="project-videos-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Videos
            </h2>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {project.videos.map((video) => (
                <ProjectVideo key={video.url} video={video} />
              ))}
            </div>
          </section>
        ) : null}

        {relatedArticles.length > 0 ? (
          <section
            className="mt-12 border-t border-border pt-12"
            aria-labelledby="related-articles-heading"
          >
            <h2
              id="related-articles-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Artículos relacionados
            </h2>

            <div className="mt-6 grid gap-4">
              {relatedArticles.map(({ slug: articleSlug, metadata }) => (
                <Link
                  key={articleSlug}
                  href={`/blog/${articleSlug}`}
                  className="border border-border bg-surface p-5 transition-colors hover:border-accent"
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {metadata.title}
                  </h3>
                  <p className="mt-2 leading-7 text-muted">
                    {metadata.description}
                  </p>
                  <span className="mt-4 inline-flex min-h-11 items-center font-medium text-accent">
                    Leer artículo
                    <span className="ml-2" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </>
  );
}
