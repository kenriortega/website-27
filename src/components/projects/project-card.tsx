import Image from "next/image";
import Link from "next/link";

import type { Project, ProjectStatus } from "@/lib/projects/types";

type ProjectCardProps = {
  project: Project;
  headingLevel?: "h2" | "h3";
  eager?: boolean;
};

const statusLabels: Record<ProjectStatus, string> = {
  active: "Activo",
  completed: "Completado",
  "case-study": "Caso de estudio",
  "open-source": "Open source",
};

export function ProjectCard({
  project,
  headingLevel = "h2",
  eager = false,
}: ProjectCardProps) {
  const Heading = headingLevel;
  const coverImage = project.images[0];

  return (
    <article className="flex h-full flex-col overflow-hidden border border-border bg-surface">
      {coverImage ? (
        <Image
          src={coverImage.src}
          alt={coverImage.alt}
          width={coverImage.width}
          height={coverImage.height}
          sizes="(max-width: 1024px) 100vw, 50vw"
          loading={eager ? "eager" : "lazy"}
          className="aspect-[16/7] w-full border-b border-border bg-surface-elevated object-cover"
        />
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3 font-mono text-sm text-muted">
          <span className="text-accent">{statusLabels[project.status]}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </div>

        <Heading className="mt-5 text-2xl font-semibold tracking-tight">
          {project.title}
        </Heading>

        <p className="mt-3 leading-7 text-muted">{project.summary}</p>

        <ul
          className="mt-5 flex flex-wrap gap-2"
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

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          <Link
            href={`/proyectos/${project.slug}`}
            className="inline-flex min-h-11 items-center font-medium text-accent transition-colors hover:text-accent-strong"
          >
            Ver proyecto
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>

          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center font-medium text-muted transition-colors hover:text-accent"
          >
            Repositorio
            <span className="ml-2" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
