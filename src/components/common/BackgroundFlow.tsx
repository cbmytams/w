"use client";

import { useEffect, useState } from "react";
import {
  motion as m,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { SPRING } from "@/lib/design-tokens";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASING } from "@/lib/easing";
import {
  getBackgroundRuntimeProfile,
  shouldAnimateAmbientPhase,
  shouldAnimateShowcaseAccent,
  type BackgroundFlowIntensity,
  type BackgroundFlowVariant,
} from "@/lib/background-flow";

type BackgroundPalette = {
  baseLight: string;
  baseDark: string;
  phaseLight: string;
  phaseDark: string;
  auroraA: string;
  auroraB: string;
  glowA: { strong: string; soft: string };
  glowB: { strong: string; soft: string };
  glowC: { strong: string; soft: string };
  dot: string;
};

type BubblePreset = {
  size: number;
  left: string;
  top: string;
  color: string;
  opacity: number;
  blur: number;
};

// Per-index ambient drift. Variant-independent on purpose: the drift runs on a
// stable middle layer whose `animate` never changes when the variant swaps, so
// the orb's breathing motion is continuous across page changes (no restart jank
// and no drift "jump" at navigation time).
type OrbDrift = {
  driftX: number;
  driftY: number;
  scale: [number, number, number];
  duration: number;
  delay: number;
};

const ORB_DRIFT: OrbDrift[] = [
  { driftX: 34, driftY: 26, scale: [1, 1.07, 0.94], duration: 13, delay: 0 },
  { driftX: 30, driftY: 30, scale: [1.06, 1, 0.92], duration: 16, delay: 1.1 },
  { driftX: 38, driftY: 24, scale: [0.94, 1.08, 1], duration: 14, delay: 2.2 },
  { driftX: 32, driftY: 34, scale: [1.04, 0.96, 1.06], duration: 15, delay: 0.6 },
  { driftX: 28, driftY: 28, scale: [0.98, 1.06, 0.95], duration: 17, delay: 1.6 },
  { driftX: 36, driftY: 22, scale: [1.05, 0.94, 1.04], duration: 12, delay: 2.7 },
];

