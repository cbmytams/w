"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { Container } from "@/components/ui/container"
import { TALENT_HERO } from "@/constants"
import { buildTalentQuestionnaireHref } from "@/lib/talent-questionnaire"
import { EASING, DURATION } from "@/lib/easing"

/**
 * HeroSection — Clean editorial layout
 */
export function HeroSection() {
    const talentHeroCtaHref = buildTalentQuestionnaireHref("for-talents-hero")
    const handleSecondaryCtaClick = () => {
        const methodSection = document.getElementById("method")
        if (!methodSection) return
        methodSection.scrollIntoView({ behavior: "smooth", block: "start" })
        window.history.replaceState(null, "", "#method")
    }

    return (
        <section className="pt-32 pb-24 px-4 min-h-[85vh] flex items-center relative">
            <Container className="relative z-10">
                <div className="max-w-4xl">
                    {/* Title - Large, two lines */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: DURATION.slower, ease: EASING.entrance }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-slate-900 dark:text-white">
                            {TALENT_HERO.title}{" "}
                            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
                                {TALENT_HERO.titleHighlight}
                            </span>
                        </h1>
                    </motion.div>

                    {/* Subtitle - Smaller, descriptive */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: DURATION.slower, delay: 0.2, ease: EASING.entrance }}
                        className="text-lg sm:text-xl text-slate-600 dark:text-white/60 max-w-2xl leading-relaxed mb-8"
                    >
                        {TALENT_HERO.subtitle}
                    </motion.p>

                    {/* Calls Available Indicator */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex items-center gap-2 mb-10"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-sm text-slate-600 dark:text-white/60">
                            {TALENT_HERO.callsAvailable} calls disponibles aujourd&apos;hui
                        </span>
                        <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-white/40" />
                    </motion.div>

                    {/* CTAs - SocialCut style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-wrap items-center gap-3 md:gap-4"
                    >
                        {/* Primary CTA - Filled */}
                        <a href={talentHeroCtaHref} className="inline-flex">
                            <motion.span
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex px-6 md:px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-base font-semibold shadow-lg shadow-slate-900/20 dark:shadow-white/20 hover:shadow-xl transition-all"
                            >
                                {TALENT_HERO.ctaPrimary}
                            </motion.span>
                        </a>

                        {/* Secondary CTA - White Pill High Vis / Dark Glass in Night Mode */}
                        <motion.button
                            type="button"
                            onClick={handleSecondaryCtaClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 md:px-8 py-4 rounded-full bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl border border-white/60 dark:border-white/10 text-slate-900 dark:text-white text-base font-bold shadow-xl shadow-purple-900/5 hover:bg-white dark:hover:bg-slate-800 dark:hover:border-white/20 hover:shadow-purple-900/10 transition-all"
                        >
                            {TALENT_HERO.ctaSecondary}
                        </motion.button>
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}
