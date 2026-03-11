"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
    Users,
    Activity,
    Zap,
    AlertCircle,
    CheckCircle2,
    ArrowUpRight,
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/common/SectionHeading"
import { cn } from "@/lib/utils"
import { useRevealViewport } from "@/hooks/useRevealViewport"



const CASE_STUDIES = [
    {
        id: "basic-fit",
        title: "Basic Fit",
        subtitle: "Campagne Influence • Fitness & Lifestyle",
        description: "Activation 360° (casting → production → ops → reporting) menée avec 10 créateurs pour déclencher une vague de contenus massive et ultra engageante.",
        image: "/basic_fit_campaign.png",
        category: "Fitness",
        tags: ["Instagram / TikTok", "Créateurs", "100% Organique"],
        results: [
            { label: "Vues Organiques", value: "6M" },
            { label: "Taux d'Engagement", value: "21,44%" },
            { label: "Créateurs Activés", value: "10" },
        ],
        badge: "Campagne Influence",
        highlight: "Market-flood + contenus lifestyle & cinématiques pour maximiser la portée et la shareability.",
        gradient: "from-orange-500/20 to-orange-600/5",
        logo: "/logos/official/basic-fit-light.png"
    },
    {
        id: "cj-group",
        title: "CJ Group — Korea House",
        subtitle: "Activation Créateurs • La Maison de la Chimie • JO Paris 2024",
        description: "Orchestration d'une activation créateurs sur place pour connecter CJ à la culture coréenne de façon naturelle (vlog / découverte / storytelling).",
        image: "/korea_house_paris_2024.png",
        category: "Événement",
        tags: ["TikTok", "Instagram", "IRL Activation"],
        results: [
            { label: "Impressions", value: "11M" },
            { label: "Créateurs Activés", value: "67" },
            { label: "Contenus Créés", value: "+150" },
        ],
        badge: "Événement — Activation IRL",
        highlight: "Tournages prévus autour de Besides Kimchi (Paris 4) + gestion des contraintes terrain liées à l'ouverture des JO.",
        gradient: "from-blue-500/20 to-indigo-600/5",
        logo: "/logos/cj-logo.svg"
    },
    {
        id: "equip-auto",
        title: "Salon de l'Auto — 50e édition",
        subtitle: "Couverture Média & Content Factory • Paris Expo",
        description: "Dispositif 'Média + Campagne' pour couvrir les innovations du salon en temps réel : 4 jours de live, interviews, et contenus snackable.",
        image: "/equip_auto_paris.png",
        category: "Salon Pro",
        tags: ["B2B / Grand Public", "Content Factory", "Live Coverage"],
        results: [
            { label: "Créateurs / Journalistes", value: "23" },
            { label: "Contenus Produits", value: "+100" },
            { label: "Jours de Live", value: "4" },
        ],
        badge: "Couverture Média",
        highlight: "Une approche 'Newsroom' pour transformer un salon B2B en événement incontournable sur les réseaux sociaux.",
        gradient: "from-red-500/20 to-rose-600/5",
        logo: null
    }
]