const PALETTES: Record<BackgroundFlowVariant, BackgroundPalette> = {
  brands: {
    baseLight: "#fff7f1",
    baseDark: "#0b111a",
    phaseLight:
      "linear-gradient(180deg, rgba(255, 252, 249, 0.98) 0%, rgba(255, 247, 241, 0.95) 22%, rgba(255, 241, 232, 0.90) 42%, rgba(252, 228, 211, 0.86) 58%, rgba(249, 115, 22, 0.12) 72%, rgba(236, 72, 153, 0.08) 84%, rgba(255, 248, 243, 0.94) 93%, rgba(255, 252, 249, 0.98) 100%)",
    phaseDark:
      "linear-gradient(180deg, rgba(8, 8, 12, 0.97) 0%, rgba(11, 11, 16, 0.95) 24%, rgba(16, 15, 22, 0.92) 42%, rgba(24, 20, 28, 0.88) 58%, rgba(249, 115, 22, 0.16) 72%, rgba(236, 72, 153, 0.10) 84%, rgba(10, 10, 16, 0.95) 93%, rgba(6, 6, 10, 0.98) 100%)",
    auroraA:
      "linear-gradient(120deg,rgba(249,115,22,0.18),rgba(251,146,60,0.16),rgba(236,72,153,0.12),transparent_70%)",
    auroraB:
      "linear-gradient(240deg,rgba(252,211,77,0.16),rgba(249,115,22,0.16),rgba(239,68,68,0.12),transparent_70%)",
    glowA: { strong: "rgba(249,115,22,0.16)", soft: "rgba(249,115,22,0.05)" },
    glowB: { strong: "rgba(56,189,248,0.14)", soft: "rgba(56,189,248,0.05)" },
    glowC: { strong: "rgba(236,72,153,0.14)", soft: "rgba(236,72,153,0.05)" },
    dot: "rgba(249,115,22,0.26)",
  },
  talents: {
    baseLight: "#f8f7ff",
    baseDark: "#0b111a",
    phaseLight:
      "linear-gradient(180deg, rgba(250, 249, 255, 0.98) 0%, rgba(245, 242, 255, 0.95) 22%, rgba(239, 234, 255, 0.90) 44%, rgba(226, 218, 255, 0.86) 58%, rgba(124, 58, 237, 0.14) 72%, rgba(79, 70, 229, 0.10) 84%, rgba(248, 246, 255, 0.96) 100%)",
    phaseDark:
      "linear-gradient(180deg, rgba(6, 6, 10, 0.98) 0%, rgba(9, 8, 14, 0.95) 24%, rgba(14, 12, 24, 0.92) 46%, rgba(20, 16, 30, 0.88) 60%, rgba(124, 58, 237, 0.18) 74%, rgba(79, 70, 229, 0.12) 86%, rgba(4, 4, 8, 0.98) 100%)",
    auroraA:
      "linear-gradient(120deg,rgba(139,92,246,0.25),rgba(124,58,237,0.22),rgba(167,139,250,0.18),transparent_70%)",
    auroraB:
      "linear-gradient(240deg,rgba(99,102,241,0.22),rgba(124,58,237,0.22),rgba(236,72,153,0.18),transparent_70%)",
    glowA: { strong: "rgba(124,58,237,0.16)", soft: "rgba(139,92,246,0.06)" },
    glowB: { strong: "rgba(79,70,229,0.14)", soft: "rgba(99,102,241,0.05)" },
    glowC: { strong: "rgba(236,72,153,0.14)", soft: "rgba(244,114,182,0.05)" },
    dot: "rgba(124,58,237,0.28)",
  },
  home: {
    baseLight: "#faf8f4",
    baseDark: "#0b111a",
    phaseLight:
      "linear-gradient(180deg, rgba(252, 250, 247, 0.98) 0%, rgba(251, 247, 243, 0.95) 24%, rgba(249, 245, 250, 0.90) 48%, rgba(248, 241, 245, 0.86) 60%, rgba(249, 115, 22, 0.10) 72%, rgba(124, 58, 237, 0.10) 84%, rgba(251, 248, 246, 0.95) 100%)",
    phaseDark:
      "linear-gradient(180deg, rgba(7, 7, 11, 0.98) 0%, rgba(10, 10, 15, 0.95) 26%, rgba(15, 13, 22, 0.92) 48%, rgba(22, 18, 29, 0.88) 62%, rgba(249, 115, 22, 0.12) 74%, rgba(124, 58, 237, 0.14) 86%, rgba(6, 6, 10, 0.98) 100%)",
    auroraA:
      "linear-gradient(120deg,rgba(249,115,22,0.22),rgba(251,146,60,0.19),rgba(236,72,153,0.13),transparent_70%)",
    auroraB:
      "linear-gradient(240deg,rgba(139,92,246,0.24),rgba(124,58,237,0.21),rgba(167,139,250,0.16),transparent_70%)",
    glowA: { strong: "rgba(249,115,22,0.18)", soft: "rgba(251,146,60,0.06)" },
    glowB: { strong: "rgba(124,58,237,0.18)", soft: "rgba(139,92,246,0.07)" },
    glowC: { strong: "rgba(236,72,153,0.15)", soft: "rgba(244,114,182,0.06)" },
    dot: "rgba(148,163,184,0.26)",
  },
};

const FLOW_MOTION: Record<
  BackgroundFlowVariant,
  {
    ySlow: [number, number];
    yMid: [number, number];
    yFast: [number, number];
    auroraAOpacity: number[];
    auroraBOpacity: number[];
    glowAOpacity: number[];
    glowBOpacity: number[];
    glowCOpacity: number[];
    phaseDuration: number;
    auroraADuration: number;
    auroraBDuration: number;
  }
