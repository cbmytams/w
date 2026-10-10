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
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#151716",
        color: "white",
      }}
    >
      <div style={{ fontSize: 60, fontWeight: 700 }}>{siteConfig.name}</div>
      <div
        style={{ fontSize: 30, marginTop: 24, maxWidth: 900, lineHeight: 1.3 }}
      >
        Influence · Studio · Production
      </div>
      <div
        style={{
          marginTop: 48,
          height: 6,
          width: 220,
          background: "#e54c2c",
          borderRadius: 999,
        }}
      />
    </div>,
    size
  );
}
