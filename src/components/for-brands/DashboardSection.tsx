"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, TrendingUp, PieChart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { SectionHeading } from "@/components/common/SectionHeading"
import {
    DASHBOARD_FEATURES,
    MOCK_CREATORS,
    MOCK_CAMPAIGN_HISTORY,
    type DashboardTabId
} from "@/constants/features"

const TABS = [
    { id: "campaign", label: "Vue campagne" },
    { id: "creators", label: "Vue créateurs" },
    { id: "history", label: "Historique" }
]

export function DashboardSection() {
    const [activeTab, setActiveTab] = useState<DashboardTabId>("campaign")

    return (
        <section id="dashboard" className="py-32 px-4">
            <Container>
                <div className="max-w-7xl mx-auto">
                    <SectionHeading
                        title={
                            <>
                                Sachez exactement{" "}
                                <span className="bg-gradient-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                                    où va chaque euro.
                                </span>
                            </>
                        }
                        subtitle="Fini les rapports PDF reçus 3 semaines en retard. Vous voyez tout, en direct."
                    />

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* LEFT: The Dashboard Mockup */}
                        <RevealAnimation delay={0.2}>
                            <div className="relative">
                                {/* Glass Container */}
                                <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl rounded-[32px] shadow-2xl shadow-orange-500/5 border border-white/40 dark:border-white/5 overflow-hidden p-6 sm:p-8">

                                    {/* Header & Tabs */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Report</span>
                                        </div>

                                        {/* Floating Segmented Control */}
                                        <div className="flex p-1 bg-slate-100/80 dark:bg-zinc-800/80 rounded-full backdrop-blur-sm self-start sm:self-auto">
                                            {TABS.map((tab) => (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveTab(tab.id as DashboardTabId)}
                                                    className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors z-10"
                                                >
                                                    {activeTab === tab.id ? (
                                                        <span className="text-orange-600 dark:text-orange-400 relative z-20">{tab.label}</span>
                                                    ) : (
                                                        <span className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 relative z-20">{tab.label}</span>
                                                    )}
                                                    {activeTab === tab.id && (
                                                        <motion.div
                                                            layoutId="activeTab"
                                                            className="absolute inset-0 bg-white dark:bg-zinc-700 rounded-full shadow-sm border border-black/5 dark:border-white/5"
                                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                        />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Main Content Area */}
                                    <div className="min-h-[420px]">
                                        <AnimatePresence mode="wait">
                                            {activeTab === "campaign" && (
                                                <CampaignView key="campaign" />
                                            )}
                                            {activeTab === "creators" && (
                                                <CreatorsView key="creators" />
                                            )}
                                            {activeTab === "history" && (
                                                <HistoryView key="history" />
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </RevealAnimation>

                        {/* RIGHT: Feature Grid */}
                        <RevealAnimation delay={0.4}>
                            <div className="pl-0 lg:pl-10 h-full flex flex-col justify-center">
                                {/* Pro Feature Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    {DASHBOARD_FEATURES.map((feature, i) => (
                                        <div key={i} className="group p-5 bg-slate-50 dark:bg-zinc-900/50 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="p-2 rounded-lg bg-orange-100/50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                                                    <feature.icon className="w-4 h-4" />
                                                </div>
                                                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">{feature.title}</h3>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="px-2">
                                    <Button size="lg" asChild className="w-full h-14 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-xl shadow-slate-900/10 dark:bg-white dark:text-black dark:hover:bg-slate-200 group transition-all">
                                        <Link href="/contact?type=brand">
                                            Demander une démo
                                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                    <p className="mt-4 text-sm text-slate-500 text-center flex items-center justify-center gap-2">
                                        <Sparkles className="w-4 h-4 text-orange-500" />
                                        Setup offert pour les 10 premières marques
                                    </p>
                                </div>
                            </div>
                        </RevealAnimation>
                    </div>
                </div>
            </Container>
        </section>
    )
}

// --- Sub-Components for Tab Views ---

function CampaignView() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
        >
            {/* Main Metric: Total Reach */}
            <div className="bg-white/50 dark:bg-zinc-800/50 rounded-3xl p-6 border border-white/60 dark:border-white/5 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Reach</p>
                        <h2 className="text-5xl font-bold text-slate-900 dark:text-white tracking-tight">2.4M</h2>
                    </div>
                    <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-full text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +15% vs target
                    </div>
                </div>

                {/* Professional Bar Chart */}
                <div className="h-40 flex items-end justify-between gap-2 px-2 relative">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
                        <div className="w-full h-px bg-slate-200 dark:bg-slate-700 border-dashed" />
                        <div className="w-full h-px bg-slate-200 dark:bg-slate-700 border-dashed" />
                        <div className="w-full h-px bg-slate-200 dark:bg-slate-700 border-dashed" />
                    </div>

                    {[45, 62, 55, 85, 70, 95, 80].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end group cursor-default relative z-10">
                            {/* Tooltip on hover */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                                {h * 10}k vues
                            </div>

                            {/* Bar Track */}
                            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-full absolute bottom-0 -z-10 scale-x-50 opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Active Bar */}
                            <div
                                className="w-full rounded-t-lg bg-gradient-to-t from-orange-500 to-rose-500 opacity-90 group-hover:opacity-100 transition-all group-hover:scale-y-105 origin-bottom"
                                style={{ height: `${h}%` }}
                            />
                            <div className="text-[10px] text-slate-400 text-center mt-2 group-hover:text-slate-600 transition-colors">
                                J{i + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Secondary KPIs with Sparklines */}
            <div className="grid grid-cols-2 gap-4">
                <KpiCard label="Engagement" value="8.2%" trend="+0.4%" data={[40, 35, 50, 45, 60, 55, 70]} />
                <KpiCard label="Saves" value="12.5K" trend="+12%" data={[20, 30, 25, 40, 35, 50, 60]} />
            </div>
        </motion.div>
    )
}

function KpiCard({ label, value, trend, data }: { label: string, value: string, trend: string, data: number[] }) {
    return (
        <div className="bg-white/50 dark:bg-zinc-800/50 rounded-2xl p-5 border border-white/60 dark:border-white/5 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{value}</span>
                    <span className="text-xs font-semibold text-green-500">{trend}</span>
                </div>
            </div>
            {/* Sparkline SVG */}
            <div className="absolute bottom-0 right-0 w-24 h-16 opacity-20 group-hover:opacity-40 transition-opacity text-orange-500">
                <svg viewBox="0 0 100 50" className="w-full h-full fill-current stroke-none">
                    <path d={`M0 50 L0 ${50 - data[0]} ${data.map((d, i) => `L${(i / (data.length - 1)) * 100} ${50 - d}`).join(' ')} L100 50 Z`} />
                </svg>
            </div>
        </div>
    )
}

function CreatorsView() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
        >
            {MOCK_CREATORS.map((creator, i) => (
                <div key={i} className="bg-white/50 dark:bg-zinc-800/50 rounded-2xl p-4 border border-white/60 dark:border-white/5 flex items-center justify-between hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-zinc-700 overflow-hidden relative border-2 border-white dark:border-zinc-600 shadow-lg">
                            {/* Placeholder Avatar Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-400 to-indigo-500' : 'from-rose-400 to-orange-500'}`} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">{creator.name}</p>
                            <p className="text-xs text-slate-500 font-medium">{creator.reach} reach</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-1 justify-end text-slate-900 dark:text-white font-bold text-lg">
                            {creator.eng}
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Taux d&apos;eng.</p>
                    </div>
                </div>
            ))}
            <div className="mt-4 text-center">
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-orange-600">
                    Voir les 8 autres créateurs
                </Button>
            </div>
        </motion.div>
    )
}

function HistoryView() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
        >
            <div className="bg-white/50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-white/60 dark:border-white/5">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Performances Cumulées</p>
                    <PieChart className="w-5 h-5 text-slate-300" />
                </div>

                <div className="space-y-5">
                    {MOCK_CAMPAIGN_HISTORY.map((camp, i) => (
                        <div key={i} className="group">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-semibold text-slate-700 dark:text-slate-200">{camp.name}</span>
                                <span className="font-mono font-bold text-slate-900 dark:text-white">{camp.score}/100</span>
                            </div>
                            <div className="h-2.5 bg-slate-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${camp.score}%` }}
                                    transition={{ duration: 1, delay: i * 0.2 }}
                                    className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.3)]"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
