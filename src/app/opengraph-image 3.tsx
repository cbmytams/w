import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div style={{ fontSize: 60, fontWeight: 700 }}>{siteConfig.name}</div>
        <div style={{ fontSize: 30, marginTop: 24, maxWidth: 900, lineHeight: 1.3 }}>
          Influence, Talents, Studio Créatif & Stratégie
        </div>
        <div style={{ fontSize: 22, marginTop: 16, color: "#d1d5db" }}>
          Campagnes traçables, production brand-ready.
        </div>
        <div style={{
          marginTop: 48,
          height: 6,
          width: 220,
          background: "linear-gradient(90deg, #f97316 0%, #ef4444 50%, #ec4899 100%)",
          borderRadius: 999,
        }} />
      </div>
    ),
    size
  );
}
