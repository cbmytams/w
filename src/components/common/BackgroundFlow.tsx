"use client"

import { m, useScroll, useSpring, useTransform } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export type BackgroundFlowVariant = "brands" | "talents"

type BackgroundPalette = {
    baseLight: string
    baseDark: string
    phaseLight: string
    phaseDark: string
    auroraA: string
    auroraB: string
    glowA: { strong: string; soft: string }
    glowB: { strong: string; soft: string }
    glowC: { strong: string; soft: string }
    dot: string
}

const PALETTES: Record<BackgroundFlowVariant, BackgroundPalette> = {
    brands: {
        baseLight: "#fff7f1",
        baseDark: "#07080c",
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
        dot: "rgba(249,115,22,0.26)"
    },
    talents: {
        baseLight: "#f8f7ff", // Blanc teinté froid (Spatial Base)
        baseDark: "#050508",  // Deep Space Dark
        phaseLight:
            "linear-gradient(180deg, rgba(250, 249, 255, 0.98) 0%, rgba(245, 242, 255, 0.95) 22%, rgba(239, 234, 255, 0.90) 44%, rgba(226, 218, 255, 0.86) 58%, rgba(124, 58, 237, 0.14) 72%, rgba(79, 70, 229, 0.10) 84%, rgba(248, 246, 255, 0.96) 100%)",
        phaseDark:
            "linear-gradient(180deg, rgba(6, 6, 10, 0.98) 0%, rgba(9, 8, 14, 0.95) 24%, rgba(14, 12, 24, 0.92) 46%, rgba(20, 16, 30, 0.88) 60%, rgba(124, 58, 237, 0.18) 74%, rgba(79, 70, 229, 0.12) 86%, rgba(4, 4, 8, 0.98) 100%)",
        // Aurora: Plus intense et cosmique (Violet/Indigo/Pink)
        auroraA:
            "linear-gradient(120deg,rgba(139,92,246,0.25),rgba(124,58,237,0.22),rgba(167,139,250,0.18),transparent_70%)",
        auroraB:
            "linear-gradient(240deg,rgba(99,102,241,0.22),rgba(124,58,237,0.22),rgba(236,72,153,0.18),transparent_70%)",
        // Glows: "Nebula" style - plus larges et diffus
        glowA: { strong: "rgba(124,58,237,0.16)", soft: "rgba(139,92,246,0.06)" }, // Deep Violet
        glowB: { strong: "rgba(79,70,229,0.14)", soft: "rgba(99,102,241,0.05)" }, // Indigo
        glowC: { strong: "rgba(236,72,153,0.14)", soft: "rgba(244,114,182,0.05)" }, // Pink
        dot: "rgba(124,58,237,0.28)"
    }
}

const FLOW_MOTION: Record<BackgroundFlowVariant, {
    ySlow: [number, number]
    yMid: [number, number]
    yFast: [number, number]
    auroraAOpacity: number[]
    auroraBOpacity: number[]
    glowAOpacity: number[]
    glowBOpacity: number[]
    glowCOpacity: number[]
    phaseDuration: number
    auroraADuration: number
    auroraBDuration: number
}> = {
    brands: {
        ySlow: [-34, 44],
        yMid: [28, -40],
        yFast: [48, 70],
        auroraAOpacity: [0.34, 0.42, 0.36, 0.34],
        auroraBOpacity: [0.28, 0.36, 0.32, 0.28],
        glowAOpacity: [0.50, 0.58, 0.52, 0.50],
        glowBOpacity: [0.42, 0.50, 0.44, 0.42],
        glowCOpacity: [0.46, 0.54, 0.48, 0.46],
        phaseDuration: 28,
        auroraADuration: 24,
        auroraBDuration: 22
    },
    talents: {
        ySlow: [-110, 140],
        yMid: [90, -130],
        yFast: [140, 200],
        auroraAOpacity: [0.32, 0.40, 0.35, 0.32],
        auroraBOpacity: [0.28, 0.36, 0.32, 0.28],
        glowAOpacity: [0.46, 0.54, 0.49, 0.46],
        glowBOpacity: [0.38, 0.46, 0.40, 0.38],
        glowCOpacity: [0.42, 0.50, 0.44, 0.42],
        phaseDuration: 30,
        auroraADuration: 26,
        auroraBDuration: 24
    }
}

