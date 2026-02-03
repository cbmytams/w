"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, FileVideo, BarChart3, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/common/SectionHeading"
import { Button } from "@/components/ui/button"

const TERMINAL_TABS = [
    {
        id: "creators",
        label: "Casting & Réseau",
        icon: Users,
        title: "L'Humain avant tout",
        desc: "Accès à une base de 15k+ talents audités. On ne vous propose que ceux qui matchent vos valeurs.",
        features: ["Audience vérifiée", "Historique de perfs", "Brand affinity score"]
    },
    {
        id: "content",
        label: "Assets Créatifs",
        icon: FileVideo,
        title: "Contenus Propriétaires",
        desc: "Chaque contenu produit vous appartient. Réutilisez-les en Ads, sur votre site, en newsletter.",
        features: ["Droits cédés 12 mois", "Formats natifs (UGC)", "Montages alternatifs"]
    },
    {
        id: "data",
        label: "Performance Live",
        icon: BarChart3,
        title: "Dashboard 24/7",
        desc: "Fini les PDFs statiques. Suivez vos KPIs en temps réel via votre espace dédié.",
        features: ["Tracking EMV/ROI", "Vues & Saves", " Analyse Sentiment"]
    },
    {
        id: "compliance",
        label: "Sécurité & Légal",
        icon: ShieldCheck,
        title: "Cadre Sécurisé",
        desc: "Zéro risque. Tout est carré : contrats, droits à l'image, mentions légales ARPP.",
        features: ["Contrats blindés", "Conformité ARPP", "Whitelisting Ads"]
    },
    {
        id: "strategy",
        label: "Learning",
        icon: Zap,
        title: "Playbook Stratégique",
        desc: "On ne fait pas juste une campagne. On construit votre patrimoine de connaissances influence.",
        features: ["Analyses post-mortem", "Roadmap trimestrielle", "Benchmarks sectoriels"]
    }
]

export function DeliverablesSectionV2() {
    const [activeTab, setActiveTab] = useState(TERMINAL_TABS[0])

    return (
        <section className="py-32 px-4">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <SectionHeading
                        title={
                            <>
                                Ce que vous{" "}
                                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">récupérez</span>
                            </>
                        }
                        subtitle="Plus qu'une campagne : des assets durables pour votre marque."
                        className="mb-16 md:text-center"
                    />

                    {/* THE ASSET TERMINAL */}
                    <div className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-gray-200/50 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 grid lg:grid-cols-12 min-h-[600px]">

                        {/* Sidebar (Master) */}
                        <div className="lg:col-span-4 bg-white/50 dark:bg-zinc-900/50 border-b lg:border-b-0 lg:border-r border-gray-200/50 dark:border-zinc-800 p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-4">
                                    Explorer les livrables
                                </h3>
                                <div className="space-y-2">
                                    {TERMINAL_TABS.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab)}
                                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 group ${activeTab.id === tab.id
                                                    ? "bg-white dark:bg-zinc-800 shadow-lg text-orange-600 dark:text-orange-400 scale-[1.02]"
                                                    : "hover:bg-white/50 dark:hover:bg-zinc-800/50 text-gray-600 dark:text-gray-400"
                                                }`}
                                        >
                                            <div className={`p-2 rounded-lg transition-colors ${activeTab.id === tab.id ? "bg-orange-100 dark:bg-orange-900/20" : "bg-gray-100 dark:bg-zinc-800 group-hover:bg-white"
                                                }`}>
                                                <tab.icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-sm">{tab.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Note */}
                            <div className="mt-8 px-4 py-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-800/30">
                                <p className="text-xs text-orange-800 dark:text-orange-200 font-medium leading-relaxed">
                                    💡 <span className="font-bold">Astuce:</span> Tous ces éléments sont centralisés dans votre espace client Notion/Wafia.
                                </p>
                            </div>
                        </div>

                        {/* Content Panel (Detail) */}
                        <div className="lg:col-span-8 p-8 lg:p-12 relative overflow-hidden flex flex-col justify-center">
                            {/* Decorative Background Glow for Panel */}
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-500/10 via-rose-500/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="h-full flex flex-col justify-center"
                                >
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 text-xs font-mono mb-8 w-fit">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        TERMINAL_VIEW : {activeTab.id.toUpperCase()}
                                    </div>

                                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                        {activeTab.title}
                                    </h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10 max-w-2xl">
                                        {activeTab.desc}
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-12">
                                        {activeTab.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/40 dark:bg-zinc-800/40 border border-white/50 dark:border-zinc-700/50">
                                                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                                                <span className="font-medium text-gray-800 dark:text-gray-200">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Visual Representation (Abstract) */}
                                    <div className="mt-auto pt-8 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center opacity-60">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-700 border-2 border-white dark:border-zinc-900" />
                                            ))}
                                        </div>
                                        <div className="text-xs font-mono text-gray-400">
                                            ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}
