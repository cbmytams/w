"use client"

import { motion } from "framer-motion"
import { Compass, Zap, Handshake, Target, ArrowRight } from "lucide-react"
import { EASING, DURATION } from "@/lib/easing"
import { cn } from "@/lib/utils"

const SYSTEM_FAILURES = [
    {
        id: "direction",
        label: "Direction",
        title: "Direction floue.",
        description: "Sans vision à long terme, la croissance d'une audience finit inévitablement par stagner.",
        icon: Compass,
        className: "md:col-span-2",
        iconColor: "text-fuchsia-500",
        bgIcon: "from-fuchsia-500/10 to-transparent"
    },
    {
        id: "production",
        label: "Opérations",
        title: "Production instable.",
        description: "Le rythme de publication chute. L'algorithme pénalise.",
        icon: Zap,
        className: "md:col-span-1",
        iconColor: "text-amber-500",
        bgIcon: "from-amber-500/10 to-transparent"
    },
    {
        id: "deals",
        label: "Business",
        title: "Deals mal négociés.",
        description: "La valeur est sous-estimée. Frustration financière garantie.",
        icon: Handshake,
        className: "md:col-span-1",
        iconColor: "text-rose-500",
        bgIcon: "from-rose-500/10 to-transparent"
    },
    {
        id: "partnerships",
        label: "Image",
        title: "Partenariats hors-sujet.",
        description: "L'authenticité se perd. L'audience se désengage rapidement.",
        icon: Target,
        className: "md:col-span-2",
        iconColor: "text-violet-500",
        bgIcon: "from-violet-500/10 to-transparent"
    }
]

export function SystemBentoWidget() {
    return (
        <div className="w-full max-w-5xl mx-auto mt-16 md:mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {SYSTEM_FAILURES.map((item, index) => {
                    const Icon = item.icon
                    
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: DURATION.slow,
                                delay: index * 0.1,
                                ease: EASING.entrance
                            }}
                            className={cn(
                                "group relative overflow-hidden rounded-3xl",
                                "bg-slate-50/80 dark:bg-white/[0.02]",
                                "backdrop-blur-xl",
                                "border border-slate-200/50 dark:border-white/[0.05]",
                                "hover:bg-white dark:hover:bg-white/[0.04]",
                                "transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                "p-8 md:p-10 flex flex-col justify-between min-h-[280px]",
                                item.className
                            )}
                        >
                            {/* Abstract gradient glow in background */}
                            <div className={cn(
                                "absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 bg-gradient-to-br opacity-50 transition-opacity duration-700 group-hover:opacity-100",
                                item.bgIcon
                            )} />

                            {/* Top row: Badge */}
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={cn(
                                        "p-2 rounded-full bg-white dark:bg-white/10 shadow-sm border border-slate-100 dark:border-white/5",
                                        item.iconColor
                                    )}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500">
                                        {item.label}
                                    </span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                            </div>

                            {/* Bottom row: Content */}
                            <div className="relative z-10 mt-12 md:mt-16">
                                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800 dark:text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
