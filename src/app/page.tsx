"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { HOME_OPTIONS } from "@/constants"
import { Sparkles, ArrowUpRight, Users, Palette, Megaphone, type LucideIcon } from "lucide-react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

function StaticBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-[#050510]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08)_0%,rgba(236,72,153,0.06)_35%,rgba(5,5,16,1)_70%)]" />
        </div>
    )
}

const FuturisticBackground = dynamic(() => import("@/components/ui/FuturisticBackground"), {
    ssr: false,
    loading: () => <StaticBackground />
})

// Better icon mapping for space theme
const ICONS: Record<string, LucideIcon> = {
    Sparkles: Users,      // Talent = People
    Building2: Palette,   // Studio = Creative
    Briefcase: Megaphone  // Brand = Marketing
};

/**
 * Homepage - Space Minimalist Edition
 * 
 * - Smaller Logo
 * - No Tagline
 * - Compact Minimalist Buttons
 * - Stylish Hover Animations
 */
export default function Homepage() {
    const prefersReducedMotion = useReducedMotion()
    const [enableBackground, setEnableBackground] = React.useState(false)

    React.useEffect(() => {
        const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
        const saveData = connection?.saveData === true
        const lowMemory = typeof deviceMemory === "number" && deviceMemory <= 4

        setEnableBackground(!prefersReducedMotion && !saveData && !lowMemory)
    }, [prefersReducedMotion])

    return (
        <div className="h-screen w-full bg-black flex flex-col relative overflow-hidden selection:bg-brand-primary/30">

            {/* ============================================
                SPACE BACKGROUND 
               ============================================ */}
            {enableBackground ? <FuturisticBackground /> : <StaticBackground />}

            {/* Grain Texture */}
            <div
                className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: "url('/noise.svg')", backgroundRepeat: "repeat" }}
            />

            {/* ============================================
                MAIN STAGE
               ============================================ */}
            <main id="main-content" className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-6">
                <h1 className="sr-only">Wafia — Influence & Creative Studio</h1>

                {/* LOGO - Medium with Glow Effect */}
                <motion.div
                    className="mb-16 md:mb-20 relative"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Pulsing Glow */}
                    <motion.div
                        className="absolute inset-0 -inset-x-8 -inset-y-4 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 blur-2xl rounded-full"
                        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <Image
                        src="/wafia-logo.png"
                        alt="Wafia"
                        width={240}
                        height={80}
                        className="h-14 md:h-[4.5rem] lg:h-24 w-auto invert relative z-10 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                        priority
                    />
                </motion.div>

                {/* NAVIGATION - Minimalist Horizontal Pills */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    {HOME_OPTIONS.map((option, index) => {
                        const IconComponent = ICONS[option.icon] || Sparkles;

                        return (
                            <motion.div
                                key={option.id}
                                initial={{ y: 30, scale: 0.98 }}
                                animate={{ y: 0, scale: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.3 + (index * 0.15),
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            >
                                <Link
                                    href={option.route}
                                    className="group relative flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/25 hover:scale-105 active:scale-95 transition-all duration-300"
                                >
                                    {/* Icon */}
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-pink-500/30 transition-all duration-500">
                                        <IconComponent className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300" />
                                    </div>

                                    {/* Label */}
                                    <span
                                        className="text-white/80 text-sm font-medium tracking-wide group-hover:text-white transition-colors duration-300"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {option.label}
                                    </span>

                                    {/* Arrow on Hover */}
                                    <ArrowUpRight
                                        className="w-4 h-4 text-white/0 group-hover:text-white/60 -ml-1 group-hover:ml-0 transition-all duration-300"
                                        strokeWidth={2}
                                    />

                                    {/* Glow Effect */}
                                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${option.gradient} opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity duration-500`} />
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>

            </main>

            {/* ============================================
                FOOTER - Minimal Centered
               ============================================ */}
            <motion.footer
                className="relative z-10 w-full flex justify-center items-center py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <div className="text-white/25 text-[10px] font-mono tracking-[0.4em] uppercase">
                    © 2026 Wafia
                </div>
            </motion.footer>
        </div>
    )
}
