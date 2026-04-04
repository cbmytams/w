"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { EASING, DURATION } from "@/lib/easing"
import { Target, Zap, Handshake, Compass } from "lucide-react"

// Match the existing pain tags
const PAIN_POINTS = [
    {
        id: "direction",
        label: "Direction floue",
        icon: Compass,
        description: "Manque de vision à long terme. Croissance stagne.",
        path: "M 0 160 C 150 160, 200 60, 300 60 C 400 60, 500 120, 800 140",
        color: "from-rose-500/20 to-rose-500/0",
        stroke: "text-rose-500"
    },
    {
        id: "production",
        label: "Production instable",
        icon: Zap,
        description: "Irrégularité d'upload. L'algorithme pénalise.",
        path: "M 0 160 C 150 160, 200 60, 300 60 L 350 140 L 400 40 L 450 160 L 500 80 C 600 80, 700 150, 800 150",
        color: "from-amber-500/20 to-amber-500/0",
        stroke: "text-amber-500"
    },
    {
        id: "deals",
        label: "Deals mal négociés",
        icon: Handshake,
        description: "Valeur sous-estimée. Frustration financière.",
        path: "M 0 160 C 150 160, 200 60, 300 60 C 350 60, 400 150, 800 160",
        color: "from-red-500/20 to-red-500/0",
        stroke: "text-red-500"
    },
    {
        id: "partnerships",
        label: "Partenariats hors-sujet",
        icon: Target,
        description: "Perte d'authenticité. Audience désengagée.",
        path: "M 0 160 C 150 160, 200 60, 300 60 C 400 60, 450 180, 600 200 C 700 200, 750 180, 800 210",
        color: "from-orange-500/20 to-orange-500/0",
        stroke: "text-orange-500"
    }
]

const DEFAULT_PATH = "M 0 160 C 150 160, 200 60, 300 60 C 450 60, 600 40, 800 20"
const DEFAULT_COLOR = "from-emerald-500/20 to-emerald-500/0"
const DEFAULT_STROKE = "text-emerald-500"

