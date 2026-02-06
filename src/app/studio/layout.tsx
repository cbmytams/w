import type { Metadata } from "next";
import { siteConfig, sitePaths } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Studio créatif",
  description:
    "Studio Wafia : production social-first, formats verticaux, UGC et assets premium.",
  alternates: {
    canonical: sitePaths.studio,
  },
  openGraph: {
    title: "Studio créatif | Wafia",
    description:
      "Studio Wafia : production social-first, formats verticaux, UGC et assets premium.",
    url: sitePaths.studio,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Accueil", url: new URL(sitePaths.home, siteConfig.url).toString() },
              { name: "Studio", url: new URL(sitePaths.studio, siteConfig.url).toString() },
            ])
          ),
        }}
      />
    </>
  );
}
