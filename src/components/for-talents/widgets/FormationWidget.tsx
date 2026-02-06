"use client"

import { motion } from "framer-motion"
import { GraduationCap, BookOpen, Target, TrendingUp, Shield, Users, Lock, Unlock, PlayCircle } from "lucide-react"

/**
 * Formation Widget (Premium Commercial Redesign)
 * Visualizes the organized path to autonomy (Skill Tree metaphor).
 * Features:
 * - "Matrix/Data" atmospheric background
 * - Gamified "Skill Tree" progression path
 * - Unlockable Holographic Badges
 */
export function FormationWidget() {
    const steps = [
        { label: "Level 1: Audit", status: "complete" },
        { label: "Level 2: Stratégie", status: "complete" },
        { label: "Level 3: Scale", status: "active" },
        { label: "Level 4: Autonomie", status: "locked" }
    ]

    const skills = [
        { name: "Algos", level: 100, color: "text-green-400", bg: "bg-green-500/20" },
        { name: "Monetization", level: 75, color: "text-purple-400", bg: "bg-purple-500/20" },
        { name: "Legal", level: 40, color: "text-blue-400", bg: "bg-blue-500/20" }
    ]

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group">
            {/* 1. ATMOSPHERE: Data Rain / Matrix */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />

            {/* Falling Code Drops */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: "100%", opacity: [0, 1, 0] }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "linear"
                        }}
                        className="absolute w-[1px] h-10 bg-gradient-to-b from-transparent via-green-500 to-transparent"
                        style={{ left: `${10 + i * 10}%` }}
                    />
                ))}
            </div>

            <div className="relative z-10 p-6 h-full flex flex-col">

                {/* 2. HEADER: Skill Tree Status */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 border-2 border-green-500 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                            <GraduationCap className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mastery Level</div>
                            <div className="text-xl font-bold text-white tracking-tight">Level 3</div>
                        </div>
                    </div>
                    {/* XP Bar */}
                    <div className="w-24">
                        <div className="flex justify-between text-[9px] text-green-400 mb-1">
                            <span>XP</span>
                            <span>75%</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "75%" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-green-500 shadow-[0_0_8px_#22c55e]"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. TRANSFORMATION: Random vs Path */}
                <div className="flex-1 relative pl-6 border-l border-slate-700/50 ml-3">
                    {/* Animated Path Line */}
                    <div className="absolute left-[-1px] top-0 h-3/4 w-[2px] bg-gradient-to-b from-green-500 via-purple-500 to-transparent shadow-[0_0_10px_#a855f7]" />

                    <div className="space-y-6">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.15 }}
                                className="relative flex items-center gap-3"
                            >
                                {/* Dot on timeline */}
                                <div className={`absolute -left-[29px] w-3 h-3 rounded-full border-2 ${step.status === "complete" ? "bg-green-500 border-green-500 shadow-[0_0_8px_#22c55e]" :
                                        step.status === "active" ? "bg-purple-900 border-purple-500 animate-pulse" :
                                            "bg-slate-900 border-slate-600"
                                    }`} />

                                <div className={`flex items-center gap-3 p-2 rounded-lg border w-full ${step.status === "active" ? "bg-purple-500/10 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]" :
                                        "bg-slate-800/30 border-white/5 opacity-80"
                                    }`}>
                                    {step.status === "locked" ? <Lock className="w-4 h-4 text-slate-500" /> :
                                        step.status === "active" ? <PlayCircle className="w-4 h-4 text-purple-400" /> :
                                            <CheckCircleIcon />}

                                    <span className={`text-xs font-medium ${step.status === "active" ? "text-purple-300" :
                                            step.status === "locked" ? "text-slate-500" : "text-white"
                                        }`}>{step.label}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 4. FOOTER: Active Cartridges */}
                <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 bg-slate-800/50 p-2 rounded border border-white/5">
                        <BookOpen className="w-3 h-3 text-cyan-400" />
                        <div className="text-[10px] text-cyan-300">CheatSheet_Pricing.pdf</div>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-800/50 p-2 rounded border border-white/5">
                        <BookOpen className="w-3 h-3 text-cyan-400" />
                        <div className="text-[10px] text-cyan-300">Contract_Template.docx</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

function CheckCircleIcon() {
    return (
        <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <div className="w-2 h-1 bg-green-500 rotate-[-45deg] translate-y-[-1px]" style={{ borderLeft: '1px solid currentColor', borderBottom: '1px solid currentColor', width: '6px', height: '4px', backgroundColor: 'transparent' }} />
        </div>
    )
}