export function BackgroundFlow({ variant = "brands" }: { variant?: BackgroundFlowVariant }) {
    const prefersReducedMotion = useReducedMotion()
    const { scrollYProgress } = useScroll()
    const isBrandsVariant = variant === "brands"

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 24,
        mass: 0.7
    })

    const motion = FLOW_MOTION[variant]
    const ySlow = useTransform(smoothProgress, [0, 1], motion.ySlow)
    const yMid = useTransform(smoothProgress, [0, 1], motion.yMid)
    const yFast = useTransform(smoothProgress, [0, 1], motion.yFast)

    const palette = PALETTES[variant]
    const allowAmbientAnimation = !prefersReducedMotion && !isBrandsVariant
    const allowGlowPulse = !prefersReducedMotion && !isBrandsVariant
    const phaseAnimation = allowAmbientAnimation
        ? { backgroundPosition: ["50% 46%", "50% 50%", "50% 46%"] }
        : undefined

    const phasePositionStyle = "50% 48%"
    const glowLayerClasses = isBrandsVariant
        ? {
              first: "absolute -top-44 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full blur-[120px] dark:opacity-75 gpu-accelerated",
              second: "absolute top-[18%] right-[-8%] h-[520px] w-[680px] rounded-full blur-[130px] dark:opacity-70 gpu-accelerated",
              third: "absolute bottom-[-20%] left-[-10%] h-[600px] w-[740px] rounded-full blur-[136px] dark:opacity-70 gpu-accelerated"
          }
        : {
              first: "absolute -top-48 left-1/2 h-[640px] w-[980px] -translate-x-1/2 rounded-full blur-[140px] dark:opacity-80 gpu-accelerated",
              second: "absolute top-[18%] right-[-8%] h-[600px] w-[760px] rounded-full blur-[150px] dark:opacity-70 gpu-accelerated",
              third: "absolute bottom-[-24%] left-[-12%] h-[680px] w-[820px] rounded-full blur-[160px] dark:opacity-70 gpu-accelerated"
          }

    return (
        <div className="pointer-events-none fixed inset-0 z-0">
            {/* Base tone */}
            <div className="absolute inset-0 dark:hidden" style={{ background: palette.baseLight }} />
            <div className="absolute inset-0 hidden dark:block" style={{ background: palette.baseDark }} />

            {/* Section phase gradient */}
            <m.div
                animate={phaseAnimation}
                transition={allowAmbientAnimation ? { duration: motion.phaseDuration, repeat: Infinity, ease: "easeInOut" } : undefined}
                style={{
                    backgroundImage: palette.phaseLight,
                    backgroundSize: "100% 220%",
                    backgroundPosition: phasePositionStyle,
                    backgroundRepeat: "no-repeat"
                }}
                className="absolute inset-0 opacity-[0.80] dark:hidden gpu-accelerated"
            />
            <m.div
                animate={phaseAnimation}
                transition={allowAmbientAnimation ? { duration: motion.phaseDuration, repeat: Infinity, ease: "easeInOut" } : undefined}
                style={{
                    backgroundImage: palette.phaseDark,
                    backgroundSize: "100% 220%",
                    backgroundPosition: phasePositionStyle,
                    backgroundRepeat: "no-repeat"
                }}
                className="absolute inset-0 opacity-[0.70] hidden dark:block gpu-accelerated"
            />

            {/* Aurora sweeps with animated color transitions */}
            <m.div
                animate={allowAmbientAnimation ? {
                    backgroundPosition: [
                        "40% 20%",
                        "45% 28%",
                        "48% 22%",
                        "40% 20%"
                    ],
                    opacity: motion.auroraAOpacity
                } : undefined}
                transition={allowAmbientAnimation ? {
                    duration: motion.auroraADuration,
                    repeat: Infinity,
                    ease: "easeInOut"
                } : undefined}
                style={{
                    backgroundImage: palette.auroraA,
                    backgroundSize: "200% 200%",
                    backgroundRepeat: "no-repeat",
                    ...(allowAmbientAnimation ? {} : { backgroundPosition: "44% 24%", opacity: 0.35 })
                }}
                className="absolute inset-0 gpu-accelerated"
            />
            <m.div
                animate={allowAmbientAnimation ? {
                    backgroundPosition: [
                        "60% 30%",
                        "55% 35%",
                        "58% 28%",
                        "60% 30%"
                    ],
                    opacity: motion.auroraBOpacity
                } : undefined}
                transition={allowAmbientAnimation ? {
                    duration: motion.auroraBDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                } : undefined}
                style={{
                    backgroundImage: palette.auroraB,
                    backgroundSize: "220% 220%",
                    backgroundRepeat: "no-repeat",
                    ...(allowAmbientAnimation ? {} : { backgroundPosition: "58% 30%", opacity: 0.28 })
                }}
                className="absolute inset-0 gpu-accelerated"
            />

            {/* Floating glows with animated opacity */}
            <m.div
                style={{
                    ...(prefersReducedMotion ? {} : { y: ySlow }),
                    ...(allowGlowPulse ? {} : { opacity: isBrandsVariant ? 0.46 : motion.glowAOpacity[0] })
                }}
                animate={allowGlowPulse ? { opacity: motion.glowAOpacity } : undefined}
                transition={allowGlowPulse ? {
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                } : undefined}
                className={glowLayerClasses.first}
            >
                <div
                    className="h-full w-full rounded-full"
                    style={{
                        background: `radial-gradient(ellipse_at_center,${palette.glowA.strong} 0%,${palette.glowA.soft} 42%,transparent 70%)`
                    }}
                />
            </m.div>
            <m.div
                style={{
                    ...(prefersReducedMotion ? {} : { y: yMid }),
                    ...(allowGlowPulse ? {} : { opacity: isBrandsVariant ? 0.4 : motion.glowBOpacity[0] })
                }}
                animate={allowGlowPulse ? { opacity: motion.glowBOpacity } : undefined}
                transition={allowGlowPulse ? {
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                } : undefined}
                className={glowLayerClasses.second}
            >
                <div
                    className="h-full w-full rounded-full"
                    style={{
                        background: `radial-gradient(ellipse_at_center,${palette.glowB.strong} 0%,${palette.glowB.soft} 42%,transparent 70%)`
                    }}
                />
            </m.div>
            <m.div
                style={{
                    ...(prefersReducedMotion ? {} : { y: yFast }),
                    ...(allowGlowPulse ? {} : { opacity: isBrandsVariant ? 0.44 : motion.glowCOpacity[0] })
                }}
                animate={allowGlowPulse ? { opacity: motion.glowCOpacity } : undefined}
                transition={allowGlowPulse ? {
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                } : undefined}
                className={glowLayerClasses.third}
            >
                <div
                    className="h-full w-full rounded-full"
                    style={{
                        background: `radial-gradient(ellipse_at_center,${palette.glowC.strong} 0%,${palette.glowC.soft} 42%,transparent 70%)`
                    }}
                />
            </m.div>

            {/* Gentle vignette + Stars Texture (Spatial Effect) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.06)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_18%,rgba(2,6,23,0.65)_100%)]" />
            <div
                className="absolute inset-0 opacity-[0.25] dark:opacity-[0.20] mix-blend-overlay"
                style={{
                    backgroundImage: `radial-gradient(${palette.dot} 1.5px, transparent 1.5px), radial-gradient(${palette.dot} 1px, transparent 1px)`,
                    backgroundSize: "60px 60px, 30px 30px",
                    backgroundPosition: "0 0, 15px 15px"
                }}
            />
        </div>
    )
}
