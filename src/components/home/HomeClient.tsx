"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { WafiaLogo } from "@/components/ui/WafiaLogo"
import { motion } from "framer-motion"
import { HOME_OPTIONS } from "@/constants"
import { ArrowUpRight, Fingerprint, Aperture, Globe, type LucideIcon } from "lucide-react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { EASING, DURATION } from "@/lib/easing"
import { WikiPremiumCTA } from "@/components/home/WikiPremiumCTA"

const DeferredParticlesBackground = dynamic(
    () => import("@/components/ui/RefinedParticlesBackground"),
    { ssr: false, loading: () => null }
)

function StaticBackground() {
    return (
        <div className="absolute inset-0 z-0 bg-[#050510]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08)_0%,rgba(236,72,153,0.06)_35%,rgba(5,5,16,1)_70%)]" />
        </div>
    )
}

const ICONS: Record<string, LucideIcon> = {
    Sparkles: Fingerprint,
    Building2: Aperture,
    Briefcase: Globe,
};

export function HomeClient() {
    const router = useRouter()
    const prefersReducedMotion = useReducedMotion()
    const [showParticles, setShowParticles] = React.useState(false)
    const [enableBackground, setEnableBackground] = React.useState(() => {
        if (typeof window !== "undefined") {
            const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
            const saveData = connection?.saveData === true
            return !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !saveData
        }
        return true
    })

    React.useEffect(() => {
        const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        const saveData = connection?.saveData === true
        setEnableBackground(!prefersReducedMotion && !saveData)
    }, [prefersReducedMotion])

    React.useEffect(() => {
        if (!enableBackground) {
            setShowParticles(false)
            return
        }

        const frame = window.requestAnimationFrame(() => {
            setShowParticles(true)
        })

        return () => window.cancelAnimationFrame(frame)
    }, [enableBackground])

    React.useLayoutEffect(() => {
        if (typeof window === "undefined") return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const transitionFlag = window.sessionStorage.getItem("wafia-nav-transition")
        if (transitionFlag !== "wiki-to-home") return

        window.sessionStorage.removeItem("wafia-nav-transition")
        const root = document.getElementById("home-root")
        if (!root) return

        root.classList.remove("home-to-wiki-exit")
        root.classList.add("home-from-wiki-enter")

        const cleanupTimer = window.setTimeout(() => {
            root.classList.remove("home-from-wiki-enter")
        }, 900)

        return () => window.clearTimeout(cleanupTimer)
    }, [])

    const prefetchRoute = React.useCallback((route: string) => {
        void router.prefetch(route)
    }, [router])

    return (
        <div id="home-root" className="min-h-screen w-full bg-[#0b111a] flex flex-col relative overflow-hidden selection:bg-brand-primary/30">

            {/* SPACE BACKGROUND */}
            <StaticBackground />
            {enableBackground && showParticles && <DeferredParticlesBackground />}

            {/* Grain Texture */}
            <div
                className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: "url('/noise.svg')", backgroundRepeat: "repeat" }}
            />

            {/* MAIN STAGE */}
            <main id="main-content" className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-6 py-20">
                <h1 className="sr-only">Agence d&apos;influence marketing – Studio cr&eacute;atif</h1>

                {/* LOGO - Medium with Glow Effect */}
                <motion.div
                    className="mb-16 md:mb-20 relative"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: DURATION.cinematic, ease: EASING.premium }}
                >
                    {!prefersReducedMotion && (
                        <motion.div
                            className="absolute inset-0 -inset-x-8 -inset-y-4 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 blur-2xl rounded-full"
                            animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                    )}
                    <WafiaLogo className="h-14 md:h-[4.5rem] lg:h-24 w-auto text-white relative z-10 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]" />
                </motion.div>

                {/* NAVIGATION - Minimalist Horizontal Pills */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    {HOME_OPTIONS.map((option, index) => {
                        const IconComponent = ICONS[option.icon] || Fingerprint;

                        return (
                            <motion.div
                                key={option.id}
                                initial={{ y: 30, scale: 0.98 }}
                                animate={{ y: 0, scale: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.3 + (index * 0.15),
                                    ease: EASING.premium
                                }}
                            >
                                <Link
                                    href={option.route}
                                    prefetch={false}
                                    onMouseEnter={() => prefetchRoute(option.route)}
                                    onFocus={() => prefetchRoute(option.route)}
                                    onTouchStart={() => prefetchRoute(option.route)}
                                    className="group relative flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/25 hover:scale-105 active:scale-95 transition-all duration-300"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-pink-500/30 transition-all duration-500">
                                        <IconComponent className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300" />
                                    </div>

                                    <span
                                        className="font-heading text-white/80 text-sm font-medium tracking-wide group-hover:text-white transition-colors duration-300"
                                    >
                                        {option.label}
                                    </span>

                                    <ArrowUpRight
                                        className="w-4 h-4 text-white/0 group-hover:text-white/60 -ml-1 group-hover:ml-0 transition-all duration-300"
                                        strokeWidth={2}
                                    />

                                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${option.gradient} opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity duration-500`} />
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>

                {/* WIKI CTA */}
                <WikiPremiumCTA />

            </main>

            {/* FOOTER */}
            <motion.footer
                className="relative z-10 w-full flex justify-center items-center py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <div className="text-white/25 text-[10px] font-mono tracking-[0.4em] uppercase">
                    &copy; 2026 Wafia
                </div>
            </motion.footer>
        </div>
    )
}
