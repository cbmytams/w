"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { FadeIn } from "@/components/ui/fade-in"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const BRANDS = [
    "TEISSERE", "ADOBE FIREFLY", "ADOBE EXPRESS", "OREO", "MILKA",
    "SONY", "ASUS", "AMARAN", "HARIBO", "LECLERC",
    "LOGITECH", "CONFORAMA", "ZHIYUN", "MONSTER", "DOMINOS",
    "FANTA", "BACKMARKET", "YVES SAINT LAURENT", "TÊTES BRÛLÉES", "NINJA",
    "REALME", "SAUCES MARTIN", "IDALIA", "SIGNORINI TARTUFI", "KADALYS"
]

export function JulienBrandsMarquee() {
    const sectionRef = useRef<HTMLElement>(null)
    const inView = useInView(sectionRef, { amount: 0.1, once: false })
    const prefersReducedMotion = useReducedMotion()
    const shouldAnimate = inView && !prefersReducedMotion

    return (
        <section ref={sectionRef} className="py-24 overflow-hidden bg-zinc-950 border-y border-white/5">
            <FadeIn>
                <div className="text-center mb-16 px-4">
                    <h2 className="text-xs md:text-sm font-bold text-white/40 uppercase tracking-[0.3em]">
                        Ils m'ont fait confiance
                    </h2>
                </div>
            </FadeIn>

            <div className="relative flex flex-col gap-8 md:gap-12 opacity-80">
                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

                {/* Marquee row 1 */}
                <div className="flex w-[200%] sm:w-[150%] md:w-auto">
                    <motion.div
                        className="flex whitespace-nowrap gap-8 md:gap-16 pr-8 md:pr-16"
                        animate={shouldAnimate ? { x: "-100%" } : undefined}
                        transition={shouldAnimate ? { repeat: Infinity, ease: "linear", duration: 40 } : undefined}
                    >
                        {/* Duplicate for seamless loop */}
                        {[...BRANDS, ...BRANDS].map((brand, i) => (
                            <div
                                key={`${brand}-${i}`}
                                className="text-2xl md:text-5xl font-black uppercase text-zinc-800 hover:text-white transition-colors cursor-default select-none tracking-tighter"
                            >
                                {brand}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Marquee row 2 (reverse) */}
                <div className="flex w-[200%] sm:w-[150%] md:w-auto">
                    <motion.div
                        className="flex whitespace-nowrap gap-8 md:gap-16 pr-8 md:pr-16"
                        initial={shouldAnimate ? { x: "-100%" } : { x: "0%" }}
                        animate={{ x: "0%" }}
                        transition={shouldAnimate ? { repeat: Infinity, ease: "linear", duration: 45 } : undefined}
                    >
                        {/* Duplicate reverse array */}
                        {[...BRANDS].reverse().concat([...BRANDS].reverse()).map((brand, i) => (
                            <div
                                key={`r-${brand}-${i}`}
                                className="text-2xl md:text-5xl font-black uppercase text-zinc-800 hover:text-white transition-colors cursor-default select-none tracking-tighter"
                            >
                                {brand}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
