/**
 * WAFIA BRAND DIAGNOSTIC - BACKGROUND WRAPPER
 * Direction: Deep Cinema & Brand Heat (Orange/Red palette)
 */

import { motion } from "framer-motion";
import { useMemo, type ReactNode } from "react";
import type { Question } from "../types";
import { PILLARS } from "../constants";

interface BackgroundWrapperProps {
  children: ReactNode;
  phase: string;
  currentQuestion: Question | null;
}

// Brand Heat Palette — Orange/Red
const THEMES: Record<
  string,
  {
    gradient: string;
    orb1: string;
    orb2: string;
  }
> = {
  landing: {
    gradient: "linear-gradient(to bottom, #0a0a0a, #121214)",
    orb1: "#f97316", // Orange Heat
    orb2: "#ef4444", // Red Heat
  },
  quick_lead: {
    gradient: "linear-gradient(to bottom, #0a0a0a, #0f0805)",
    orb1: "#f97316",
    orb2: "#f59e0b",
  },
  deep_qualification: {
    gradient: "linear-gradient(to bottom, #0a0a0a, #000000)",
    orb1: "#ea580c",
    orb2: "#ef4444",
  },
  results: {
    gradient: "linear-gradient(to bottom, #0a0a0a, #1a1005)",
    orb1: "#f97316",
    orb2: "#ef4444",
  },
  // Pillar-based themes for question categories
  STRATEGY: {
    gradient: "linear-gradient(to bottom, #0a0a0a, #150a00)",
    orb1: PILLARS.STRATEGY.color,
    orb2: "#f59e0b",
  },
  CONTENT: {
    gradient: "linear-gradient(to bottom, #0a0a0a, #150500)",
    orb1: PILLARS.CONTENT.color,
    orb2: "#ef4444",
  },
  ACTIVATION: {
    gradient: "linear-gradient(to bottom, #0a0a0a, #0a0015)",
    orb1: PILLARS.ACTIVATION.color,
    orb2: "#f97316",
  },
  DATA: {
    gradient: "linear-gradient(to bottom, #0a0a0a, #000a15)",
    orb1: PILLARS.DATA.color,
    orb2: "#10b981",
  },
  ORGANIZATION: {
    gradient: "linear-gradient(to bottom, #0a0a0a, #000f0a)",
    orb1: PILLARS.ORGANIZATION.color,
    orb2: "#34d399",
  },
};

export function BackgroundWrapper({
  children,
  phase,
  currentQuestion,
}: BackgroundWrapperProps) {
  const currentTheme = useMemo(() => {
    // Match question category to pillar themes
    if (
      (phase === "deep_qualification" || phase === "quick_lead") &&
      currentQuestion
    ) {
      const category = currentQuestion.category;
      if (category in THEMES) {
        return THEMES[category];
      }
    }
    if (phase in THEMES) {
      return THEMES[phase];
    }
    return THEMES.landing;
  }, [phase, currentQuestion]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[var(--bg-deep)] text-white transition-colors duration-1000">
      {/* Dynamic Background Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={false}
        animate={{ background: currentTheme.gradient }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Breathing Heat Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] sm:w-[70vw] h-[50vw] sm:h-[70vw] rounded-full blur-[80px] sm:blur-[120px]"
          style={{ background: currentTheme.orb1 }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] sm:w-[70vw] h-[50vw] sm:h-[70vw] rounded-full blur-[100px] sm:blur-[150px]"
          style={{ background: currentTheme.orb2 }}
        />
      </div>

      {/* Global Noise Overlay */}
      <div className="bg-noise" />

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col min-h-0">
        {children}
      </div>
    </div>
  );
}
