import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(120deg, #0a0a0a 0%, #111827 50%, #1f2937 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700 }}>{siteConfig.name}</div>
        <div style={{ fontSize: 28, marginTop: 22, maxWidth: 900, lineHeight: 1.3 }}>
          Influence, Talents, Studio Créatif & Stratégie
        </div>
        <div style={{ fontSize: 20, marginTop: 16, color: "#d1d5db" }}>
          Campagnes traçables, production brand-ready.
        </div>
      </div>
    ),
    size
  );
}
