import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/questionnaire/", "/api/", "/platform/"],
      },
    ],
    sitemap: [
      new URL("/sitemap.xml", siteConfig.url).toString(),
      new URL("/wiki/sitemap.xml", siteConfig.url).toString(),
    ],
    host: siteConfig.url,
  };
}
