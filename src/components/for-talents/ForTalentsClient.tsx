"use client"

import { HeroSection } from "@/components/for-talents/HeroSection"
import { ForWhoSection } from "@/components/for-talents/ForWhoSection"
import { WhatWeBuildSection } from "@/components/for-talents/WhatWeBuildSection"
import { TalentJourneySection } from "@/components/for-talents/TalentJourneySection"
import { TeamSectionTalents } from "@/components/for-talents/TeamSectionTalents"
import { FaqSection } from "@/components/for-talents/FaqSection"
import { CtaSection } from "@/components/for-talents/CtaSection"
import { MotionConfig } from "framer-motion"

import { PageShell } from "@/components/common/PageShell"

export function ForTalentsClient() {
    return (
        <PageShell>
            <MotionConfig reducedMotion="user">
                <div className="relative z-10">
                    <HeroSection />
                    <ForWhoSection />
                    <WhatWeBuildSection />
                    <TalentJourneySection />
                    <TeamSectionTalents />
                    <FaqSection />
                    <CtaSection />
                </div>
            </MotionConfig>
        </PageShell>
    )
}
