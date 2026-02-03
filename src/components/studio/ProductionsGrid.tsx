"use client"

import { useState } from "react"
import { motion, AnimatePresence, type Transition } from "framer-motion"
import { X, ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { STUDIO_PRODUCTIONS, type StudioProduction } from "@/constants/studio"

export function ProductionsGrid() {
    const [selectedId, setSelectedId] = useState<string | null>(null)

    // Spring physics configuration for iOS-like feel
    const springTransition: Transition = {
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 0.8
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full max-w-7xl h-full max-h-[60vh] md:max-h-[600px]">
                {STUDIO_PRODUCTIONS.map((prod) => (
                    <motion.div
                        layoutId={`card-${prod.id}`}
                        key={prod.id}
                        onClick={() => setSelectedId(prod.id)}
                        className="relative w-full md:w-1/3 h-full cursor-pointer group rounded-[32px] overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all shadow-2xl"
                        whileHover={{ scale: 1.02, y: -10 }}
                        whileTap={{ scale: 0.98 }}
                        transition={springTransition}
                    >
                        {/* Background Gradient & Image Placeholder */}
                        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-500", prod.gradient, "group-hover:opacity-40")} />

                        {/* Noise Texture Overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />

                        <div className="relative h-full flex flex-col p-6 md:p-8">
                            {/* Header (Top) */}
                            <div className="flex justify-between items-start mb-4">
                                <motion.div
                                    layoutId={`icon-${prod.id}`}
                                    className={cn("w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shadow-xl bg-gradient-to-br", prod.gradient)}
                                >
                                    <prod.icon className="w-6 h-6 md:w-7 md:h-7" />
                                </motion.div>
                                <div className="hidden md:flex text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/5 px-2 py-1 rounded-full backdrop-blur-md">
                                    App
                                </div>
                            </div>

                            {/* Title (Bottom) */}
                            <div className="mt-auto">
                                <motion.p
                                    layoutId={`tagline-${prod.id}`}
                                    className="text-xs md:text-sm font-medium text-white/60 mb-2 uppercase tracking-wide"
                                >
                                    {prod.tagline}
                                </motion.p>
                                <motion.h3
                                    layoutId={`title-${prod.id}`}
                                    className="text-3xl md:text-4xl font-black text-white leading-none tracking-tight"
                                >
                                    {prod.name}
                                </motion.h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center pointer-events-none p-4 md:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-2xl pointer-events-auto"
                            onClick={() => setSelectedId(null)}
                        />

                        {/* Expanded Card */}
                        {STUDIO_PRODUCTIONS.filter(p => p.id === selectedId).map((prod) => (
                            <motion.div
                                layoutId={`card-${prod.id}`}
                                key={prod.id}
                                className="relative w-full max-w-4xl h-full md:h-[85vh] bg-zinc-950 rounded-[40px] overflow-hidden shadow-2xl flex flex-col pointer-events-auto ring-1 ring-white/10"
                                transition={springTransition}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null) }}
                                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors z-20 backdrop-blur-md border border-white/10"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Header Section */}
                                <div className={cn("relative p-8 md:p-12 shrink-0 min-h-[250px] md:min-h-[350px] flex flex-col justify-end", prod.color)}>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />

                                    <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-end">
                                        <motion.div
                                            layoutId={`icon-${prod.id}`}
                                            className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] flex items-center justify-center bg-white/10 backdrop-blur-md text-white shadow-2xl shrink-0 border border-white/20"
                                        >
                                            <prod.icon className="w-10 h-10 md:w-12 md:h-12" />
                                        </motion.div>
                                        <div>
                                            <motion.p
                                                layoutId={`tagline-${prod.id}`}
                                                className="text-white/80 font-bold mb-2 uppercase tracking-wide text-sm"
                                            >
                                                {prod.tagline}
                                            </motion.p>
                                            <motion.h3
                                                layoutId={`title-${prod.id}`}
                                                className="text-5xl md:text-7xl font-black text-white tracking-tight"
                                            >
                                                {prod.name}
                                            </motion.h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Body */}
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                    transition={{ delay: 0.2, duration: 0.5, type: "spring", damping: 25 }}
                                    className="flex-1 overflow-y-auto p-8 md:p-12 bg-zinc-950"
                                >
                                    <div className="flex flex-col md:flex-row gap-12">
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">À propos</h4>
                                            <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-medium mb-12">
                                                {prod.longDescription}
                                            </p>

                                            <button className={cn("w-full py-6 rounded-2xl font-bold text-lg text-white transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl flex items-center justify-center gap-3", prod.color)}>
                                                Lancer le projet <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="md:w-80 shrink-0 space-y-10">
                                            <div>
                                                <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Performance</h4>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {prod.stats.map((stat, i) => (
                                                        <div key={i} className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800 flex justify-between items-center">
                                                            <div className="text-xs text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                                                            <div className="text-lg font-bold text-white">{stat.value}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Services</h4>
                                                <div className="space-y-3">
                                                    {prod.services.map((service, i) => (
                                                        <div key={i} className="flex items-center gap-3 text-zinc-400 group">
                                                            <div className={cn("w-1.5 h-1.5 rounded-full transition-all group-hover:scale-150", prod.color)} />
                                                            <span className="text-base group-hover:text-white transition-colors">{service}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
