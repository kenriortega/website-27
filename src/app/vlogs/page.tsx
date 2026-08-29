import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vlogs",
  description:
    "La sección de vlogs de KenriDev está en construcción. Próximamente encontrarás contenido sobre software, DevOps y aprendizaje en público.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function VlogsPage() {
  return (
    <section
      className="w-full border border-border bg-surface p-7 sm:p-10"
      aria-labelledby="vlogs-heading"
    >
      <p className="font-mono text-sm text-accent">
        <span aria-hidden="true">$ </span>
        mkdir ./vlogs
      </p>

      <p className="mt-8 font-mono text-sm text-muted">
        Estado: preparando la primera publicación
      </p>

      <h1
        id="vlogs-heading"
        className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl"
      >
        Esta sección está en construcción.
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Estoy preparando un espacio para compartir el proceso detrás del
        código: decisiones, experimentos, errores y aprendizajes sobre
        desarrollo de software y DevOps.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center bg-accent px-5 py-3 font-medium text-background transition-colors hover:bg-accent-strong"
        >
          Volver al inicio
        </Link>
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center justify-center border border-border px-5 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
        >
          Leer artículos mientras tanto
        </Link>
      </div>
    </section>
  );
}
