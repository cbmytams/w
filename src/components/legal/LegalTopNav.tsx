"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Menu, X } from "lucide-react"

import { WafiaLogo } from "@/components/ui/WafiaLogo"

export type LegalNavContext = "brands" | "talents" | "default"

const LEGAL_LINKS = [
    { href: "/legal/mentions", label: "Mentions légales" },
    { href: "/legal/privacy", label: "Confidentialité" },
    { href: "/legal/cookies", label: "Cookies" },
] as const

const CTA_CONFIG: Record<LegalNavContext, { href: string; label: string }> = {
    brands: { href: "/questionnaire/brands", label: "Cadrer ma campagne" },
    talents: { href: "/for-talents#contact", label: "Rejoindre Wafia" },
    default: { href: "/questionnaire/brands", label: "Nous contacter" },
}

const BACK_ROUTE: Record<LegalNavContext, string> = {
    brands: "/for-brands",
    talents: "/for-talents",
    default: "/",
}

interface LegalTopNavProps {
    context: LegalNavContext
}

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
}

const menuItemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring" as const, stiffness: 300, damping: 24 }
    }
}

export function LegalTopNav({ context }: LegalTopNavProps) {
    const pathname = usePathname()
    const cta = CTA_CONFIG[context]
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            {/* 1. Left - Back Button (Desktop & Mobile) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-4 left-4 sm:top-8 sm:left-8 z-[100]"
            >
                <Link
                    href={BACK_ROUTE[context]}
                    aria-label="Retour"
                    className="h-12 group flex items-center justify-center gap-2.5 px-4 sm:px-6 rounded-full bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 hover:scale-105 hover:bg-white/50 dark:hover:bg-[#1C1C1E]/80 transition-all duration-300 text-[13px] font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                >
                    <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                    <span className="hidden sm:inline">Retour</span>
                </Link>
            </motion.div>

            {/* 2. Center - Navigation Pill (Desktop only) */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] hidden lg:block"
            >
                <div className="h-12 bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] rounded-full p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 flex items-center justify-center gap-1 relative">
                    <div className="flex items-center gap-0.5 relative z-10 h-9 px-1">
                        {LEGAL_LINKS.map((item) => {
                            const isActive = pathname === item.href
                            const hrefWithContext = context !== "default" ? `${item.href}?context=${context}` : item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={hrefWithContext}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`relative h-9 px-5 rounded-full transition-all duration-300 text-[13px] font-semibold leading-[1.2] text-center flex items-center justify-center min-w-[80px] ${isActive ? "text-gray-900 dark:text-white" : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeBubbleLegalNav"
                                            className="absolute inset-0 bg-white/60 dark:bg-white/20 rounded-full shadow-sm border border-black/5 dark:border-white/10"
                                            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                    <div className="w-1"></div>
                    <a href={cta.href}>
                        <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF4C00] to-[#FF8C00] hover:opacity-90 px-6 h-9 text-white text-[13px] font-bold tracking-wide shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-transform duration-300 hover:scale-105">
                            {cta.label}
                        </div>
                    </a>
                </div>
            </motion.nav>

            {/* 3. Right - Hamburger Button (Mobile only) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[100] flex lg:hidden items-center gap-3"
            >
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="h-12 w-12 flex items-center justify-center rounded-full bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 hover:scale-105 hover:bg-white/50 dark:hover:bg-[#1C1C1E]/80 transition-all duration-300"
                    aria-label="Ouvrir le menu"
                >
                    <Menu className="h-5 w-5 text-gray-900 dark:text-white" />
                </button>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                            className="fixed inset-0 z-[150] bg-black/40 dark:bg-black/60"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        <motion.div
                            variants={menuPlaqueVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed inset-x-4 top-[10%] bottom-[15%] z-[200] flex flex-col items-center justify-center pointer-events-none"
                        >
                            <div className="w-full h-full max-h-[600px] max-w-sm bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[60px] saturate-[180%] border border-white/50 dark:border-white/10 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 flex flex-col justify-between pointer-events-auto relative overflow-hidden">

                                <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-orange-500/20 dark:from-orange-500/10 to-transparent blur-[40px] pointer-events-none rounded-full" />
                                <div className="absolute inset-x-0 -bottom-24 h-48 bg-gradient-to-t from-pink-500/20 dark:from-pink-500/10 to-transparent blur-[40px] pointer-events-none rounded-full" />

                                <div className="flex items-center justify-center mb-8 relative z-10">
                                    <WafiaLogo className="h-6 w-auto text-gray-900 dark:text-white" />
                                    <div className="flex items-center justify-center w-6 z-10 mx-3">
                                        <div className="w-[6px] h-[6px] rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                                    </div>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider leading-none mb-[1px]">LEGAL</span>
                                </div>

                                <motion.nav className="flex-1 flex flex-col items-center justify-center space-y-6 relative z-10 w-full">
                                    {LEGAL_LINKS.map((item) => {
                                        const hrefWithContext = context !== "default" ? `${item.href}?context=${context}` : item.href
                                        return (
                                            <motion.div key={item.label} variants={menuItemVariants}>
                                                <Link
                                                    href={hrefWithContext}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`text-3xl font-black tracking-tighter transition-all duration-300 hover:scale-105 active:scale-95 ${pathname === item.href ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]" : "text-gray-900 dark:text-gray-100"}`}
                                                >
                                                    {item.label}
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                </motion.nav>

                                <motion.div
                                    variants={menuItemVariants}
                                    className="mt-8 w-full relative z-10"
                                >
                                    <a
                                        href={cta.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="h-14 w-full flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF4C00] to-[#FF8C00] text-white font-bold text-lg shadow-[0_8px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
                                    >
                                        {cta.label}
                                    </a>
                                </motion.div>
                            </div>
                        </motion.div>

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