> = {
  brands: {
    ySlow: [-34, 44],
    yMid: [28, -40],
    yFast: [48, 70],
    auroraAOpacity: [0.34, 0.42, 0.36, 0.34],
    auroraBOpacity: [0.28, 0.36, 0.32, 0.28],
    glowAOpacity: [0.5, 0.58, 0.52, 0.5],
    glowBOpacity: [0.42, 0.5, 0.44, 0.42],
    glowCOpacity: [0.46, 0.54, 0.48, 0.46],
    phaseDuration: 28,
    auroraADuration: 24,
    auroraBDuration: 22,
  },
  talents: {
    ySlow: [-110, 140],
    yMid: [90, -130],
    yFast: [140, 200],
    auroraAOpacity: [0.32, 0.4, 0.35, 0.32],
    auroraBOpacity: [0.28, 0.36, 0.32, 0.28],
    glowAOpacity: [0.46, 0.54, 0.49, 0.46],
    glowBOpacity: [0.38, 0.46, 0.4, 0.38],
    glowCOpacity: [0.42, 0.5, 0.44, 0.42],
    phaseDuration: 30,
    auroraADuration: 26,
    auroraBDuration: 24,
  },
  home: {
    ySlow: [-70, 90],
    yMid: [60, -85],
    yFast: [95, 135],
    auroraAOpacity: [0.45, 0.55, 0.47, 0.45],
    auroraBOpacity: [0.4, 0.5, 0.44, 0.4],
    glowAOpacity: [0.55, 0.65, 0.58, 0.55],
    glowBOpacity: [0.5, 0.6, 0.53, 0.5],
    glowCOpacity: [0.52, 0.62, 0.55, 0.52],
    phaseDuration: 29,
    auroraADuration: 25,
    auroraBDuration: 23,
  },
};

// Six orbs per variant so an orb at index `i` maps to the SAME persistent
// element across variants (the key is just `i`), letting framer-motion morph
// position + colour instead of remounting. Layout per variant:
//   home   -> 3 warm LEFT + 3 violet RIGHT (the two clouds)
//   brands -> all warm, anchored RIGHT (marque)
//   talents-> all violet, anchored LEFT (talent)
// Shared orb layout: every variant uses the SAME positions/sizes so Marques,
// Talents and Accueil share one balanced, harmonized composition (3 left + 3
// right). Only the colour differs per variant.
const ORB_LAYOUT: Omit<BubblePreset, "color">[] = [
  { size: 480, left: "8%", top: "14%", opacity: 0.92, blur: 30 },
  { size: 400, left: "20%", top: "46%", opacity: 0.88, blur: 26 },
  { size: 380, left: "10%", top: "72%", opacity: 0.86, blur: 28 },
  { size: 500, left: "62%", top: "18%", opacity: 0.92, blur: 30 },
  { size: 400, left: "78%", top: "50%", opacity: 0.88, blur: 26 },
  { size: 420, left: "68%", top: "74%", opacity: 0.9, blur: 30 },
];

// Warm gradients (marque).
const BRAND_COLORS = [
  "radial-gradient(circle at 38% 38%, rgba(251,146,60,0.92), rgba(249,115,22,0.60) 50%, rgba(236,72,153,0.30) 76%, transparent 100%)",
  "radial-gradient(circle at 44% 44%, rgba(252,211,77,0.88), rgba(249,115,22,0.58) 54%, transparent 100%)",
  "radial-gradient(circle at 40% 42%, rgba(244,114,182,0.86), rgba(249,115,22,0.50) 52%, transparent 100%)",
  "radial-gradient(circle at 38% 38%, rgba(251,146,60,0.92), rgba(249,115,22,0.60) 50%, rgba(236,72,153,0.30) 76%, transparent 100%)",
  "radial-gradient(circle at 44% 44%, rgba(249,115,22,0.88), rgba(244,63,94,0.44) 54%, transparent 100%)",
  "radial-gradient(circle at 40% 42%, rgba(236,72,153,0.86), rgba(249,115,22,0.50) 52%, transparent 100%)",
];

