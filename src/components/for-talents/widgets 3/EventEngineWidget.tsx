"use client"

import { motion } from "framer-motion"
import { Calendar, Video, Camera, Star } from "lucide-react"

/**
 * Event Engine Widget (Premium Commercial Redesign)
 * Visualizes the transformation of a physical event into a digital content powerhouse.
 * Features:
 * - "Center Stage" atmospheric background (Spotlights/Fog)
 * - Cinematic timeline
 * - Content Output Multiplier
 */
export function EventEngineWidget() {
    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group border border-white/5">
            {/* 1. ATMOSPHERE: The Stage */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 z-0" />

            {/* Spotlight (Simplified) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-indigo-500/10 blur-[50px] pointer-events-none" />

            <div className="relative z-10 p-5 h-full flex flex-col">

                {/* 2. HEADER: Event Status */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-[9px] font-bold text-indigo-300 tracking-widest uppercase">Next Event</span>
                    </div>
                    <div className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        J-12
                    </div>
                </div>

                {/* 3. CENTERPIECE: The Content Explosion */}
                <div className="flex-1 flex flex-col items-center justify-center relative">
                    {/* Central Node */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 relative z-10 mb-4"
                    >
                        <Video className="w-5 h-5 text-white" />
                        {/* Pulse */}
                        <div className="absolute inset-0 bg-indigo-500 rounded-xl animate-ping opacity-20" />
                    </motion.div>

                    {/* Output Metrics (Simplified) */}
                    <div className="grid grid-cols-3 gap-2 w-full">
                        <div className="text-center p-2 rounded-lg bg-white/5 border border-white/5">
                            <div className="text-[10px] text-slate-400 font-medium mb-0.5">Reels</div>
                            <div className="text-lg font-bold text-white leading-none">12</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-white/5 border border-white/5">
                            <div className="text-[10px] text-slate-400 font-medium mb-0.5">Photos</div>
                            <div className="text-lg font-bold text-white leading-none">50</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-white/5 border border-white/5">
                            <div className="text-[10px] text-slate-400 font-medium mb-0.5">Amba</div>
                            <div className="text-lg font-bold text-white leading-none">3</div>
                        </div>
                    </div>
                </div>

                {/* 4. FOOTER: Production Value */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <Camera className="w-3 h-3 text-slate-500" />
                        <span className="text-[10px] text-slate-500">Prod. Value</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold text-white">Cinema</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
