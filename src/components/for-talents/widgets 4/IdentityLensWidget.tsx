"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

/**
 * Identity Lens Widget (Premium Commercial Redesign)
 * Visualizes the transformation from undefined creator to premium brand.
 * Features:
 * - "Lens" atmospheric background
 * - Dramatic Before/After bio comparison
 * - Abstract premium content thumbnails
 * - Visual Brand-Fit analysis
 */
export function IdentityLensWidget() {
    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group border border-white/5">
            {/* 1. ATMOSPHERE: Clean Premium Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 z-0" />

            {/* Subtle Premium Glow (No Noise) */}
            <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-violet-600/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 p-5 h-full flex flex-col">

                {/* 2. HEADER: Profile Evolution */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-500/20">
                                T
                            </div>
                            <div className="absolute inset-0 bg-violet-500 rounded-full animate-pulse opacity-20" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white leading-tight">@talent</h4>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/10 text-slate-300 border border-white/5">Creator</span>
                            </div>
                        </div>
                    </div>

                    {/* Simplified Coherence Badge */}
                    <div className="flex flex-col items-end">
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">COHÉRENCE</div>
                        <div className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1.5">
                            <span className="text-sm font-bold text-emerald-400">92%</span>
                        </div>
                    </div>
                </div>

                {/* 3. BIO TRANSFORMATION */}
                <div className="mb-6 space-y-3 flex-1 min-h-0">
                    {/* Before */}
                    <div className="relative pl-3 border-l-2 border-slate-700 opacity-50">
                        <p className="text-xs text-slate-400 italic line-through">
                            &quot;Vidéos lifestyle & vlogs...&quot;
                        </p>
                    </div>

                    {/* After */}
                    <div className="relative pl-3 border-l-2 border-violet-500">
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-sm font-semibold text-white leading-relaxed"
                        >
                            &quot;Tech reviews expertes.<br />Sans bullshit.&quot;
                        </motion.p>
                    </div>
                </div>

                {/* 4. BRAND FIT TAGS (Simplified) */}
                <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-3 h-3 text-slate-500" />
                        <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Brand Fit</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center justify-between px-2 py-1.5 rounded bg-green-500/10 border border-green-500/10">
                            <span className="text-[10px] font-medium text-white">Nike</span>
                            <span className="text-[10px] text-emerald-400 font-bold">MATCH</span>
                        </div>
                        <div className="flex items-center justify-between px-2 py-1.5 rounded bg-red-500/5 border border-red-500/10 opacity-60">
                            <span className="text-[10px] font-medium text-slate-400 line-through">Shein</span>
                            <span className="text-[10px] text-red-400 font-bold">NO</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
