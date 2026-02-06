import type { Metadata } from "next";
import { siteConfig, sitePaths } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Découvrez des campagnes d'influence et de production qui génèrent des résultats mesurables.",
  alternates: {
    canonical: sitePaths.cases,
  },
  openGraph: {
    title: "Réalisations | Wafia",
    description:
      "Découvrez des campagnes d'influence et de production qui génèrent des résultats mesurables.",
    url: sitePaths.cases,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function CasesLayout({
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
              { name: "Réalisations", url: new URL(sitePaths.cases, siteConfig.url).toString() },
            ])
          ),
        }}
      />
    </>
  );
}
