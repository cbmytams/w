"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Users, Play, TrendingUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { BRAND_HERO_CONTENT } from "@/constants/brand-additions"

// Stat icons mapping
const STAT_ICONS = {
    orange: Users,
    blue: Play,
    green: TrendingUp
} as const

export function BrandHeroV2() {
    const prefersReducedMotion = useReducedMotion()

    // Animation conditionnelle
    const floatingAnimation = prefersReducedMotion ? {} : { y: [0, -8, 0] }

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

                    {/* LEFT COLUMN: Content */}
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-rose-100 dark:from-orange-900/30 dark:to-rose-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-8">
                            <Sparkles className="w-4 h-4" />
                            {BRAND_HERO_CONTENT.badge}
                        </div>

                        {/* Headline */}
                        <h1 className="font-heading text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1] mb-6">
                            {BRAND_HERO_CONTENT.title.line1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">
                                {BRAND_HERO_CONTENT.title.highlight}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-medium">
                            {BRAND_HERO_CONTENT.subtitle}
                        </p>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4 mb-10">
                            {BRAND_HERO_CONTENT.stats.map((stat, i) => {
                                const IconComponent = STAT_ICONS[stat.color as keyof typeof STAT_ICONS]
                                const colorClasses = {
                                    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
                                    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
                                    green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                }
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                        className="text-center p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm border border-gray-100 dark:border-zinc-800"
                                    >
                                        <div className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                asChild
                                className="rounded-full bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-semibold px-8 h-14 shadow-lg shadow-orange-500/20 text-base"
                            >
                                <Link href={BRAND_HERO_CONTENT.cta.primary.href}>
                                    {BRAND_HERO_CONTENT.cta.primary.text}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="rounded-full border-2 border-gray-300 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-600 px-8 h-14 font-semibold text-base"
                            >
                                <Link href={BRAND_HERO_CONTENT.cta.secondary.href}>
                                    {BRAND_HERO_CONTENT.cta.secondary.text}
                                </Link>
                            </Button>
                        </div>

                        {/* Timing note */}
                        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            {BRAND_HERO_CONTENT.timing}
                        </p>
                    </motion.div>

                    {/* RIGHT COLUMN: Visual Widgets */}
                    <div className="relative h-[550px] w-full hidden lg:block select-none">

                        {/* Main Dashboard Card */}
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-2xl rounded-[32px] shadow-2xl shadow-orange-500/10 p-6 border border-white/40 dark:border-white/5 z-10"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Performance</span>
                                <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-600 rounded-full text-xs font-bold">+47%</span>
                            </div>
                            {/* Graph */}
                            <div className="h-32 flex items-end gap-2 justify-between px-1">
                                {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                        className="w-full bg-gradient-to-t from-orange-500 to-rose-500 rounded-t-sm opacity-90"
                                    />
                                ))}
                            </div>
                            {/* Decor lines */}
                            <div className="mt-4 flex justify-between">
                                <div className="h-1 w-full bg-slate-100 dark:bg-zinc-700/50 rounded-full" />
                            </div>
                        </motion.div>

                        {/* Floating ROI Badge */}
                        <motion.div
                            animate={floatingAnimation}
                            transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 5, ease: "easeInOut" }}
                            className="absolute top-20 left-10 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl px-5 py-4 rounded-2xl shadow-xl shadow-green-500/10 border border-white/50 dark:border-white/10"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">ROI Généré</div>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">€2.4M</div>
                        </motion.div>

                        {/* Creators count badge */}
                        <motion.div
                            animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
                            transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                            className="absolute top-32 right-8 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50 dark:border-white/10"
                        >
                            <div className="flex -space-x-2 mb-2">
                                {[1, 2, 3, 4].map((_, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white dark:border-zinc-800 ring-1 ring-black/5" />
                                ))}
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-700 border-2 border-white dark:border-zinc-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-200">+8</div>
                            </div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">12 créateurs actifs</div>
                        </motion.div>

                        {/* Engagement rate badge */}
                        <motion.div
                            animate={prefersReducedMotion ? {} : { y: [0, -10, 0], x: [0, 5, 0] }}
                            transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
                            className="absolute bottom-24 right-20 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50 dark:border-white/10"
                        >
                            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Eng. Rate</div>
                            <div className="flex items-center gap-2">
                                <div className="text-3xl font-bold text-slate-900 dark:text-white">8.4%</div>
                                <TrendingUp className="w-4 h-4 text-green-500" />
                            </div>
                        </motion.div>

                        {/* Content preview */}
                        <motion.div
                            animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
                            transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
                            className="absolute bottom-32 left-0 bg-white p-2 rounded-3xl shadow-2xl rotate-[-6deg] max-w-[120px]"
                        >
                            <div className="bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl w-full h-32 overflow-hidden relative shadow-inner">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-2 left-2 right-2">
                                    <div className="text-white text-[10px] font-semibold flex items-center gap-1">
                                        <Play className="w-3 h-3 fill-white" /> 12.4K
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    )
}
