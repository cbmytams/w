"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_FOR_WHO } from "@/constants"
import { cn } from "@/lib/utils"

// Custom Animated Check Icon
const AnimatedCheck = ({ isActive }: { isActive: boolean }) => (
    <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("text-emerald-400", isActive ? "opacity-100" : "opacity-80")}
    >
        <motion.path
            d="M20 6L9 17l-5-5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: isActive ? 0.2 : 0 }}
        />
    </motion.svg>
)

// Custom Animated Cross Icon
const AnimatedCross = ({ isActive }: { isActive: boolean }) => (
    <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("text-rose-500", isActive ? "opacity-100" : "opacity-80")}
    >
        <motion.path
            d="M18 6L6 18M6 6l12 12"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: isActive ? 0.2 : 0 }}
        />
    </motion.svg>
)

export function ForWhoSection() {
    const [hoveredCard, setHoveredCard] = useState<"yes" | "no" | null>(null)

    return (
        <section id={TALENT_FOR_WHO.id} className="section-spacing px-4 bg-transparent relative z-10 overflow-hidden">
            {/* Ambient Background Sphere tracking the hover state */}
            <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
                <motion.div
                    className="w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 dark:opacity-30 transition-colors duration-700 ease-in-out"
                    animate={{
                        background: hoveredCard === "yes"
                            ? "radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(0,0,0,0) 70%)" // Emerald glow
                            : hoveredCard === "no"
                                ? "radial-gradient(circle, rgba(244,63,94,0.4) 0%, rgba(0,0,0,0) 70%)" // Rose glow
                                : "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%)", // Neutral Violet Default
                        x: hoveredCard === "yes" ? -200 : hoveredCard === "no" ? 200 : 0
                    }}
                    transition={{ type: "spring", damping: 40, stiffness: 50 }}
                />
            </div>

            <Container>
                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header */}
                    <RevealAnimation className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
                            {TALENT_FOR_WHO.title}
                        </h2>
                    </RevealAnimation>

                    {/* Interactive Cards Grid */}
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative group/grid">

                        {/* 1. The "YES" Card */}
                        <motion.div
                            onHoverStart={() => setHoveredCard("yes")}
                            onHoverEnd={() => setHoveredCard(null)}
                            className="relative"
                            animate={{
                                scale: hoveredCard === "yes" ? 1.02 : hoveredCard === "no" ? 0.96 : 1,
                                opacity: hoveredCard === "no" ? 0.4 : 1,
                                filter: hoveredCard === "no" ? "blur(4px)" : "blur(0px)"
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* Card Container */}
                            <div className="h-full p-8 md:p-10 rounded-3xl bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col group/yes cursor-default">

                                {/* Top Emerald Glow Border effect */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover/yes:opacity-100 transition-opacity duration-500" />

                                {/* Inner subtle radial glow follow */}
                                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover/yes:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                {/* Header */}
                                <div className="flex items-center gap-4 mb-10 relative z-10">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover/yes:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-shadow duration-500">
                                        <AnimatedCheck isActive={hoveredCard === "yes" || hoveredCard === null} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">
                                        {TALENT_FOR_WHO.forYou.title}
                                    </h3>
                                </div>

                                {/* List Items */}
                                <ul className="space-y-6 flex-1 relative z-10">
                                    {TALENT_FOR_WHO.forYou.items.map((item, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                                            className="flex items-start gap-4 group/item"
                                        >
                                            <div className="mt-1 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 group-hover/item:bg-emerald-500/20 transition-colors duration-300">
                                                <svg className="w-3 h-3 text-emerald-400 group-hover/item:text-emerald-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-slate-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed font-medium">
                                                {item}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* 2. The "NO" Card */}
                        <motion.div
                            onHoverStart={() => setHoveredCard("no")}
                            onHoverEnd={() => setHoveredCard(null)}
                            className="relative"
                            animate={{
                                scale: hoveredCard === "no" ? 1.02 : hoveredCard === "yes" ? 0.96 : 1,
                                opacity: hoveredCard === "yes" ? 0.4 : 1,
                                filter: hoveredCard === "yes" ? "blur(4px)" : "blur(0px)"
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* Card Container */}
                            <div className="h-full p-8 md:p-10 rounded-3xl bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col group/no cursor-default">

                                {/* Top Rose Glow Border effect */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent opacity-0 group-hover/no:opacity-100 transition-opacity duration-500" />

                                {/* Inner subtle radial glow follow */}
                                <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 to-transparent opacity-0 group-hover/no:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                {/* Header */}
                                <div className="flex items-center gap-4 mb-10 relative z-10">
                                    <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(244,63,94,0.15)] group-hover/no:shadow-[0_0_30px_rgba(244,63,94,0.3)] transition-shadow duration-500">
                                        <AnimatedCross isActive={hoveredCard === "no" || hoveredCard === null} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">
                                        {TALENT_FOR_WHO.notForYou.title}
                                    </h3>
                                </div>

                                {/* List Items */}
                                <ul className="space-y-6 flex-1 relative z-10">
                                    {TALENT_FOR_WHO.notForYou.items.map((item, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                                            className="flex items-start gap-4 group/item"
                                        >
                                            <div className="mt-1 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/10 border border-rose-500/30 group-hover/item:bg-rose-500/20 transition-colors duration-300">
                                                <svg className="w-3 h-3 text-rose-400 group-hover/item:text-rose-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <span className="text-slate-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed font-medium">
                                                {item}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </Container>
        </section>
    )
}
