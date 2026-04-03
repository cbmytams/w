"use client"

import { useEffect, useState } from "react"
import { motion as m, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion"
import { SPRING } from "@/lib/design-tokens"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { EASING } from "@/lib/easing"
import {
    getBackgroundRuntimeProfile,
    shouldAnimateAmbientPhase,
    shouldAnimateShowcaseAccent,
    type BackgroundFlowIntensity,
    type BackgroundFlowVariant,
} from "@/lib/background-flow"

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

type BubblePreset = {
    size: number
    left: string
    top: string
    color: string
    opacity: number
    blur: number
    driftX: number
    driftY: number
    scale: [number, number, number]
    duration: number
    delay: number
}

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
        auroraBDuration: 22,
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
        auroraBDuration: 24,
    },
}

const BUBBLE_PRESETS: Record<BackgroundFlowVariant, BubblePreset[]> = {
    brands: [
        {
            size: 360,
            left: "14%",
            top: "18%",
            color: "radial-gradient(circle at 36% 36%, rgba(251,146,60,0.58), rgba(249,115,22,0.32) 52%, rgba(236,72,153,0.16) 78%, transparent 100%)",
            opacity: 0.62,
            blur: 26,
            driftX: 90,
            driftY: 72,
            scale: [1, 1.11, 0.95],
            duration: 16,
            delay: 0,
        },
        {
            size: 310,
            left: "82%",
            top: "22%",
            color: "radial-gradient(circle at 44% 44%, rgba(249,115,22,0.50), rgba(244,63,94,0.24) 56%, transparent 100%)",
            opacity: 0.54,
            blur: 24,
            driftX: 86,
            driftY: 66,
            scale: [0.94, 1.09, 1],
            duration: 14,
            delay: 1.6,
        },
        {
            size: 420,
            left: "38%",
            top: "70%",
            color: "radial-gradient(circle at 40% 42%, rgba(252,211,77,0.42), rgba(249,115,22,0.24) 50%, transparent 100%)",
            opacity: 0.48,
            blur: 30,
            driftX: 78,
            driftY: 94,
            scale: [1, 1.1, 0.93],
            duration: 20,
            delay: 0.8,
        },
        {
            size: 280,
            left: "70%",
            top: "74%",
            color: "radial-gradient(circle at 50% 50%, rgba(236,72,153,0.40), rgba(249,115,22,0.22) 54%, transparent 100%)",
            opacity: 0.52,
            blur: 22,
            driftX: 70,
            driftY: 76,
            scale: [0.96, 1.08, 1],
            duration: 15,
            delay: 2.2,
        },
        {
            size: 300,
            left: "56%",
            top: "42%",
            color: "radial-gradient(circle at 40% 40%, rgba(56,189,248,0.30), rgba(249,115,22,0.22) 58%, transparent 100%)",
            opacity: 0.44,
            blur: 24,
            driftX: 64,
            driftY: 60,
            scale: [1, 1.07, 0.96],
            duration: 13,
            delay: 1.1,
        },
    ],
    talents: [
        {
            size: 380,
            left: "18%",
            top: "20%",
            color: "radial-gradient(circle at 36% 36%, rgba(139,92,246,0.62), rgba(124,58,237,0.34) 52%, rgba(99,102,241,0.18) 78%, transparent 100%)",
            opacity: 0.62,
            blur: 28,
            driftX: 96,
            driftY: 82,
            scale: [1, 1.12, 0.95],
            duration: 15,
            delay: 0,
        },
        {
            size: 340,
            left: "80%",
            top: "24%",
            color: "radial-gradient(circle at 44% 44%, rgba(99,102,241,0.50), rgba(168,85,247,0.28) 56%, transparent 100%)",
            opacity: 0.54,
            blur: 24,
            driftX: 100,
            driftY: 74,
            scale: [0.94, 1.1, 1],
            duration: 13.5,
            delay: 1.2,
        },
        {
            size: 440,
            left: "36%",
            top: "72%",
            color: "radial-gradient(circle at 40% 42%, rgba(236,72,153,0.40), rgba(124,58,237,0.26) 50%, transparent 100%)",
            opacity: 0.48,
            blur: 32,
            driftX: 88,
            driftY: 106,
            scale: [1, 1.11, 0.92],
            duration: 18,
            delay: 1.8,
        },
        {
            size: 300,
            left: "74%",
            top: "74%",
            color: "radial-gradient(circle at 50% 50%, rgba(79,70,229,0.44), rgba(59,130,246,0.24) 54%, transparent 100%)",
            opacity: 0.50,
            blur: 24,
            driftX: 78,
            driftY: 88,
            scale: [0.96, 1.08, 1],
            duration: 14,
            delay: 2.6,
        },
        {
            size: 280,
            left: "56%",
            top: "42%",
            color: "radial-gradient(circle at 40% 40%, rgba(244,114,182,0.40), rgba(99,102,241,0.22) 58%, transparent 100%)",
            opacity: 0.44,
            blur: 25,
            driftX: 70,
            driftY: 66,
            scale: [1, 1.08, 0.95],
            duration: 12.5,
            delay: 0.9,
        },
    ],
}

