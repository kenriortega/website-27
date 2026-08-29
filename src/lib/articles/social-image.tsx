import { ImageResponse } from "next/og";

export const articleSocialImageSize = {
  width: 1200,
  height: 630,
};

type CreateArticleSocialImageOptions = {
  title: string;
  seriesTitle?: string;
};

export function createArticleSocialImage({
  title,
  seriesTitle,
}: CreateArticleSocialImageOptions) {
  const titleFontSize = title.length > 70 ? 54 : 64;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#080c10",
        color: "#f2f5f7",
        padding: "72px",
        border: "16px solid #10171f",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 28,
        }}
      >
        <span style={{ color: "#2dd4bf", fontWeight: 700 }}>KenriDev</span>
        <span style={{ color: "#94a3b8" }}>
          {seriesTitle ?? "Desarrollo de software · DevOps"}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "1040px",
        }}
      >
        <span
          style={{
            color: "#2dd4bf",
            fontFamily: "monospace",
            fontSize: 24,
            marginBottom: 24,
          }}
        >
          $ cat ./articulo
        </span>
        <span
          style={{
            fontSize: titleFontSize,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#94a3b8",
          fontSize: 22,
        }}
      >
        <span>Aprender · Construir · Compartir</span>
        <span>kenridev.vercel.app</span>
      </div>
    </div>,
    articleSocialImageSize,
  );
}
