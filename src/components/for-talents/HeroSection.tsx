"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Container } from "@/components/ui/container"
import { TALENT_HERO } from "@/constants"
import { GradientBackground } from "./redesign/GradientBackground"
import { ConstellationBackground } from "./redesign/ConstellationBackground"
import { MagneticButton } from "./redesign/MagneticButton"
import { FloatingMetrics } from "./redesign/FloatingMetrics"
import { GradientRevealText } from "./redesign/GradientRevealText"

interface HeroSectionProps {
    onContentClick?: () => void
}

export function HeroSection({ onContentClick }: HeroSectionProps) {
    return (
        <GradientBackground variant="hero" className="pt-32 pb-32 px-4 min-h-[90vh] flex items-center relative overflow-hidden">
            {/* Particules interactives */}
            <ConstellationBackground />

            <Container className="relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ y: 40 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-pink-300 uppercase tracking-wider px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                            <Sparkles className="w-4 h-4" />
                            {TALENT_HERO.badge}
                        </span>
                    </motion.div>

                    {/* Titre avec GradientRevealText */}
                    <GradientRevealText className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8">
                        <span className="block text-white">{TALENT_HERO.title}</span>
                        <span className="block bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">
                            {TALENT_HERO.titleHighlight}
                        </span>
                    </GradientRevealText>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-xl sm:text-2xl text-white/70 max-w-2xl mx-auto mb-12 font-medium"
                    >
                        {TALENT_HERO.subtitle}
                    </motion.p>

                    {/* CTAs avec MagneticButton */}
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
                            className="px-10 py-5 rounded-full border-2 border-white/30 hover:border-white/50 text-white text-lg font-semibold backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all"
                        >
                            {TALENT_HERO.ctaSecondary}
                        </motion.button>
                    </motion.div>

                    {/* Floating Metrics */}
                    <motion.div
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="flex flex-wrap justify-center gap-4 mt-16"
                    >
                        <FloatingMetrics value="15+" label="Talents" delay={1.1} />
                        <FloatingMetrics value="5M+" label="Reach cumulé" delay={1.3} />
                        <FloatingMetrics value="€2M+" label="Négociés" delay={1.5} />
                    </motion.div>
                </div>
            </Container>
        </GradientBackground>
    )
}
