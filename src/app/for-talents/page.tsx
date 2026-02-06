"use client"

import { HeroSection } from "@/components/for-talents/HeroSection"
import { PersonaSection } from "@/components/for-talents/PersonaSection"
import { ProblemSection } from "@/components/for-talents/ProblemSection"
import { DeliverablesSection } from "@/components/for-talents/DeliverablesSection"
import { ServicesSection } from "@/components/for-talents/ServicesSection"
import { MethodSection } from "@/components/for-talents/MethodSection"
import { LevelsSection } from "@/components/for-talents/LevelsSection"
import { ForWhoSection } from "@/components/for-talents/ForWhoSection"
import { FaqSection } from "@/components/for-talents/FaqSection"
import { CtaSection } from "@/components/for-talents/CtaSection"
import { TalentsFloatingNavigation } from "@/components/for-talents/TalentsFloatingNavigation"
import { PageShell } from "@/components/common/PageShell"

export default function ForTalentsPage() {
    const scrollToContent = () => {
        const element = document.getElementById("problem")
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <PageShell variant="talents" nav={<TalentsFloatingNavigation />}>
            {/* Content Layer (above background) */}
            <div className="relative z-10">
                {/* Hero + Scroll CTA */}
                <HeroSection onContentClick={scrollToContent} />

                {/* Persona Tabs (kept high on page) */}
                <PersonaSection />

                {/* Problem Statement */}
                <ProblemSection />

                {/* Deliverables Bento Grid */}
                <DeliverablesSection />

                {/* Services Deep Dive (with widgets) */}
                <ServicesSection />

                {/* Method (4 steps) */}
                <MethodSection />

                {/* Timeline (5 phases) */}
                <LevelsSection />

                {/* For Who / Not For Who */}
                <ForWhoSection />

                {/* FAQ */}
                <FaqSection />

                {/* Final CTA */}
                <CtaSection />
            </div>
        </PageShell>
    )
}
