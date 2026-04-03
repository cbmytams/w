"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowRight, Zap, Target, Rocket } from "lucide-react"
import { Container } from "@/components/ui/container"
import { TALENT_TIMELINE } from "@/constants"

/**
 * LevelsSection — Premium Horizontal Timeline
 * 
 * Redesigned with:
 * - Horizontal phase selector with animated progress line
 * - Single content panel with morphing transitions
 * - Compact action pills
 * - Staggered reveal animations
 * - Interactive hover states
 */
export function LevelsSection() {
    const [activePhaseIndex, setActivePhaseIndex] = useState(0)

    const { phases, title, highlightWord, subtitle, signature } = TALENT_TIMELINE
    const activePhase = phases[activePhaseIndex]

    // Split title for gradient highlight
    const titleParts = highlightWord ? title.split(highlightWord) : [title]

    // Phase icons
    const phaseIcons = [Target, Zap, Rocket]

    const goToPhase = useCallback((index: number) => {
        setActivePhaseIndex(index)
    }, [])

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, stiffness: 100, damping: 15 }
        }
    }

    const contentVariants = {
        initial: { opacity: 0, y: 40, filter: "blur(12px)" },
        animate: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { type: "spring" as const, stiffness: 80, damping: 20 }
        },
        exit: {
            opacity: 0,
            y: -30,
            filter: "blur(8px)",
            transition: { duration: 0.25 }
        }
    }

    const staggerContainer = {
        animate: {
            transition: { staggerChildren: 0.05, delayChildren: 0.15 }
        }
    }

    const staggerItem = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, stiffness: 120, damping: 15 }
        }
    }

    return (
        <section id={TALENT_TIMELINE.id} className="section-spacing px-4 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 rounded-full blur-[120px]" />
            </div>

            <Container className="relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <motion.span
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium mb-6"
                        >
                            <Rocket className="w-4 h-4" />
                            Parcours
                        </motion.span>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                            {titleParts.length > 1 ? (
                                <>
                                    {titleParts[0]}
                                    <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                                        {highlightWord}
                                    </span>
                                    {titleParts[1]}
                                </>
                            ) : title}
                        </h2>

                        <p className="text-lg text-slate-500 dark:text-white/50 max-w-lg mx-auto whitespace-pre-line">
                            {subtitle}
                        </p>
                    </motion.div>

                    {/* Horizontal Phase Selector */}
                    <motion.div variants={itemVariants} className="relative mb-12">
                        {/* Progress line background */}
                        <div className="absolute top-8 left-0 right-0 h-[3px] bg-slate-200 dark:bg-white/10 rounded-full">
                            {/* Animated progress fill */}
                            <motion.div
                                className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{
                                    scaleX: activePhaseIndex / (phases.length - 1),
                                    transition: { type: "spring", stiffness: 100, damping: 20 }
                                }}
                            />
                        </div>

                        {/* Phase buttons */}
                        <div className="relative flex justify-between">
                            {phases.map((phase, index) => {
                                const isActive = index === activePhaseIndex
                                const isCompleted = index < activePhaseIndex
                                const PhaseIcon = phaseIcons[index]

                                return (
                                    <motion.button
                                        key={phase.id}
                                        onClick={() => goToPhase(index)}
                                        className="group flex flex-col items-center focus:outline-none relative z-10"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Circle indicator */}
                                        <motion.div
                                            className={`
                                                relative w-16 h-16 rounded-full flex items-center justify-center
                                                transition-all duration-300 mb-4
                                                ${isActive
                                                    ? 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/30'
                                                    : isCompleted
                                                        ? 'bg-violet-500'
                                                        : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-white/10'
                                                }
                                            `}
                                            animate={{
                                                scale: isActive ? 1.1 : 1,
                                                boxShadow: isActive
                                                    ? "0 0 30px rgba(139, 92, 246, 0.4)"
                                                    : "0 0 0px rgba(139, 92, 246, 0)"
                                            }}
                                        >
                                            {/* Pulse ring for active */}
                                            {isActive && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full border-2 border-violet-400"
                                                    initial={{ scale: 1, opacity: 0.8 }}
                                                    animate={{
                                                        scale: [1, 1.5, 1.5],
                                                        opacity: [0.8, 0, 0]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeOut"
                                                    }}
                                                />
                                            )}

                                            {/* Icon or checkmark */}
                                            <AnimatePresence mode="wait">
                                                {isCompleted ? (
                                                    <motion.div
                                                        key="check"
                                                        initial={{ scale: 0, rotate: -90 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        exit={{ scale: 0, rotate: 90 }}
                                                        transition={{ type: "spring" }}
                                                    >
                                                        <Check className="w-7 h-7 text-white" strokeWidth={3} />
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="icon"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        exit={{ scale: 0 }}
                                                    >
                                                        <PhaseIcon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-400 dark:text-white/40'}`} />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                        {/* Phase name */}
                                        <motion.span
                                            className={`
                                                text-xs font-bold tracking-widest uppercase
                                                transition-colors duration-300
                                                ${isActive
                                                    ? 'text-violet-600 dark:text-violet-400'
                                                    : 'text-slate-400 dark:text-white/40'
                                                }
                                            `}
                                            animate={{ y: isActive ? 0 : 4 }}
                                        >
                                            {phase.name}
                                        </motion.span>

                                        {/* Duration badge */}
                                        <motion.span
                                            className={`
                                                mt-1 text-sm font-medium
                                                ${isActive
                                                    ? 'text-slate-700 dark:text-white/70'
                                                    : 'text-slate-300 dark:text-white/20'
                                                }
                                            `}
                                        >
                                            {phase.duration}
                                        </motion.span>
                                    </motion.button>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Content Panel */}
                    <motion.div variants={itemVariants}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePhaseIndex}
                                variants={contentVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl p-8 md:p-10 overflow-hidden"
                            >
                                {/* Gradient accent */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

                                {/* Phase header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <span className="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase">
                                            {activePhase.name}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-1">
                                            {activePhase.objective}
                                        </h3>
                                    </div>
                                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium">
                                        <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                                        {activePhase.duration}
                                    </div>
                                </div>

                                {/* Actions */}
                                <motion.div
                                    className="mb-8"
                                    variants={staggerContainer}
                                    initial="initial"
                                    animate="animate"
                                >
                                    <div className="text-xs font-bold tracking-widest text-slate-400 dark:text-white/40 uppercase mb-4">
                                        Actions
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {activePhase.actions.map((action, i) => (
                                            <motion.span
                                                key={i}
                                                variants={staggerItem}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-xl text-sm text-slate-700 dark:text-white/80 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-default"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                                                {action}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Deliverables */}
                                <motion.div
                                    className="mb-8"
                                    variants={staggerContainer}
                                    initial="initial"
                                    animate="animate"
                                >
                                    <div className="text-xs font-bold tracking-widest text-slate-400 dark:text-white/40 uppercase mb-4">
                                        Livrables
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {activePhase.deliverables.map((deliverable, i) => (
                                            <motion.div
                                                key={i}
                                                variants={staggerItem}
                                                className="flex items-center gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl hover:border-emerald-400 dark:hover:border-emerald-400/40 transition-colors"
                                            >
                                                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                                <span className="text-slate-700 dark:text-white/80">{deliverable}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Exit Criteria */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex items-start gap-4 p-5 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-500/10 dark:to-purple-500/10 rounded-2xl border border-violet-200/50 dark:border-violet-500/20"
                                >
                                    <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center shrink-0">
                                        <ArrowRight className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-1">
                                            Sortie de phase
                                        </div>
                                        <p className="text-slate-700 dark:text-white/80 leading-relaxed">
                                            {activePhase.exitCriteria}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Navigation */}
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200/50 dark:border-white/5">
                                    <button
                                        onClick={() => goToPhase(Math.max(0, activePhaseIndex - 1))}
                                        disabled={activePhaseIndex === 0}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <ArrowRight className="w-4 h-4 rotate-180" />
                                        Précédent
                                    </button>

                                    <div className="flex gap-2">
                                        {phases.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => goToPhase(i)}
                                                className={`w-2 h-2 rounded-full transition-all ${i === activePhaseIndex
                                                    ? 'w-6 bg-violet-500'
                                                    : 'bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => goToPhase(Math.min(phases.length - 1, activePhaseIndex + 1))}
                                        disabled={activePhaseIndex === phases.length - 1}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                                    >
                                        Suivant
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Signature */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center mt-12"
                    >
                        <span className="inline-block px-6 py-3 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl text-slate-700 dark:text-white/70 font-medium">
                            {signature}
                        </span>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    )
}
