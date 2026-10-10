import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b111a",
    icons: [
      { src: "/icon.svg?v=2", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
      { src: "/favicon.ico", sizes: "64x64", type: "image/x-icon" },
    ],
  };
}
