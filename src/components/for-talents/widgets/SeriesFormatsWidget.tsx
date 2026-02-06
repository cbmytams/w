"use client"

import { motion } from "framer-motion"
import { Play, TrendingUp, Calendar, Layers, Zap } from "lucide-react"

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
        { name: "Tech Sans Bullshit", format: "Review", count: 12, performance: "+45%", color: "from-purple-500 to-indigo-600" },
        { name: "Débrief Hebdo", format: "News", count: 8, performance: "+32%", color: "from-blue-500 to-cyan-600" },
        { name: "Setup Tour", format: "Lifestyle", count: 5, performance: "+28%", color: "from-amber-500 to-orange-600" }
    ]

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group">
            {/* 1. ATMOSPHERE: The "Production Line" Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />

            {/* Animated Flow Lines */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,#6366f1_50%,transparent_100%)] bg-[length:200%_100%] animate-[shimmer_5s_linear_infinite]" />
            </div>

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] text-white pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

            <div className="relative z-10 p-6 h-full flex flex-col">

                {/* 2. HEADER: Quick Comparison */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* Before */}
                    <div className="p-3 bg-red-500/5 rounded-xl border border-red-500/10 relative overflow-hidden group/before">
                        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover/before:opacity-100 transition-opacity" />
                        <div className="text-xs sm:text-[10px] font-bold text-red-400/70 tracking-wider mb-1">AVANT</div>
                        <div className="text-sm font-medium text-slate-400 line-through decoration-red-500/50">3-5 posts/mois</div>
                        <div className="text-xs sm:text-[10px] text-red-400 mt-1 flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            <span>Incohérent</span>
                        </div>
                    </div>

                    {/* After */}
                    <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 relative overflow-hidden shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                        <div className="absolute top-0 right-0 p-1.5">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_5px_#4ade80]"
                            />
                        </div>
                        <div className="text-xs sm:text-[10px] font-bold text-green-400/90 tracking-wider mb-1">AVEC WAFIA</div>
                        <div className="text-sm font-bold text-white">12 vidéos/mois</div>
                        <div className="text-xs sm:text-[10px] text-green-400 mt-1 flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            <span>Machine active</span>
                        </div>
                    </div>
                </div>

                {/* 3. ACTIVE SERIES (Glowing Cards) */}
                <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-xs sm:text-[10px] font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2">
                            <Play className="w-3 h-3 text-purple-400" />
                            Séries Actives
                        </div>
                    </div>

                    {series.map((s, i) => (
                        <motion.div
                            key={s.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.15 }}
                            className="bg-slate-800/80 rounded-xl p-3 border border-white/5 hover:border-white/10 transition-all group cursor-default relative overflow-hidden"
                        >
                            {/* Hover Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${s.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg shadow-purple-500/20`}>
                                        <Play className="w-3.5 h-3.5 text-white fill-white/20" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm text-white group-hover:text-purple-200 transition-colors">
                                            {s.name}
                                        </h4>
                                        <div className="flex items-center gap-2 text-xs sm:text-[10px] text-slate-400">
                                            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5">{s.format}</span>
                                            <span>{s.count} épisodes</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
                                        <TrendingUp className="w-3 h-3" />
                                        <span>{s.performance}</span>
                                    </div>
                                    <div className="text-xs sm:text-[10px] text-slate-500">vs. last month</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 4. FOOTER: Backlog & Cadence */}
                <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                    {/* Backlog */}
                    <div>
                        <div className="text-xs sm:text-[10px] text-slate-500 mb-1">BACKLOG</div>
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-6 h-6 rounded-full bg-slate-700 border border-slate-800 flex items-center justify-center text-[8px] text-slate-400">
                                        💡
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs text-white font-medium">+30 idées</span>
                        </div>
                    </div>

                    {/* Cadence */}
                    <div>
                        <div className="text-xs sm:text-[10px] text-slate-500 mb-1">CADENCE</div>
                        <div className="flex items-center gap-1.5 p-1.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                            <Calendar className="w-3 h-3 text-indigo-400" />
                            <span className="text-xs text-indigo-300 font-medium">3 / semaine</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
