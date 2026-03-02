"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { WafiaLogo } from "@/components/ui/WafiaLogo"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Home, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BRAND_NAVIGATION } from "@/constants"
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

interface FloatingNavigationProps {
    onEstimateClick: () => void
}

export function FloatingNavigation({ onEstimateClick }: FloatingNavigationProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState<string | null>(null)

    // Scroll spy logic
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const visibleEntries = entries.filter((entry) => entry.isIntersecting);
            if (visibleEntries.length > 0) {
                visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                const activeId = visibleEntries[0].target.id;
                setActiveSection(`#${activeId}`);
            }
        }, {
            rootMargin: "-20% 0px -60% 0px", // Trigger active state when section is near top
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
        });

        // Small delay to ensure DOM is fully rendered before observing
        const timeoutId = setTimeout(() => {
            BRAND_NAVIGATION.forEach((item) => {
                const id = item.href.substring(1);
                const element = document.getElementById(id);
                if (element) {
                    observer.observe(element);
                }
            });
        }, 500);

        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: DURATION.slow, ease: EASING.entrance }}
                className="fixed top-4 left-4 sm:top-8 sm:left-8 z-[100]"
            >
                <Link
                    href="/for-brands"
                    onClick={(e) => {
                        setMobileMenuOpen(false)
                        if (
                            typeof window !== "undefined" &&
                            window.location.pathname === "/for-brands"
                        ) {
                            e.preventDefault()
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    }}
                    className="h-12 group flex items-center px-5 rounded-full bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 hover:scale-105 hover:bg-white/50 dark:hover:bg-[#1C1C1E]/80 transition-all duration-300"
                >
                    <WafiaLogo className="h-4 w-auto text-black dark:text-white" />
                    <div className="flex items-center justify-center w-6 z-10 mx-1">
                        <div className="w-[5px] h-[5px] rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
                    </div>
                    <span className="text-[12px] font-bold text-gray-900 dark:text-white uppercase tracking-wider leading-none mb-[1px]">BRANDS</span>
                </Link>
            </motion.div>

            {/* 2. Center - Navigation Pill (Premium Apple Style) - Desktop only */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: DURATION.slower, ease: EASING.entrance }}
                className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] hidden lg:block"
            >
                <div className="h-12 bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] rounded-full p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 flex items-center justify-center gap-1 relative">
                    <div className="flex items-center gap-0.5 relative z-10 h-9">
                        {BRAND_NAVIGATION.map((item) => {
                            const isActive = activeSection === item.href;
                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`relative h-9 px-5 rounded-full transition-all duration-300 text-[13px] font-semibold leading-[1.2] text-center flex items-center justify-center min-w-[80px] ${isActive ? "text-gray-900 dark:text-white" : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeBubble"
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
                    <Button
                        onClick={onEstimateClick}
                        className="rounded-full bg-[#111111] dark:bg-white hover:bg-black dark:hover:bg-gray-100 px-6 h-9 text-white dark:text-black text-[13px] font-bold tracking-wide shadow-md transition-transform duration-300 hover:scale-105"
                    >
                        Estimer mon plan
                    </Button>
                </div>
            </motion.nav>

            {/* 3. Right - Home (Desktop) / Hamburger (Mobile) */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: DURATION.slow, ease: EASING.entrance }}
                className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[100] flex items-center gap-3"
            >
                {/* Home - Desktop only */}
                <Link
                    href="/"
                    className="h-12 hidden lg:flex group items-center gap-2.5 px-6 rounded-full bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 hover:scale-105 hover:bg-white/50 dark:hover:bg-[#1C1C1E]/80 transition-all duration-300 text-[13px] font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                >
                    <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Menu principal</span>
                </Link>

                {/* Hamburger - Mobile only */}
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="h-12 w-12 lg:hidden flex items-center justify-center rounded-full bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 hover:scale-105 hover:bg-white/50 dark:hover:bg-[#1C1C1E]/80 transition-all duration-300"
                    aria-label="Ouvrir le menu"
                >
                    <Menu className="h-5 w-5 text-gray-900 dark:text-white" />
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
                            <div className="w-full h-full max-h-[600px] max-w-sm bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[60px] saturate-[180%] border border-white/50 dark:border-white/10 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 flex flex-col justify-between pointer-events-auto relative overflow-hidden">

                                {/* The Living Glass Aura (Ambient Orange Glow) */}
                                <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-orange-500/20 dark:from-orange-500/10 to-transparent blur-[40px] pointer-events-none rounded-full" />
                                <div className="absolute inset-x-0 -bottom-24 h-48 bg-gradient-to-t from-red-500/20 dark:from-red-500/10 to-transparent blur-[40px] pointer-events-none rounded-full" />

                                {/* Header with Pulsing Dot & Context */}
                                <div className="flex items-center justify-center mb-8 relative z-10">
                                    <WafiaLogo className="h-6 w-auto text-black dark:text-white" />
                                    <div className="flex items-center justify-center w-6 z-10 mx-3">
                                        <div className="w-[6px] h-[6px] rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                                    </div>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider leading-none mb-[1px]">BRANDS</span>
                                </div>

                                {/* Monumental Navigation Links (Cascading) */}
                                <motion.nav className="flex-1 flex flex-col items-center justify-center space-y-8 overflow-y-auto relative z-10">
                                    {BRAND_NAVIGATION.map((item) => {
                                        const isActive = activeSection === item.href
                                        return (
                                        <motion.a
                                            key={item.label}
                                            href={item.href}
                                            variants={menuItemVariants}
                                            aria-current={isActive ? "page" : undefined}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-4xl font-black tracking-tighter text-gray-900 dark:text-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]"
                                        >
                                            {item.label}
                                        </motion.a>
                                        )
                                    })}

                                    <motion.div variants={menuItemVariants}>
                                        <Link
                                            href="/"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-xl font-bold tracking-tight text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mt-6 flex items-center justify-center gap-2 group"
                                        >
                                            <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                            Menu principal
                                        </Link>
                                    </motion.div>
                                </motion.nav>

                                {/* Physical CTA Button */}
                                <motion.div
                                    variants={menuItemVariants}
                                    className="mt-8 w-full relative z-10"
                                >
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false)
                                            onEstimateClick()
                                        }}
                                        className="h-14 w-full rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-lg shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
                                    >
                                        Estimer mon plan
                                    </button>
                                </motion.div>
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
                            <X className="h-6 w-6 text-gray-900 dark:text-white" />
                        </motion.button>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
