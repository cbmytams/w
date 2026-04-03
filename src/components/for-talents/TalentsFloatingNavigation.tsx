"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { WafiaLogo } from "@/components/ui/WafiaLogo"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Home, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TALENT_NAVIGATION, BRAND_GRADIENT } from "@/constants"
import { buildTalentQuestionnaireHref } from "@/lib/talent-questionnaire"
import { EASING, DURATION } from "@/lib/easing"

// Animation Variants for the fluid Spatial UI cascading menu
const menuPlaqueVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring" as const, damping: 25, stiffness: 300,
            staggerChildren: 0.1,
            delayChildren: 0.15
        }
    },
    exit: {
        opacity: 0, scale: 0.95, y: 20,
        transition: { duration: 0.2 }
    }
};

const menuItemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring" as const, stiffness: 300, damping: 24 }
    }
};

export function TalentsFloatingNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const desktopCtaHref = buildTalentQuestionnaireHref("for-talents-nav-desktop")
    const mobileCtaHref = buildTalentQuestionnaireHref("for-talents-nav-mobile")

    const scrollToSection = useCallback((href: string) => {
        const id = href.substring(1)
        const element = document.getElementById(id)
        if (!element) return

        setActiveSection(href)
        element.scrollIntoView({ behavior: "smooth", block: "start" })
        window.history.replaceState(null, "", href)
    }, [])

    // Scroll spy logic
    useEffect(() => {
        let rafId: number | null = null

        const getSections = () =>
            TALENT_NAVIGATION
                .map((item) => document.getElementById(item.href.substring(1)))
                .filter((section): section is HTMLElement => Boolean(section))

        const updateActiveSection = () => {
            const sections = getSections()
            if (sections.length === 0) {
                rafId = null
                return
            }

            if (window.scrollY < 100) {
                setActiveSection(null)
                rafId = null
                return
            }

            const activationLine = window.innerHeight * 0.4 // Adjust ratio to avoid triggering early
            let nextActiveId: string | null = null

            for (const section of sections) {
                const heading =
                    section.querySelector<HTMLElement>("h1, h2, h3") ?? section
                const triggerTop = heading.getBoundingClientRect().top

                if (triggerTop <= activationLine) {
                    nextActiveId = section.id
                } else {
                    break
                }
            }

            // Ensure the last section becomes active at page bottom.
            const atPageBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 50 // Added a threshold buffer

            if (atPageBottom) {
                nextActiveId = sections[sections.length - 1].id
            }

            const nextHash = nextActiveId ? `#${nextActiveId}` : null
            setActiveSection((prev) => (prev === nextHash ? prev : nextHash))
            rafId = null
        }

        const requestUpdate = () => {
            if (rafId !== null) return
            rafId = window.requestAnimationFrame(updateActiveSection)
        }

        requestUpdate()
        window.addEventListener("scroll", requestUpdate, { passive: true })
        window.addEventListener("resize", requestUpdate)

        return () => {
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId)
            }
            window.removeEventListener("scroll", requestUpdate)
            window.removeEventListener("resize", requestUpdate)
        }
    }, [])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [mobileMenuOpen])

    return (
        <>
            {/* 1. Left - Logo (Minimal & Clean) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DURATION.slow, ease: EASING.entrance }}
                className="fixed top-4 left-4 sm:top-8 sm:left-8 z-[100]"
            >
                <Link
                    href="/for-talents"
                    onClick={(e) => {
                        setMobileMenuOpen(false)
                        if (
                            typeof window !== "undefined" &&
                            window.location.pathname === "/for-talents"
                        ) {
                            e.preventDefault()
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    }}
                    className="h-12 group flex items-center px-5 rounded-full bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 hover:scale-105 hover:bg-white/50 dark:hover:bg-[#1C1C1E]/80 transition-all duration-300"
                >
                    <WafiaLogo className="h-4 w-auto text-slate-900 dark:text-white" />
                    <div className="flex items-center justify-center w-6 z-10 mx-1">
                        <div className="w-[5px] h-[5px] rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                    </div>
                    <span className="text-[12px] font-bold text-slate-900 dark:text-white uppercase tracking-wider leading-none mb-[1px]">TALENTS</span>
                </Link>
            </motion.div>

            {/* 2. Center - Navigation Pill (Premium Apple Style) - Desktop only */}
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DURATION.slower, ease: EASING.entrance }}
                className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] hidden lg:!block"
            >
                <div className="h-12 bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] rounded-full p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 flex items-center justify-center gap-1 relative">
                    <div className="flex items-center gap-0.5 relative z-10 h-9">
                        {TALENT_NAVIGATION.map((item) => {
                            const isActive = activeSection === item.href;
                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        scrollToSection(item.href)
                                    }}
                                    className={`relative h-9 px-5 rounded-full transition-all duration-300 text-[13px] font-semibold leading-[1.2] text-center flex items-center justify-center min-w-[80px] ${isActive ? "text-slate-900 dark:text-white" : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                                        }`}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeBubbleTalent"
                                            className="absolute inset-0 bg-white/60 dark:bg-white/20 rounded-full shadow-sm border border-black/5 dark:border-white/10"
                                            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.label}</span>
                                </a>
                            )
                        })}
                    </div>
                    <div className="w-1"></div>
                    <a href={desktopCtaHref}>
                        <Button
                            className={`rounded-full bg-gradient-to-r ${BRAND_GRADIENT} hover:opacity-90 px-6 h-9 text-white text-[13px] font-bold tracking-wide shadow-md shadow-pink-500/25 hover:shadow-pink-500/40 transition-transform duration-300 hover:scale-105`}
                        >
                            Se référencer
                        </Button>
                    </a>
                </div>
            </motion.nav>

            {/* 3. Right - Home button (Desktop) / Hamburger (Mobile) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DURATION.slow, ease: EASING.entrance }}
                className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[100] flex items-center gap-3"
            >
                {/* Home - Desktop only */}
                <Link
                    href="/"
                    className="h-12 hidden lg:!flex group items-center gap-2.5 px-6 rounded-full bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 hover:scale-105 hover:bg-white/50 dark:hover:bg-[#1C1C1E]/80 transition-all duration-300 text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white"
                >
                    <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Menu principal</span>
                </Link>



                {/* Hamburger - Mobile only */}
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="h-12 w-12 flex lg:!hidden items-center justify-center rounded-full bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 hover:scale-105 hover:bg-white/50 dark:hover:bg-[#1C1C1E]/80 transition-all duration-300"
                    aria-label="Ouvrir le menu"
                >
                    <Menu className="h-5 w-5 text-slate-900 dark:text-white" />
                </button>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop with extreme blur and dimming */}
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                            className="fixed inset-0 z-[150] bg-black/40 dark:bg-black/60"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Spatial Floating Menu Plaque WITH AURA */}
                        <motion.div
                            variants={menuPlaqueVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed inset-x-4 top-[10%] bottom-[15%] z-[200] flex flex-col items-center justify-center pointer-events-none"
                        >
                            <div className="w-full h-full max-h-[520px] max-w-sm bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[60px] saturate-[180%] border border-white/50 dark:border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-6 sm:p-8 flex flex-col justify-between pointer-events-auto relative overflow-hidden">

                                {/* The Living Glass Aura (Ambient Magenta Glow) */}
                                <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-pink-500/20 dark:from-pink-500/10 to-transparent blur-[40px] pointer-events-none rounded-full" />
                                <div className="absolute inset-x-0 -bottom-24 h-48 bg-gradient-to-t from-orange-500/20 dark:from-orange-500/10 to-transparent blur-[40px] pointer-events-none rounded-full" />

                                {/* Header with Pulsing Dot & Context */}
                                <div className="flex items-center justify-center mb-6 relative z-10">
                                    <WafiaLogo className="h-6 w-auto text-slate-900 dark:text-white" />
                                    <div className="flex items-center justify-center w-6 z-10 mx-3">
                                        <div className="w-[6px] h-[6px] rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                                    </div>
                                    <span className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider leading-none mb-[1px]">TALENTS</span>
                                </div>

                                {/* Monumental Navigation Links (Cascading) */}
                                <motion.nav className="flex-1 flex flex-col items-center justify-center space-y-3 overflow-y-auto relative z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {TALENT_NAVIGATION.map((item) => {
                                        const isActive = activeSection === item.href
                                        return (
                                            <motion.a
                                                key={item.label}
                                                href={item.href}
                                                variants={menuItemVariants}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setMobileMenuOpen(false)
                                                    scrollToSection(item.href)
                                                }}
                                                className={`relative px-6 py-2.5 text-2xl font-black tracking-tighter transition-all duration-300 hover:scale-105 active:scale-95 group ${isActive ? "text-slate-900 dark:text-white" : "text-slate-500/80 dark:text-slate-400/80 hover:text-slate-900 dark:hover:text-white"
                                                    }`}
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeBubbleMobileTalent"
                                                        className="absolute inset-0 bg-white/70 dark:bg-white/20 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 -z-10"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                                <span className="relative z-10">{item.label}</span>
                                            </motion.a>
                                        )
                                    })}
                                </motion.nav>

                                {/* Action Buttons (Global & Conversion) */}
                                <div className="mt-6 w-full flex flex-col gap-3 relative z-10 shrink-0">
                                    {/* Secondary: Menu principal */}
                                    <motion.div variants={menuItemVariants}>
                                        <Link
                                            href="/"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="h-12 w-full flex items-center justify-center gap-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 text-[15px] font-semibold text-slate-700 dark:text-slate-300 group"
                                        >
                                            <Home className="h-[18px] w-[18px] group-hover:scale-110 transition-transform" />
                                            Menu principal
                                        </Link>
                                    </motion.div>

                                    {/* Primary CTA Button */}
                                    <motion.div variants={menuItemVariants}>
                                    <a
                                        href={mobileCtaHref}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`h-14 w-full flex items-center justify-center rounded-full bg-gradient-to-r ${BRAND_GRADIENT} text-white font-bold text-lg shadow-[0_8px_20px_rgba(236,72,153,0.3)] hover:shadow-[0_8px_30px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all duration-300`}
                                    >
                                        Se référencer
                                    </a>
                                </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Detached Ergonomic Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 50 }}
                            transition={{ type: "spring", damping: 20, stiffness: 400, delay: 0.3 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[250] h-14 w-14 flex items-center justify-center rounded-full bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[60px] saturate-[180%] border border-white/50 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:scale-110 active:scale-95 transition-all"
                            aria-label="Fermer le menu"
                        >
                            <X className="h-6 w-6 text-slate-900 dark:text-white" />
                        </motion.button>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
