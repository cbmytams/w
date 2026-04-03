"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_PILLARS } from "@/constants/talent-blocks/pillars"
import { useRevealViewport } from "@/hooks/useRevealViewport"
import { EASING } from "@/lib/easing"

export function WhatWeBuildSection() {
    const { disableMotion, viewport, transitionDuration, clampDelay } = useRevealViewport()

    return (
        <section id="what-we-build" className="section-spacing px-4 relative z-10">
            <Container>
                <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <RevealAnimation className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                            Ce qu&apos;on prend en charge
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-white/70">
                            Tu repars avec un syst&egrave;me qui tourne.
                        </p>
                    </RevealAnimation>

                    {/* Bento Grid — 6 pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TALENT_PILLARS.map((pillar, index) => (
                            <motion.div
                                key={pillar.id}
                                initial={disableMotion ? false : { opacity: 0, y: 20 }}
                                whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                                viewport={disableMotion ? undefined : viewport}
                                transition={disableMotion ? undefined : {
                                    duration: transitionDuration,
                                    delay: clampDelay(index * 0.07),
                                    ease: EASING.subtle
                                }}
                                className="group relative p-8 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-[40px] rounded-2xl border border-black/[0.05] dark:border-white/[0.05] shadow-lg hover:shadow-2xl dark:shadow-none hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 flex flex-col min-h-[260px]"
                            >
                                <div className="flex flex-col h-full relative z-10">
                                    {/* Large Icon */}
                                    <div className="text-4xl leading-none drop-shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.15] origin-top-left mb-auto">
                                        {pillar.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="mt-12">
                                        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-3 transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-300">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-sm font-medium text-slate-500 dark:text-white/50 leading-relaxed tracking-wide">
                                            {pillar.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Glass Edge */}
                                <div className="absolute inset-0 rounded-2xl border border-white/20 dark:border-white/5 pointer-events-none" />

                                {/* Organic Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-violet-500/0 group-hover:from-purple-500/[0.03] group-hover:to-violet-500/[0.03] dark:group-hover:from-purple-500/[0.05] dark:group-hover:to-violet-500/[0.05] rounded-2xl transition-all duration-500 pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}
