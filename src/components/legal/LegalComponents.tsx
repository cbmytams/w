"use client"

import { motion, type Variants } from "framer-motion"
import { ReactNode } from "react"
import { EASING, DURATION } from "@/lib/easing"

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.normal, ease: EASING.smooth }
    }
}

export function LegalContainer({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-12"
        >
            {children}
        </motion.div>
    )
}

export function LegalHeader({ title, date, subtitle }: { title: string, date?: string, subtitle?: string }) {
    return (
        <motion.div variants={itemVariants} className="space-y-4 mb-16">
            <div className="flex items-center gap-3">
                <div className="h-px bg-slate-300 dark:bg-white/20 w-12"></div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Document Officiel
                </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
                {title}
            </h1>
            {subtitle && (
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-light">
                    {subtitle}
                </p>
            )}
            {date && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 mt-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        Dernière mise à jour : {date}
                    </span>
                </div>
            )}
        </motion.div>
    )
}

export function LegalSection({ title, children }: { title: string, children: ReactNode }) {
    return (
        <motion.section variants={itemVariants} className="group relative">
            <div className="absolute -left-4 md:-left-8 top-0 bottom-0 w-1 bg-slate-200 dark:bg-white/5 group-hover:bg-slate-900 dark:group-hover:bg-white transition-colors duration-300 rounded-full"></div>
            <div className="pl-6 md:pl-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    {title}
                </h2>
                <div className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 space-y-4">
                    {children}
                </div>
            </div>
        </motion.section>
    )
}

export function LegalGrid({ children }: { children: ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children}
        </div>
    )
}

export function LegalCard({ title, value, icon }: { title: string, value: ReactNode, icon?: ReactNode }) {
    return (
        <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="text-sm text-slate-500 dark:text-slate-400 font-mono mb-2 uppercase tracking-wider flex justify-between items-center">
                {title}
                {icon}
            </div>
            <div className="text-lg font-medium text-slate-900 dark:text-white">
                {value}
            </div>
        </div>
    )
}
