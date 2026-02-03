"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BRAND_NAVIGATION } from "@/constants"

interface FloatingNavigationProps {
    onEstimateClick: () => void
}

export function FloatingNavigation({ onEstimateClick }: FloatingNavigationProps) {
    return (
        <>
            {/* 1. Left - Logo (Minimal & Clean) */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                className="fixed top-8 left-8 z-[100]"
            >
                <Link
                    href="/for-brands"
                    className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-2xl shadow-xl shadow-black/5 border border-gray-100/50 hover:scale-105 transition-all duration-300"
                >
                    <Image src="/wafia-logo.png" alt="Wafia" width={24} height={24} className="h-6 w-auto" />
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Brands</span>
                    </div>
                </Link>
            </motion.div>

            {/* 2. Center - Navigation Pill (Premium) */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
                className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] hidden lg:block"
            >
                <div className="bg-white/80 backdrop-blur-2xl rounded-2xl px-6 py-3 shadow-xl shadow-black/5 border border-gray-100/50">
                    <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
                        {BRAND_NAVIGATION.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="hover:text-black transition-colors duration-200 hover:scale-105 transform"
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="w-px h-5 bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
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

            {/* 3. Right - Main Menu (Clean & Minimal) */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                className="fixed top-8 right-8 z-[100]"
            >
                <Link
                    href="/"
                    className="group flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-2xl shadow-xl shadow-black/5 border border-gray-100/50 hover:scale-105 transition-all duration-300 text-sm font-semibold text-gray-600 hover:text-black"
                >
                    <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Menu principal</span>
                </Link>
            </motion.div>
        </>
    )
}
