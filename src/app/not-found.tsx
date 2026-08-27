import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-background px-6 py-20 text-foreground">
      <div className="mx-auto w-full max-w-3xl">
        <p className="font-mono text-sm text-accent">
          <span aria-hidden="true">$ </span>
          status 404
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
          Página no encontrada
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          La ruta que intentas visitar no existe, fue movida o todavía no está
          disponible.
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
            className="inline-flex min-h-11 items-center justify-center border border-border bg-surface px-5 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Explorar artículos
          </Link>
        </div>
      </div>
    </main>
  );
}
