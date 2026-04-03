"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Container } from "@/components/ui/container"
import { TALENT_PROBLEM } from "@/constants"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { EASING, DURATION } from "@/lib/easing"
import { cn } from "@/lib/utils"

const PAIN_ICONS = ["\u{1F9ED}", "\u{26A1}", "\u{1F91D}", "\u{1F3AF}"]

export function ConstatSection() {
    const prefersReducedMotion = useReducedMotion()
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const titleY = useTransform(scrollYProgress, [0, 1], [60, -60])
    const descY = useTransform(scrollYProgress, [0, 1], [30, -30])

    return (
        <section
            ref={sectionRef}
            id="constat"
            className="relative z-10 py-32 md:py-44 lg:py-52 px-4 overflow-hidden"
        >
            {/* Atmospheric layers */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/[0.06] rounded-full blur-[150px]" />
                <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-fuchsia-500/[0.04] rounded-full blur-[120px]" />
            </div>

            <Container>
                <div className="max-w-5xl mx-auto relative">

                    {/* Title */}
                    <motion.div
                        style={prefersReducedMotion ? {} : { y: titleY }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: DURATION.slower, ease: EASING.entrance }}
                        >
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                                <span className="text-slate-900 dark:text-white">
                                    Le talent d&eacute;marre tout.
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                                    Le syst&egrave;me d&eacute;cide de la suite.
                                </span>
                            </h2>
                        </motion.div>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        style={prefersReducedMotion ? {} : { y: descY }}
                        className="text-center mb-16 md:mb-20"
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: DURATION.slower, delay: 0.15, ease: EASING.entrance }}
                            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto"
                        >
                            {TALENT_PROBLEM.description}
                        </motion.p>
                    </motion.div>

                    {/* Pain points — glass cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {TALENT_PROBLEM.painTags.map((tag, i) => (
                            <motion.div
                                key={tag}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: DURATION.slow,
                                    delay: 0.2 + i * 0.08,
                                    ease: EASING.entrance
                                }}
                                className={cn(
                                    "group relative p-5 rounded-2xl text-center",
                                    "bg-slate-100/80 dark:bg-white/[0.03]",
                                    "backdrop-blur-[20px]",
                                    "border border-slate-200/50 dark:border-white/[0.06]",
                                    "hover:bg-slate-100 dark:hover:bg-white/[0.06]",
                                    "hover:border-rose-300 dark:hover:border-rose-500/20",
                                    "hover:-translate-y-1",
                                    "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                )}
                            >
                                <div className="text-2xl mb-3 transition-transform duration-500 group-hover:scale-110">
                                    {PAIN_ICONS[i]}
                                </div>
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
                                    {tag}
                                </span>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-rose-500/0 to-rose-500/0 group-hover:from-rose-500/[0.04] group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}
