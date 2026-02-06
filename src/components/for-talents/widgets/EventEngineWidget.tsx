"use client"

import { motion } from "framer-motion"
import { Calendar, Camera, MapPin, Ticket, Play, Users, Clapperboard } from "lucide-react"

/**
 * Event Engine Widget (Premium Commercial Redesign)
 * Visualizes the transformation of a physical event into a digital content powerhouse.
 * Features:
 * - "Center Stage" atmospheric background (Spotlights/Fog)
 * - Cinematic timeline
 * - Content Output Multiplier
 */
export function EventEngineWidget() {
    const timeline = [
        { label: "Brief", active: true },
        { label: "Prod", active: true },
        { label: "Event Day", active: true, pulse: true },
        { label: "Post-Prod", active: false }
    ]

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group">
            {/* 1. ATMOSPHERE: Center Stage */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />

            {/* Spotlights */}
            <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-20 left-1/4 w-32 h-[500px] bg-indigo-500/20 blur-[60px] transform origin-top pointer-events-none"
            />
            <motion.div
                animate={{ rotate: [0, -10, 0, 10, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-20 right-1/4 w-32 h-[500px] bg-purple-500/20 blur-[60px] transform origin-top pointer-events-none"
            />

            {/* Fog Texture */}
            <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

            <div className="relative z-10 p-6 h-full flex flex-col">

                {/* 2. HEADER: The Ticket */}
                <div className="relative mb-6 bg-white/5 border border-white/10 rounded-xl p-0.5 overflow-hidden">
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 rounded-full border-r border-white/10" />
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 rounded-full border-l border-white/10" />

                    <div className="p-3 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 rounded-lg flex items-center justify-between">
                        <div>
                            <div className="text-[9px] text-indigo-300 font-bold uppercase tracking-widest mb-1">PROCHAIN EVENT</div>
                            <div className="text-sm font-bold text-white">Nike Air Max Day</div>
                            <div className="flex items-center gap-2 text-xs sm:text-[10px] text-slate-400 mt-1">
                                <Calendar className="w-3 h-3" /> 26 Mars
                                <MapPin className="w-3 h-3 ml-1" /> Paris
                            </div>
                        </div>
                        <Ticket className="w-8 h-8 text-white/20" />
                    </div>
                </div>

                {/* 3. TRANSFORMATION: Invisible vs Main Event */}
                <div className="flex-1 flex flex-col justify-center gap-4">
                    {/* Before */}
                    <div className="flex items-center justify-between opacity-40 px-2">
                        <span className="text-xs sm:text-[10px] text-slate-500 line-through">Juste une soirée...</span>
                        <span className="text-xs sm:text-[10px] text-red-500">0 Contenu</span>
                    </div>

                    {/* After: Content Explosion */}
                    <div className="relative p-3 rounded-xl border border-indigo-500/30 bg-indigo-900/10 overflow-hidden">
                        {/* Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />

                        <div className="flex items-center justify-between text-xs font-bold text-white mb-3">
                            <span>OUTPUT CONTENU</span>
                            <span className="text-indigo-400">Total Reach: 1.2M</span>
                        </div>

                        <div className="flex justify-between gap-2">
                            {/* Reel 1 */}
                            <div className="h-16 w-full bg-slate-800 rounded-md border border-white/10 relative group/reel overflow-hidden">
                                <div className="absolute inset-0 bg-indigo-500/20 group-hover/reel:bg-indigo-500/40 transition-colors" />
                                <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white" />
                                <div className="absolute bottom-1 right-1 text-[8px] font-bold text-white">REEL</div>
                            </div>
                            {/* Reel 2 */}
                            <div className="h-16 w-full bg-slate-800 rounded-md border border-white/10 relative group/reel overflow-hidden">
                                <div className="absolute inset-0 bg-purple-500/20 group-hover/reel:bg-purple-500/40 transition-colors" />
                                <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white" />
                                <div className="absolute bottom-1 right-1 text-[8px] font-bold text-white">VLOG</div>
                            </div>
                            {/* Photos */}
                            <div className="h-16 w-full bg-slate-800 rounded-md border border-white/10 relative group/reel overflow-hidden flex items-center justify-center">
                                <div className="text-center">
                                    <span className="block text-lg font-bold text-white">12</span>
                                    <span className="text-[8px] text-slate-400">STORIES</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. FOOTER: Production Timeline */}
                <div className="mt-6 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                        {timeline.map((step, i) => (
                            <div key={step.label} className="flex flex-col items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${step.active ? (step.pulse ? "bg-indigo-400 animate-ping" : "bg-indigo-500") : "bg-slate-700"
                                    }`} />
                                <span className={`text-[9px] uppercase tracking-wider ${step.active ? "text-indigo-300" : "text-slate-600"}`}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                    {/* Line connecting dots */}
                    <div className="relative h-[1px] bg-slate-800 -top-[18px] -z-10 mx-4" />
                </div>

            </div>
        </div>
    )
}
