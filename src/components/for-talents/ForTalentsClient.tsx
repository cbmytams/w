"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/for-talents/HeroSection";
import { ConstatSection } from "@/components/for-talents/ConstatSection";
import { MotionConfig } from "framer-motion";

import { PageShell } from "@/components/common/PageShell";

// Below-fold sections — dynamically imported to reduce initial JS bundle
const WhatWeBuildSection = dynamic(() =>
  import("@/components/for-talents/WhatWeBuildSection").then(
    (m) => m.WhatWeBuildSection
  )
);
const TalentJourneySection = dynamic(() =>
  import("@/components/for-talents/TalentJourneySection").then(
    (m) => m.TalentJourneySection
  )
);
const ForWhoSection = dynamic(() =>
  import("@/components/for-talents/ForWhoSection").then((m) => m.ForWhoSection)
);
const TeamSectionTalents = dynamic(() =>
  import("@/components/for-talents/TeamSectionTalents").then(
    (m) => m.TeamSectionTalents
  )
);
const FaqSection = dynamic(() =>
  import("@/components/for-talents/FaqSection").then((m) => m.FaqSection)
);
const CtaSection = dynamic(() =>
  import("@/components/for-talents/CtaSection").then((m) => m.CtaSection)
);

export function ForTalentsClient() {
  return (
    <PageShell>
      <MotionConfig reducedMotion="user">
        <div className="relative z-10">
          <HeroSection />
          <ConstatSection />
          <WhatWeBuildSection />
          <TalentJourneySection />
          <ForWhoSection />
          <TeamSectionTalents />
          <FaqSection />
          <CtaSection />
        </div>
      </MotionConfig>
    </PageShell>
  );
}
