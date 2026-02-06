import type { Metadata } from "next";
import { siteConfig, sitePaths } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Talents",
  description:
    "Découvrez une sélection de créateurs et talents brand-safe accompagnés par Wafia.",
  alternates: {
    canonical: sitePaths.talents,
  },
  openGraph: {
    title: "Talents | Wafia",
    description:
      "Découvrez une sélection de créateurs et talents brand-safe accompagnés par Wafia.",
    url: sitePaths.talents,
    siteName: siteConfig.name,
    type: "website",
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
              { name: "Accueil", url: new URL(sitePaths.home, siteConfig.url).toString() },
              { name: "Talents", url: new URL(sitePaths.talents, siteConfig.url).toString() },
            ])
          ),
        }}
      />
    </>
  );
}
