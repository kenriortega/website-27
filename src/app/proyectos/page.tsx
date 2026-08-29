import type { Metadata } from "next";

import { ProjectCard } from "@/components/projects/project-card";
import { getAllProjects } from "@/lib/projects/registry";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos y casos de estudio de KenriDev sobre desarrollo de software, DevOps y Data Engineering.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <header className="max-w-3xl">
        <p className="font-mono text-sm text-accent">
          <span aria-hidden="true">$ </span>
          ls ./proyectos
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Proyectos
        </h1>

        <p className="mt-5 text-lg leading-8 text-muted">
          Soluciones, experimentos y casos de estudio construidos para llevar
          conceptos de software, DevOps y datos a la práctica.
        </p>
      </header>

      <section
        className="mt-12 grid gap-6 lg:grid-cols-2"
        aria-label="Catálogo de proyectos"
      >
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              eager={index < 2}
            />
          ))
        ) : (
          <p className="border border-border bg-surface p-6 text-muted">
            Todavía no hay proyectos publicados.
          </p>
        )}
      </section>
    </>
  );
}
