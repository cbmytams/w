import type { Metadata } from "next";
import { siteConfig, sitePaths } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";
import { TALENT_FAQ } from "@/constants";

export const metadata: Metadata = {
  title: "Talent Management 360 & Stratégie d'Image",
  description:
    "Management 360 pour créateurs, artistes, comédiens, musiciens et talents hybrides : image, revenus, droits, production et opportunités.",
  keywords: [
    "talent management",
    "créateur",
    "artiste",
    "comédien",
    "artiste peintre",
    "intermittent du spectacle",
    "management musical",
    "influenceur",
    "stratégie d'image",
    "carrière artistique",
  ],
  alternates: {
    canonical: sitePaths.forTalents,
  },
  openGraph: {
    title: "Wafia | Talent Management 360 & Stratégie d'Image",
    description:
      "Image, projets, revenus, droits, production et opportunités pour créateurs, artistes, comédiens, musiciens et talents hybrides.",
    url: sitePaths.forTalents,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wafia | Talent Management 360 & Stratégie d'Image",
    description:
      "Image, projets, revenus, droits, production et opportunités pour créateurs, artistes, comédiens, musiciens et talents hybrides.",
  },
};

export default function TalentsLayout({
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
                name: "Talents",
                url: new URL(sitePaths.forTalents, siteConfig.url).toString(),
              },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema([...TALENT_FAQ])),
        }}
      />
    </>
  );
}
