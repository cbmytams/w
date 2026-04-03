"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { Check, FileText, Clock, Search, Layers, TrendingUp, Crown } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/common/SectionHeading"
import {
    TALENT_JOURNEY_HEADER,
    TALENT_JOURNEY_PHASES,
    TALENT_JOURNEY_STEPS,
    type JourneyPhase
} from "@/constants/talent-journey-steps"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useRevealViewport } from "@/hooks/useRevealViewport"
import { cn } from "@/lib/utils"
import { EASING } from "@/lib/easing"
import { SPRING } from "@/lib/design-tokens"

// Only the 3 strongest widgets — KPIPulse, DealDesk, ProductionPipeline
import { ProductionPipelineWidget } from "./widgets/ProductionPipelineWidget"
import { KPIPulseWidget } from "./widgets/KPIPulseWidget"
import { DealDeskWidget } from "./widgets/DealDeskWidget"

const widgetMap: Record<string, React.ComponentType> = {
    "ProductionPipeline": ProductionPipelineWidget,
    "KPIPulse": KPIPulseWidget,
    "DealDesk": DealDeskWidget,
}

const phaseIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "Search": Search,
    "Layers": Layers,
    "TrendingUp": TrendingUp,
    "Crown": Crown
}

function getPhaseGradient(phase: JourneyPhase): string {
    const config = TALENT_JOURNEY_PHASES.find(p => p.id === phase)
    return config?.gradient || "from-violet-500 to-purple-500"
}

