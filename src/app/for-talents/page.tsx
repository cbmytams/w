"use client"

import { TalentsFloatingNavigation } from "@/components/for-talents/TalentsFloatingNavigation"
import { HeroSection } from "@/components/for-talents/HeroSection"
import { PersonaSection } from "@/components/for-talents/PersonaSection"
import { IdentitySection } from "@/components/for-talents/IdentitySection"
import { PlatformsSection } from "@/components/for-talents/PlatformsSection"
import { BusinessSection } from "@/components/for-talents/BusinessSection"
import { LevelsSection } from "@/components/for-talents/LevelsSection"
import { FaqSection } from "@/components/for-talents/FaqSection"
import { CtaSection } from "@/components/for-talents/CtaSection"
import { Footer } from "@/components/layout/footer"

export default function ForTalentsPage() {
    const scrollToContent = () => {
        const element = document.getElementById("identity")
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div className="bg-white min-h-screen relative overflow-x-hidden">
            <TalentsFloatingNavigation />

            <HeroSection onContentClick={scrollToContent} />

            <PersonaSection />

            <IdentitySection />

            <PlatformsSection />

            <BusinessSection />

            <LevelsSection />

            <FaqSection />

            <CtaSection />

            <Footer />
        </div>
    )
}
