"use client"

import { useState, type CSSProperties } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Music, Clapperboard, Smartphone } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_PERSONA, BRAND_GRADIENT } from "@/constants"
import { ParallaxCard } from "./redesign/ParallaxCard"
import { WafiaOSWidget } from "./redesign/WafiaOSWidget"
import { SmartDistributionDashboard } from "./distribution/SmartDistributionDashboard"
import { useReducedMotion } from "@/hooks/useReducedMotion"

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
        // Nouvelle version : LE SCRIPT & L'OFFRE (Statutaire, Acteur Pro)
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
                    className="relative w-64 aspect-[3/4] bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100"
                >
                    {/* Script Content */}
                    <div className="p-6 font-mono text-xs text-gray-800 leading-relaxed opacity-80">
                        <div className="w-full h-2 bg-gray-200 rounded mb-6 opacity-30" />
                        <p className="mb-4 font-bold tracking-widest uppercase text-gray-400">SCENE 24A - INT. STUDIO</p>

                        <p className="mb-2"><span className="font-bold">AGENT</span></p>
                        <p className="mb-4">C'est le rôle de ta vie. Ils te veulent toi.</p>

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

                    {/* Paper grain/texture overlay */}
                    <div className="absolute inset-0 bg-yellow-50/20 mix-blend-multiply pointer-events-none" />
                </motion.div>

                {/* Notification Badge: ROLE CONFIRMED */}
                <motion.div
                    initial={{ y: 40, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute bottom-10 flex items-center gap-3 px-5 py-3 bg-gray-900/95 backdrop-blur-md text-white rounded-xl shadow-xl border border-white/10"
                >
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Casting Update</div>
                        <div className="text-sm font-bold">Rôle Confirmé — Long Métrage</div>
                    </div>
                </motion.div>
            </div>
        )
    }

    // Creator - Wafia OS Dashboard Preview
    return <WafiaOSWidget />
}

export function PersonaSection() {
    const [activeTab, setActiveTab] = useState<PersonaType>("artist")
    const content = TALENT_PERSONA[activeTab]
    const IconComponent = iconMap[content.icon as keyof typeof iconMap]

    return (
        <section className="section-spacing px-4 bg-transparent">
            <Container>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <RevealAnimation className="text-center mb-16">
                        <span className="text-sm font-semibold text-pink-600 dark:text-pink-300 uppercase tracking-wider mb-4 block">
                            Ton profil
                        </span>
                        <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white">
                            Chaque terrain a ses règles.
                        </h2>
                    </RevealAnimation>

                    {/* Tabs */}
                    <RevealAnimation delay={0.1} className="flex justify-center mb-12">
                        <div className="inline-flex bg-white dark:bg-white/5 p-1.5 rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 backdrop-blur-2xl">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab.key
                                        ? "text-white"
                                        : "text-gray-500 hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
                                        }`}
                                >
                                    {activeTab === tab.key && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className={`absolute inset-0 bg-gradient-to-r ${BRAND_GRADIENT} rounded-xl shadow-lg`}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </RevealAnimation>

                    {/* Content */}
                    <RevealAnimation delay={0.2}>
                        <div className="relative rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-2xl overflow-hidden shadow-[0_28px_70px_rgba(0,0,0,0.2)] dark:shadow-[0_28px_70px_rgba(0,0,0,0.45)]">
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
                                        <div className="w-16 h-16 rounded-2xl bg-white/80 dark:bg-white/10 shadow-lg border border-gray-200/60 dark:border-white/15 flex items-center justify-center text-gray-900 dark:text-white">
                                            <IconComponent size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                                {content.title}
                                            </h3>
                                            <p className="text-lg font-medium text-pink-600 dark:text-pink-300">
                                                {content.subtitle}
                                            </p>
                                        </div>
                                        <p className="text-gray-600 dark:text-white/70 text-lg leading-relaxed">
                                            {content.desc}
                                        </p>

                                        <div className="space-y-3 pt-4">
                                            {content.points.map((point, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center border border-pink-200 dark:border-pink-500/30">
                                                        <Check size={14} className="text-pink-600 dark:text-pink-300" />
                                                    </div>
                                                    <span className="font-medium text-gray-700 dark:text-white/80">{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Right: Dynamic Visual with ParallaxCard */}
                                <ParallaxCard className="h-[560px] lg:h-[600px] bg-white overflow-hidden border border-gray-200/60 dark:border-white/10 shadow-[0_30px_80px_rgba(15,23,42,0.25)] dark:shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
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
            </Container>
        </section>
    )
}
