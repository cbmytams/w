"use client"

import { HeroSection } from "@/components/for-talents/HeroSection"
import { PositionnementSection } from "@/components/for-talents/PositionnementSection"
import { DeliverablesSection } from "@/components/for-talents/DeliverablesSection"
import { TalentJourneySection } from "@/components/for-talents/TalentJourneySection"
import { TeamSectionTalents } from "@/components/for-talents/TeamSectionTalents"
import { FaqSection } from "@/components/for-talents/FaqSection"
import { ForWhoSection } from "@/components/for-talents/ForWhoSection"
import { CtaSection } from "@/components/for-talents/CtaSection"
import { MotionConfig } from "framer-motion"

import { PageShell } from "@/components/common/PageShell"

export function ForTalentsClient() {
    const scrollToJourney = () => {
        const element = document.getElementById("journey")
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
            window.history.replaceState(null, "", "#journey")
        }
    }

    return (
        <PageShell>
            <MotionConfig reducedMotion="user">
                {/* Content Layer (above background) */}
                <div className="relative z-10">
                    {/* Hero + Scroll CTA */}
                    <HeroSection onContentClick={scrollToJourney} />

                    {/* Positionnement: Constat + Profil + Pour Qui */}
                    <PositionnementSection />

                    {/* Deliverables Bento Grid */}
                    <DeliverablesSection />

                    {/* Talent Journey — 8 steps, 4 phases */}
                    <TalentJourneySection />

                    {/* Direction Opérationnelle — Team */}
                    <TeamSectionTalents />

                    {/* Pour qui ? */}
                    <ForWhoSection />

                    {/* FAQ */}
                    <FaqSection />

                    {/* Final CTA */}
                    <CtaSection />
                </div>
            </MotionConfig>
        </PageShell>
    )
}
