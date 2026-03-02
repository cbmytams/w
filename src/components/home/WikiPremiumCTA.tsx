"use client"

import * as React from "react"
import { motion, MotionConfig } from "framer-motion"
import { Orbit, Sparkle, ArrowDown } from "lucide-react"
import { EASING } from "@/lib/easing"
import { useReducedMotion } from "@/hooks/useReducedMotion"

/**
 * WikiPremiumCTA — Floating glass portal to the Wiki
 *
 * Framer Motion handles the entry fade-in.
 * Infinite loops (float, rotate, pulse, bounce) use CSS @keyframes
 * to avoid Next.js SSR hydration issues with FM's repeat: Infinity.
 */
export function WikiPremiumCTA() {
    const prefersReducedMotion = useReducedMotion()
    const [isTransitioning, setIsTransitioning] = React.useState(false)
    const navigationTimeoutRef = React.useRef<number | null>(null)

    React.useEffect(() => {
        return () => {
            if (navigationTimeoutRef.current !== null) {
                window.clearTimeout(navigationTimeoutRef.current)
            }
        }
    }, [])

    const handleClick = React.useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
        // Preserve native browser behaviors (new tab, middle click, etc.)
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
            return
        }

        event.preventDefault()
        if (isTransitioning) return

        const exitDelay = window.matchMedia("(max-width: 768px)").matches ? 520 : 620

        if (prefersReducedMotion) {
            window.location.assign("/wiki")
            return
        }

        setIsTransitioning(true)
        const root = document.getElementById("home-root")
        root?.classList.remove("home-from-wiki-enter")
        root?.classList.add("home-to-wiki-exit")

        navigationTimeoutRef.current = window.setTimeout(() => {
            window.location.assign("/wiki")
        }, exitDelay)
    }, [isTransitioning, prefersReducedMotion])

    return (
        <MotionConfig reducedMotion="never">
            <motion.a
                href="/wiki"
                onClick={handleClick}
                aria-disabled={isTransitioning}
                className={`wiki-cta group relative mt-20 md:mt-28 flex flex-col items-center justify-center outline-none ${isTransitioning ? "wiki-cta--transitioning pointer-events-none" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1.2, ease: EASING.premium }}
            >
                {/* Ambient Aura */}
                <div className="wiki-cta-aura absolute inset-0 -inset-x-12 -inset-y-8 bg-gradient-to-br from-slate-400/10 via-purple-300/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 rounded-[100%]" />

                {/* The Badge Container — CSS float animation */}
                <div className="wiki-cta-float relative z-10">
                    <div className="relative flex items-center gap-3 md:gap-4 px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all duration-500 shadow-2xl group-hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.15)] group-hover:scale-[1.03] active:scale-[0.97]">

                        {/* 1. Icon Cluster */}
                        <div className="relative flex items-center justify-center w-8 h-8 text-white/50 group-hover:text-white transition-colors duration-500">
                            <div className="wiki-cta-orbit absolute inset-0 flex items-center justify-center">
                                <Orbit className="w-8 h-8 opacity-40" strokeWidth={1} />
                            </div>
                            <div className="wiki-cta-pulse absolute inset-0 flex items-center justify-center">
                                <Sparkle className="w-3 h-3 text-white" fill="currentColor" />
                            </div>
                        </div>

                        {/* 2. Typography Cluster */}
                        <div className="flex items-baseline gap-1.5 md:gap-2">
                            <span className="font-serif italic text-xl md:text-2xl font-light text-white/80 group-hover:text-white transition-colors duration-500 tracking-wide">
                                Wiki
                            </span>
                            <span className="font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-white/40 group-hover:text-white/80 transition-colors duration-500 whitespace-nowrap">
                                de l&apos;influence
                            </span>
                        </div>

                        {/* 3. Action Arrow */}
                        <div className="ml-2 w-6 h-6 flex items-center justify-center overflow-hidden">
                            <div className="wiki-cta-arrow text-white/30 group-hover:text-white transition-colors duration-500">
                                <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtle reflection on the bottom edge */}
                <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[1px]" />
            </motion.a>
        </MotionConfig>
    )
}