export function CreatorTrajectoryWidget() {
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    const activePoint = hoveredId ? PAIN_POINTS.find(p => p.id === hoveredId) : null
    const currentPath = activePoint ? activePoint.path : DEFAULT_PATH
    const currentColor = activePoint ? activePoint.color : DEFAULT_COLOR
    const currentStroke = activePoint ? activePoint.stroke : DEFAULT_STROKE

    return (
        <div className="w-full max-w-4xl mx-auto mt-16 mb-8 group/widget">
            {/* Widget Container - Liquid Glass Style */}
            <div className={cn(
                "relative rounded-3xl overflow-hidden",
                "bg-slate-100/50 dark:bg-[#0b111a]/50",
                "backdrop-blur-xl",
                "border border-slate-200/50 dark:border-white/10",
                "shadow-2xl shadow-slate-200/20 dark:shadow-black/40",
                "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            )}>
                
                {/* Background Atmosphere */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-white/5 dark:to-transparent pointer-events-none" />
                
                {/* Top Bar - Simulated native widget look */}
                <div className="px-6 py-4 border-b border-slate-200/50 dark:border-white/5 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Trajectoire Créateur
                    </div>
                    <div className={cn(
                        "text-xs px-2.5 py-1 rounded-full font-medium transition-colors duration-500",
                        activePoint 
                            ? "bg-rose-100/50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                            : "bg-emerald-100/50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    )}>
                        {activePoint ? "Système défaillant" : "Système sain"}
                    </div>
                </div>

                {/* Main Graph Area */}
                <div className="relative h-[280px] w-full overflow-hidden">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between py-8 px-6 opacity-20 pointer-events-none">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-full h-px bg-slate-400 dark:bg-slate-500 border-dashed" />
                        ))}
                    </div>

                    {/* SVG Chart */}
                    <svg 
                        viewBox="0 0 800 240" 
                        preserveAspectRatio="none" 
                        className="absolute inset-0 w-full h-full pt-8"
                    >
                        {/* Gradient Definition */}
                        <defs>
                            <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" className={cn(
                                    "transition-all duration-700",
                                    activePoint ? "stop-color-rose-500" : "stop-color-emerald-500"
                                )} stopOpacity={0.2} />
                                <stop offset="100%" className={cn(
                                    "transition-all duration-700",
                                    activePoint ? "stop-color-rose-500" : "stop-color-emerald-500"
                                )} stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        {/* Animated Area Fill */}
                        <motion.path
                            d={`${currentPath} L 800 240 L 0 240 Z`}
                            fill="url(#area-gradient)"
                            initial={false}
                            animate={{ d: `${currentPath} L 800 240 L 0 240 Z` }}
                            transition={{ duration: 0.8, ease: EASING.responsive }}
                            className="transition-colors duration-700"
                        />
                        
                        {/* Animated Stroke */}
                        <motion.path
                            d={currentPath}
                            fill="none"
                            strokeWidth="3"
                            initial={false}
                            animate={{ d: currentPath }}
                            transition={{ duration: 0.8, ease: EASING.responsive }}
                            className={cn("transition-colors duration-700 stroke-current", currentStroke)}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        
                        {/* Dots indicating "Talent" vs "System" phases */}
                        <circle cx="200" cy="60" r="4" className={cn("fill-current transition-colors duration-700", currentStroke)} />
                        <motion.circle 
                            animate={{ 
                                cx: "800", 
                                cy: activePoint ? currentPath.split(", ").pop()?.split(" ").pop() || "20" : "20" 
                            }}
                            transition={{ duration: 0.8, ease: EASING.responsive }}
                            r="4" 
                            className={cn("fill-current transition-colors duration-700", currentStroke)} 
                        />
                    </svg>

                    {/* Labels on graph */}
                    <div className="absolute top-20 left-[15%] text-sm font-medium text-slate-500 dark:text-slate-400">
                        Phase Talent
                        <div className="text-xs text-slate-400 dark:text-slate-500 italic mt-0.5">La croissance initiale</div>
                    </div>
                </div>

                {/* Interactive Dock (Pain Points) */}
                <div className="grid grid-cols-2 md:grid-cols-4 border-t border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
                    {PAIN_POINTS.map((point) => {
                        const isHovered = hoveredId === point.id;
                        const Icon = point.icon;
                        
                        return (
                            <div
                                key={point.id}
                                onMouseEnter={() => setHoveredId(point.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={cn(
                                    "relative p-4 md:p-6 cursor-crosshair border-r last:border-r-0 border-b md:border-b-0 border-slate-200/50 dark:border-white/5",
                                    "transition-colors duration-300",
                                    isHovered ? "bg-white/50 dark:bg-white/[0.03]" : "hover:bg-black/[0.02] dark:hover:bg-white/[0.01]"
                                )}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={cn(
                                        "p-2 rounded-lg transition-colors duration-300",
                                        isHovered 
                                            ? "bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400" 
                                            : "bg-slate-200/50 dark:bg-white/5 text-slate-500 dark:text-slate-400"
                                    )}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <span className={cn(
                                        "text-sm font-semibold transition-colors duration-300",
                                        isHovered ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"
                                    )}>
                                        {point.label}
                                    </span>
                                </div>
                                
                                <div className={cn(
                                    "text-xs leading-relaxed transition-all duration-300",
                                    isHovered ? "text-slate-600 dark:text-slate-400 opacity-100" : "text-slate-400 dark:text-slate-500 opacity-70"
                                )}>
                                    {point.description}
                                </div>

                                {/* Active state bottom line */}
                                <div className={cn(
                                    "absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 transition-transform duration-300 origin-left",
                                    isHovered ? "scale-x-100" : "scale-x-0"
                                )} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
