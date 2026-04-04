"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search, Layers, TrendingUp, Crown } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import {
    TALENT_JOURNEY_HEADER,
    TALENT_JOURNEY_PHASES,
} from "@/constants/talent-journey-steps"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"
import { EASING, DURATION } from "@/lib/easing"

const phaseIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "Search": Search,
    "Layers": Layers,
    "TrendingUp": TrendingUp,
    "Crown": Crown
}

const PHASE_BENEFITS = [
    "On clarifie ton positionnement, ton potentiel business et les mauvais deals a eviter.",
    "On structure ton image, tes formats et ton offre commerciale.",
    "On industrialise la production, les partenariats et le pilotage.",
    "On construit une equipe et des process qui te rendent durable."
]

export function TalentJourneySection() {
    const prefersReducedMotion = useReducedMotion()
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Parallax for the phase cards — subtle float
    const y1 = useTransform(scrollYProgress, [0, 1], [40, -40])
    const y2 = useTransform(scrollYProgress, [0, 1], [60, -60])
    const y3 = useTransform(scrollYProgress, [0, 1], [30, -30])
    const y4 = useTransform(scrollYProgress, [0, 1], [50, -50])
    const parallaxValues = [y1, y2, y3, y4]

    return (
        <section
            ref={containerRef}
            id="method"
            className="py-32 md:py-40 px-4 relative z-10 overflow-hidden"
        >
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

            <Container>
                <div className="max-w-5xl mx-auto">

                    {/* Header — Apple-clean */}
                    <RevealAnimation className="text-center mb-6">
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.05]">
                            {TALENT_JOURNEY_HEADER.title}{" "}
                            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                                {TALENT_JOURNEY_HEADER.titleHighlight}
                            </span>
                        </h2>
                    </RevealAnimation>

                    <RevealAnimation delay={0.08} className="text-center mb-24">
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                            De l&apos;audit initial a l&apos;autonomie complete. 36 mois.
                        </p>
                    </RevealAnimation>

                    {/* 4 Phases — Fluid Trajectory */}
                    <div className="relative flex flex-col gap-12 lg:gap-16 mb-32 max-w-3xl mx-auto">
                        
                        {/* Continuous Vertical Thread */}
                        <div className="absolute left-[39px] md:left-[55px] top-12 bottom-12 w-[1px] bg-gradient-to-b from-transparent via-slate-300 dark:via-white/10 to-transparent" />

                        {TALENT_JOURNEY_PHASES.map((phase, i) => {
                            const Icon = phaseIconMap[phase.icon]
                            return (
                                <motion.div
                                    key={phase.id}
                                    style={prefersReducedMotion ? {} : { y: parallaxValues[i] }}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{
                                        duration: DURATION.slower,
                                        delay: i * 0.1,
                                        ease: EASING.entrance
                                    }}
                                    className="group relative flex items-start gap-6 lg:gap-10"
                                >
                                    {/* Phase Icon & Thread Node */}
                                    <div className="relative z-10 shrink-0 mt-1">
                                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white dark:bg-[#0b111a] border border-slate-200 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-white/5 transition-transform duration-500 group-hover:scale-110">
                                            {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6 text-slate-800 dark:text-white/80" />}
                                        </div>
                                    </div>

                                    {/* Content Card - Minimal Glass */}
                                    <div className={cn(
                                        "flex-1 p-8 lg:p-10 rounded-2xl overflow-hidden",
                                        "bg-black/[0.02] dark:bg-white/[0.015]",
                                        "backdrop-blur-3xl",
                                        "border border-black/[0.05] dark:border-white/[0.05]",
                                        "hover:bg-black/[0.03] dark:hover:bg-white/[0.03]",
                                        "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                        "flex flex-col relative"
                                    )}>
                                        <div className="flex items-center justify-between mb-6">
                                            {/* Minimal Phase Number */}
                                            <span className="text-xl md:text-2xl font-light text-slate-400 dark:text-white/20 select-none">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-3 mb-3">
                                                <h3 className="text-2xl lg:text-3xl font-medium text-slate-900 dark:text-white tracking-tight">
                                                    {phase.name}
                                                </h3>
                                                <span className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                                                    {phase.label}
                                                </span>
                                            </div>
                                            <p className="text-base lg:text-lg text-slate-600 dark:text-white/50 leading-relaxed font-light">
                                                {PHASE_BENEFITS[i]}
                                            </p>
                                        </div>

                                        {/* Glass Edge */}
                                        <div className="absolute inset-0 rounded-2xl border border-white/40 dark:border-white/5 pointer-events-none" />

                                        {/* Monochrome Hover Glow */}
                                        <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/10 to-transparent dark:from-white/[0.02] dark:to-transparent" />
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Signature — word-by-word blur reveal */}
                    <div className="text-center">
                        {prefersReducedMotion ? (
                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                                {TALENT_JOURNEY_HEADER.signature}
                            </h3>
                        ) : (
                            <motion.h3
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={{
                                    visible: { transition: { staggerChildren: 0.04 } }
                                }}
                                className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight"
                            >
                                {TALENT_JOURNEY_HEADER.signature.split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                filter: "blur(0px)",
                                                transition: {
                                                    type: "spring",
                                                    damping: 18,
                                                    stiffness: 80
                                                }
                                            }
                                        }}
                                        className="inline-block mr-[0.25em] bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.h3>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    )
}
