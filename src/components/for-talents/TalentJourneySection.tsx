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

                    {/* 4 Phases — large cards with parallax float */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-32">
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
                                    className="group relative"
                                >
                                    {/* Glass card */}
                                    <div className={cn(
                                        "relative p-8 lg:p-10 rounded-2xl overflow-hidden",
                                        "bg-black/[0.02] dark:bg-white/[0.02]",
                                        "backdrop-blur-[40px]",
                                        "border border-black/[0.05] dark:border-white/[0.05]",
                                        "hover:bg-black/[0.04] dark:hover:bg-white/[0.04]",
                                        "hover:-translate-y-1 hover:shadow-2xl",
                                        "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                        "min-h-[280px] flex flex-col"
                                    )}>
                                        {/* Phase number — large, subtle */}
                                        <div className="flex items-start justify-between mb-auto">
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                                `bg-gradient-to-br ${phase.gradient}`,
                                                "shadow-lg"
                                            )}>
                                                {Icon && <Icon className="w-5 h-5 text-white" />}
                                            </div>
                                            <span className="text-6xl lg:text-7xl font-bold text-slate-100 dark:text-white/[0.04] select-none leading-none">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="mt-10">
                                            <div className="flex items-baseline gap-3 mb-2">
                                                <h3 className="text-2xl lg:text-[1.7rem] font-bold text-slate-900 dark:text-white tracking-tight">
                                                    {phase.name}
                                                </h3>
                                                <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">
                                                    {phase.label}
                                                </span>
                                            </div>
                                            <p className="text-[15px] text-slate-500 dark:text-white/40 leading-relaxed">
                                                {PHASE_BENEFITS[i]}
                                            </p>
                                        </div>

                                        {/* Glass edge */}
                                        <div className="absolute inset-0 rounded-2xl border border-white/20 dark:border-white/5 pointer-events-none" />

                                        {/* Hover glow */}
                                        <div className={cn(
                                            "absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-100",
                                            `bg-gradient-to-br ${phase.gradient}`,
                                            "mix-blend-overlay dark:mix-blend-soft-light"
                                        )} style={{ opacity: 0 }} />
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
