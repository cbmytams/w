"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Users, Play, TrendingUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BRAND_HERO_CONTENT } from "@/constants/brand-additions"
import {
    MainPerformanceModule,
    TalentStreamModule,
    ContentReactorModule
} from "./HeroWidgets"

// Stat icons mapping
const STAT_ICONS = {
    orange: Users,
    blue: Play,
    green: TrendingUp
} as const

export function BrandHeroV2() {
    return (
        <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">

                    {/* LEFT COLUMN: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl z-20 relative"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-rose-100 dark:from-orange-900/30 dark:to-rose-900/30 text-orange-600 dark:text-orange-400 text-sm font-bold mb-8 border border-orange-200 dark:border-orange-800/50">
                            <Sparkles className="w-4 h-4" />
                            {BRAND_HERO_CONTENT.badge}
                        </div>

                        {/* Headline */}
                        <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
                            {BRAND_HERO_CONTENT.title.line1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">
                                {BRAND_HERO_CONTENT.title.highlight}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-medium">
                            {BRAND_HERO_CONTENT.subtitle}
                        </p>

                        {/* Stats Row — always 3 columns */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-10">
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
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                        className="text-center p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm border border-gray-100 dark:border-zinc-800"
                                    >
                                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl mx-auto mb-1.5 sm:mb-2 flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                                            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>
                                        <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                                        <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-row gap-3">
                            <Button
                                asChild
                                className="rounded-full bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-semibold px-5 sm:px-8 h-11 sm:h-14 shadow-lg shadow-orange-500/20 text-sm sm:text-base transition-all hover:scale-105"
                            >
                                <Link href={BRAND_HERO_CONTENT.cta.primary.href}>
                                    {BRAND_HERO_CONTENT.cta.primary.text}
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="rounded-full border-2 border-gray-300 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-600 px-5 sm:px-8 h-11 sm:h-14 font-semibold text-sm sm:text-base"
                            >
                                <Link href={BRAND_HERO_CONTENT.cta.secondary.href}>
                                    {BRAND_HERO_CONTENT.cta.secondary.text}
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: The Command Center Stack */}
                    <div className="hidden lg:block relative h-[600px] w-full perspective-1000">
                        {/* 
                            GRID COMPOSITION 
                            We use a 12-column grid in a fixed container to orchestrate the density.
                        */}
                        <div className="absolute top-[10%] right-[0%] w-[120%] h-[80%] grid grid-cols-12 grid-rows-6 gap-4 p-4 transform -rotate-y-12 rotate-x-6 scale-90 translate-x-12">

                            {/* 1. Main Performance Module (Big, Center-Left) */}
                            <div className="col-span-8 row-span-4 z-10">
                                <MainPerformanceModule />
                            </div>

                            {/* 2. Talent Stream (Mid-Right) */}
                            <div className="col-span-2 row-span-3 z-30 -ml-12 mt-4 h-[120%]">
                                <TalentStreamModule />
                            </div>

                            {/* 4. Content Reactor (Bottom-Left, Titled) */}
                            <div className="col-span-4 row-span-2 z-40 -mt-12 ml-8 absolute bottom-0 left-0">
                                <ContentReactorModule />
                            </div>

                            {/* Decorative Elements */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="absolute -top-10 -right-10 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="absolute bottom-0 left-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
