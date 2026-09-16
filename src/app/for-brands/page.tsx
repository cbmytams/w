import dynamic from "next/dynamic";
import { PageShell } from "@/components/common/PageShell";
import { BrandHeroV2 } from "@/components/for-brands/BrandHeroV2";
import { ClientsSection } from "@/components/for-brands/ClientsSection";

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

export default function ForBrandsPage() {
  return (
    <PageShell className="!overflow-x-clip">
      <BrandHeroV2 />

      <BrandMethodSection />

      <ClientsSection />

      <CaseStudiesSection />

      <TeamSectionBrands />

      <FaqSection />

      <CtaSection estimateHref="/contact/brands" />
    </PageShell>
  );
}
