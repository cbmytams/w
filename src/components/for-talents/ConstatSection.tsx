"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { TALENT_PROBLEM } from "@/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASING, DURATION } from "@/lib/easing";
import { cn } from "@/lib/utils";
import { SystemBentoWidget } from "@/components/for-talents/SystemBentoWidget";

const PAIN_ICONS = ["\u{1F9ED}", "\u{26A1}", "\u{1F91D}", "\u{1F3AF}"];

export function ConstatSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const descY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="constat"
      className="relative z-10 py-32 md:py-44 lg:py-52 px-4 overflow-hidden"
    >
      {/* Atmospheric layers (Monochrome / silver) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] dark:bg-white/[0.015] rounded-full blur-[150px]" />
      </div>

      <Container>
        <div className="max-w-5xl mx-auto relative">
          {/* Title */}
          <motion.div
            style={prefersReducedMotion ? {} : { y: titleY }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: DURATION.slower, ease: EASING.entrance }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                <span className="text-slate-900 dark:text-white">
                  Le talent d&eacute;marre tout.
                </span>
                <br />
                <span className="text-slate-500 dark:text-slate-400">
                  Le syst&egrave;me d&eacute;cide de la suite.
                </span>
              </h2>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.div
            style={prefersReducedMotion ? {} : { y: descY }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: DURATION.slower,
                delay: 0.15,
                ease: EASING.entrance,
              }}
              className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              {TALENT_PROBLEM.description}
            </motion.p>
          </motion.div>

          {/* Bento Grid Widget (V2 Apple style) */}
          <div className="mt-8">
            <SystemBentoWidget />
          </div>
        </div>
      </Container>
    </section>
  );
}
