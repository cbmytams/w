"use client"

import { motion } from "framer-motion"
import { Shield, AlertTriangle, Check, X, Lock, FileText } from "lucide-react"

/**
 * Deal Desk Widget (Premium Commercial Redesign)
 * Visualizes the negotiation power and protection Wafia provides.
 * Features:
 * - "The Vault" atmospheric background (Emerald/Security)
 * - Contrast between "Risky Standard" and "Protected Asset"
 * - Digital glass negotiation table
 * - Value Protection Ticker
 */
export function DealDeskWidget() {
    const deals = [
        {
            term: "Droits Image",
            offer: "Perpétuité (Danger)",
            counter: "12 mois renew",
            status: "negotiated",
            icon: FileText
        },
        {
            term: "Exclusivité",
            offer: "Totale 2 ans",
            counter: "Sectorielle 6 mois",
            status: "negotiated",
            icon: Lock
        },
        {
            term: "Usage",
            offer: "TV + Digital",
            counter: "Digital seul",
            status: "negotiated",
            icon: Shield
        }
    ]

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group">
            {/* 1. ATMOSPHERE: The Vault */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />

            {/* Security Grid Background */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />

            {/* Ambient Glows */}
            <div className="absolute top-[-20%] right-[-20%] w-[400px] h-[400px] bg-emerald-900/40 blur-[100px] rounded-full pointer-events-none" />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] text-white pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

            <div className="relative z-10 p-6 h-full flex flex-col">

                {/* 2. HEADER: Risk Assessment */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* Standard Contract */}
                    <div className="p-3 bg-red-500/5 rounded-xl border border-red-500/10 flex flex-col justify-between group/risk">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                            <span className="text-xs sm:text-[10px] font-bold text-red-400 tracking-wider">STANDARD</span>
                        </div>
                        <div className="text-xs text-slate-400 leading-tight">
                            "Signez ici..."<br />
                            <span className="text-red-500/70 text-xs sm:text-[10px]">Clause abusive cachée</span>
                        </div>
                        {/* Glitch Overlay on Hover */}
                        <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover/risk:opacity-100 mix-blend-overlay transition-opacity" />
                    </div>

                    {/* Wafia Protection */}
                    <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 relative overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        <div className="flex items-center gap-2 mb-1">
                            <Shield className="w-3 h-3 text-emerald-400" />
                            <span className="text-xs sm:text-[10px] font-bold text-emerald-400 tracking-wider">PROTECTED</span>
                        </div>
                        <div className="text-xs text-emerald-100 font-medium">
                            Négociation experte
                        </div>
                    </div>
                </div>

                {/* 3. NEGOTIATION TABLE (Glassmorphism) */}
                <div className="flex-1 space-y-2 mb-4">
                    <div className="flex items-center justify-between px-2 mb-1">
                        <span className="text-xs sm:text-[10px] font-bold text-slate-500 tracking-wider">CLAUSE</span>
                        <span className="text-xs sm:text-[10px] font-bold text-slate-500 tracking-wider">CONTRE-OFFRE</span>
                    </div>

                    {deals.map((item, i) => (
                        <motion.div
                            key={item.term}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.15 }}
                            className="bg-slate-800/60 rounded-lg p-2 border border-white/5 flex items-center justify-between hover:bg-slate-800/80 transition-colors group/row"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded bg-slate-700/50 flex items-center justify-center text-slate-400 group-hover/row:text-emerald-400 transition-colors">
                                    <item.icon className="w-3 h-3" />
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-slate-300">{item.term}</div>
                                    <div className="text-xs sm:text-[10px] text-red-400/60 line-through decoration-red-500/30">{item.offer}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-right">
                                    <div className="text-xs font-bold text-emerald-400">{item.counter}</div>
                                </div>
                                <Check className="w-3 h-3 text-emerald-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 4. VALUE PROTECTION TICKER */}
                <div className="mt-auto relative rounded-xl overflow-hidden border border-emerald-500/30">
                    <div className="absolute inset-0 bg-emerald-900/30 backdrop-blur-sm" />

                    {/* Animated Scanline */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-emerald-400/50 shadow-[0_0_10px_#34d399] animate-[scan_3s_linear_infinite]" />

                    <div className="relative p-4 flex items-center justify-between">
                        <div>
                            <div className="text-xs sm:text-[10px] text-emerald-400/80 font-bold tracking-widest uppercase mb-0.5">Valeur Sécurisée</div>
                            <div className="text-xs sm:text-[10px] text-slate-400">Sur ce contrat</div>
                        </div>
                        <div className="text-3xl font-bold text-white tracking-tight flex items-baseline gap-1">
                            <span className="text-emerald-500 text-lg">+</span>
                            18
                            <span className="text-lg text-emerald-400">K€</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
