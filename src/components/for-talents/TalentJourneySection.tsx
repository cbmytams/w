"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { RevealAnimation } from "@/components/common/RevealAnimation";
import {
  TALENT_JOURNEY_HEADER,
  TALENT_JOURNEY_PHASES,
} from "@/constants/talent-journey-steps";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const PHASE_BENEFITS = [
  "On clarifie ton positionnement, ton potentiel business et les mauvais deals a éviter.",
  "On structure ton image, tes formats et ton offre commerciale.",
  "On industrialise la production, les partenariats et le pilotage.",
  "On construit une équipe et des process qui te rendent durable.",
];

export function TalentJourneySection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  // Auto-play logic
  useEffect(() => {
    if (isHovered || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % TALENT_JOURNEY_PHASES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, prefersReducedMotion]);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <section
      id="method"
      className="py-24 md:py-32 px-4 relative z-10 overflow-hidden"
    >
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <RevealAnimation className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.05]">
              {TALENT_JOURNEY_HEADER.title}{" "}
              <span className="text-slate-500 dark:text-slate-400">
                {TALENT_JOURNEY_HEADER.titleHighlight}
              </span>
            </h2>
            <p className="mt-6 text-xl text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-light">
              De l&apos;audit initial à l&apos;autonomie complète. 36 mois.
            </p>
          </RevealAnimation>

          {/* Interactive Monolith */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => {
              // slight delay before resuming autoplay
              setTimeout(() => setIsHovered(false), 2000);
            }}
          >
            {/* Tabs Navigation */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
              {TALENT_JOURNEY_PHASES.map((phase, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={phase.id}
                    onClick={() => handleTabClick(i)}
                    className={cn(
                      "relative px-5 py-3 rounded-full text-sm sm:text-base font-medium transition-colors duration-300",
                      isActive
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                    )}
                  >
                    {isActive && !prefersReducedMotion && (
                      <motion.div
                        layoutId="activeJourneyTab"
                        className="absolute inset-0 bg-slate-200/60 dark:bg-white/10 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    {isActive && prefersReducedMotion && (
                      <div className="absolute inset-0 bg-slate-200/60 dark:bg-white/10 rounded-full" />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {phase.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="relative min-h-[220px] sm:min-h-[160px] flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    filter: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
                    y: prefersReducedMotion ? 0 : 10,
                  }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{
                    opacity: 0,
                    filter: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
                    y: prefersReducedMotion ? 0 : -10,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute w-full text-center px-4"
                >
                  <div className="inline-block px-4 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/[0.02] text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8 font-medium tracking-[0.2em] uppercase">
                    {TALENT_JOURNEY_PHASES[activeIndex].label}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-800 dark:text-white/90 tracking-tight leading-relaxed max-w-3xl mx-auto text-balance">
                    {PHASE_BENEFITS[activeIndex]}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Signature */}
          <div className="text-center mt-32">
            {prefersReducedMotion ? (
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight max-w-4xl mx-auto leading-tight text-slate-800 dark:text-white/80">
                {TALENT_JOURNEY_HEADER.signature}
              </h3>
            ) : (
              <RevealAnimation>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight max-w-4xl mx-auto leading-tight text-slate-400 dark:text-white/40">
                  {TALENT_JOURNEY_HEADER.signature}
                </h3>
              </RevealAnimation>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
