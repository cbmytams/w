"use client"

import { motion } from "framer-motion"
import { Play, Layers, Zap } from "lucide-react"

/**
 * Series & Formats Widget (Premium Commercial Redesign)
 * Visualizes the transformation from chaotic posting to a structured content machine.
 * Features:
 * - "Production Line" atmospheric background
 * - Strong Before/After contrast
 * - Glowing Series Cards
 * - Visual Backlog Queue
 */
export function SeriesFormatsWidget() {
    const series = [
        { name: "Tech Sans Bullshit", format: "Review", count: 12, performance: "+45%", color: "from-violet-500 to-purple-600" },
        { name: "Débrief Hebdo", format: "News", count: 8, performance: "+32%", color: "from-purple-500 to-fuchsia-600" },
        { name: "Setup Tour", format: "Lifestyle", count: 5, performance: "+28%", color: "from-fuchsia-500 to-pink-600" }
    ]

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group border border-white/5">
            {/* 1. ATMOSPHERE: Clean Flow */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 z-0" />

            {/* Soft Ambient Light */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-violet-900/10 blur-[60px] pointer-events-none" />

            <div className="relative z-10 p-5 h-full flex flex-col">

                {/* 2. HEADER: Status Comparison (Vertical Stack for better mobile fit) */}
                <div className="flex flex-col gap-2 mb-5">
                    {/* Before */}
                    <div className="flex items-center justify-between px-3 py-2 bg-red-500/5 rounded-lg border border-red-500/10">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-red-400">AVANT</span>
                            <span className="text-xs text-slate-400 line-through">3 posts/mois</span>
                        </div>
                        <Zap className="w-3 h-3 text-red-500/50" />
                    </div>

                    {/* After */}
                    <div className="flex items-center justify-between px-3 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 shadow-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-emerald-400">WAFIA</span>
                            <span className="text-xs font-bold text-white">12 vidéos/mois</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Layers className="w-3 h-3 text-emerald-400" />
                        </div>
                    </div>
                </div>

                {/* 3. ACTIVE SERIES (Vertical List) */}
                <div className="flex-1 space-y-2 min-h-0 overflow-y-auto pr-1 custom-scrollbar">
                    <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Active Series</div>
                    {series.map((s, i) => (
                        <motion.div
                            key={s.name}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            className="bg-white/5 rounded-lg p-2.5 border border-white/5 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md`}>
                                    <Play className="w-3 h-3 text-white fill-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-xs text-white leading-tight">
                                        {s.name}
                                    </h4>
                                    <span className="text-[10px] text-slate-400">{s.format}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-bold text-emerald-400">{s.performance}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 4. FOOTER: Backlog */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[8px]">💡</div>
                            ))}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">+30 idées en stock</span>
                    </div>
                    <div className="text-[10px] text-violet-400 font-bold border border-violet-500/20 px-2 py-0.5 rounded-full bg-violet-500/10">
                        3/sem.
                    </div>
                </div>

            </div>
        </div>
    )
}
