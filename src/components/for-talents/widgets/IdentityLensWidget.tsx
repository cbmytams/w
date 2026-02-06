"use client"

import { motion } from "framer-motion"
import { Check, X, TrendingUp, Sparkles, ShieldCheck } from "lucide-react"

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
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group">
            {/* 1. ATMOSPHERE: The "Lens" Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />

            {/* Radial gradient that follows mouse (simulated here as static for stability, could be interactive) */}
            <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-purple-600/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-indigo-600/20 blur-[80px] rounded-full opacity-40 pointer-events-none" />

            {/* Noise Texture for premium feel */}
            <div className="absolute inset-0 opacity-[0.03] text-white pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

            <div className="relative z-10 p-6 h-full flex flex-col">

                {/* 2. HEADER: Profile Evolution */}
                <div className="mb-6 relative">
                    {/* Coherence Score - Floating Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-0 right-0 p-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-lg border border-white/10 flex flex-col items-end"
                    >
                        <div className="text-xs sm:text-[10px] text-slate-400 font-medium tracking-wider mb-0.5">COHÉRENCE</div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-2xl font-bold text-white tracking-tight">92%</span>
                            <span className="text-xs sm:text-[10px] font-bold text-green-400 bg-green-400/10 px-1 py-0.5 rounded">+58%</span>
                        </div>
                    </motion.div>

                    <div className="flex items-start gap-4 pr-24">
                        {/* Avatar with Glow */}
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-purple-500/20 relative z-10">
                                T
                            </div>
                            {/* Pulse Effect */}
                            <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-20" />
                        </div>

                        <div>
                            <h4 className="text-lg font-bold text-white mb-1">@talent_name</h4>
                            <div className="flex items-center gap-2 text-xs">
                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/5">Creator</span>
                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/5">Tech</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. BIO TRANSFORMATION */}
                <div className="mb-8 space-y-3">
                    {/* Before State - Blurred/Chaotic */}
                    <div className="relative pl-3 opacity-40 group-hover:opacity-20 transition-opacity duration-500">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-full bg-slate-600 rounded-full" />
                        <p className="text-xs text-slate-300 italic line-through decoration-slate-500">
                            "Je fais des vidéos sur plein de trucs, abonnez-vous..."
                        </p>
                    </div>

                    {/* After State - Sharp/Premium */}
                    <div className="relative pl-3">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "100%" }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute left-0 top-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        />
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-base font-semibold text-white leading-tight"
                        >
                            "Tech pour humains.<br />Reviews sans bullshit."
                        </motion.p>
                    </div>
                </div>

                {/* 4. CONTENT THUMBNAILS (Abstract Representation) */}
                <div className="flex-1 min-h-0 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs sm:text-[10px] font-bold text-slate-400 tracking-widest uppercase">Feed Cohérent</span>
                        <Sparkles className="w-3 h-3 text-purple-400" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 h-24 sm:h-28">
                        {[
                            "from-purple-500/20 to-indigo-500/20",
                            "from-indigo-500/20 to-blue-500/20",
                            "from-blue-500/20 to-cyan-500/20"
                        ].map((gradient, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 + i * 0.1 }}
                                className={`h-full rounded-lg border border-white/5 bg-gradient-to-br ${gradient} p-2 relative overflow-hidden group/card`}
                            >
                                {/* Abstract Content Shapes */}
                                <div className="absolute bottom-2 left-2 w-3/4 h-1.5 rounded-full bg-white/10" />
                                <div className="absolute bottom-5 left-2 w-1/2 h-1.5 rounded-full bg-white/10" />
                                {/* Hover Shine */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-700" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 5. BRAND FIT TAGS */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <ShieldCheck className="w-3 h-3 text-slate-400" />
                        <span className="text-xs sm:text-[10px] font-bold text-slate-400 tracking-widest uppercase">Brand Alignment</span>
                    </div>

                    <div className="space-y-2">
                        {/* Approved Brand */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="flex items-center justify-between p-2 rounded-lg bg-green-500/10 border border-green-500/20"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                <span className="text-sm font-medium text-white">Nike</span>
                            </div>
                            <span className="text-xs sm:text-[10px] text-green-400 font-medium tracking-wide">MATCH ✅</span>
                        </motion.div>

                        {/* Rejected Brand */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="flex items-center justify-between p-2 rounded-lg bg-red-500/5 border border-red-500/10 opacity-60"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                <span className="text-sm font-medium text-slate-400 line-through decoration-red-500/50">Fast Fashion</span>
                            </div>
                            <span className="text-xs sm:text-[10px] text-red-400 font-medium tracking-wide">AVOID ❌</span>
                        </motion.div>
                    </div>
                </div>

            </div>
        </div>
    )
}
