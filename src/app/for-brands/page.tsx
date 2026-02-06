"use client"

import { useState } from "react"
import { PageShell } from "@/components/common/PageShell"
import { FloatingNavigation } from "@/components/for-brands/FloatingNavigation"
import { BrandHeroV2 } from "@/components/for-brands/BrandHeroV2"
import { ClientsSection } from "@/components/for-brands/ClientsSection"
import { ValuePropositionSection } from "@/components/for-brands/ValuePropositionSection"
import { CaseStudiesSection } from "@/components/for-brands/CaseStudiesSection"
import { AuthenticitySection } from "@/components/for-brands/AuthenticitySection"
import { DashboardSection } from "@/components/for-brands/DashboardSection"
import { DeliverablesSectionV3 } from "@/components/for-brands/DeliverablesSectionV3"
import { ProcessSection } from "@/components/for-brands/ProcessSection"
import { ComparisonSectionV2 } from "@/components/for-brands/ComparisonSectionV2"
import { ComplianceSection } from "@/components/for-brands/ComplianceSection"
import { FaqSection } from "@/components/for-brands/FaqSection"
import { CtaSection } from "@/components/for-brands/CtaSection"
import { EstimatorModal } from "@/components/for-brands/EstimatorModal"

export default function ForBrandsPage() {
    const [showEstimator, setShowEstimator] = useState(false)

    return (
        <PageShell
            variant="brands"
            nav={<FloatingNavigation onEstimateClick={() => setShowEstimator(true)} />}
        >
            <BrandHeroV2 />

            <ClientsSection />

            <ValuePropositionSection />

            <CaseStudiesSection />

            <AuthenticitySection />

            <DashboardSection />

            <DeliverablesSectionV3 />

            <ProcessSection />

            <ComparisonSectionV2 />

            <ComplianceSection />

            <FaqSection />

            <CtaSection onEstimateClick={() => setShowEstimator(true)} />

            <EstimatorModal
                isOpen={showEstimator}
                onClose={() => setShowEstimator(false)}
            />
        </PageShell>
    )
}
