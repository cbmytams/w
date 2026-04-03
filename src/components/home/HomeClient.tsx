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
import { CLIENTS } from "@/constants/clients"

const DeferredParticlesBackground = dynamic(
    () => import("@/components/ui/RefinedParticlesBackground"),
    { ssr: false, loading: () => null }
)

function StaticBackground() {
    return (
        <div className="absolute inset-0 z-0 bg-[#0b111a]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08)_0%,rgba(236,72,153,0.06)_35%,rgba(5,5,16,1)_70%)]" />
        </div>
    )
}

// The RefinedParticlesBackground is explicitly imported and SSR safe natively

// V2 Premium Icon Mapping - Advanced Jobs/Ive conceptual approach:
// We strip away literal utility (cliché human, palette, or megaphone) and replace it with pure essence.
const ICONS: Record<string, LucideIcon> = {
    Sparkles: Fingerprint, // Talents = Authenticity, individual DNA, unique personal branding.
    Building2: Aperture,   // Studio = The lens, focus, light capture, surgical precision of craft.
    Briefcase: Globe,      // Brands = Macro scale, global reach, infinite brand ecosystem and orbit.
};

/**
 * Homepage - Client Component logic
 * Separated from page.tsx to allow the route to be a Server Component
 */
export function HomeClient() {
    const router = useRouter()
    const prefersReducedMotion = useReducedMotion()
    const [showParticles, setShowParticles] = React.useState(false)
    const [enableBackground, setEnableBackground] = React.useState(() => {
        // Initialize synchronously on the client to prevent flash
        if (typeof window !== "undefined") {
            const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
            const saveData = connection?.saveData === true
            return !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !saveData
        }
        return true // Default server value (replaced by next/dynamic loading state anyway)
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

            {/* ============================================
                SPACE BACKGROUND
               ============================================ */}
            <StaticBackground />
            {enableBackground && showParticles && <DeferredParticlesBackground />}

            {/* Grain Texture */}
            <div
                className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: "url('/noise.svg')", backgroundRepeat: "repeat" }}
            />

            {/* ============================================
                MAIN STAGE
               ============================================ */}
            <main id="main-content" className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-6 py-20">

                {/* LOGO - Medium with Glow Effect */}
                <motion.div
                    className="mb-10 md:mb-12 relative"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: DURATION.cinematic, ease: EASING.premium }}
                >
                    {/* Pulsing Glow */}
                    {!prefersReducedMotion && (
                        <motion.div
                            className="absolute inset-0 -inset-x-8 -inset-y-4 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 blur-2xl rounded-full"
                            animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
                            transition={{ duration: 4, repeat: Infinity, ease: EASING.easeInOut }}
                        />
                    )}
                    <WafiaLogo className="h-14 md:h-[4.5rem] lg:h-24 w-auto text-white relative z-10 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]" />
                </motion.div>

                {/* H1 - Visible Heading */}
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center max-w-3xl leading-tight mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: DURATION.slower, delay: 0.2, ease: EASING.entrance }}
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Influence marketing{" "}
                    <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                        &amp; studio créatif
                    </span>
                </motion.h1>

                {/* TAGLINE */}
                <motion.p
                    className="text-base sm:text-lg text-white/50 text-center max-w-xl mb-12 leading-relaxed"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: DURATION.slower, delay: 0.35, ease: EASING.entrance }}
                >
                    Campagnes data-driven, créateurs vérifiés, production social-first et talent management pour marques et agences.
                </motion.p>

                {/* CLIENT LOGOS GRID */}
                <motion.div
                    className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 max-w-2xl mb-14"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: DURATION.slow, delay: 0.5 }}
                >
                    {CLIENTS.slice(0, 9).map((client) => (
                        <img
                            key={client.name}
                            src={client.logoLight}
                            alt={client.name}
                            className="h-5 w-auto object-contain opacity-30 grayscale"
                        />
                    ))}
                </motion.div>

                {/* DOUBLE CTA BUTTONS */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center gap-3 mb-16"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: DURATION.slower, delay: 0.6, ease: EASING.entrance }}
                >
                    <Link
                        href="/questionnaire/brands"
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold hover:from-orange-600 hover:to-red-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/25"
                    >
                        Je suis une Marque
                    </Link>
                    <Link
                        href="/questionnaire/talents"
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold hover:from-violet-700 hover:to-fuchsia-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-violet-500/25"
                    >
                        Je suis un Talent
                    </Link>
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

                {/* ============================================
                    WIKI CTA — Floating Glass Portal
                   ============================================ */}
                <WikiPremiumCTA />

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
            </motion.footer >
        </div >
    )
}
