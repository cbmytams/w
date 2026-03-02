"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, TrendingUp, PieChart, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { SectionHeading } from "@/components/common/SectionHeading"
import {
    TRACKING_FEATURES,
    MOCK_CREATORS,
    MOCK_CAMPAIGN_HISTORY,
    type DashboardTabId
} from "@/constants/features"

/**
 * Dashboard V2 - Live Report
 * Inclut une Timeline de campagne (5 étapes) et une UI SaaS Premium
 */

// Étapes du process (simplifiées pour la timeline)
const CAMPAIGN_STEPS = [
    { id: 1, label: "Audit & Strat", status: "completed" },
    { id: 2, label: "Casting", status: "completed" },
    { id: 3, label: "Production", status: "completed" },
    { id: 4, label: "Live Report", status: "active" }, // Active stage
    { id: 5, label: "Bilan & ROAS", status: "pending" }
]

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
                        className="mb-16"
                    />

                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        {/* LEFT: The Dashboard Mockup (Larger space) */}
                        <RevealAnimation delay={0.2} className="lg:col-span-7">
                            <div className="relative">
                                {/* Glass Container */}
                                <div className="bg-[#FDFBF7] dark:bg-zinc-900 rounded-[32px] shadow-2xl shadow-orange-500/5 border border-gray-100 dark:border-white/5 overflow-hidden p-6 sm:p-8">

                                    {/* 1. SaaS Header: Timeline & Status */}
                                    <div className="mb-8 p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700 shadow-sm">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="relative flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                </div>
                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Campaign</span>
                                            </div>
                                            <div className="text-xs font-medium text-gray-400">J+4 / 14</div>
                                        </div>

                                        {/* Campaign Timeline */}
                                        <div className="relative flex justify-between items-center">
                                            {/* Progress Bar Background */}
                                            <div className="absolute left-0 right-0 top-1.5 h-0.5 bg-gray-100 dark:bg-zinc-700 -z-10" />

                                            {/* Progress Bar Active (approximate width for step 4) */}
                                            <div className="absolute left-0 top-1.5 h-0.5 bg-green-500 -z-0 w-[75%]" />

                                            {CAMPAIGN_STEPS.map((step) => (
                                                <div key={step.id} className="flex flex-col items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full border-2 ${step.status === 'completed' ? 'bg-green-500 border-green-500' :
                                                        step.status === 'active' ? 'bg-white border-green-500 ring-2 ring-green-100 dark:ring-green-900' :
                                                            'bg-gray-100 dark:bg-zinc-700 border-gray-200 dark:border-zinc-600'
                                                        }`} />
                                                    <span className={`text-[9px] uppercase font-bold tracking-wider ${step.status === 'active' ? 'text-green-600 dark:text-green-400' :
                                                        step.status === 'completed' ? 'text-gray-500 dark:text-gray-400' :
                                                            'text-gray-300 dark:text-gray-600'
                                                        }`}>
                                                        {step.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 2. Navigation Tabs (SaaS style) */}
                                    <div className="flex justify-center mb-8">
                                        <div className="flex p-1 bg-gray-100 dark:bg-zinc-800 rounded-lg inline-flex">
                                            {TABS.map((tab) => (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveTab(tab.id as DashboardTabId)}
                                                    className="relative px-4 py-1.5 text-xs font-semibold rounded-md transition-colors z-10"
                                                >
                                                    {activeTab === tab.id ? (
                                                        <span className="text-orange-600 dark:text-orange-400 relative z-20">{tab.label}</span>
                                                    ) : (
                                                        <span className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 relative z-20">{tab.label}</span>
                                                    )}
                                                    {activeTab === tab.id && (
                                                        <motion.div
                                                            layoutId="activeTab"
                                                            className="absolute inset-0 bg-white dark:bg-zinc-700 rounded-md shadow-sm border border-gray-200 dark:border-zinc-600"
                                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                        />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 3. Main Content Area */}
                                    <div className="min-h-[400px]">
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

                        {/* RIGHT: Feature Grid & CTA (Smaller space) */}
                        <RevealAnimation delay={0.4} className="lg:col-span-5 h-full flex flex-col justify-center">
                            <div className="pl-0 lg:pl-10">
                                {/* Pro Feature Grid - Avant/Après Format */}
                                <div className="grid grid-cols-1 gap-5 mb-8">
                                    {TRACKING_FEATURES.map((feature) => (
                                        <div key={feature.id} className="group p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 hover:border-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5">
                                            {/* Header: Icon + Title + Badge */}
                                            <div className="flex items-center justify-between mb-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                                                        <feature.icon className="w-4 h-4" strokeWidth={2.5} />
                                                    </div>
                                                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white">{feature.title}</h3>
                                                </div>
                                                <span className="px-2.5 py-1 bg-gradient-to-r from-orange-500/10 to-rose-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                    {feature.badge}
                                                </span>
                                            </div>

                                            {/* Ailleurs (Competitors) */}
                                            <div className="mb-4">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                                    <X className="w-3 h-3 text-gray-300" />
                                                    Ailleurs
                                                </p>
                                                <ul className="space-y-1.5 pl-4">
                                                    {feature.elsewhere.map((item, j) => (
                                                        <li key={j} className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Wafia (Us) */}
                                            <div className="p-4 bg-gradient-to-br from-orange-50 to-rose-50/50 dark:from-orange-500/5 dark:to-rose-500/5 rounded-xl border border-orange-100/50 dark:border-orange-500/10">
                                                <p className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                                                    <Check className="w-3 h-3" strokeWidth={3} />
                                                    Wafia
                                                </p>
                                                <ul className="space-y-2">
                                                    {feature.wafia.map((item, j) => (
                                                        <li key={j} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                                                            <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" strokeWidth={3} />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
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

                                </div>
                            </div>
                        </RevealAnimation>
                    </div>
                </div>
            </Container>
        </section>
    )
}

// --- Sub-Components ---

function CampaignView() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
        >
            {/* Main Metric: Total Reach - SaaS Card Style */}
            <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 border border-gray-100 dark:border-zinc-700 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start mb-8 relative z-10">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Total Reach</p>
                        <h2 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter">2.4M</h2>
                    </div>
                    <div className="px-3 py-1.5 bg-green-50 border border-green-100 text-green-600 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400 rounded-full text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +15% vs target
                    </div>
                </div>

                {/* Professional Area Chart (Simulated with SVG) */}
                <div className="h-40 w-full relative z-10">
                    <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#F97316" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* Grid Lines */}
                        <line x1="0" y1="0" x2="100" y2="0" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="2 2" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="2 2" />
                        <line x1="0" y1="40" x2="100" y2="40" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="2 2" />

                        {/* The Line - Smoothed */}
                        <path
                            d="M0,40 C10,35 20,38 30,25 C40,15 50,20 60,10 C70,5 80,12 90,8 L100,5"
                            fill="none"
                            stroke="#F97316"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {/* The Fill */}
                        <path
                            d="M0,40 C10,35 20,38 30,25 C40,15 50,20 60,10 C70,5 80,12 90,8 L100,5 L100,40 L0,40 Z"
                            fill="url(#chartGradient)"
                        />
                    </svg>

                    {/* X-Axis Labels */}
                    <div className="flex justify-between text-[9px] font-medium text-gray-400 mt-2 uppercase">
                        <span>J1</span>
                        <span>J3</span>
                        <span>J5</span>
                        <span>J7</span>
                    </div>
                </div>
            </div>

            {/* Secondary KPIs */}
            <div className="grid grid-cols-2 gap-4">
                <KpiCard label="Engagement" value="8.2%" trend="+0.4%" data={[40, 35, 50, 45, 60, 55, 70]} color="orange" />
                <KpiCard label="Saves" value="12.5K" trend="+12%" data={[20, 30, 25, 40, 35, 50, 60]} color="orange" />
            </div>
        </motion.div>
    )
}

function KpiCard({ label, value, trend, data, color }: { label: string, value: string, trend: string, data: number[], color: "orange" | "blue" }) {
    return (
        <div className="bg-white dark:bg-zinc-800 rounded-2xl p-5 border border-gray-100 dark:border-zinc-700 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="relative z-10">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
                    <span className="text-xs font-semibold text-green-500">{trend}</span>
                </div>
            </div>
            {/* Sparkline Area */}
            <div className={`absolute bottom-0 right-0 w-24 h-16 opacity-10 group-hover:opacity-20 transition-opacity text-${color}-500`}>
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
                <div key={i} className="bg-white dark:bg-zinc-800 rounded-2xl p-4 border border-gray-100 dark:border-zinc-700 flex items-center justify-between hover:border-orange-200 dark:hover:border-orange-900 transition-colors group cursor-default shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-700 overflow-hidden relative border border-gray-200 dark:border-zinc-600">
                            {/* Placeholder Avatar Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-200 to-indigo-300' : 'from-orange-200 to-rose-300'}`} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white text-sm">{creator.name}</p>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{creator.reach} reach</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-1 justify-end text-gray-900 dark:text-white font-bold text-base">
                            {creator.eng}
                            <TrendingUp className="w-3 h-3 text-green-500" />
                        </div>
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">AVG. ENG.</p>
                    </div>
                </div>
            ))}
            <div className="mt-6 text-center">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-600 text-xs font-medium uppercase tracking-wider">
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
            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-gray-100 dark:border-zinc-700 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Performances Cumulées</p>
                    <PieChart className="w-4 h-4 text-gray-300" />
                </div>

                <div className="space-y-6">
                    {MOCK_CAMPAIGN_HISTORY.map((camp, i) => (
                        <div key={i} className="group">
                            <div className="flex justify-between text-xs mb-2">
                                <span className="font-semibold text-gray-700 dark:text-gray-200">{camp.name}</span>
                                <span className="font-mono font-bold text-gray-900 dark:text-white">{camp.score}/100</span>
                            </div>
                            <div className="h-2 bg-gray-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${camp.score}%` }}
                                    transition={{ duration: 1, delay: i * 0.2 }}
                                    className="h-full bg-slate-900 dark:bg-white rounded-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
