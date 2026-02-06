"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, ArrowUpRight, Globe, Shield, Zap } from "lucide-react"

type PartnerStatus = "Live" | "Premium" | "Direct"
type PartnerCategory = "DSP" | "Label" | "Access"

interface Partner {
    id: string
    name: string
    category: PartnerCategory
    status: PartnerStatus
    reach: string
    icon: string
}

const PARTNERS: Partner[] = [
    { id: "1", name: "Spotify", category: "DSP", status: "Live", reach: "Global", icon: "/logos/talents/spotify.svg" },
    { id: "2", name: "Universal", category: "Label", status: "Direct", reach: "Major", icon: "/logos/talents/universal-music-group.svg" },
    { id: "3", name: "Apple Music", category: "DSP", status: "Live", reach: "Global", icon: "/logos/talents/apple-music.svg" },
    { id: "4", name: "Believe", category: "Access", status: "Premium", reach: "Network", icon: "/logos/talents/believe.svg" },
    { id: "5", name: "TikTok", category: "DSP", status: "Live", reach: "Viral", icon: "/logos/talents/tiktok.svg" }, // Assuming tiktok icon exists or fallback
    { id: "6", name: "Warner", category: "Label", status: "Direct", reach: "Major", icon: "/logos/talents/warner-music-group.svg" },
]

export function SmartDistributionTable() {
    const [hoveredRow, setHoveredRow] = useState<string | null>(null)

    return (
        <div className="w-full h-full flex flex-col bg-white dark:bg-zinc-900 overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center border border-orange-100 dark:border-orange-500/20">
                        <Globe size={20} className="text-orange-500" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Network Status</div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">Distribution & Access</div>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">System Operational</span>
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/50 dark:bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-white/5">
                <div className="col-span-5">Partner</div>
                <div className="col-span-3">Type</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Reach</div>
            </div>

            {/* Table Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {PARTNERS.map((partner, index) => (
                    <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onMouseEnter={() => setHoveredRow(partner.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`
                            grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-gray-50 dark:border-white/5 cursor-default transition-colors duration-200
                            ${hoveredRow === partner.id ? "bg-gray-50 dark:bg-white/5" : "bg-transparent"}
                        `}
                    >
                        {/* Name & Icon */}
                        <div className="col-span-5 flex items-center gap-3">
                            <div className="w-8 h-8 relative rounded bg-white dark:bg-white/10 p-1 flex items-center justify-center border border-gray-100 dark:border-white/5">
                                {/* Fallback icon if image fails or just use generic for now to be safe, but code implied paths exist. Use simple img tag to avoid next/image complexity with unknown domains if any, but local paths are fine. */}
                                <img src={partner.icon} alt={partner.name} className="w-full h-full object-contain brightness-0 dark:brightness-200 opacity-80" /> 
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{partner.name}</span>
                        </div>

                        {/* Category */}
                        <div className="col-span-3">
                            <span className={`
                                inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                                ${partner.category === 'Label' ? 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-300' : 
                                  partner.category === 'DSP' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300' :
                                  'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300'}
                            `}>
                                {partner.category}
                            </span>
                        </div>

                        {/* Status */}
                        <div className="col-span-2">
                             <div className="flex items-center gap-1.5">
                                {partner.status === 'Premium' && <Zap size={12} className="text-amber-500" />}
                                {partner.status === 'Direct' && <Shield size={12} className="text-emerald-500" />}
                                {partner.status === 'Live' && <Check size={12} className="text-blue-500" />}
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{partner.status}</span>
                             </div>
                        </div>

                        {/* Reach */}
                        <div className="col-span-2 text-right">
                             <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{partner.reach}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            {/* Footer / Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent pointer-events-none" />
        </div>
    )
}