// Violet gradients (talents).
const TALENT_COLORS = [
  "radial-gradient(circle at 36% 36%, rgba(139,92,246,0.92), rgba(124,58,237,0.64) 52%, rgba(99,102,241,0.30) 78%, transparent 100%)",
  "radial-gradient(circle at 44% 44%, rgba(99,102,241,0.88), rgba(168,85,247,0.56) 56%, transparent 100%)",
  "radial-gradient(circle at 40% 42%, rgba(236,72,153,0.86), rgba(124,58,237,0.50) 52%, transparent 100%)",
  "radial-gradient(circle at 38% 38%, rgba(167,139,250,0.92), rgba(124,58,237,0.64) 52%, rgba(99,102,241,0.30) 78%, transparent 100%)",
  "radial-gradient(circle at 44% 44%, rgba(129,140,248,0.88), rgba(168,85,247,0.56) 56%, transparent 100%)",
  "radial-gradient(circle at 40% 42%, rgba(124,58,237,0.90), rgba(236,72,153,0.46) 50%, transparent 100%)",
];

// Accueil = the same layout, 3 warm (left) + 3 violet (right).
const HOME_COLORS = [
  BRAND_COLORS[0],
  BRAND_COLORS[1],
  BRAND_COLORS[2],
  TALENT_COLORS[3],
  TALENT_COLORS[4],
  TALENT_COLORS[5],
];

const BUBBLE_PRESETS: Record<BackgroundFlowVariant, BubblePreset[]> = {
  brands: ORB_LAYOUT.map((layout, i) => ({ ...layout, color: BRAND_COLORS[i] })),
  talents: ORB_LAYOUT.map((layout, i) => ({ ...layout, color: TALENT_COLORS[i] })),
  home: ORB_LAYOUT.map((layout, i) => ({ ...layout, color: HOME_COLORS[i] })),
};

type BackgroundFlowProps = {
  variant?: BackgroundFlowVariant;
  intensity?: BackgroundFlowIntensity;
};

