import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const siteSocialImageSize = {
  width: 1200,
  height: 630,
};

export function createSiteSocialImage() {
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
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 28,
        }}
      >
        <span style={{ color: "#2dd4bf", fontWeight: 700 }}>KenriDev</span>
        <span style={{ color: "#94a3b8" }}>Aprendiendo en público</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            color: "#2dd4bf",
            fontFamily: "monospace",
            fontSize: 24,
            marginBottom: 24,
          }}
        >
          $ whoami
        </span>
        <span
          style={{
            maxWidth: "980px",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
          }}
        >
          Desarrollo de software, DevOps y Data Engineering
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#94a3b8",
          fontSize: 22,
        }}
      >
        <span>Aprender · Construir · Compartir</span>
        <span>{siteConfig.url.hostname}</span>
      </div>
    </div>,
    siteSocialImageSize,
  );
}
