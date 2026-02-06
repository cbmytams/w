"use client"

import { motion } from "framer-motion"
import { Check, Zap, Crown, Star, Gem, ShieldCheck } from "lucide-react"

/**
 * Pricing & Offers Widget (Premium Commercial Redesign)
 * Visualizes the shift from opaque market pricing to clear, premium value tiers.
 * Features:
 * - "Luxury" atmospheric background (Gold/Purple glimmers)
 * - Three clear tiers with "Standard" emphasized
 * - High-end card styling with glassmorphism
 */
export function PricingOffersWidget() {
    const packs = [
        {
            name: "Starter",
            icon: Star,
            price: "3K-5K",
            color: "from-slate-400 to-slate-500",
            features: ["1 vidéo", "1 plateforme", "30 jours usage"],
            glow: "shadow-slate-500/0"
        },
        {
            name: "Standard",
            icon: Zap,
            price: "8K-15K",
            color: "from-purple-500 to-violet-600",
            features: ["3 vidéos", "Multi-plateformes", "6 mois usage", "Whitelisting"],
            recommended: true,
            glow: "shadow-purple-500/20"
        },
        {
            name: "Premium",
            icon: Crown,
            price: "20K+",
            color: "from-amber-400 to-yellow-600",
            features: ["Série complète", "Exclusivité", "12 mois usage", "UGC illimité"],
            premium: true,
            glow: "shadow-amber-500/20"
        }
    ]

    const addOns = [
        { name: "UGC (30s)", price: "+2K" },
        { name: "Whitelisting", price: "+3K" },
        { name: "Exclusivité 3 mois", price: "+5K" }
    ]

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group">
            {/* 1. ATMOSPHERE: Luxury Glimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />

            {/* Spotlights behind cards */}
            <div className="absolute top-0 left-1/4 w-32 h-64 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-40 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] text-white pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

            <div className="relative z-10 p-6 h-full flex flex-col overflow-y-auto custom-scrollbar">

                {/* 2. HEADER: Market vs Wafia (Compact) */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 opacity-50">
                        <div className="text-xs sm:text-[10px] text-slate-500 uppercase tracking-widest font-bold">Marché</div>
                        <div className="h-px w-8 bg-slate-700" />
                        <div className="text-xs sm:text-[10px] text-slate-500 italic">"Tarifs au doigt mouillé"</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-xs sm:text-[10px] text-purple-400 uppercase tracking-widest font-bold">Wafia</div>
                        <div className="h-px w-8 bg-purple-500/50" />
                        <div className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs sm:text-[10px] text-purple-300 font-medium">
                            Transparent & Scalable
                        </div>
                    </div>
                </div>

                {/* 3. PACKS GRID */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {packs.map((pack, i) => {
                        const Icon = pack.icon
                        return (
                            <motion.div
                                key={pack.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ scale: pack.recommended ? 1.05 : 1.02 }}
                                className={`relative rounded-xl p-3 border transition-all duration-300 group/card cursor-pointer flex flex-col h-full
                                    ${pack.recommended
                                        ? "bg-slate-800/80 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.15)] z-10"
                                        : pack.premium
                                            ? "bg-gradient-to-br from-slate-900 to-slate-800 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.05)]"
                                            : "bg-slate-900/50 border-white/5 hover:border-white/10"
                                    }`}
                            >
                                {/* Recommended Badge */}
                                {pack.recommended && (
                                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-[9px] font-bold rounded-full shadow-lg whitespace-nowrap z-20">
                                        RECOMMANDÉ
                                    </div>
                                )}

                                {/* Premium Atmosphere */}
                                {pack.premium && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-xl pointer-events-none" />
                                )}

                                {/* Icon & Name */}
                                <div className="mb-3 text-center">
                                    <div className={`w-8 h-8 mx-auto rounded-lg bg-gradient-to-br ${pack.color} flex items-center justify-center mb-2 shadow-lg`}>
                                        <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    <h4 className={`font-bold text-xs ${pack.premium ? "text-amber-100" : "text-white"}`}>
                                        {pack.name}
                                    </h4>
                                </div>

                                {/* Price */}
                                <div className="text-center mb-4">
                                    <div className={`text-sm font-bold ${pack.recommended ? "text-purple-300" : pack.premium ? "text-amber-300" : "text-slate-300"
                                        }`}>
                                        {pack.price}
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-1.5 flex-1">
                                    {pack.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-1.5 text-xs sm:text-[10px] text-slate-400 group-hover/card:text-slate-300 transition-colors">
                                            <Check className={`w-3 h-3 shrink-0 ${pack.recommended ? "text-purple-400" : pack.premium ? "text-amber-400" : "text-slate-500"}`} />
                                            <span className="leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )
                    })}
                </div>

                {/* 4. ADD-ONS (Modular Blocks) */}
                <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                        <Gem className="w-3 h-3 text-pink-400" />
                        <div className="text-xs sm:text-[10px] font-bold text-slate-500 tracking-widest">
                            BOOSTERS
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {addOns.map((addon, i) => (
                            <motion.div
                                key={addon.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 border border-white/5 hover:bg-white/10 hover:border-purple-500/20 transition-all group/addon"
                            >
                                <span className="text-xs text-slate-300 font-medium group-hover/addon:text-white transition-colors">
                                    {addon.name}
                                </span>
                                <span className="text-xs font-semibold text-purple-400">
                                    {addon.price}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
