import type { Metadata } from "next";
import { siteConfig, sitePaths } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";
import { FAQ_ITEMS } from "@/constants";

export const metadata: Metadata = {
  title: "Campagnes Créateurs, Influence & Production",
  description:
    "Campagnes créateurs structurées de bout en bout : stratégie, casting, production, droits, reporting et assets réutilisables pour marques ambitieuses.",
  keywords: [
    "influence marketing",
    "campagne influence",
    "créateurs",
    "UGC",
    "marques",
    "DNVB",
  ],
  alternates: {
    canonical: sitePaths.forBrands,
  },
  openGraph: {
    title: "Wafia | Campagnes Créateurs pour Marques",
    description:
      "Stratégie, casting, production, droits et reporting pour transformer une campagne créateurs en actif exploitable.",
    url: sitePaths.forBrands,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wafia | Campagnes Créateurs pour Marques",
    description:
      "Stratégie, casting, production, droits et reporting pour transformer une campagne créateurs en actif exploitable.",
  },
};

export default function BrandsLayout({
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
                name: "Marques",
                url: new URL(sitePaths.forBrands, siteConfig.url).toString(),
              },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema([...FAQ_ITEMS])),
        }}
      />
    </>
  );
}
