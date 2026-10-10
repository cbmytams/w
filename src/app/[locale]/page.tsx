import dynamic from "next/dynamic";
import { PageShell } from "@/components/common/PageShell";
import { BrandHeroV2 } from "@/components/for-brands/BrandHeroV2";
import { ClientsSection } from "@/components/for-brands/ClientsSection";
import { FaqJsonLd } from "@/components/for-brands/FaqJsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { siteConfig, sitePaths } from "@/lib/site";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localizedPath, pageAlternates } from "@/lib/seo";
import { ogDefaults } from "@/lib/social-metadata";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const title = t("title");

  return {
    title: { absolute: title },
    description: t("description"),
    alternates: pageAlternates(locale, sitePaths.home),
    openGraph: {
      ...(await ogDefaults(locale)),
      title,
      description: t("shortDescription"),
      url: localizedPath(sitePaths.home, locale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t("shortDescription"),
      images: [siteConfig.ogImage],
    },
  };
}

export default async function Homepage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

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
                name: t("breadcrumb"),
                url: new URL(
                  localizedPath(sitePaths.home, locale),
                  siteConfig.url
                ).toString(),
              },
            ])
          ),
        }}
      />
      <FaqJsonLd />
    </>
  );
}
