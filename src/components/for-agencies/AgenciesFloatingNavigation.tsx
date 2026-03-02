"use client"

import Link from "next/link"
import { WafiaLogo } from "@/components/ui/WafiaLogo"
import { motion } from "framer-motion"
import { Home } from "lucide-react"
import { EASING, DURATION } from "@/lib/easing"

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
                transition={{ duration: DURATION.slow, ease: EASING.entrance }}
                className="fixed top-4 left-4 sm:top-8 sm:left-8 z-[100]"
            >
                <Link
                    href="/for-agencies"
                    className="h-12 group flex items-center px-5 rounded-full bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 hover:scale-105 hover:bg-white/50 dark:hover:bg-[#1C1C1E]/80 transition-all duration-300"
                >
                    <WafiaLogo className="h-4 w-auto text-black dark:text-white" />
                    <div className="flex items-center justify-center w-6 z-10 mx-1">
                        <div className="w-[5px] h-[5px] rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                    </div>
                    <span className="text-[12px] font-bold text-gray-900 dark:text-white uppercase tracking-wider leading-none mb-[1px]">AGENCIES</span>
                </Link>
            </motion.div>

            {/* Right - Main Menu */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: DURATION.slow, ease: EASING.entrance }}
                className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[100]"
            >
                <Link
                    href="/"
                    className="h-12 group flex items-center gap-2.5 px-6 rounded-full bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 hover:scale-105 hover:bg-white/50 dark:hover:bg-[#1C1C1E]/80 transition-all duration-300 text-[13px] font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                >
                    <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Menu principal</span>
                </Link>
            </motion.div>
        </>
    )
}