export function TalentJourneySection() {
    const prefersReducedMotion = useReducedMotion()
    const { disableMotion, viewport: revealViewport, transitionDuration, clampDelay } = useRevealViewport()
    const disableJourneyMotion = prefersReducedMotion || disableMotion
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })
    const smoothProgress = useSpring(scrollYProgress, SPRING.gentle)
    const lineScale = useTransform(smoothProgress, [0.05, 0.95], [0, 1], { clamp: true })

    return (
        <section
            ref={containerRef}
            id="method"
            className="pt-32 pb-10 md:pt-40 md:pb-16 px-4 relative z-0"
        >
            <Container>
                <div className="max-w-5xl mx-auto relative">
                    {/* Header */}
                    <SectionHeading
                        title={
                            <>
                                {TALENT_JOURNEY_HEADER.title}{" "}
                                <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                                    {TALENT_JOURNEY_HEADER.titleHighlight}
                                </span>
                            </>
                        }
                        subtitle={TALENT_JOURNEY_HEADER.subtitle}
                        className="mb-20 text-center"
                    />

                    {/* Phase Legend */}
                    <motion.div
                        initial={disableJourneyMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={disableJourneyMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={disableJourneyMotion ? undefined : revealViewport}
                        transition={disableJourneyMotion ? undefined : { duration: transitionDuration }}
                        className="flex flex-wrap justify-center gap-4 mb-16"
                    >
                        {TALENT_JOURNEY_PHASES.map((phase) => {
                            const Icon = phaseIconMap[phase.icon]
                            return (
                                <div
                                    key={phase.id}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-full",
                                        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm",
                                        "border border-slate-200/50 dark:border-slate-800",
                                        "text-sm font-medium"
                                    )}
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center",
                                        `bg-gradient-to-br ${phase.gradient}`
                                    )}>
                                        {Icon && <Icon className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-300">
                                        {phase.name}
                                    </span>
                                    <span className="text-slate-400 dark:text-slate-500 text-xs">
                                        {phase.label}
                                    </span>
                                </div>
                            )
                        })}
                    </motion.div>

                    <div className="relative">
                        {/* Central Timeline Line — scroll-driven gradient fill */}
                        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 dark:bg-slate-800 -translate-x-1/2 rounded-full overflow-hidden">
                            <motion.div
                                style={{
                                    scaleY: prefersReducedMotion ? 1 : lineScale,
                                    transformOrigin: "top center"
                                }}
                                className="h-full w-full origin-top gpu-accelerated bg-gradient-to-b from-violet-500 via-purple-500 via-fuchsia-500 to-amber-500 shadow-[0_0_14px_rgba(139,92,246,0.38)]"
                            />
                        </div>

                        <div className="space-y-16 pb-20">
                            {TALENT_JOURNEY_STEPS.map((step, i) => {
                                const isEven = i % 2 === 0
                                const prevStep = TALENT_JOURNEY_STEPS[i - 1]
                                const isNewPhase = !prevStep || step.phase !== prevStep.phase
                                const phaseConfig = TALENT_JOURNEY_PHASES.find(p => p.id === step.phase)
                                const PhaseIcon = phaseConfig ? phaseIconMap[phaseConfig.icon] : null
                                // Only render widget if it's one of the 3 we kept
                                const Widget = step.widget && widgetMap[step.widget] ? widgetMap[step.widget] : null

                                return (
                                    <div key={step.id}>
                                        {/* Phase Separator */}
                                        {isNewPhase && phaseConfig && (
                                            <motion.div
                                                initial={disableJourneyMotion ? false : { opacity: 0, scale: 0.8 }}
                                                whileInView={disableJourneyMotion ? undefined : { opacity: 1, scale: 1 }}
                                                viewport={disableJourneyMotion ? undefined : revealViewport}
                                                transition={disableJourneyMotion ? undefined : { duration: transitionDuration, delay: clampDelay(0.08) }}
                                                className="relative flex justify-center mb-12"
                                            >
                                                <div className={cn(
                                                    "flex items-center gap-3 px-6 py-3 rounded-full",
                                                    "bg-white dark:bg-slate-900 shadow-lg",
                                                    "border-2",
                                                    phaseConfig.borderColor
                                                )}>
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-full flex items-center justify-center",
                                                        `bg-gradient-to-br ${phaseConfig.gradient}`
                                                    )}>
                                                        {PhaseIcon && <PhaseIcon className="w-4 h-4 text-white" />}
                                                    </div>
                                                    <div>
                                                        <span className="font-bold text-slate-900 dark:text-white">
                                                            {phaseConfig.name}
                                                        </span>
                                                        <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">
                                                            {phaseConfig.label}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Step Card — alternating layout */}
                                        <div className={cn(
                                            "relative flex items-start md:justify-between group",
                                            isEven ? "md:flex-row" : "md:flex-row-reverse"
                                        )}>
                                            {/* Connector Node */}
                                            <div className={cn(
                                                "absolute left-[20px] md:left-1/2 -translate-x-1/2 z-10",
                                                "w-10 h-10 rounded-full",
                                                "bg-white dark:bg-slate-950",
                                                "border-4 border-slate-100 dark:border-slate-800",
                                                "flex items-center justify-center shadow-lg",
                                                "transition-colors duration-500"
                                            )}>
                                                <div className={cn(
                                                    "w-3 h-3 rounded-full",
                                                    "bg-slate-300 dark:bg-slate-600",
                                                    "transition-colors duration-500",
                                                )} />
                                            </div>

                                            {/* Spacer */}
                                            <div className="hidden md:block w-5/12" />

                                            {/* Content Card */}
                                            <motion.div
                                                initial={disableJourneyMotion ? false : { opacity: 0, y: 24 }}
                                                whileInView={disableJourneyMotion ? undefined : { opacity: 1, y: 0 }}
                                                viewport={disableJourneyMotion ? undefined : revealViewport}
                                                transition={
                                                    disableJourneyMotion
                                                        ? undefined
                                                        : {
                                                            duration: Math.max(transitionDuration, 0.46),
                                                            delay: clampDelay(i * 0.04),
                                                            ease: EASING.smooth
                                                        }
                                                }
                                                className={cn(
                                                    "ml-16 md:ml-0 w-full md:w-5/12 gpu-accelerated",
                                                    "p-6 md:p-8 rounded-2xl",
                                                    "bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm",
                                                    "border border-slate-200/50 dark:border-slate-800",
                                                    "hover:border-violet-500/25 hover:bg-white/80 dark:hover:bg-slate-900/80",
                                                    "hover:shadow-xl hover:shadow-violet-500/8",
                                                    "transition-[background-color,border-color,box-shadow,transform] duration-300"
                                                )}
                                            >
                                                {/* Step Number & Line */}
                                                <div className="flex items-center gap-4 mb-4">
                                                    <span className={cn(
                                                        "text-4xl md:text-5xl font-bold font-heading select-none",
                                                        "text-slate-200 dark:text-slate-800",
                                                        "transition-all duration-500"
                                                    )}>
                                                        {step.num}
                                                    </span>
                                                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 group-hover:bg-violet-500/20 transition-colors" />
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                                    {step.title}
                                                </h3>

                                                {/* Deliverable & Duration Tags */}
                                                <div className="flex flex-wrap gap-2 mb-5">
                                                    <div className={cn(
                                                        "flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full",
                                                        "bg-violet-50 dark:bg-violet-900/20",
                                                        "text-violet-600 dark:text-violet-400",
                                                        "border border-violet-100 dark:border-violet-800/30"
                                                    )}>
                                                        <FileText className="w-3.5 h-3.5" />
                                                        {step.deliverable}
                                                    </div>
                                                    <div className={cn(
                                                        "flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full",
                                                        "bg-slate-100 dark:bg-slate-800",
                                                        "text-slate-600 dark:text-slate-400"
                                                    )}>
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {step.duration}
                                                    </div>
                                                </div>

                                                {/* Points */}
                                                <ul className="space-y-2.5 mb-4">
                                                    {step.points.map((point, j) => (
                                                        <li key={j} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                                                            <span>{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Widget (only the 3 strongest) */}
                                                {Widget && (
                                                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                                                        <Widget />
                                                    </div>
                                                )}
                                            </motion.div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Terminal Node — Crown with ping */}
                        <div className="absolute left-[20px] md:left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-20">
                            <motion.div
                                initial={disableJourneyMotion ? false : { scale: 0, opacity: 0 }}
                                whileInView={disableJourneyMotion ? undefined : { scale: 1, opacity: 1 }}
                                viewport={disableJourneyMotion ? undefined : revealViewport}
                                transition={disableJourneyMotion ? undefined : { delay: clampDelay(0.24), type: "spring" }}
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30 border-4 border-white dark:border-slate-950 relative"
                            >
                                <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-amber-500" />
                                <Crown className="w-5 h-5 text-white" strokeWidth={2.5} />
                            </motion.div>
                        </div>
                    </div>

                    {/* Signature — word-by-word blur reveal */}
                    <div className="mt-24 mb-8 md:mb-10 text-center">
                        {disableJourneyMotion ? (
                            <h3 className="text-3xl md:text-5xl font-bold tracking-tight inline-block max-w-4xl mx-auto leading-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                                {TALENT_JOURNEY_HEADER.signature}
                            </h3>
                        ) : (
                            <motion.h3
                                initial="hidden"
                                whileInView="visible"
                                viewport={revealViewport}
                                variants={{
                                    visible: { transition: { staggerChildren: 0.03 } }
                                }}
                                className="text-3xl md:text-5xl font-bold tracking-tight inline-block max-w-4xl mx-auto leading-tight"
                            >
                                {TALENT_JOURNEY_HEADER.signature.split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                filter: "blur(0px)",
                                                transition: {
                                                    type: "spring",
                                                    damping: 20,
                                                    stiffness: 100
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