type BackgroundFlowProps = {
    variant?: BackgroundFlowVariant
    intensity?: BackgroundFlowIntensity
}

export function BackgroundFlow({ variant = "brands", intensity = "base" }: BackgroundFlowProps) {
    const prefersReducedMotion = useReducedMotion()
    const [isMobile, setIsMobile] = useState(false)
    const [saveData, setSaveData] = useState(false)
    const [lowMemory, setLowMemory] = useState(false)
    const { scrollYProgress } = useScroll()
    const isBrandsVariant = variant === "brands"

    useEffect(() => {
        if (typeof window === "undefined") return

        const mobileQuery = window.matchMedia("(max-width: 768px)")
        const updateMobile = () => setIsMobile(mobileQuery.matches)
        updateMobile()
        mobileQuery.addEventListener("change", updateMobile)

        const nav = navigator as Navigator & {
            connection?: {
                addEventListener?: (event: string, cb: () => void) => void
                removeEventListener?: (event: string, cb: () => void) => void
                saveData?: boolean
            }
            deviceMemory?: number
        }
        const connection = nav.connection
        const updateConnection = () => {
            setSaveData(Boolean(connection?.saveData))
            setLowMemory(Boolean(nav.deviceMemory && nav.deviceMemory <= 4))
        }
        updateConnection()
        connection?.addEventListener?.("change", updateConnection)

        return () => {
            mobileQuery.removeEventListener("change", updateMobile)
            connection?.removeEventListener?.("change", updateConnection)
        }
    }, [])

    const smoothProgress = useSpring(scrollYProgress, {
        ...SPRING.gentle,
    })

    const motion = FLOW_MOTION[variant]
    const ySlowTarget = useTransform(smoothProgress, [0, 1], motion.ySlow)
    const yMidTarget = useTransform(smoothProgress, [0, 1], motion.yMid)
    const yFastTarget = useTransform(smoothProgress, [0, 1], motion.yFast)
    const ySlow = useMotionValue(motion.ySlow[0])
    const yMid = useMotionValue(motion.yMid[0])
    const yFast = useMotionValue(motion.yFast[0])

    const palette = PALETTES[variant]
    const runtimeProfile = getBackgroundRuntimeProfile({
        isMobile,
        saveData,
        lowMemory,
        prefersReducedMotion,
    })
    const isConstrainedRuntime = runtimeProfile.isConstrainedRuntime
    const useMobileLiteMode = runtimeProfile.mobileLite
    const bubbleScaleFactor = useMobileLiteMode ? 0.78 : 1
    const bubblePresets = BUBBLE_PRESETS[variant].slice(0, runtimeProfile.bubbleCount)
    const allowBubbleMotion = intensity === "showcase" && runtimeProfile.allowBubbleMotion
    const allowAmbientAnimation = shouldAnimateAmbientPhase({
        variant,
        intensity,
        prefersReducedMotion,
        isConstrainedRuntime: isConstrainedRuntime || useMobileLiteMode,
    })
    const allowShowcaseAccent = shouldAnimateShowcaseAccent({
        intensity,
        prefersReducedMotion,
        isConstrainedRuntime: isConstrainedRuntime || useMobileLiteMode,
    })
    const allowGlowPulse = !prefersReducedMotion && !useMobileLiteMode
    const allowParallax = !prefersReducedMotion && !useMobileLiteMode
    const phaseAnimation = allowAmbientAnimation
        ? { backgroundPosition: ["50% 46%", "50% 50%", "50% 46%"] }
        : undefined

    const phasePositionStyle = "50% 48%"
    const constrainedGlowClasses = {
        first: "absolute -top-28 left-1/2 h-[300px] w-[420px] -translate-x-1/2 rounded-full",
        second: "absolute top-[20%] right-[-5%] h-[260px] w-[320px] rounded-full",
        third: "absolute bottom-[-10%] left-[-8%] h-[280px] w-[340px] rounded-full",
    }
    const glowLayerClasses = useMobileLiteMode
        ? constrainedGlowClasses
        : isBrandsVariant
            ? {
                first: "absolute -top-44 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full blur-[120px] dark:opacity-75 gpu-accelerated",
                second: "absolute top-[18%] right-[-8%] h-[520px] w-[680px] rounded-full blur-[130px] dark:opacity-70 gpu-accelerated",
                third: "absolute bottom-[-20%] left-[-10%] h-[600px] w-[740px] rounded-full blur-[136px] dark:opacity-70 gpu-accelerated",
            }
            : {
                first: "absolute -top-48 left-1/2 h-[640px] w-[980px] -translate-x-1/2 rounded-full blur-[140px] dark:opacity-80 gpu-accelerated",
                second: "absolute top-[18%] right-[-8%] h-[600px] w-[760px] rounded-full blur-[150px] dark:opacity-70 gpu-accelerated",
                third: "absolute bottom-[-24%] left-[-12%] h-[680px] w-[820px] rounded-full blur-[160px] dark:opacity-70 gpu-accelerated",
            }

    useEffect(() => {
        if (!allowParallax) {
            ySlow.set(0)
            yMid.set(0)
            yFast.set(0)
            return
        }

        ySlow.set(motion.ySlow[0])
        yMid.set(motion.yMid[0])
        yFast.set(motion.yFast[0])
    }, [allowParallax, motion, yFast, yMid, ySlow])

    useMotionValueEvent(ySlowTarget, "change", (value) => {
        if (allowParallax) {
            ySlow.set(value)
        }
    })

    useMotionValueEvent(yMidTarget, "change", (value) => {
        if (allowParallax) {
            yMid.set(value)
        }
    })

    useMotionValueEvent(yFastTarget, "change", (value) => {
        if (allowParallax) {
            yFast.set(value)
        }
    })

    return (
        <div className="pointer-events-none fixed inset-0 z-0">
            <div className="absolute inset-0 dark:hidden" style={{ background: palette.baseLight }} />
            <div className="absolute inset-0 hidden dark:block" style={{ background: palette.baseDark }} />

            <m.div
                animate={phaseAnimation}
                transition={allowAmbientAnimation ? { duration: motion.phaseDuration, repeat: Infinity, ease: EASING.easeInOut } : undefined}
                style={{
                    backgroundImage: palette.phaseLight,
                    backgroundSize: "100% 220%",
                    backgroundPosition: phasePositionStyle,
                    backgroundRepeat: "no-repeat",
                }}
                className="absolute inset-0 opacity-[0.80] dark:hidden gpu-accelerated"
            />
            <m.div
                animate={phaseAnimation}
                transition={allowAmbientAnimation ? { duration: motion.phaseDuration, repeat: Infinity, ease: EASING.easeInOut } : undefined}
                style={{
                    backgroundImage: palette.phaseDark,
                    backgroundSize: "100% 220%",
                    backgroundPosition: phasePositionStyle,
                    backgroundRepeat: "no-repeat",
                }}
                className="absolute inset-0 opacity-[0.70] hidden dark:block gpu-accelerated"
            />

            <m.div
                animate={allowAmbientAnimation ? {
                    backgroundPosition: ["40% 20%", "45% 28%", "48% 22%", "40% 20%"],
                    opacity: motion.auroraAOpacity,
                } : undefined}
                transition={allowAmbientAnimation ? {
                    duration: motion.auroraADuration,
                    repeat: Infinity,
                    ease: EASING.easeInOut,
                } : undefined}
                style={{
                    backgroundImage: palette.auroraA,
                    backgroundSize: "200% 200%",
                    backgroundRepeat: "no-repeat",
                    ...(allowAmbientAnimation ? {} : { backgroundPosition: "44% 24%", opacity: 0.35 }),
                }}
                className="absolute inset-0 gpu-accelerated"
            />
            <m.div
                animate={allowAmbientAnimation ? {
                    backgroundPosition: ["60% 30%", "55% 35%", "58% 28%", "60% 30%"],
                    opacity: motion.auroraBOpacity,
                } : undefined}
                transition={allowAmbientAnimation ? {
                    duration: motion.auroraBDuration,
                    repeat: Infinity,
                    ease: EASING.easeInOut,
                    delay: 2,
                } : undefined}
                style={{
                    backgroundImage: palette.auroraB,
                    backgroundSize: "220% 220%",
                    backgroundRepeat: "no-repeat",
                    ...(allowAmbientAnimation ? {} : { backgroundPosition: "58% 30%", opacity: 0.28 }),
                }}
                className="absolute inset-0 gpu-accelerated"
            />

            {intensity === "showcase" ? bubblePresets.map((bubble, index) => (
                <div
                    key={`${variant}-bubble-${index}`}
                    style={{
                        left: bubble.left,
                        top: bubble.top,
                        transform: "translate(-50%, -50%)",
                    }}
                    className="absolute gpu-accelerated"
                >
                    <m.div
                        style={{
                            width: Math.round(bubble.size * bubbleScaleFactor),
                            height: Math.round(bubble.size * bubbleScaleFactor),
                            filter: `blur(${Math.round(bubble.blur * bubbleScaleFactor)}px)`,
                            background: bubble.color,
                            opacity: allowBubbleMotion ? undefined : bubble.opacity * 0.84,
                            willChange: allowBubbleMotion ? "transform, opacity" : "auto",
                        }}
                        animate={allowBubbleMotion ? {
                            x: [-bubble.driftX, bubble.driftX * 0.82, -bubble.driftX * 0.58],
                            y: [-bubble.driftY, bubble.driftY * 0.9, -bubble.driftY * 0.48],
                            scale: bubble.scale,
                            opacity: [bubble.opacity * 0.76, bubble.opacity, bubble.opacity * 0.82],
                        } : undefined}
                        transition={allowBubbleMotion ? {
                            duration: bubble.duration + (useMobileLiteMode ? 4 : 0),
                            repeat: Infinity,
                            ease: EASING.easeInOut,
                            delay: bubble.delay,
                        } : undefined}
                        className="rounded-full gpu-accelerated mix-blend-multiply dark:mix-blend-screen"
                    />
                </div>
            )) : null}

            {intensity === "showcase" && !useMobileLiteMode ? (
                <m.div
                    animate={allowShowcaseAccent
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
                        : undefined}
                    transition={allowShowcaseAccent
                        ? {
                            duration: variant === "brands" ? 34 : 26,
                            repeat: Infinity,
                            ease: EASING.easeInOut,
                        }
                        : undefined}
                    style={{
                        ...(allowShowcaseAccent ? {} : { opacity: variant === "brands" ? 0.24 : 0.26 }),
                        willChange: isConstrainedRuntime ? "auto" : "transform, opacity",
                    }}
                    className={variant === "brands"
                        ? "absolute inset-x-[-8%] top-[16%] h-[42vh] rounded-[48px] border border-orange-300/12 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.11),rgba(236,72,153,0.07)_42%,transparent_76%)] blur-[54px] dark:border-orange-200/8 dark:bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.14),rgba(236,72,153,0.08)_42%,transparent_78%)]"
                        : "absolute inset-x-[-10%] top-[12%] h-[48vh] rounded-[56px] border border-violet-300/10 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.10),rgba(99,102,241,0.08)_44%,transparent_78%)] blur-[62px] dark:border-violet-200/8 dark:bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.16),rgba(236,72,153,0.09)_44%,transparent_78%)]"}
                />
            ) : null}

            <m.div
                style={{
                    ...(allowParallax ? { y: ySlow } : {}),
                    ...(allowGlowPulse ? {} : { opacity: isBrandsVariant ? 0.46 : motion.glowAOpacity[0] }),
                    willChange: isConstrainedRuntime ? "auto" : "transform, opacity",
                }}
                animate={allowGlowPulse ? { opacity: motion.glowAOpacity } : undefined}
                transition={allowGlowPulse ? {
                    duration: 12,
                    repeat: Infinity,
                    ease: EASING.easeInOut,
                } : undefined}
                className={glowLayerClasses.first}
            >
                <div
                    className="h-full w-full rounded-full"
                    style={{
                        background: useMobileLiteMode
                            ? palette.glowA.soft
                            : `radial-gradient(ellipse_at_center,${palette.glowA.strong} 0%,${palette.glowA.soft} 42%,transparent 70%)`,
                    }}
                />
            </m.div>
            <m.div
                style={{
                    ...(allowParallax ? { y: yMid } : {}),
                    ...(allowGlowPulse ? {} : { opacity: isBrandsVariant ? 0.4 : motion.glowBOpacity[0] }),
                    willChange: isConstrainedRuntime ? "auto" : "transform, opacity",
                }}
                animate={allowGlowPulse ? { opacity: motion.glowBOpacity } : undefined}
                transition={allowGlowPulse ? {
                    duration: 10,
                    repeat: Infinity,
                    ease: EASING.easeInOut,
                    delay: 1.5,
                } : undefined}
                className={glowLayerClasses.second}
            >
                <div
                    className="h-full w-full rounded-full"
                    style={{
                        background: useMobileLiteMode
                            ? palette.glowB.soft
                            : `radial-gradient(ellipse_at_center,${palette.glowB.strong} 0%,${palette.glowB.soft} 42%,transparent 70%)`,
                    }}
                />
            </m.div>
            <m.div
                style={{
                    ...(allowParallax ? { y: yFast } : {}),
                    ...(allowGlowPulse ? {} : { opacity: isBrandsVariant ? 0.44 : motion.glowCOpacity[0] }),
                    willChange: isConstrainedRuntime ? "auto" : "transform, opacity",
                }}
                animate={allowGlowPulse ? { opacity: motion.glowCOpacity } : undefined}
                transition={allowGlowPulse ? {
                    duration: 14,
                    repeat: Infinity,
                    ease: EASING.easeInOut,
                    delay: 3,
                } : undefined}
                className={glowLayerClasses.third}
            >
                <div
                    className="h-full w-full rounded-full"
                    style={{
                        background: useMobileLiteMode
                            ? palette.glowC.soft
                            : `radial-gradient(ellipse_at_center,${palette.glowC.strong} 0%,${palette.glowC.soft} 42%,transparent 70%)`,
                    }}
                />
            </m.div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.06)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_18%,rgba(2,6,23,0.65)_100%)]" />
            <div
                className="absolute inset-0 opacity-[0.25] dark:opacity-[0.20] mix-blend-overlay"
                style={{
                    backgroundImage: `radial-gradient(${palette.dot} 1.5px, transparent 1.5px), radial-gradient(${palette.dot} 1px, transparent 1px)`,
                    backgroundSize: "60px 60px, 30px 30px",
                    backgroundPosition: "0 0, 15px 15px",
                }}
            />
        </div>
    )
}