export function CaseStudiesSection() {
    const { disableMotion, viewport, transitionDuration, clampDelay } = useRevealViewport()

    return (
        <section className="py-20 md:py-28 px-4 relative overflow-hidden">
            <Container className="relative z-10">
                <div className="max-w-[1200px] mx-auto">
                    <SectionHeading
                        title={
                            <>
                                Sachez exactement où va{" "}
                                <span className="text-gradient-brand">chaque euro.</span>
                            </>
                        }
                        subtitle="Fini les rapports PDF reçus 3 semaines en retard. Vous voyez tout, en direct."
                        className="mb-20 text-center"
                    />

                    {/* DASHBOARD VISUALIZATION HERO */}
                    <div className="mb-24 relative">
                        {/* Glass Container */}
                        <motion.div
                            initial={disableMotion ? false : { opacity: 0, y: 40 }}
                            whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={disableMotion ? undefined : viewport}
                            transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.46) }}
                            className="relative rounded-3xl overflow-hidden border border-white/10 dark:border-white/5 bg-neutral-900/80 backdrop-blur-xl shadow-2xl shadow-orange-900/20"
                        >
                            {/* Dashboard Header */}
                            <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-b border-white/5 bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Live Campaign</span>
                                    </div>
                                    <div className="h-4 w-px bg-white/10" />
                                    <span className="text-sm font-medium text-white/60">J+4 / 14</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                        <AlertCircle className="w-4 h-4 text-white/60" />
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 p-[1px]">
                                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                            <span className="text-xs font-bold text-white">W</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline Bar */}
                            <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-white/5 bg-black/20">
                                <div className="relative flex justify-between items-start">
                                    {/* Progress Line Background */}
                                    <div className="absolute top-2 left-0 w-full h-0.5 bg-white/5 z-0" />
                                    {/* Active Progress Line */}
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "65%" }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                        className="absolute top-2 left-0 h-0.5 bg-orange-500 z-0 shadow-[0_0_10px_rgba(249,115,22,0.4)]"
                                    />

                                    {[
                                        { label: "Audit & Strat", status: "done" },
                                        { label: "Casting", status: "done" },
                                        { label: "Production", status: "done" },
                                        { label: "Live Report", status: "active" },
                                        { label: "Bilan & ROAS", status: "pending" }
                                    ].map((step, i) => (
                                        <div key={i} className="relative z-10 flex flex-col items-center gap-2 sm:gap-3">
                                            <div className={cn(
                                                "w-4 h-4 rounded-full border-2 transition-colors duration-500 flex items-center justify-center shrink-0",
                                                step.status === "done" ? "border-orange-500 bg-orange-500" :
                                                    step.status === "active" ? "border-orange-500 bg-neutral-900 shadow-[0_0_0_3px_rgba(249,115,22,0.2)]" :
                                                        "border-white/20 bg-neutral-900"
                                            )}>
                                                {step.status === "done" && <CheckCircle2 className="w-3 h-3 text-white" />}
                                                {step.status === "active" && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />}
                                            </div>
                                            <span className={cn(
                                                "text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 text-center max-w-[56px] sm:max-w-none leading-tight",
                                                step.status === "pending" ? "text-white/30" : "text-white/80"
                                            )}>
                                                {step.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main Metrics Area */}
                            <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                {/* Metric 1 */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-white/50 text-xs font-bold uppercase tracking-wider">
                                        <span>Total Reach</span>
                                        <Users className="w-4 h-4" />
                                    </div>
                                    <div className="flex items-end gap-3">
                                        <motion.span
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-5xl font-bold text-white tracking-tight"
                                        >
                                            2.4M
                                        </motion.span>
                                        <div className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-bold mb-1 flex items-center gap-1">
                                            <ArrowUpRight className="w-3 h-3" />
                                            +15%
                                        </div>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "85%" }}
                                            transition={{ duration: 1, delay: 0.4 }}
                                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Metric 2 */}
                                <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                                    <div className="flex items-center justify-between text-white/50 text-xs font-bold uppercase tracking-wider">
                                        <span>Engagement</span>
                                        <Activity className="w-4 h-4" />
                                    </div>
                                    <div className="flex items-end gap-3">
                                        <motion.span
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-5xl font-bold text-white tracking-tight"
                                        >
                                            8.2%
                                        </motion.span>
                                        <div className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-bold mb-1 flex items-center gap-1">
                                            <ArrowUpRight className="w-3 h-3" />
                                            +0.4%
                                        </div>
                                    </div>
                                    {/* Mini Sparkline Visualization */}
                                    <div className="h-8 flex items-end gap-1 opacity-50">
                                        {[40, 60, 45, 70, 50, 80, 65, 90, 75, 100].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${h}%` }}
                                                transition={{ duration: 0.5, delay: 0.5 + (i * 0.05) }}
                                                className="w-full bg-white rounded-t-sm"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Metric 3 */}
                                <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                                    <div className="flex items-center justify-between text-white/50 text-xs font-bold uppercase tracking-wider">
                                        <span>Saves (High Intent)</span>
                                        <Zap className="w-4 h-4" />
                                    </div>
                                    <div className="flex items-end gap-3">
                                        <motion.span
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-5xl font-bold text-white tracking-tight"
                                        >
                                            12.5K
                                        </motion.span>
                                        <div className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-bold mb-1 flex items-center gap-1">
                                            <ArrowUpRight className="w-3 h-3" />
                                            +12%
                                        </div>
                                    </div>
                                    <p className="text-xs text-white/40 leading-snug">
                                        Les "saves" indiquent une intention d&apos;achat 3x supérieure aux likes simples.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>



                    <SectionHeading
                        title={
                            <>
                                Ce qu&apos;on a <span className="text-gradient-brand">déjà fait.</span>
                            </>
                        }
                        subtitle="Quelques exemples de campagnes réussies."
                        className="mb-16 text-center scroll-mt-32"
                        id="case-studies"
                    />

                    {/* RESTORED CASES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
                        {CASE_STUDIES.map((study, i) => (
                            <motion.div
                                key={study.id}
                                initial={disableMotion ? false : { opacity: 0, y: 30 }}
                                whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                                viewport={disableMotion ? undefined : viewport}
                                transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.42), delay: clampDelay(i * 0.12) }}
                                className="group cursor-pointer w-full"
                            >
                                <div className="h-full bg-white dark:bg-zinc-900 rounded-[28px] overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                                    {/* Image Container */}
                                    <div className="relative h-48 sm:h-64 overflow-hidden shrink-0">
                                        <Image
                                            src={study.image}
                                            alt={study.title}
                                            fill
                                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-t ${study.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${study.gradient} shadow-lg`}>
                                                {study.category}
                                            </span>
                                        </div>

                                        {/* Brand Logo */}
                                        {study.logo && (
                                            <div className="absolute top-4 right-4 z-20 h-8 w-24">
                                                <Image
                                                    src={study.logo}
                                                    alt={`${study.title} logo`}
                                                    fill
                                                    className="object-contain drop-shadow-lg"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 sm:p-8 flex flex-col grow">
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {study.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-1 bg-gray-50 dark:bg-zinc-800/50 rounded-md text-[10px] uppercase font-bold tracking-wide text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-zinc-700/50"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Title & Description */}
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            {study.title}
                                        </h3>
                                        <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mb-4 uppercase tracking-wide">
                                            {study.subtitle}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 line-clamp-3">
                                            {study.description}
                                        </p>

                                        {/* Highlight */}
                                        <div className="mt-auto">
                                            <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/20 mb-8 min-h-[80px] flex items-center">
                                                <p className="text-xs font-medium text-orange-800 dark:text-orange-200 italic line-clamp-3">
                                                    &quot;{study.highlight}&quot;
                                                </p>
                                            </div>

                                            {/* Results */}
                                            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-gray-100 dark:border-zinc-800">
                                                {study.results.map((result, j) => (
                                                    <div key={j} className="text-center">
                                                        <div className="text-lg font-bold text-orange-500 dark:text-orange-400 mb-1">
                                                            {result.value}
                                                        </div>
                                                        <div className="text-[9px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider truncate">
                                                            {result.label}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}
