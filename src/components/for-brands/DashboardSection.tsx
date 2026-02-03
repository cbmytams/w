"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { SectionHeading } from "@/components/common/SectionHeading"
import {
    DASHBOARD_FEATURES,
    DASHBOARD_TABS,
    MOCK_CREATORS,
    MOCK_CAMPAIGN_HISTORY,
    type DashboardTabId
} from "@/constants/features"

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
                                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                    où va chaque euro.
                                </span>
                            </>
                        }
                        subtitle="Fini les rapports PDF reçus 3 semaines en retard. Vous voyez tout, en direct."
                    />

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Tabs + Mockup */}
                        <RevealAnimation delay={0.2}>
                            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/5 overflow-hidden ring-1 ring-gray-900/5">
                                {/* Tabs */}
                                <div className="flex border-b border-gray-200 bg-gray-50">
                                    {DASHBOARD_TABS.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as DashboardTabId)}
                                            className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === tab.id
                                                ? "text-orange-600 bg-white border-b-2 border-orange-600"
                                                : "text-gray-600 hover:text-gray-900"
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Mockup Content */}
                                <div className="p-8 bg-gradient-to-br from-gray-50 to-white min-h-[400px]">
                                    <AnimatePresence mode="wait">
                                        {activeTab === "campaign" && (
                                            <motion.div
                                                key="campaign"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-4"
                                            >
                                                <div className="card-base">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <p className="text-sm text-gray-500 font-medium">Total Reach</p>
                                                            <p className="text-4xl font-bold text-gray-900">2.4M</p>
                                                        </div>
                                                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                                            +15% vs benchmark
                                                        </div>
                                                    </div>
                                                    <div className="h-32 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-end p-4 gap-2">
                                                        {[40, 65, 45, 80, 70, 90, 75].map((h, i) => (
                                                            <div key={i} className="flex-1 bg-gradient-to-t from-orange-500 to-red-500 rounded-t" style={{ height: `${h}%` }} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                                        <p className="text-xs text-gray-500">Engagement Rate</p>
                                                        <p className="text-2xl font-bold text-gray-900">8.2%</p>
                                                    </div>
                                                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                                        <p className="text-xs text-gray-500">Saves</p>
                                                        <p className="text-2xl font-bold text-gray-900">12.5K</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {activeTab === "creators" && (
                                            <motion.div
                                                key="creators"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-3"
                                            >
                                                {MOCK_CREATORS.map((creator, i) => (
                                                    <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-400" />
                                                            <div>
                                                                <p className="font-semibold text-gray-900">{creator.name}</p>
                                                                <p className="text-xs text-gray-500">{creator.reach} reach</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-bold text-gray-900">{creator.eng}</p>
                                                            <p className="text-xs text-gray-500">Engagement</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}

                                        {activeTab === "history" && (
                                            <motion.div
                                                key="history"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-4"
                                            >
                                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                                    <p className="text-sm text-gray-500 mb-4">Évolution Campagnes</p>
                                                    <div className="space-y-3">
                                                        {MOCK_CAMPAIGN_HISTORY.map((camp, i) => (
                                                            <div key={i}>
                                                                <div className="flex justify-between text-sm mb-1">
                                                                    <span className="text-gray-700">{camp.name}</span>
                                                                    <span className="font-semibold text-gray-900">{camp.score}/100</span>
                                                                </div>
                                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                                                                        style={{ width: `${camp.score}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </RevealAnimation>

                        {/* Features à droite */}
                        <RevealAnimation delay={0.4}>
                            <div className="space-y-6">
                                {DASHBOARD_FEATURES.map((feature, i) => (
                                    <div key={i} className="flex gap-4 items-start group">
                                        <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <feature.icon className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                                            <p className="text-gray-600">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}

                                <Button size="lg" asChild className="w-full h-12 rounded-full bg-gray-900 hover:bg-black text-white font-semibold mt-8">
                                    <Link href="/contact?type=brand">
                                        Réserver une démo <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>
                        </RevealAnimation>
                    </div>
                </div>
            </Container>
        </section>
    )
}
