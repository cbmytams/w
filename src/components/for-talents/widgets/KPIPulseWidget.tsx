"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Activity, Radar, ArrowUpRight } from "lucide-react"

/**
 * KPI Pulse Widget (Premium Commercial Redesign)
 * Visualizes the shift from blindness to real-time strategic intelligence.
 * Features:
 * - "Mission Control" atmospheric background (Radar sweep)
 * - Ultra-sharp neon chart lines
 * - Live Pulse Heartbeat
 * - "Decision Intelligence" insights
 */
export function KPIPulseWidget() {
    const kpis = [
        {
            label: "Watch Time",
            value: "45%",
            trend: "up",
            status: "good",
            sparkline: [30, 35, 38, 42, 45, 43, 45],
            color: "text-green-400"
        },
        {
            label: "Retention",
            value: "62%",
            trend: "up",
            status: "good",
            sparkline: [50, 55, 58, 60, 62, 61, 62],
            color: "text-blue-400"
        },
        {
            label: "Shares",
            value: "850",
            trend: "up",
            status: "good",
            sparkline: [600, 650, 720, 800, 850, 820, 850],
            color: "text-purple-400"
        }
    ]

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group">
            {/* 1. ATMOSPHERE: Radar Sweep */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />

            {/* Radar Grid */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            />

            {/* Rotating Radar Effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(16,185,129,0.1)_60deg,transparent_120deg)] animate-[spin_4s_linear_infinite]" />
            </div>

            <div className="relative z-10 p-6 h-full flex flex-col">

                {/* 2. HEADER: Live Monitoring */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                        </div>
                        <span className="text-[10px] font-bold text-green-500 tracking-widest uppercase">Live Mission Control</span>
                    </div>
                    <Activity className="w-4 h-4 text-green-500/50" />
                </div>

                {/* 3. VISUAL COMPARISON (Blurry vs Sharp) */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* Before: Blindness */}
                    <div className="p-3 bg-red-500/5 rounded-xl border border-red-500/10 relative overflow-hidden">
                        <div className="absolute inset-0 backdrop-blur-[2px] bg-slate-900/50" />
                        <div className="relative z-10 text-center">
                            <div className="text-[10px] font-bold text-red-500 tracking-wider mb-1">AVANT</div>
                            <div className="text-xs text-slate-500">Vue brouillée</div>
                            <div className="h-4 w-12 mx-auto mt-2 bg-red-500/20 blur-sm rounded" />
                        </div>
                    </div>

                    {/* After: Clarity */}
                    <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 relative overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        <div className="text-center">
                            <div className="text-[10px] font-bold text-green-400 tracking-wider mb-1">AVEC WAFIA</div>
                            <div className="text-xs text-white">Ultra-Clarté</div>
                            <div className="flex justify-center gap-0.5 mt-2 h-4 items-end">
                                {[3, 5, 4, 7, 6, 8, 9].map((h, i) => (
                                    <div key={i} style={{ height: `${h * 10}%` }} className="w-1 bg-green-500 rounded-t-sm shadow-[0_0_5px_#22c55e]" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. KPI CARDS (Neon Data) */}
                <div className="flex-1 space-y-3">
                    {kpis.map((kpi, i) => (
                        <motion.div
                            key={kpi.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="bg-slate-800/50 rounded-lg p-3 border border-white/5 hover:bg-slate-800/80 transition-all group/card cursor-default"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                                <div className={`px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/5 border border-white/5 flex items-center gap-1 ${kpi.color}`}>
                                    <TrendingUp className="w-3 h-3" />
                                    {kpi.trend === "up" ? "+" : "-"}{Math.floor(Math.random() * 10) + 5}%
                                </div>
                            </div>

                            <div className="flex items-end justify-between">
                                <span className="text-2xl font-bold text-white tracking-tight">{kpi.value}</span>

                                {/* Sparkline */}
                                <div className="flex items-end gap-1 h-6 w-24 opacity-50 group-hover/card:opacity-100 transition-opacity">
                                    {kpi.sparkline.map((val, idx) => (
                                        <div
                                            key={idx}
                                            style={{ height: `${(val / 70) * 100}%` }}
                                            className={`flex-1 rounded-t-sm ${i === 1 ? "bg-blue-500 shadow-[0_0_5px_#3b82f6]" : i === 2 ? "bg-purple-500 shadow-[0_0_5px_#a855f7]" : "bg-green-500 shadow-[0_0_5px_#22c55e]"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 5. DECISION INTELLIGENCE (Footer) */}
                <div className="mt-4 flex items-center justify-between p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2">
                        <Radar className="w-4 h-4 text-blue-400 animate-spin-slow" />
                        <div className="text-[10px] text-blue-300">
                            <strong>Insight:</strong> Forte rétention à 0:15s
                        </div>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-blue-400" />
                </div>

            </div>
        </div>
    )
}
