import dynamic from "next/dynamic"
import { PageShell } from "@/components/common/PageShell"
import { BrandHeroV2 } from "@/components/for-brands/BrandHeroV2"
import { ClientsSection } from "@/components/for-brands/ClientsSection"

// Below-fold sections — dynamically imported to reduce initial JS bundle
const ValuePropositionSection = dynamic(() =>
    import("@/components/for-brands/ValuePropositionSection").then((m) => m.ValuePropositionSection)
)
const CaseStudiesSection = dynamic(() =>
    import("@/components/for-brands/CaseStudiesSection").then((m) => m.CaseStudiesSection)
)
const ProcessSection = dynamic(() =>
    import("@/components/for-brands/ProcessSection").then((m) => m.ProcessSection)
)
const ComparisonSectionV2 = dynamic(() =>
    import("@/components/for-brands/ComparisonSectionV2").then((m) => m.ComparisonSectionV2)
)
const ComplianceSection = dynamic(() =>
    import("@/components/for-brands/ComplianceSection").then((m) => m.ComplianceSection)
)
const TeamSectionBrands = dynamic(() =>
    import("@/components/for-brands/TeamSectionBrands").then((m) => m.TeamSectionBrands)
)
const FaqSection = dynamic(() =>
    import("@/components/for-brands/FaqSection").then((m) => m.FaqSection)
)
const CtaSection = dynamic(() =>
    import("@/components/for-brands/CtaSection").then((m) => m.CtaSection)
)


export default function ForBrandsPage() {
    return (
        <PageShell>
            <BrandHeroV2 />

            <ClientsSection />

            <ValuePropositionSection />

            <CaseStudiesSection />

            <ProcessSection />

            <ComparisonSectionV2 />

            <ComplianceSection />

            <TeamSectionBrands />

            <FaqSection />

            <CtaSection estimateHref="/questionnaire/brands" />
        </PageShell>
    )
}
