import { PageShell } from "@/components/common/PageShell"
import { BrandHeroV2 } from "@/components/for-brands/BrandHeroV2"
import { ClientsSection } from "@/components/for-brands/ClientsSection"
import { ValuePropositionSection } from "@/components/for-brands/ValuePropositionSection"
import { CaseStudiesSection } from "@/components/for-brands/CaseStudiesSection"
import { AuthenticitySection } from "@/components/for-brands/AuthenticitySection"
import { ServicesAndMetrics } from "@/components/for-brands/ServicesAndMetrics"
import { ComparisonSectionV2 } from "@/components/for-brands/ComparisonSectionV2"
import { ComplianceSection } from "@/components/for-brands/ComplianceSection"
import { TeamSectionBrands } from "@/components/for-brands/TeamSectionBrands"
import { FaqSection } from "@/components/for-brands/FaqSection"
import { ProcessSection } from "@/components/for-brands/ProcessSection"
import { CtaSection } from "@/components/for-brands/CtaSection"


export default function ForBrandsPage() {
    return (
        <PageShell>
            <BrandHeroV2 />

            <ClientsSection />

            <ValuePropositionSection />

            <ServicesAndMetrics />

            <CaseStudiesSection />

            <ProcessSection />

            <AuthenticitySection />

            <ComparisonSectionV2 />

            <ComplianceSection />

            <TeamSectionBrands />

            <FaqSection />

            <CtaSection estimateHref="/questionnaire/brands" />
        </PageShell>
    )
}
