"use client"

import { motion } from "framer-motion"
import { Video, Edit3, CheckCircle, UploadCloud, Clock, Zap } from "lucide-react"

/**
 * Production Pipeline Widget (Premium Commercial Redesign)
 * Visualizes the shift from creative chaos to a streamlined industrial engine.
 * Features:
 * - "The Engine" atmospheric background (Flow lines)
 * - Horizontal scrolling "Conveyor Belt" animation
 * - Speedometer visual (2x Faster)
 */
export function ProductionPipelineWidget() {
    const steps = [
        { icon: Video, label: "Shoot" },
        { icon: Edit3, label: "Edit" },
        { icon: CheckCircle, label: "Valid" },
        { icon: UploadCloud, label: "Post" }
    ]

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group border border-white/5">
            {/* 1. ATMOSPHERE: The Engine */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 z-0" />

            {/* Engine Hum Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-24 bg-violet-600/10 blur-[40px] pointer-events-none" />

            <div className="relative z-10 p-5 h-full flex flex-col">

                {/* 2. HEADER: Chaos vs Speed (Vertical on Mobile) */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* Before */}
                    <div className="p-2.5 bg-red-500/5 rounded-xl border border-red-500/10 flex flex-col justify-between">
                        <div className="flex items-center gap-1 mb-1">
                            <span className="text-[11px] sm:text-[9px] font-bold text-red-500/70 tracking-wider uppercase">Manuel</span>
                        </div>
                        <div className="text-[12px] sm:text-[10px] text-slate-500 leading-tight">
                            8h/vidéo<br />Stress
                        </div>
                    </div>

                    {/* After */}
                    <div className="p-2.5 bg-violet-500/10 rounded-xl border border-violet-500/20 shadow-inner">
                        <div className="flex items-center gap-1 mb-1">
                            <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-[11px] sm:text-[9px] font-bold text-violet-300 tracking-wider uppercase">Engine</span>
                        </div>
                        <div className="text-[12px] sm:text-[10px] font-bold text-white">
                            3.5h/vidéo
                        </div>
                    </div>
                </div>

                {/* 3. PIPELINE VISUALIZATION (Simplified) */}
                <div className="flex-1 flex flex-col justify-center relative">
                    {/* Track */}
                    <div className="absolute top-1/2 left-2 right-2 h-1 bg-slate-800 rounded-full -z-10 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent w-1/2 animate-[shimmer_2s_infinite]" />
                    </div>

                    <div className="flex justify-between items-center px-1">
                        {steps.map((step, i) => (
                            <div key={step.label} className="flex flex-col items-center gap-2 group/step cursor-pointer">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.15 }}
                                    className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center relative z-10 group-hover/step:border-violet-500 transition-colors"
                                >
                                    <step.icon className="w-3.5 h-3.5 text-slate-400 group-hover/step:text-white transition-colors" />
                                </motion.div>
                                <span className="text-[11px] sm:text-[9px] uppercase font-bold text-slate-500 tracking-wide group-hover/step:text-violet-400">
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. FOOTER: Velocity Metrics */}
                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span className="text-[12px] sm:text-[10px] text-slate-500">Cycle moyen</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">2.5j</span>
                        <span className="text-[11px] sm:text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            -4j
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}
