"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Music, Clapperboard, Smartphone } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_PROBLEM, TALENT_PERSONA, BRAND_GRADIENT } from "@/constants"
import { EASING } from "@/lib/easing"
import { ParallaxCard } from "./redesign/ParallaxCard"
import { WafiaOSWidget } from "./redesign/WafiaOSWidget"
import { SmartDistributionDashboard } from "./distribution/SmartDistributionDashboard"
import { useRevealViewport } from "@/hooks/useRevealViewport"

type PersonaType = keyof typeof TALENT_PERSONA

const iconMap = {
    Music,
    Clapperboard,
    Smartphone
}

const tabs: { key: PersonaType; label: string }[] = [
    { key: "artist", label: "Musique" },
    { key: "comedian", label: "Fiction" },
    { key: "creator", label: "Créateur" }
]

// Composant visuel dynamique pour chaque persona
function PersonaVisual({ type }: { type: PersonaType }) {
    if (type === "artist") {
        return (
            <div className="w-full h-full relative overflow-hidden">
                <SmartDistributionDashboard />
            </div>
        )
    }
    if (type === "comedian") {
        return (
            <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-slate-900/5">
                {/* Cinematic Ambient Light */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

                {/* The Script Card */}
                <motion.div
                    initial={{ y: 20, rotateX: 10, opacity: 0 }}
                    animate={{ y: 0, rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-64 aspect-[3/4] bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-100"
                >
                    <div className="p-6 font-mono text-xs text-slate-800 leading-relaxed opacity-80">
                        <div className="w-full h-2 bg-slate-200 rounded mb-6 opacity-30" />
                        <p className="mb-4 font-bold tracking-widest uppercase text-slate-400">SCENE 24A - INT. STUDIO</p>
                        <p className="mb-2"><span className="font-bold">AGENT</span></p>
                        <p className="mb-4">C&apos;est le rôle de ta vie. Ils te veulent toi.</p>
                        <p className="mb-2"><span className="font-bold">TALENT</span></p>
                        <p className="mb-4 relative">
                            <span className="relative z-10">Je suis prêt. On signe quand ?</span>
                            <motion.span
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="absolute left-0 top-0 h-full bg-yellow-200/50 -z-0"
                            />
                        </p>
                    </div>
                    <div className="absolute inset-0 bg-yellow-50/20 mix-blend-multiply pointer-events-none" />
                </motion.div>

                {/* Notification Badge: ROLE CONFIRMED */}
                <motion.div
                    initial={{ y: 40, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute bottom-10 flex items-center gap-3 px-5 py-3 bg-slate-900/95 backdrop-blur-md text-white rounded-xl shadow-xl border border-white/10"
                >
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Casting Update</div>
                        <div className="text-sm font-bold">Rôle Confirmé — Long Métrage</div>
                    </div>
                </motion.div>
            </div>
        )
    }

    // Creator - Wafia OS Dashboard Preview
    return <WafiaOSWidget />
}

/**
 * PositionnementSection — Unified positioning section
 * 
 * Merges 3 former sections into a single cohesive narrative:
 * 1. Le Constat (from ProblemSection)
 * 2. Ton Profil (from PersonaSection — with interactive widgets)
 * 3. Pour Qui (from ForWhoSection)
 */
export function PositionnementSection() {
    const [activeTab, setActiveTab] = useState<PersonaType>("artist")
    const { disableMotion, viewport: revealViewport, transitionDuration, clampDelay } = useRevealViewport()
    const content = TALENT_PERSONA[activeTab]
    const IconComponent = iconMap[content.icon as keyof typeof iconMap]

    const titlePart1 = "Le talent démarre tout."
    const titlePart2 = "Le système décide de la suite."

    const painPoints = TALENT_PROBLEM.painTags

    return (
        <section id={TALENT_PROBLEM.id} className="py-24 md:py-32 px-4 relative overflow-hidden bg-transparent">
            <Container>
                <div className="max-w-6xl mx-auto space-y-28 md:space-y-36">

                    {/* ─── BLOC 1 : Le Constat ─── */}
                    <div>
                        {/* Title block */}
                        <motion.div
                            initial={disableMotion ? false : { opacity: 0, y: 40 }}
                            whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={disableMotion ? undefined : revealViewport}
                            transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.48), ease: EASING.entrance }}
                            className="mb-12 md:mb-16"
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-400 dark:text-white/40 mb-4 tracking-tight">
                                {titlePart1}
                            </h2>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                                <span className="relative">
                                    <span className="relative z-10 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                                        {titlePart2}
                                    </span>
                                    <motion.span
                                        initial={disableMotion ? false : { scaleX: 0 }}
                                        whileInView={disableMotion ? undefined : { scaleX: 1 }}
                                        viewport={disableMotion ? undefined : revealViewport}
                                        transition={disableMotion ? undefined : { delay: clampDelay(0.24), duration: Math.max(transitionDuration, 0.48), ease: EASING.entrance }}
                                        className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500 origin-left rounded-full"
                                    />
                                </span>
                            </h2>
                        </motion.div>

                        {/* Description + Pain Tags */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                            <motion.div
                                initial={disableMotion ? false : { opacity: 0, x: -30 }}
                                whileInView={disableMotion ? undefined : { opacity: 1, x: 0 }}
                                viewport={disableMotion ? undefined : revealViewport}
                                transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.44), delay: clampDelay(0.1) }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-white/40" />
                                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-white/40">
                                        Le constat
                                    </span>
                                </div>
                                <p className="text-lg sm:text-xl text-slate-600 dark:text-white/60 leading-relaxed mb-8">
                                    {TALENT_PROBLEM.description}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {painPoints.map((point, i) => (
                                        <motion.span
                                            key={point}
                                            initial={disableMotion ? false : { opacity: 0, scale: 0.8 }}
                                            whileInView={disableMotion ? undefined : { opacity: 1, scale: 1 }}
                                            viewport={disableMotion ? undefined : revealViewport}
                                            transition={disableMotion ? undefined : { delay: clampDelay(0.12 + i * 0.06), duration: transitionDuration }}
                                            className="px-4 py-2 rounded-full bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-white/70 font-medium backdrop-blur-sm shadow-sm"
                                        >
                                            {point}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Solution statement */}
                            <motion.div
                                initial={disableMotion ? false : { opacity: 0, x: 30 }}
                                whileInView={disableMotion ? undefined : { opacity: 1, x: 0 }}
                                viewport={disableMotion ? undefined : revealViewport}
                                transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.44), delay: clampDelay(0.18) }}
                                className="flex items-center"
                            >
                                <div className="relative p-8 sm:p-10 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-xl shadow-purple-500/5 overflow-hidden w-full">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full" />
                                    <div className="flex items-start gap-5">
                                        <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 items-center justify-center border border-violet-500/20">
                                            <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white leading-snug">
                                                On ne te &apos;signe&apos; pas pour t&apos;ajouter à une liste.
                                            </p>
                                            <p className="mt-3 text-xl sm:text-2xl font-semibold leading-snug">
                                                <span className="bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                                                    On te construit une structure.
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* ─── BLOC 2 : Ton Profil (Persona tabs — text only) ─── */}
                    <div>
                        <RevealAnimation className="text-center mb-12">
                            <span className="text-sm font-semibold text-pink-600 dark:text-pink-300 uppercase tracking-wider mb-4 block">
                                Ton profil
                            </span>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
                                Chaque terrain a ses règles.
                            </h2>
                        </RevealAnimation>

                        {/* Tabs */}
                        <RevealAnimation delay={0.1} className="flex justify-center mb-10">
                            <div className="inline-flex bg-white dark:bg-white/5 p-1.5 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 backdrop-blur-2xl">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`relative px-3 py-2 md:px-6 md:py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${activeTab === tab.key
                                            ? "text-white"
                                            : "text-slate-500 hover:text-slate-900 dark:text-white/70 dark:hover:text-white"
                                            }`}
                                    >
                                        {activeTab === tab.key && (
                                            <motion.div
                                                layoutId="positionTab"
                                                className={`absolute inset-0 bg-gradient-to-r ${BRAND_GRADIENT} rounded-xl shadow-lg`}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </RevealAnimation>

                        {/* Persona Content — with interactive visual widgets */}
                        <RevealAnimation delay={0.2}>
                            <div className="relative rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl dark:shadow-2xl">
                                <div className={`absolute inset-0 bg-gradient-to-br ${content.color} opacity-45 dark:opacity-70`} />
                                <div className="absolute inset-0 bg-[radial-gradient(600px_420px_at_10%_20%,rgba(236,72,153,0.12),transparent_60%)] dark:bg-[radial-gradient(600px_420px_at_10%_20%,rgba(236,72,153,0.18),transparent_60%)]" />

                                <div className="relative grid md:grid-cols-2 gap-12 items-center">
                                    {/* Left: Text */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div className="w-16 h-16 rounded-2xl bg-white/80 dark:bg-white/10 shadow-lg border border-slate-200/60 dark:border-white/15 flex items-center justify-center text-slate-900 dark:text-white">
                                                <IconComponent size={32} />
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                                    {content.title}
                                                </h3>
                                                <p className="text-lg font-medium text-pink-600 dark:text-pink-300">
                                                    {content.subtitle}
                                                </p>
                                            </div>
                                            <p className="text-slate-600 dark:text-white/70 text-lg leading-relaxed">
                                                {content.desc}
                                            </p>

                                            <div className="space-y-3 pt-4">
                                                {content.points.map((point, i) => (
                                                    <div key={i} className="flex items-center gap-3">
                                                        <div className="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center border border-pink-200 dark:border-pink-500/30">
                                                            <Check size={14} className="text-pink-600 dark:text-pink-300" />
                                                        </div>
                                                        <span className="font-medium text-slate-700 dark:text-white/80">{point}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Right: Dynamic Visual with ParallaxCard */}
                                    <ParallaxCard className="h-[560px] lg:h-[600px] bg-white overflow-hidden border border-slate-200/60 dark:border-white/10 shadow-2xl dark:shadow-2xl">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeTab}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.4 }}
                                                className="w-full h-full"
                                            >
                                                <PersonaVisual type={activeTab} />
                                            </motion.div>
                                        </AnimatePresence>
                                    </ParallaxCard>
                                </div>
                            </div>
                        </RevealAnimation>
                    </div>



                </div>
            </Container>
        </section>
    )
}
