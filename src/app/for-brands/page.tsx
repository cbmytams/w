"use client"

import { useState } from "react"
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

    const scrollToDashboard = () => {
        const dashboardElement = document.getElementById("dashboard")
        if (dashboardElement) {
            dashboardElement.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-zinc-950 dark:to-black">

            {/* The Infinite Flow Line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-orange-500/20 to-transparent lg:block hidden z-0 pointer-events-none" />

            {/* Global Color Melt Blobs - Optimized */}
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[80px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute top-[45%] left-[-10%] w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-[80px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute top-[75%] right-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[60px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen" />


            {/* Noise Texture Overlay for Premium Feel */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[60] bg-[url('/noise.png')] mix-blend-overlay" />

            <div className="relative z-10">
                <FloatingNavigation onEstimateClick={() => setShowEstimator(true)} />

                <BrandHeroV2 onDashboardClick={scrollToDashboard} />

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
            </div>
        </div>
    )
}
