"use client"

import { motion } from "framer-motion"
import { Video, Edit3, CheckCircle, UploadCloud, Clock, Zap, AlertCircle } from "lucide-react"

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
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group">
            {/* 1. ATMOSPHERE: The Engine */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />

            {/* Industrial Grid */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(99, 102, 241, .1) 25%, rgba(99, 102, 241, .1) 26%, transparent 27%, transparent 74%, rgba(99, 102, 241, .1) 75%, rgba(99, 102, 241, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(99, 102, 241, .1) 25%, rgba(99, 102, 241, .1) 26%, transparent 27%, transparent 74%, rgba(99, 102, 241, .1) 75%, rgba(99, 102, 241, .1) 76%, transparent 77%, transparent)', backgroundSize: '30px 30px' }}
            />

            {/* Moving Flow Lines (Conveyor Belt Effect) */}
            <div className="absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
                <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-0 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_10px_#818cf8]"
                />
            </div>

            <div className="relative z-10 p-6 h-full flex flex-col">

                {/* 2. HEADER: Chaos vs Speed */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    {/* Before: Chaos */}
                    <div className="p-3 bg-red-500/5 rounded-xl border border-red-500/10 flex flex-col justify-between relative overflow-hidden">
                        <div className="flex items-center gap-1 mb-1">
                            <AlertCircle className="w-3 h-3 text-red-500" />
                            <span className="text-[10px] font-bold text-red-400 tracking-wider">MANUEL</span>
                        </div>
                        <div className="text-xs text-slate-400">
                            8h / vidéo<br />
                            <span className="text-red-500/70 text-[10px]">Stress constant</span>
                        </div>
                    </div>

                    {/* After: Engine */}
                    <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 relative overflow-hidden shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                        <div className="flex items-center gap-1 mb-1">
                            <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-[10px] font-bold text-indigo-300 tracking-wider">ENGINE</span>
                        </div>
                        <div className="text-xs text-white font-medium">
                            3.5h / vidéo<br />
                            <span className="text-green-400 text-[10px]">Gain 56%</span>
                        </div>
                    </div>
                </div>

                {/* 3. PIPELINE VISUALIZATION */}
                <div className="flex-1 flex flex-col justify-center relative">
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-700 -z-10" />

                    {/* Animated Progress Beam */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                        className="absolute top-1/2 left-4 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_8px_#8b5cf6] -z-10"
                    />

                    <div className="flex justify-between items-center px-1">
                        {steps.map((step, i) => (
                            <div key={step.label} className="flex flex-col items-center gap-2 group/step cursor-pointer">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center relative transition-all group-hover/step:border-indigo-500 group-hover/step:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                >
                                    {/* Active Pulse ring */}
                                    <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping opacity-0 group-hover/step:opacity-100" />
                                    <step.icon className="w-4 h-4 text-slate-400 group-hover/step:text-white transition-colors" />
                                </motion.div>
                                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider group-hover/step:text-indigo-400 transition-colors">
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. FOOTER: Velocity Metrics */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <div className="text-[10px] text-slate-400">Temps cycle moyen</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-xl font-bold text-white tracking-tight">2.5<span className="text-sm text-slate-500">j</span></div>
                        <div className="text-[10px] text-green-400 bg-green-900/20 px-1.5 py-0.5 rounded border border-green-900/30">
                            -4j vs market
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
