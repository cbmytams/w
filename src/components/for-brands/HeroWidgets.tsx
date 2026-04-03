"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Play, ArrowUpRight, Activity } from "lucide-react"
import { EASING, DURATION } from "@/lib/easing"
import { useReducedMotion } from "@/hooks/useReducedMotion"

// --- COMMAND CENTER MODULES ---

export function MainPerformanceModule() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: DURATION.slower, delay: 0.2, ease: EASING.smooth }}
            className="w-full h-full bg-zinc-950/80 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden relative group"
        >
            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]" />

            {/* Header */}
            <div className="p-6 flex justify-between items-start relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        <span className="text-[10px] font-mono font-bold text-emerald-500/80 uppercase tracking-widest">System Operational</span>
                    </div>
                    <h3 className="text-white text-lg font-bold tracking-tight">Campaign Velocity</h3>
                </div>
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-orange-500" />
                    <span className="text-xs font-mono font-bold text-orange-400">+127%</span>
                </div>
            </div>

            {/* Graph Area */}
            <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-56 w-full">
                <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible preserve-3d">
                    <defs>
                        <linearGradient id="grid-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F97316" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* The Fill */}
                    <motion.path
                        d="M0,40 C15,35 25,38 35,20 C45,10 55,18 65,8 C75,0 85,15 95,5 L100,2 L100,40 L0,40 Z"
                        fill="url(#grid-gradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />

                    {/* The Line */}
                    <motion.path
                        d="M0,40 C15,35 25,38 35,20 C45,10 55,18 65,8 C75,0 85,15 95,5 L100,2"
                        fill="none"
                        stroke="#F97316"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                        filter="drop-shadow(0 0 4px rgba(249,115,22,0.5))"
                    />

                    {/* Data Points */}
                    <g>
                        {[
                            { x: 35, y: 20 }, { x: 65, y: 8 }, { x: 95, y: 5 }
                        ].map((point, i) => (
                            <motion.circle
                                key={i}
                                cx={point.x}
                                cy={point.y}
                                r="1.5"
                                fill="#fff"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.5 + i * 0.2, type: "spring" }}
                            />
                        ))}
                    </g>
                </svg>
            </div>

            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        </motion.div>
    )
}

export function FinancialCoreModule() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center p-6 bg-white dark:bg-zinc-100 rounded-[24px] shadow-xl shadow-white/5 relative overflow-hidden h-full border border-white/20 group"
        >
            {/* Micro-texture Background */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />

            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp className="w-16 h-16 text-black" />
            </div>

            <div className="relative z-10 flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                    <div className="px-2 py-0.5 rounded-sm bg-black text-white text-[9px] font-bold uppercase tracking-widest backdrop-blur-md">
                        ROI
                    </div>
                </div>
                <div className="text-4xl font-bold tracking-tighter text-black tabular-nums">
                    2.4M<span className="text-lg text-slate-400 font-medium ml-0.5">€</span>
                </div>
                <div className="text-[10px] font-medium text-slate-500 mt-1 flex items-center gap-1.5">
                    <div className="bg-emerald-500/10 rounded px-1.5 py-0.5 text-emerald-600 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />
                        <span className="font-bold">+24%</span>
                    </div>
                    <span>vs last month</span>
                </div>
            </div>

            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        </motion.div>
    )
}

// Mock Avatars
const AVATARS = [1, 2, 3, 4, 1, 2]

export function TalentStreamModule() {
    const prefersReducedMotion = useReducedMotion()

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-full bg-zinc-900/60 backdrop-blur-xl rounded-[24px] border border-white/10 p-2 flex flex-col items-center gap-3 overflow-hidden"
        >
            <div className="text-[9px] font-mono font-bold text-white/40 rotate-180 uppercase tracking-widest py-2" style={{ writingMode: 'vertical-rl' }}>
                Live Feed
            </div>

            <div className="flex-1 w-full overflow-hidden relative flex flex-col items-center gap-2 mask-gradient-y">
                {/* Vertical Marquee */}
                <motion.div
                    animate={prefersReducedMotion ? undefined : { y: [0, -100] }}
                    transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 10, ease: "linear" }}
                    className="flex flex-col gap-3"
                >
                    {[...AVATARS, ...AVATARS].map((id, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-600 border border-white/10 relative shrink-0">
                            {/* In a real app, use Image */}
                            <div className={`absolute inset-0 rounded-full opacity-50 bg-indigo-500 mix-blend-overlay`} />
                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border-2 border-zinc-900" />
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60">
                <Users className="w-3 h-3" />
            </div>
        </motion.div>
    )
}

export function ContentReactorModule() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-40 bg-zinc-900 p-2 rounded-2xl border border-white/10 shadow-2xl relative"
        >
            <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 relative overflow-hidden group cursor-pointer">
                {/* Overlay UI */}
                <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/50 backdrop-blur rounded text-[8px] font-mono text-white font-bold flex items-center gap-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                    REC
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                </div>

                {/* Gradient Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-3 left-3">
                    <div className="text-white text-xs font-bold leading-tight">Launch<br />Event</div>
                </div>
            </div>
        </motion.div>
    )
}
