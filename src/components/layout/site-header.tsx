import Link from "next/link";

const navigation = [
  {
    href: "/blog",
    label: "Artículos",
  },
  {
    href: "/proyectos",
    label: "Proyectos",
  },
  {
    href: "/vlogs",
    label: "Vlogs",
  },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="w-fit font-mono text-lg font-semibold tracking-tight"
          aria-label="Ir al inicio de KenriDev"
        >
          Kenri<span className="text-accent">Dev</span>
        </Link>

        <nav
          className="flex gap-5 overflow-x-auto text-sm text-muted"
          aria-label="Navegación principal"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
