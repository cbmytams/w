"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Container } from "@/components/ui/container"
import { TALENT_HERO } from "@/constants"
import { MagneticButton } from "./redesign/MagneticButton"
import { GradientRevealText } from "./redesign/GradientRevealText"

interface HeroSectionProps {
    onContentClick?: () => void
}

export function HeroSection({ onContentClick }: HeroSectionProps) {
    return (
        <section className="pt-32 pb-32 px-4 min-h-[90vh] flex items-center relative">
            <Container className="relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ y: 40 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider px-5 py-2.5 bg-white/70 dark:bg-white/10 backdrop-blur-xl rounded-full border border-white/70 dark:border-white/20">
                            <Sparkles className="w-4 h-4" />
                            {TALENT_HERO.badge}
                        </span>
                    </motion.div>

                    {/* Titre */}
                    <GradientRevealText className="mb-8">
                        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.05] text-slate-900 dark:text-white">
                            {TALENT_HERO.title}
                        </h1>
                    </GradientRevealText>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-xl sm:text-2xl text-slate-600 dark:text-white/70 max-w-3xl mx-auto mb-12 font-medium whitespace-pre-line leading-relaxed"
                    >
                        {TALENT_HERO.subtitle}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <MagneticButton href="/contact?type=talent">
                            {TALENT_HERO.ctaPrimary} <ArrowRight className="h-5 w-5" />
                        </MagneticButton>

                        <motion.button
                            onClick={onContentClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 rounded-full border-2 border-slate-200/80 dark:border-white/30 hover:border-slate-300 dark:hover:border-white/50 text-slate-900 dark:text-white text-lg font-semibold backdrop-blur-xl bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-all"
                        >
                            {TALENT_HERO.ctaSecondary}
                        </motion.button>
                    </motion.div>

                    {/* Proof Points */}
                    <motion.div
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="flex flex-wrap justify-center gap-6 mt-16"
                    >
                        {TALENT_HERO.proofPoints.map((point, index) => (
                            <motion.div
                                key={point.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 + index * 0.2 }}
                                className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 rounded-full"
                            >
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-violet-500" />
                                <span className="text-sm font-medium text-slate-700 dark:text-white/80">{point.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}
