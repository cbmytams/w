"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Layers, TrendingUp, Crown, Check, FileText, Clock, ChevronDown } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_METHOD_PHASES, METHOD_SECTION_HEADER } from "@/constants/talent-blocks/method-compressed"
import { TALENT_JOURNEY_STEPS } from "@/constants/talent-journey-steps"
import { useRevealViewport } from "@/hooks/useRevealViewport"
import { cn } from "@/lib/utils"
import { EASING } from "@/lib/easing"

const phaseIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "Search": Search,
    "Layers": Layers,
    "TrendingUp": TrendingUp,
    "Crown": Crown
}

export function TalentJourneySection() {
    const [isExpanded, setIsExpanded] = useState(false)
    const { disableMotion, viewport, transitionDuration, clampDelay } = useRevealViewport()

    return (
        <section id={METHOD_SECTION_HEADER.id} className="section-spacing px-4 relative z-10">
            <Container>
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <RevealAnimation className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                            {METHOD_SECTION_HEADER.title}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-white/50">
                            {METHOD_SECTION_HEADER.subtitle}
                        </p>
                    </RevealAnimation>

                    {/* 4 Phase Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
                        {TALENT_METHOD_PHASES.map((phase, i) => {
                            const Icon = phaseIconMap[phase.icon]
                            return (
                                <motion.div
                                    key={phase.id}
                                    initial={disableMotion ? false : { opacity: 0, y: 20 }}
                                    whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                                    viewport={disableMotion ? undefined : viewport}
                                    transition={disableMotion ? undefined : {
                                        duration: transitionDuration,
                                        delay: clampDelay(i * 0.08),
                                        ease: EASING.subtle
                                    }}
                                    className={cn(
                                        "p-6 rounded-2xl",
                                        "bg-slate-900/80 dark:bg-slate-900/80 backdrop-blur-xl",
                                        "border border-slate-800 dark:border-white/10",
                                        "hover:bg-slate-900/90 dark:hover:bg-slate-800/80",
                                        "transition-colors duration-300"
                                    )}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={cn(
                                            "w-9 h-9 rounded-xl flex items-center justify-center",
                                            `bg-gradient-to-br ${phase.gradient}`
                                        )}>
                                            {Icon && <Icon className="w-4 h-4 text-white" />}
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold text-white">
                                                {phase.name}
                                            </span>
                                            <span className="text-xs text-slate-400 ml-2">
                                                {phase.label}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {phase.benefit}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Expand/Collapse Detail */}
                    <RevealAnimation delay={0.1} className="text-center mb-8">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            aria-expanded={isExpanded}
                            className={cn(
                                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium",
                                "bg-slate-900/60 dark:bg-white/5 border border-slate-700 dark:border-white/10 text-slate-300 dark:text-white/60",
                                "hover:bg-slate-900/80 dark:hover:bg-white/10 hover:text-white dark:hover:text-white/80",
                                "transition-all duration-300"
                            )}
                        >
                            {isExpanded ? METHOD_SECTION_HEADER.collapseLabel : METHOD_SECTION_HEADER.expandLabel}
                            <ChevronDown className={cn(
                                "w-4 h-4 transition-transform duration-300",
                                isExpanded && "rotate-180"
                            )} />
                        </button>
                    </RevealAnimation>

                    {/* Expanded Detail: Full 8 steps */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: EASING.easeInOut }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-4 pb-8">
                                    {TALENT_JOURNEY_STEPS.map((step) => {
                                        const phaseConfig = TALENT_METHOD_PHASES.find(p => p.id === step.phase)
                                        return (
                                            <div
                                                key={step.id}
                                                className={cn(
                                                    "p-5 rounded-xl",
                                                    "bg-slate-900/60 dark:bg-white/[0.03] border border-slate-800 dark:border-white/[0.06]"
                                                )}
                                            >
                                                <div className="flex items-start gap-4">
                                                    {/* Step Number */}
                                                    <span className={cn(
                                                        "text-2xl font-bold select-none shrink-0 w-8",
                                                        "text-transparent bg-clip-text bg-gradient-to-br",
                                                        phaseConfig ? phaseConfig.gradient : "from-violet-500 to-purple-500"
                                                    )}>
                                                        {step.num}
                                                    </span>

                                                    <div className="flex-1 min-w-0">
                                                        {/* Title + Tags */}
                                                        <div className="flex flex-wrap items-baseline gap-3 mb-3">
                                                            <h4 className="text-base font-bold text-white">
                                                                {step.title}
                                                            </h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                                                                    <FileText className="w-3 h-3" />
                                                                    {step.deliverable}
                                                                </span>
                                                                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                                                                    <Clock className="w-3 h-3" />
                                                                    {step.duration}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Points */}
                                                        <ul className="space-y-1.5">
                                                            {step.points.map((point, j) => (
                                                                <li key={j} className="flex items-start gap-2 text-sm text-slate-400 leading-relaxed">
                                                                    <Check className="w-3.5 h-3.5 text-emerald-500/70 shrink-0 mt-0.5" strokeWidth={3} />
                                                                    <span>{point}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Signature */}
                    <RevealAnimation delay={0.15} className="text-center mt-8">
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent max-w-3xl mx-auto leading-tight">
                            {METHOD_SECTION_HEADER.signature}
                        </p>
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
