"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { TALENT_PROBLEM } from "@/constants"
import { EASING, DURATION } from "@/lib/easing"

/**
 * ProblemSection — Bold Editorial Redesign (Site-Cohesive)
 * 
 * Maintains the site's linear flow with transparent background
 * while delivering impactful typography and layout
 * 
 * NEW MESSAGING: "Le talent démarre tout. Le système décide de la suite."
 */
export function ProblemSection() {
    // Split title for dramatic emphasis (from TALENT_PROBLEM.title)
    const titlePart1 = "Le talent démarre tout."
    const titlePart2 = "Le système décide de la suite."

    // Pain points from constants
    const painPoints = TALENT_PROBLEM.painTags

    return (
        <section
            id={TALENT_PROBLEM.id}
            className="relative py-24 md:py-32 overflow-hidden bg-transparent"
        >
            <Container>
                <div className="relative z-10 max-w-6xl mx-auto">
                    {/* Main title block - Asymmetric */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: DURATION.slower, ease: EASING.entrance }}
                        className="mb-16 md:mb-20"
                    >
                        {/* First line - lighter treatment */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-400 dark:text-white/40 mb-4 tracking-tight">
                            {titlePart1}
                        </h2>

                        {/* Second line - bold, emphasized with purple gradient */}
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                            <span className="relative">
                                <span className="relative z-10 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                                    {titlePart2}
                                </span>
                                {/* Underline accent */}
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: DURATION.slower, ease: EASING.entrance }}
                                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500 origin-left rounded-full"
                                />
                            </span>
                        </h2>
                    </motion.div>

                    {/* Main description block */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 md:mb-20">
                        {/* Left: The insight */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-white/40" />
                                <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-white/40">
                                    Le constat
                                </span>
                            </div>

                            <p className="text-lg sm:text-xl text-slate-600 dark:text-white/60 leading-relaxed mb-8">
                                {TALENT_PROBLEM.description}
                            </p>

                            {/* Pain points as floating tags */}
                            <div className="flex flex-wrap gap-3">
                                {painPoints.map((point, i) => (
                                    <motion.span
                                        key={point}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="px-4 py-2 rounded-full bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-white/70 font-medium backdrop-blur-sm shadow-sm"
                                    >
                                        {point}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: Empty space or subtle visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="hidden lg:flex items-center justify-center"
                        >
                            {/* Decorative element - could add an illustration later */}
                            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-violet-500/10 to-purple-500/5 blur-2xl" />
                        </motion.div>
                    </div>

                    {/* Bottom: The Solution Statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="relative"
                    >
                        {/* Glassmorphic card matching site aesthetic */}
                        <div className="relative p-8 sm:p-10 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-xl shadow-purple-500/5 overflow-hidden">
                            {/* Corner accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full" />

                            <div className="flex items-start gap-6">
                                {/* Icon */}
                                <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 items-center justify-center border border-violet-500/20">
                                    <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 dark:text-white leading-snug">
                                        On ne te &apos;signe&apos; pas pour t&apos;ajouter à une liste.
                                    </p>
                                    <p className="mt-3 text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug">
                                        <span className="bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                                            On te construit une structure.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}
