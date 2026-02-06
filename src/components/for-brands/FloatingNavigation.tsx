"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BRAND_NAVIGATION } from "@/constants"

interface FloatingNavigationProps {
    onEstimateClick: () => void
}

export function FloatingNavigation({ onEstimateClick }: FloatingNavigationProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            {/* 1. Left - Logo (Minimal & Clean) */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                className="fixed top-4 left-4 sm:top-8 sm:left-8 z-[100]"
            >
                <Link
                    href="/for-brands"
                    className="group flex items-center gap-3 px-4 py-2.5 sm:px-6 sm:py-3 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-xl shadow-black/5 border border-gray-100/50 dark:border-white/10 hover:scale-105 transition-all duration-300"
                >
                    <Image
                        src="/wafia-logo.png"
                        alt="Wafia"
                        width={24}
                        height={24}
                        className="h-5 sm:h-6 w-auto dark:invert dark:brightness-200"
                    />
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <span className="text-xs font-bold text-gray-400 dark:text-gray-300 uppercase tracking-widest">Brands</span>
                    </div>
                </Link>
            </motion.div>

            {/* 2. Center - Navigation Pill (Premium) - Desktop only */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
                className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] hidden lg:block"
            >
                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-2xl px-6 py-3 shadow-xl shadow-black/5 border border-gray-100/50 dark:border-white/10">
                    <div className="flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {BRAND_NAVIGATION.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="hover:text-black dark:hover:text-white transition-colors duration-200 hover:scale-105 transform"
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="w-px h-5 bg-gradient-to-b from-transparent via-gray-200 dark:via-zinc-700 to-transparent"></div>
                        <Button
                            size="sm"
                            onClick={onEstimateClick}
                            className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-5 h-9 text-white text-xs font-bold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:scale-105 transition-all"
                        >
                            Estimer mon plan
                        </Button>
                    </div>
                </div>
            </motion.nav>

            {/* 3. Right - Home (Desktop) / Hamburger (Mobile) */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[100] flex items-center gap-3"
            >
                {/* Home - Desktop only */}
                <Link
                    href="/"
                    className="hidden lg:flex group items-center gap-2.5 px-6 py-3 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-xl shadow-black/5 border border-gray-100/50 dark:border-white/10 hover:scale-105 transition-all duration-300 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                >
                    <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Menu principal</span>
                </Link>

                {/* Hamburger - Mobile only */}
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="lg:hidden flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-xl shadow-black/5 border border-gray-100/50 dark:border-white/10 hover:scale-105 transition-all duration-300"
                    aria-label="Ouvrir le menu"
                >
                    <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-[200] bg-white dark:bg-zinc-900 shadow-2xl border-l border-gray-200 dark:border-white/10"
                        >
                            <div className="flex flex-col h-full p-8">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-12">
                                    <div className="flex items-center gap-3">
                                        <Image src="/wafia-logo.png" alt="Wafia" width={32} height={32} className="h-8 w-auto dark:invert dark:brightness-200" />
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">Brands</span>
                                    </div>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-11 h-11 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center transition-colors"
                                        aria-label="Fermer le menu"
                                    >
                                        <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                    </button>
                                </div>

                                {/* Navigation links */}
                                <nav className="flex-1 space-y-2">
                                    {BRAND_NAVIGATION.map((item, index) => (
                                        <motion.a
                                            key={item.label}
                                            href={item.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center justify-between py-4 px-4 rounded-2xl text-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                                        >
                                            <span>{item.label}</span>
                                            <ArrowRight className="h-5 w-5 text-gray-400 dark:text-white/40 group-hover:text-orange-500 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                                        </motion.a>
                                    ))}

                                    {/* Home link */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: BRAND_NAVIGATION.length * 0.1 }}
                                    >
                                        <Link
                                            href="/"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center justify-between py-4 px-4 rounded-2xl text-lg font-semibold text-gray-500 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Home className="h-5 w-5" />
                                                <span>Menu principal</span>
                                            </div>
                                            <ArrowRight className="h-5 w-5 text-gray-400 dark:text-white/40 group-hover:text-orange-500 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    </motion.div>
                                </nav>

                                {/* CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="pt-8 border-t border-gray-200 dark:border-white/10"
                                >
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false)
                                            onEstimateClick()
                                        }}
                                        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
                                    >
                                        Estimer mon plan
                                        <ArrowRight className="h-5 w-5" />
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
