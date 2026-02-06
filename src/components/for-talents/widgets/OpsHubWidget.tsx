"use client"

import { motion } from "framer-motion"
import { Calendar, CheckSquare, DollarSign, Bell, Cpu, Grid } from "lucide-react"

/**
 * Ops Hub Widget (Premium Commercial Redesign)
 * Visualizes the transformation from administrative chaos to a centralized digital command center.
 * Features:
 * - "Jarvis" HUD Atmospheric background
 * - Holographic data modules
 * - "Incoming Intel" notifications
 */
export function OpsHubWidget() {
    const tasks = [
        { label: "Upload contrat Nike", done: true },
        { label: "Valid. facture #402", done: true },
        { label: "Brief montage Vlog", done: false }
    ]

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group">
            {/* 1. ATMOSPHERE: Sci-Fi HUD */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />

            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            {/* Scanline */}
            <div className="absolute top-0 w-full h-full bg-[linear-gradient(transparent_0%,rgba(56,189,248,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-scanlines pointer-events-none" />

            <div className="relative z-10 p-6 h-full flex flex-col">

                {/* 2. HEADER: System Status */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                        <span className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase">System Online</span>
                    </div>
                    <Cpu className="w-4 h-4 text-cyan-500/50" />
                </div>

                {/* 3. MAIN MODULES GRID */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Calendar Module */}
                    <div className="relative p-3 bg-slate-800/50 rounded-lg border border-cyan-500/20 col-span-1 overflow-hidden group/module">
                        <div className="absolute top-0 right-0 p-1 opacity-50"><Grid className="w-3 h-3 text-cyan-500" /></div>
                        <div className="text-[9px] text-cyan-300/70 uppercase tracking-wider mb-2">Schedule</div>
                        <div className="flex flex-col items-center justify-center py-2">
                            <span className="text-2xl font-bold text-white mb-0.5">14</span>
                            <span className="text-[10px] text-slate-400">OCTOBRE</span>
                        </div>
                        <div className="mt-2 text-[9px] text-cyan-400 bg-cyan-900/20 px-1 py-0.5 rounded text-center border border-cyan-500/10">
                            Shoot @ Sony Music
                        </div>
                    </div>

                    {/* Revenue Module */}
                    <div className="relative p-3 bg-slate-800/50 rounded-lg border border-cyan-500/20 col-span-1 overflow-hidden">
                        <div className="absolute top-0 right-0 p-1 opacity-50"><DollarSign className="w-3 h-3 text-cyan-500" /></div>
                        <div className="text-[9px] text-cyan-300/70 uppercase tracking-wider mb-2">Revenue</div>
                        <div className="flex flex-col justify-center h-full pb-2">
                            <span className="text-lg font-bold text-white tracking-tight">16.5K€</span>
                            <div className="w-full h-0.5 bg-slate-700 mt-1 relative overflow-hidden rounded-full">
                                <div className="absolute inset-0 w-3/4 bg-cyan-500 shadow-[0_0_5px_#22d3ee]" />
                            </div>
                            <span className="text-[9px] text-cyan-400 mt-1">+32% vs Last Mo.</span>
                        </div>
                    </div>
                </div>

                {/* 4. TASK LIST (Holographic) */}
                <div className="flex-1 bg-slate-800/30 rounded-lg border border-white/5 p-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/30" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/30" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/30" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/30" />

                    <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <CheckSquare className="w-3 h-3" />
                        Active Protocols
                    </div>

                    <div className="space-y-1.5">
                        {tasks.map((task, i) => (
                            <motion.div
                                key={task.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className={`flex items-center gap-2 text-xs ${task.done ? "opacity-50" : "opacity-100"}`}
                            >
                                <div className={`w-3 h-3 rounded flex items-center justify-center border ${task.done ? "bg-cyan-500/20 border-cyan-500/50" : "border-slate-600"}`}>
                                    {task.done && <div className="w-1.5 h-1.5 bg-cyan-400 rounded-[1px]" />}
                                </div>
                                <span className={task.done ? "text-slate-500 line-through decoration-slate-600" : "text-white"}>
                                    {task.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 5. NOTIFICATION (Toast) */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="mt-3 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center gap-3"
                >
                    <div className="relative">
                        <Bell className="w-4 h-4 text-indigo-400" />
                        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
                    </div>
                    <div className="flex-1">
                        <div className="text-[9px] text-indigo-300 font-bold uppercase tracking-wide">Incoming Intel</div>
                        <div className="text-[10px] text-slate-300">Brief brand "Samsung" reçu</div>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}
