"use client"

import { motion } from "framer-motion"
import { Zap, Gem } from "lucide-react"
import { EASING } from "@/lib/easing"

/**
 * Pricing & Offers Widget (Premium Commercial Redesign)
 * Visualizes the shift from opaque market pricing to clear, premium value tiers.
 * Features:
 * - "Value Equation" Header (Image + Scarcity = Pricing Power)
 * - Calculated Output Cards (Starter/Standard/Premium)
 * - "Luxury" atmospheric background
 */
export function PricingOffersWidget() {
    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group border border-white/5 flex flex-col">
            {/* 1. ATMOSPHERE: The Value Lab */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 z-0" />

            {/* Geometric Background */}
            <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />

            <div className="relative z-10 p-5 h-full flex flex-col">

                {/* 2. THE EQUATION: Brand + Scarcity = Pricing Power */}
                <div className="mb-4 bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Pricing Power Engine</span>
                        <div className="flex items-center gap-1 text-[9px] text-violet-400 font-bold">
                            <Zap className="w-3 h-3" />
                            LIVE CALC
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        {/* Input 1: Image */}
                        <div className="flex-1">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-[9px] text-slate-500">Image</span>
                                <span className="text-[9px] font-bold text-white">98/100</span>
                            </div>
                            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "98%" }}
                                    transition={{ duration: 1.5, ease: EASING.easeOut }}
                                    className="h-full bg-violet-500"
                                />
                            </div>
                        </div>

                        <div className="text-slate-600 font-bold text-xs">+</div>

                        {/* Input 2: Rareté */}
                        <div className="flex-1">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-[9px] text-slate-500">Rareté</span>
                                <span className="text-[9px] font-bold text-white">High</span>
                            </div>
                            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "85%" }}
                                    transition={{ duration: 1.5, delay: 0.2, ease: EASING.easeOut }}
                                    className="h-full bg-amber-500"
                                />
                            </div>
                        </div>

                        <div className="text-slate-600 font-bold text-xs">=</div>

                        {/* Output: Multiplier */}
                        <div className="px-2 py-1 bg-violet-500/20 rounded border border-violet-500/30">
                            <span className="text-xs font-bold text-violet-300">x3.5</span>
                        </div>
                    </div>
                </div>

                {/* 3. CALCULATED OUTPUTS (The Packs) */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 min-h-0 overflow-y-auto custom-scrollbar pr-1">
                    {/* Card 1: Entry */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/5 rounded-lg p-2 border border-white/5 flex flex-col justify-between"
                    >
                        <div>
                            <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">Entrée</div>
                            <div className="text-xs font-bold text-white mb-2">Starter</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] text-slate-400">Market: 1K€</div>
                            <div className="text-xs font-bold text-violet-400">3-5K€</div>
                        </div>
                    </motion.div>

                    {/* Card 2: Core (Highlighted) */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-violet-600/10 rounded-lg p-2 border border-violet-500/40 relative flex flex-col justify-between shadow-lg shadow-violet-900/20"
                    >
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-violet-600 px-1.5 py-0.5 rounded text-[8px] font-bold text-white whitespace-nowrap">
                            OPTIMAL
                        </div>
                        <div>
                            <div className="text-[9px] text-violet-300 uppercase font-bold mb-1">Cœur</div>
                            <div className="text-xs font-bold text-white mb-2">Standard</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] text-slate-400">Market: 3K€</div>
                            <div className="text-sm font-bold text-white">8-15K€</div>
                        </div>
                    </motion.div>

                    {/* Card 3: Anchor */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gradient-to-br from-amber-500/10 to-transparent rounded-lg p-2 border border-amber-500/20 flex flex-col justify-between"
                    >
                        <div>
                            <div className="text-[9px] text-amber-500/80 uppercase font-bold mb-1">Ancrage</div>
                            <div className="text-xs font-bold text-white mb-2">Premium</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] text-slate-400">Market: ???</div>
                            <div className="text-xs font-bold text-amber-400">20K€+</div>
                        </div>
                    </motion.div>
                </div>

                {/* 4. FOOTER: The Result */}
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                    <div className="text-[9px] text-slate-500">
                        Votre valorisation est <span className="text-white font-bold">scientifique</span>.
                    </div>
                    <Gem className="w-3 h-3 text-violet-500" />
                </div>

            </div>
        </div>
    )
}
