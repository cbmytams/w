import type { Metadata } from "next";
import { siteConfig, sitePaths } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Studio Créatif – Production, UGC & Assets",
  description:
    "Studio Wafia : production UGC, formats sociaux, captations, films de marque et assets réutilisables pour campagnes, talents et marques.",
  alternates: {
    canonical: sitePaths.studio,
  },
  openGraph: {
    title: "Studio Créatif – Production, UGC & Assets | Wafia",
    description:
      "Studio Wafia : production UGC, formats sociaux, captations, films de marque et assets réutilisables pour campagnes, talents et marques.",
    url: sitePaths.studio,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Créatif | Wafia",
    description:
      "Studio Wafia : production UGC, formats sociaux, captations, films de marque et assets réutilisables pour campagnes, talents et marques.",
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
              {
                name: "Accueil",
                url: new URL(sitePaths.home, siteConfig.url).toString(),
              },
              {
                name: "Studio",
                url: new URL(sitePaths.studio, siteConfig.url).toString(),
              },
            ])
          ),
        }}
      />
    </>
  );
}
