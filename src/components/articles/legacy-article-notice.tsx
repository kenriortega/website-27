type LegacyArticleNoticeProps = {
  publishedAt: string;
};

function formatPublishedAt(publishedAt: string) {
  return new Intl.DateTimeFormat("es", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(publishedAt));
}

export function LegacyArticleNotice({
  publishedAt,
}: LegacyArticleNoticeProps) {
  return (
    <aside
      aria-label="Aviso de contenido histórico"
      className="mt-10 border border-accent/50 bg-accent-soft p-5 text-foreground"
    >
      <p className="font-mono text-xs uppercase tracking-wider text-accent-strong">
        Archivo KenriDev
      </p>
      <p className="mt-2 leading-7">
        Este artículo se publicó originalmente en {formatPublishedAt(publishedAt)}.
        Se conserva como parte del archivo histórico de KenriDev y puede usar
        versiones anteriores de las herramientas mencionadas.
      </p>
    </aside>
  );
}
