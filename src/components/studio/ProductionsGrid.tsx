"use client"

import { useState } from "react"
import { motion, AnimatePresence, type Transition } from "framer-motion"
import { X, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { STUDIO_PRODUCTIONS } from "@/constants/studio"
import { SequentialVideoPlayer } from "@/components/studio/SequentialVideoPlayer"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export function ProductionsGrid() {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [videoMode, setVideoMode] = useState<'process' | 'result'>('result')
    const prefersReducedMotion = useReducedMotion()

    // Reset mode when closing
    const handleClose = () => {
        setSelectedId(null)
        setVideoMode('result')
    }

    // Apple-style spring physics (smooth, deliberate, heavy)
    const springTransition: Transition = {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 1.2
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            {/* LAUNCHER GRID - Asymmetrical Apple-style layout */}
            <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? undefined : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl px-4"
            >
                {/* 1. KRH Hero Card (Spans 2 columns) */}
                {STUDIO_PRODUCTIONS.filter(p => !p.comingSoon).map((prod) => (
                    <motion.div
                        layoutId={`card-${prod.id}`}
                        key={prod.id}
                        onClick={() => setSelectedId(prod.id)}
                        className={cn(
                            "relative aspect-[4/5] sm:aspect-square md:aspect-auto md:min-h-[500px] lg:min-h-[600px] md:col-span-2 rounded-[3rem] overflow-hidden bg-black border border-white/5 transition-all shadow-2xl cursor-pointer"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        transition={springTransition}
                    >
                        {/* Apple style: Very subtle ambient glow */}
                        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10 transition-opacity duration-700 group-hover:opacity-30", prod.gradient)} />

                        {/* Content */}
                        <div className="relative h-full flex flex-col p-8 md:p-12">
                            <div className="flex justify-between items-start">
                                <motion.div
                                    layoutId={`icon-${prod.id}`}
                                    className={cn("w-16 h-16 rounded-3xl flex items-center justify-center text-black shadow-lg bg-gradient-to-br", prod.gradient)}
                                >
                                    <prod.icon className="w-8 h-8" strokeWidth={1.5} />
                                </motion.div>
                                <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white/10 items-center justify-center text-white backdrop-blur-sm">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="mt-auto">
                                <motion.p layoutId={`tagline-${prod.id}`} className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-white/50 mb-3">
                                    {prod.tagline}
                                </motion.p>
                                <motion.h3 layoutId={`title-${prod.id}`} className="text-5xl md:text-7xl font-semibold text-white tracking-tight">
                                    {prod.name}
                                </motion.h3>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* 2. Coming Soon Stacked Column (Spans 1 column) */}
                <div className="md:col-span-1 flex flex-col gap-6 md:gap-8 h-full">
                    {STUDIO_PRODUCTIONS.filter(p => p.comingSoon).map((prod) => (
                        <motion.div
                            key={prod.id}
                            className="relative flex-1 min-h-[220px] md:min-h-0 rounded-[2.5rem] overflow-hidden bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-2xl"
                            transition={springTransition}
                        >
                            {/* Very faint background tint indicating brand color */}
                            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.03]", prod.gradient)} />

                            <div className="relative h-full flex flex-col justify-end p-8">
                                <div className="mt-auto flex flex-col items-start gap-4">
                                    {/* Subtle glowing pill badge */}
                                    <div className="inline-flex self-start items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                                        {/* Pulse dot */}
                                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                                            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-50", prod.color)}></span>
                                            <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", prod.color)}></span>
                                        </span>
                                        <span className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
                                            Coming Soon
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-3xl font-semibold text-white/40 tracking-tight mb-1">
                                            {prod.name}
                                        </h3>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/20">
                                            {prod.tagline}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* EXPANDED "OS Window" VIEW / iOS Sheet */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:p-6 lg:p-12">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-3xl"
                            onClick={handleClose}
                        />

                        {/* Sheet / Window */}
                        {STUDIO_PRODUCTIONS.filter(p => p.id === selectedId).map((prod) => (
                            <motion.div
                                layoutId={`card-${prod.id}`}
                                key={prod.id}
                                className="relative w-full max-w-[100vw] sm:max-w-6xl h-[95vh] md:h-[85vh] bg-[#0A0A0A] rounded-t-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col ring-1 ring-white/10"
                                transition={springTransition}
                            >
                                {/* HEADER - Clean, Apple-style */}
                                <div className="shrink-0 flex items-center justify-between p-6 sm:p-8 z-20 relative">
                                    <div className="flex items-center gap-4">
                                        <motion.div layoutId={`icon-${prod.id}`} className={cn("w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center shadow-inner", prod.color)}>
                                            <prod.icon className="w-6 h-6 text-black" strokeWidth={1.5} />
                                        </motion.div>
                                        <div>
                                            <motion.h3 layoutId={`title-${prod.id}`} className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none mb-1">
                                                {prod.name}
                                            </motion.h3>
                                            <motion.p layoutId={`tagline-${prod.id}`} className="text-[10px] sm:text-[11px] font-semibold text-white/50 tracking-[0.15em] uppercase">
                                                {prod.tagline}
                                            </motion.p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleClose}
                                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all backdrop-blur-md"
                                    >
                                        <X className="w-5 h-5" strokeWidth={1.5} />
                                    </button>
                                </div>

                                {/* CONTENT SCROLL AREA */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.15, duration: 0.4 }}
                                    className="flex-1 overflow-y-auto px-6 sm:px-12 pb-12 pt-2"
                                >
                                    {/* Symmetrical Grid */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto h-full lg:items-center">

                                        {/* LEFT PANE: VIDEO & TOGGLE */}
                                        <div className="flex flex-col items-center w-full max-w-[360px] mx-auto lg:ml-auto">

                                            {/* iOS Segmented Control Style Toggle */}
                                            {prod.showcase && (
                                                <div className="relative flex items-center p-1 bg-[#1A1A1A] rounded-full ring-1 ring-white/5 mb-8 w-full">
                                                    {/* Active Indicator */}
                                                    <div
                                                        className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#333333] rounded-full shadow-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                                        style={{ left: videoMode === 'result' ? '4px' : 'calc(50%)' }}
                                                    />

                                                    <button
                                                        onClick={() => setVideoMode('result')}
                                                        className={cn(
                                                            "flex-1 py-3 rounded-full text-[13px] font-semibold transition-colors relative z-10",
                                                            videoMode === 'result' ? "text-white" : "text-white/40 hover:text-white/80"
                                                        )}
                                                    >
                                                        Rendu Final
                                                    </button>
                                                    <button
                                                        onClick={() => setVideoMode('process')}
                                                        className={cn(
                                                            "flex-1 py-3 rounded-full text-[13px] font-semibold transition-colors relative z-10",
                                                            videoMode === 'process' ? "text-white" : "text-white/40 hover:text-white/80"
                                                        )}
                                                    >
                                                        L'Envers du Décor
                                                    </button>
                                                </div>
                                            )}

                                            <div className="w-full relative">
                                                {/* Primary Video / Featured - Vertical Phone Style */}
                                                {prod.samples && prod.samples.length > 0 ? (
                                                    <div className="relative w-full aspect-[9/16] rounded-[3rem] overflow-hidden shadow-2xl bg-black border-[8px] border-[#151515]">
                                                        {/* Gloss illusion line */}
                                                        <div className="absolute inset-0 z-10 pointer-events-none rounded-[2.5rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]" />

                                                        <SequentialVideoPlayer
                                                            key={videoMode} // Force reset on mode change
                                                            videos={videoMode === 'process' ? prod.samples : (prod.showcase || [])}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-full aspect-[9/16] rounded-[3rem] bg-white/5 border-[8px] border-[#151515] flex items-center justify-center text-white/20">
                                                        <div className="flex flex-col items-center gap-4">
                                                            <prod.icon className="w-12 h-12 opacity-20" />
                                                            <p className="text-sm font-medium">No Media Available</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* RIGHT PANE: INFO */}
                                        <div className="flex flex-col w-full max-w-[500px] mx-auto lg:mx-0 lg:mr-auto justify-center space-y-10 lg:-mt-10">

                                            {/* The Mission */}
                                            <div>
                                                <h4 className="text-[12px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-4">La Mission</h4>
                                                <p className="text-[17px] md:text-[19px] leading-[1.6] text-white/90 font-medium tracking-tight">
                                                    {prod.longDescription}
                                                </p>
                                            </div>

                                            {/* Stats Grid */}
                                            <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/10">
                                                {prod.stats.map((stat, i) => (
                                                    <div key={i} className="flex flex-col gap-1.5">
                                                        <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.1em]">{stat.label}</span>
                                                        <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Services List */}
                                            <div>
                                                <h4 className="text-[12px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-5">Core Services</h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                                                    {prod.services.map((service, i) => (
                                                        <div key={i} className="flex items-center gap-3 text-white/70">
                                                            <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", prod.color)} />
                                                            <span className="text-[15px] font-medium leading-tight">{service}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* CTA */}
                                            {prod.id === 'krh' ? (
                                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                                    <button
                                                        onClick={() => window.location.assign('/questionnaire-brands/index.html')}
                                                        className="w-full sm:flex-1 py-4 px-6 rounded-full font-semibold text-[15px] bg-white text-black transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center text-center"
                                                    >
                                                        Estimer le volume
                                                    </button>
                                                    <div className="w-full sm:flex-1 relative group cursor-not-allowed">
                                                        {/* Subtle Animated Glow Behind Button */}
                                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                                                        <button
                                                            disabled
                                                            className="relative w-full py-4 px-6 rounded-full font-medium text-[15px] text-white/50 bg-white/5 ring-1 ring-inset ring-white/10 flex items-center justify-center gap-2"
                                                        >
                                                            Découvrir le réal
                                                            <span className="ml-1 text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase bg-white/10 px-2 py-0.5 rounded-full">Soon</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="pt-4">
                                                    <button
                                                        onClick={() => window.location.assign('/contact?type=brand')}
                                                        className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-[15px] bg-white text-black transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center"
                                                    >
                                                        Lancer le projet
                                                    </button>
                                                </div>
                                            )}
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
