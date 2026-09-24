import dynamic from "next/dynamic";
import { PageShell } from "@/components/common/PageShell";
import { BrandHeroV2 } from "@/components/for-brands/BrandHeroV2";
import { ClientsSection } from "@/components/for-brands/ClientsSection";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";
import { FAQ_ITEMS } from "@/constants";
import { siteConfig, sitePaths } from "@/lib/site";
import type { Metadata } from "next";

const CaseStudiesSection = dynamic(() =>
  import("@/components/for-brands/CaseStudiesSection").then(
    (m) => m.CaseStudiesSection
  )
);
const BrandMethodSection = dynamic(() =>
  import("@/components/for-brands/BrandMethodSection").then(
    (m) => m.BrandMethodSection
  )
);
const TeamSectionBrands = dynamic(() =>
  import("@/components/for-brands/TeamSectionBrands").then(
    (m) => m.TeamSectionBrands
  )
);
const FaqSection = dynamic(() =>
  import("@/components/for-brands/FaqSection").then((m) => m.FaqSection)
);
const CtaSection = dynamic(() =>
  import("@/components/for-brands/CtaSection").then((m) => m.CtaSection)
);

export const metadata: Metadata = {
  title: {
    absolute: "Wafia | Agence d'influence pour les marques",
  },
  description:
    "Wafia structure les campagnes d'influence des marques : strategie, casting createurs, production studio, diffusion paid et reporting. Des campagnes pensees comme des actifs de marque.",
  alternates: {
    canonical: sitePaths.home,
  },
  openGraph: {
    title: "Wafia | Agence d'influence pour les marques",
    description:
      "Wafia structure les campagnes d'influence des marques : strategie, casting createurs, production studio, diffusion paid et reporting.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wafia | Agence d'influence pour les marques",
    description:
      "Wafia structure les campagnes d'influence des marques : strategie, casting createurs, production studio, diffusion paid et reporting.",
  },
};

export default function Homepage() {
  return (
    <>
      <PageShell className="!overflow-x-clip">
        <BrandHeroV2 />

        <BrandMethodSection />

        <ClientsSection />

        <CaseStudiesSection />

        <TeamSectionBrands />

        <FaqSection />

        <CtaSection estimateHref="/contact/brands" />
      </PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              {
                name: "Accueil",
                url: new URL(sitePaths.home, siteConfig.url).toString(),
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
