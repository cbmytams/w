"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Home } from "lucide-react"

/**
 * Floating Navigation for Agencies page
 * Minimal & Clean design matching the brand style
 */
export function AgenciesFloatingNavigation() {
    return (
        <>
            {/* Left - Logo */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                className="fixed top-8 left-8 z-[100]"
            >
                <Link
                    href="/for-agencies"
                    className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-2xl shadow-xl shadow-black/5 border border-gray-100/50 hover:scale-105 transition-all duration-300"
                >
                    <Image src="/wafia-logo.png" alt="Wafia" width={24} height={24} className="h-6 w-auto" />
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Agencies</span>
                    </div>
                </Link>
            </motion.div>

            {/* Right - Main Menu */}
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
