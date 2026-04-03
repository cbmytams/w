"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { WHAT_WE_BUILD_HEADER, TALENT_PILLARS } from "@/constants/talent-blocks/pillars"
import { cn } from "@/lib/utils"
import { useRevealViewport } from "@/hooks/useRevealViewport"
import { EASING } from "@/lib/easing"

export function WhatWeBuildSection() {
    const { disableMotion, viewport, transitionDuration, clampDelay } = useRevealViewport()

    return (
        <section id={WHAT_WE_BUILD_HEADER.id} className="section-spacing px-4 relative z-10">
            <Container>
                <div className="max-w-5xl mx-auto">

                    {/* Problem Statement */}
                    <RevealAnimation className="text-center mb-8">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                            {WHAT_WE_BUILD_HEADER.problemTitle}
                            <br />
                            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
                                {WHAT_WE_BUILD_HEADER.problemHighlight}
                            </span>
                        </h2>
                    </RevealAnimation>

                    <RevealAnimation delay={0.1} className="max-w-2xl mx-auto text-center mb-6">
                        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                            {WHAT_WE_BUILD_HEADER.problemDescription}
                        </p>
                    </RevealAnimation>

                    {/* Pain Tags */}
                    <RevealAnimation delay={0.12} className="flex flex-wrap justify-center gap-2 mb-16">
                        {WHAT_WE_BUILD_HEADER.painTags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1.5 rounded-full text-xs font-medium bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </RevealAnimation>

                    {/* 6 Pillars Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {TALENT_PILLARS.map((pillar, i) => (
                            <motion.div
                                key={pillar.id}
                                initial={disableMotion ? false : { opacity: 0, y: 20 }}
                                whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                                viewport={disableMotion ? undefined : viewport}
                                transition={disableMotion ? undefined : {
                                    duration: transitionDuration,
                                    delay: clampDelay(i * 0.06),
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
                                <span className="text-2xl mb-4 block" role="img" aria-label={pillar.title}>
                                    {pillar.icon}
                                </span>
                                <h4 className="text-lg font-bold text-white mb-2">
                                    {pillar.title}
                                </h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {pillar.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}
