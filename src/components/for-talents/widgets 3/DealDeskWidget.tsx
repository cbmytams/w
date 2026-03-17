"use client"

import { motion } from "framer-motion"
import { Shield, AlertTriangle, Lock, FileText, ArrowRight } from "lucide-react"

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
        <div className="w-full h-full relative overflow-hidden bg-slate-900 rounded-2xl group border border-white/5">
            {/* 1. ATMOSPHERE: The Vault */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 z-0" />

            {/* Security Glow */}
            <div className="absolute top-[-50%] right-[-50%] w-[400px] h-[400px] bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 p-5 h-full flex flex-col">

                {/* 2. HEADER: Risk Assessment (Responsive Grid) */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                    {/* Standard Contract */}
                    <div className="p-2.5 bg-red-500/5 rounded-xl border border-red-500/10 flex flex-col justify-between group/risk">
                        <div className="flex items-center gap-1.5 mb-1">
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                            <span className="text-[9px] font-bold text-red-400 tracking-wider">STANDARD</span>
                        </div>
                        <div className="text-[10px] text-slate-500 leading-tight">
                            Clauses abusives<br />& flou juridique
                        </div>
                    </div>

                    {/* Wafia Protection */}
                    <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-1.5 mb-1">
                            <Shield className="w-3 h-3 text-emerald-400" />
                            <span className="text-[9px] font-bold text-emerald-400 tracking-wider">WAFIA</span>
                        </div>
                        <div className="text-[10px] text-white font-medium">
                            Blindé.<br />Zéro risque.
                        </div>
                    </div>
                </div>

                {/* 3. NEGOTIATION TABLE (Glassmorphism) */}
                <div className="flex-1 space-y-2 mb-2 min-h-0 overflow-y-auto custom-scrollbar pr-1">
                    {deals.map((item, i) => (
                        <motion.div
                            key={item.term}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.1 }}
                            className="bg-white/5 rounded-lg p-2 border border-white/5 hover:border-emerald-500/30 transition-colors group/row"
                        >
                            <div className="flex items-center gap-2 mb-1.5">
                                <item.icon className="w-3 h-3 text-slate-400 group-hover/row:text-emerald-400 transition-colors" />
                                <span className="text-[10px] font-bold text-slate-300 uppercase">{item.term}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-[10px] text-slate-500 line-through decoration-red-500/40 truncate max-w-[45%]">
                                    {item.offer}
                                </div>
                                <ArrowRight className="w-3 h-3 text-slate-600" />
                                <div className="text-[10px] font-bold text-emerald-400 text-right truncate max-w-[45%]">
                                    {item.counter}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 4. VALUE PROTECTION TICKER */}
                <div className="mt-auto pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-[9px] text-emerald-500/80 font-bold tracking-wider uppercase">Valeur Sécurisée</div>
                            <div className="text-[9px] text-slate-500">Sur ce contrat</div>
                        </div>
                        <div className="text-xl font-bold text-white tracking-tight flex items-baseline gap-0.5">
                            <span className="text-emerald-500 text-sm font-bold">+</span>
                            18
                            <span className="text-sm text-emerald-500/80 font-medium">K€</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