export function BackgroundFlow({
  variant = "brands",
  intensity = "base",
}: BackgroundFlowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [lowMemory, setLowMemory] = useState(false);
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const { scrollYProgress } = useScroll();
  const isBrandsVariant = variant === "brands";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const updateMobile = () => setIsMobile(mobileQuery.matches);
    updateMobile();
    mobileQuery.addEventListener("change", updateMobile);

    const updateWidth = () => setVw(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);

    const nav = navigator as Navigator & {
      connection?: {
        addEventListener?: (event: string, cb: () => void) => void;
        removeEventListener?: (event: string, cb: () => void) => void;
        saveData?: boolean;
      };
      deviceMemory?: number;
    };
    const connection = nav.connection;
    const updateConnection = () => {
      setSaveData(Boolean(connection?.saveData));
      setLowMemory(Boolean(nav.deviceMemory && nav.deviceMemory <= 4));
    };
    updateConnection();
    connection?.addEventListener?.("change", updateConnection);

    return () => {
      mobileQuery.removeEventListener("change", updateMobile);
      connection?.removeEventListener?.("change", updateConnection);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const smoothProgress = useSpring(scrollYProgress, {
    ...SPRING.gentle,
  });

  const motion = FLOW_MOTION[variant];
  const ySlowTarget = useTransform(smoothProgress, [0, 1], motion.ySlow);
  const yMidTarget = useTransform(smoothProgress, [0, 1], motion.yMid);
  const yFastTarget = useTransform(smoothProgress, [0, 1], motion.yFast);
  const ySlow = useMotionValue(motion.ySlow[0]);
  const yMid = useMotionValue(motion.yMid[0]);
  const yFast = useMotionValue(motion.yFast[0]);

  const palette = PALETTES[variant];
  const runtimeProfile = getBackgroundRuntimeProfile({
    isMobile,
    saveData,
    lowMemory,
    prefersReducedMotion,
  });
  const isConstrainedRuntime = runtimeProfile.isConstrainedRuntime;
  const useMobileLiteMode = runtimeProfile.mobileLite;
  // Scale orb sizes to the viewport so they fit on mobile instead of overflowing.
  const responsiveScale = Math.max(0.3, Math.min(1, vw / 1100));
  const bubbleScaleFactor = (useMobileLiteMode ? 0.85 : 1) * responsiveScale;
  // Pull orb positions toward center on narrow viewports so they stay fully visible.
  const spread = Math.min(1, vw / 700);
  const bubblePresets = BUBBLE_PRESETS[variant].slice(
    0,
    runtimeProfile.bubbleCount
  );
  const allowBubbleMotion =
    intensity === "showcase" && runtimeProfile.allowBubbleMotion;
  const allowAmbientAnimation = shouldAnimateAmbientPhase({
    variant,
    intensity,
    prefersReducedMotion,
    isConstrainedRuntime: isConstrainedRuntime || useMobileLiteMode,
  });
  const allowShowcaseAccent = shouldAnimateShowcaseAccent({
    intensity,
    prefersReducedMotion,
    isConstrainedRuntime: isConstrainedRuntime || useMobileLiteMode,
  });
  const allowGlowPulse = !prefersReducedMotion && !useMobileLiteMode;
  const allowParallax = !prefersReducedMotion && !useMobileLiteMode;
  const phaseAnimation = allowAmbientAnimation
    ? { backgroundPosition: ["50% 46%", "50% 50%", "50% 46%"] }
    : undefined;

  const phasePositionStyle = "50% 48%";
  const constrainedGlowClasses = {
    first:
      "absolute -top-28 left-1/2 h-[300px] w-[420px] -translate-x-1/2 rounded-full",
    second: "absolute top-[20%] right-[-5%] h-[260px] w-[320px] rounded-full",
    third: "absolute bottom-[-10%] left-[-8%] h-[280px] w-[340px] rounded-full",
  };
  const glowLayerClasses = useMobileLiteMode
    ? constrainedGlowClasses
    : isBrandsVariant
      ? {
          first:
            "absolute -top-44 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full blur-[120px] dark:opacity-75 gpu-accelerated",
          second:
            "absolute top-[18%] right-[-8%] h-[520px] w-[680px] rounded-full blur-[130px] dark:opacity-70 gpu-accelerated",
          third:
            "absolute bottom-[-20%] left-[-10%] h-[600px] w-[740px] rounded-full blur-[136px] dark:opacity-70 gpu-accelerated",
        }
      : {
          first:
            "absolute -top-48 left-1/2 h-[640px] w-[980px] -translate-x-1/2 rounded-full blur-[140px] dark:opacity-80 gpu-accelerated",
          second:
            "absolute top-[18%] right-[-8%] h-[600px] w-[760px] rounded-full blur-[150px] dark:opacity-70 gpu-accelerated",
          third:
            "absolute bottom-[-24%] left-[-12%] h-[680px] w-[820px] rounded-full blur-[160px] dark:opacity-70 gpu-accelerated",
        };

  useEffect(() => {
    if (!allowParallax) {
      ySlow.set(0);
      yMid.set(0);
      yFast.set(0);
      return;
    }

    ySlow.set(motion.ySlow[0]);
    yMid.set(motion.yMid[0]);
    yFast.set(motion.yFast[0]);
  }, [allowParallax, motion, yFast, yMid, ySlow]);

  useMotionValueEvent(ySlowTarget, "change", (value) => {
    if (allowParallax) {
      ySlow.set(value);
    }
  });

  useMotionValueEvent(yMidTarget, "change", (value) => {
    if (allowParallax) {
      yMid.set(value);
    }
  });

  useMotionValueEvent(yFastTarget, "change", (value) => {
    if (allowParallax) {
      yFast.set(value);
    }
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <AnimatePresence>
        <m.div
          key={variant}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: "easeInOut" },
          }}
        >
          <m.div
            className="absolute inset-0 dark:hidden"
            initial={{ background: palette.baseLight }}
            animate={{ background: palette.baseLight }}
          />
          <m.div
            className="absolute inset-0 hidden dark:block"
            initial={{ background: palette.baseDark }}
            animate={{ background: palette.baseDark }}
          />

          <m.div
            animate={phaseAnimation}
            transition={
              allowAmbientAnimation
                ? {
                    duration: motion.phaseDuration,
                    repeat: Infinity,
                    ease: EASING.easeInOut,
                  }
                : undefined
            }
            initial={{
              backgroundImage: palette.phaseLight,
              backgroundSize: "100% 220%",
              backgroundPosition: phasePositionStyle,
              backgroundRepeat: "no-repeat",
            }}
            className="absolute inset-0 opacity-[0.80] dark:hidden gpu-accelerated"
          />
          <m.div
            animate={phaseAnimation}
            transition={
              allowAmbientAnimation
                ? {
                    duration: motion.phaseDuration,
                    repeat: Infinity,
                    ease: EASING.easeInOut,
                  }
                : undefined
            }
            initial={{
              backgroundImage: palette.phaseDark,
              backgroundSize: "100% 220%",
              backgroundPosition: phasePositionStyle,
              backgroundRepeat: "no-repeat",
            }}
            className="absolute inset-0 opacity-[0.70] hidden dark:block gpu-accelerated"
          />

          <m.div
            animate={
              allowAmbientAnimation
                ? {
                    backgroundPosition: [
                      "40% 20%",
                      "45% 28%",
                      "48% 22%",
                      "40% 20%",
                    ],
                    opacity: motion.auroraAOpacity,
                  }
                : undefined
            }
            transition={
              allowAmbientAnimation
                ? {
                    duration: motion.auroraADuration,
                    repeat: Infinity,
                    ease: EASING.easeInOut,
                  }
                : undefined
            }
            initial={{
              backgroundImage: palette.auroraA,
              backgroundSize: "200% 200%",
              backgroundRepeat: "no-repeat",
              ...(allowAmbientAnimation
                ? {}
                : { backgroundPosition: "44% 24%", opacity: 0.35 }),
            }}
            className="absolute inset-0 gpu-accelerated"
          />
          <m.div
            animate={
              allowAmbientAnimation
                ? {
                    backgroundPosition: [
                      "60% 30%",
                      "55% 35%",
                      "58% 28%",
                      "60% 30%",
                    ],
                    opacity: motion.auroraBOpacity,
                  }
                : undefined
            }
            transition={
              allowAmbientAnimation
                ? {
                    duration: motion.auroraBDuration,
                    repeat: Infinity,
                    ease: EASING.easeInOut,
                    delay: 2,
                  }
                : undefined
            }
            initial={{
              backgroundImage: palette.auroraB,
              backgroundSize: "220% 220%",
              backgroundRepeat: "no-repeat",
              ...(allowAmbientAnimation
                ? {}
                : { backgroundPosition: "58% 30%", opacity: 0.28 }),
            }}
            className="absolute inset-0 gpu-accelerated"
          />
        </m.div>
      </AnimatePresence>

      {intensity === "showcase"
        ? bubblePresets.map((bubble, index) => {
            const size = Math.round(bubble.size * bubbleScaleFactor);
            const blur = Math.round(bubble.blur * bubbleScaleFactor);
            const drift = ORB_DRIFT[index];
            const effLeft = 50 + (parseFloat(bubble.left) - 50) * spread;
            const morph = prefersReducedMotion
              ? { duration: 0 }
              : { type: "spring" as const, stiffness: 60, damping: 18 };
            return (
              <m.div
                key={index}
                className="absolute gpu-accelerated"
                initial={{
                  left: `${effLeft}%`,
                  top: bubble.top,
                  width: size,
                  height: size,
                }}
                animate={{
                  left: `${effLeft}%`,
                  top: bubble.top,
                  width: size,
                  height: size,
                }}
                transition={{
                  left: morph,
                  top: morph,
                  width: morph,
                  height: morph,
                }}
              >
                <m.div
                  className="absolute inset-0 gpu-accelerated"
                  initial={{ opacity: 0.9 }}
                  animate={
                    allowBubbleMotion
                      ? {
                          x: [
                            -drift.driftX,
                            drift.driftX * 0.82,
                            -drift.driftX * 0.58,
                          ],
                          y: [
                            -drift.driftY,
                            drift.driftY * 0.9,
                            -drift.driftY * 0.48,
                          ],
                          scale: drift.scale,
                          opacity: [0.8, 1, 0.86],
                        }
                      : { opacity: 0.9 }
                  }
                  transition={
                    allowBubbleMotion
                      ? {
                          x: {
                            duration:
                              drift.duration + (useMobileLiteMode ? 4 : 0),
                            repeat: Infinity,
                            ease: EASING.easeInOut,
                            delay: drift.delay,
                          },
                          y: {
                            duration:
                              drift.duration + (useMobileLiteMode ? 4 : 0),
                            repeat: Infinity,
                            ease: EASING.easeInOut,
                            delay: drift.delay,
                          },
                          scale: {
                            duration:
                              drift.duration + (useMobileLiteMode ? 4 : 0),
                            repeat: Infinity,
                            ease: EASING.easeInOut,
                            delay: drift.delay,
                          },
                          opacity: {
                            duration:
                              drift.duration + (useMobileLiteMode ? 4 : 0),
                            repeat: Infinity,
                            ease: EASING.easeInOut,
                            delay: drift.delay,
                          },
                        }
                      : undefined
                  }
                >
                  <AnimatePresence>
                    <m.div
                      key={`${variant}-${index}`}
                      className="absolute inset-0 rounded-full gpu-accelerated mix-blend-multiply dark:mix-blend-screen"
                      initial={{
                        opacity: 0,
                        background: bubble.color,
                        filter: `blur(${blur}px)`,
                      }}
                      animate={{
                        opacity: bubble.opacity,
                        background: bubble.color,
                        filter: `blur(${blur}px)`,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        opacity: prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.5, ease: "easeInOut" },
                        background: { duration: 0 },
                        filter: prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.5 },
                      }}
                    />
                  </AnimatePresence>
                </m.div>
              </m.div>
            );
          })
        : null}

      <AnimatePresence>
        <m.div
          key={variant}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: "easeInOut" },
          }}
        >
          {intensity === "showcase" && !useMobileLiteMode && variant !== "home" ? (
            <m.div
              animate={
                allowShowcaseAccent
                  ? variant === "brands"
                    ? {
                        rotate: [-4, 8, -4],
                        scale: [1, 1.03, 1],
                        opacity: [0.22, 0.32, 0.22],
                      }
                    : {
                        x: [-14, 16, -10],
                        y: [-8, 12, -6],
                        scale: [1, 1.05, 1],
                        opacity: [0.24, 0.35, 0.24],
                      }
                  : undefined
              }
              transition={
                allowShowcaseAccent
                  ? {
                      duration: variant === "brands" ? 34 : 26,
                      repeat: Infinity,
                      ease: EASING.easeInOut,
                    }
                  : undefined
              }
              initial={{
                opacity: variant === "brands" ? 0.24 : 0.26,
              }}
              className={
                variant === "brands"
                  ? "absolute inset-x-[-8%] top-[16%] h-[42vh] rounded-[48px] border border-orange-300/12 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.11),rgba(236,72,153,0.07)_42%,transparent_76%)] blur-[54px] dark:border-orange-200/8 dark:bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.14),rgba(236,72,153,0.08)_42%,transparent_78%)]"
                  : "absolute inset-x-[-10%] top-[12%] h-[48vh] rounded-[56px] border border-violet-300/10 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.10),rgba(99,102,241,0.08)_44%,transparent_78%)] blur-[62px] dark:border-violet-200/8 dark:bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.16),rgba(236,72,153,0.09)_44%,transparent_78%)]"
              }
            />
          ) : null}

          <m.div
            style={{
              ...(allowParallax ? { y: ySlow } : {}),
            }}
            initial={{
              opacity: isBrandsVariant && !allowGlowPulse ? 0.46 : motion.glowAOpacity[0],
            }}
            animate={
              allowGlowPulse
                ? { opacity: motion.glowAOpacity }
                : { opacity: isBrandsVariant ? 0.46 : motion.glowAOpacity[0] }
            }
            transition={
              allowGlowPulse
                ? {
                    duration: 12,
                    repeat: Infinity,
                    ease: EASING.easeInOut,
                  }
                : undefined
            }
            className={glowLayerClasses.first}
          >
            <m.div
              className="h-full w-full rounded-full"
              initial={{
                background: useMobileLiteMode
                  ? palette.glowA.soft
                  : `radial-gradient(ellipse_at_center,${palette.glowA.strong} 0%,${palette.glowA.soft} 42%,transparent 70%)`,
              }}
              animate={{
                background: useMobileLiteMode
                  ? palette.glowA.soft
                  : `radial-gradient(ellipse_at_center,${palette.glowA.strong} 0%,${palette.glowA.soft} 42%,transparent 70%)`,
              }}
            />
          </m.div>
          <m.div
            style={{
              ...(allowParallax ? { y: yMid } : {}),
            }}
            initial={{
              opacity: isBrandsVariant && !allowGlowPulse ? 0.4 : motion.glowBOpacity[0],
            }}
            animate={
              allowGlowPulse
                ? { opacity: motion.glowBOpacity }
                : { opacity: isBrandsVariant ? 0.4 : motion.glowBOpacity[0] }
            }
            transition={
              allowGlowPulse
                ? {
                    duration: 10,
                    repeat: Infinity,
                    ease: EASING.easeInOut,
                    delay: 1.5,
                  }
                : undefined
            }
            className={glowLayerClasses.second}
          >
            <m.div
              className="h-full w-full rounded-full"
              initial={{
                background: useMobileLiteMode
                  ? palette.glowB.soft
                  : `radial-gradient(ellipse_at_center,${palette.glowB.strong} 0%,${palette.glowB.soft} 42%,transparent 70%)`,
              }}
              animate={{
                background: useMobileLiteMode
                  ? palette.glowB.soft
                  : `radial-gradient(ellipse_at_center,${palette.glowB.strong} 0%,${palette.glowB.soft} 42%,transparent 70%)`,
              }}
            />
          </m.div>
          <m.div
            style={{
              ...(allowParallax ? { y: yFast } : {}),
            }}
            initial={{
              opacity: isBrandsVariant && !allowGlowPulse ? 0.44 : motion.glowCOpacity[0],
            }}
            animate={
              allowGlowPulse
                ? { opacity: motion.glowCOpacity }
                : { opacity: isBrandsVariant ? 0.44 : motion.glowCOpacity[0] }
            }
            transition={
              allowGlowPulse
                ? {
                    duration: 14,
                    repeat: Infinity,
                    ease: EASING.easeInOut,
                    delay: 3,
                  }
                : undefined
            }
            className={glowLayerClasses.third}
          >
            <m.div
              className="h-full w-full rounded-full"
              initial={{
                background: useMobileLiteMode
                  ? palette.glowC.soft
                  : `radial-gradient(ellipse_at_center,${palette.glowC.strong} 0%,${palette.glowC.soft} 42%,transparent 70%)`,
              }}
              animate={{
                background: useMobileLiteMode
                  ? palette.glowC.soft
                  : `radial-gradient(ellipse_at_center,${palette.glowC.strong} 0%,${palette.glowC.soft} 42%,transparent 70%)`,
              }}
            />
          </m.div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.06)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_18%,rgba(2,6,23,0.65)_100%)]" />
          <m.div
            className="absolute inset-0 opacity-[0.25] dark:opacity-[0.20] mix-blend-overlay"
            initial={{
              backgroundImage: `radial-gradient(${palette.dot} 1.5px, transparent 1.5px), radial-gradient(${palette.dot} 1px, transparent 1px)`,
              backgroundSize: "60px 60px, 30px 30px",
              backgroundPosition: "0 0, 15px 15px",
            }}
            animate={{
              backgroundImage: `radial-gradient(${palette.dot} 1.5px, transparent 1.5px), radial-gradient(${palette.dot} 1px, transparent 1px)`,
              backgroundSize: "60px 60px, 30px 30px",
              backgroundPosition: "0 0, 15px 15px",
            }}
          />
        </m.div>
      </AnimatePresence>
    </div>
  );
}
