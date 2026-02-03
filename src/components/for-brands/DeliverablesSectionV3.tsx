"use client"

import { useState } from "react"
import { motion, AnimatePresence, type Transition } from "framer-motion"
import { X, ChevronRight, BarChart3 } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/common/SectionHeading"
import { cn } from "@/lib/utils"
import { WIDGETS, type WidgetData } from "@/constants"

export function DeliverablesSectionV3() {
    const [selectedId, setSelectedId] = useState<string | null>(null)

    // Animation transition configuration
    const springTransition: Transition = {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
    }

    return (
        <section className="py-32 px-4 relative">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <SectionHeading
                        title={
                            <>
                                Tout ce que vous obtenez.{" "}
                                <span className="text-gradient-brand">Rien de superflu.</span>
                            </>
                        }
                        subtitle="Chaque élément a une fonction. Zéro bullshit."
                        className="mb-16 md:text-center"
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-[300px]">
                        {WIDGETS.map((widget) => (
                            <motion.div
                                layoutId={`card-${widget.id}`}
                                key={widget.id}
                                onClick={() => setSelectedId(widget.id)}
                                transition={springTransition}
                                className={cn(
                                    widget.colSpan,
                                    "relative cursor-pointer group rounded-[32px] overflow-hidden card-glass",
                                    "hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                                )}
                            >
                                {/* Background Gradient Mesh */}
                                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br", widget.gradient)} />

                                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                                    <div
                                        className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br", widget.gradient)}
                                    >
                                        <widget.icon className="w-6 h-6" />
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight className="w-4 h-4 ml-0.5" />
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{widget.title}</h3>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{widget.subtitle}</p>
                                </div>

                                {/* Decorational Elements specific to widgets */}
                                {widget.id === 'performance' && (
                                    <div className="absolute right-[-20px] bottom-[40px] opacity-20 pointer-events-none">
                                        <BarChart3 className="w-32 h-32 text-green-500" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <AnimatePresence>
                        {selectedId && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedId(null)}
                                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                                />

                                {/* Expanded Card */}
                                {WIDGETS.filter(w => w.id === selectedId).map(widget => (
                                    <motion.div
                                        layoutId={`card-${widget.id}`}
                                        key={widget.id}
                                        transition={springTransition}
                                        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[40px] overflow-hidden shadow-2xl z-10 flex flex-col"
                                    >
                                        {/* Header */}
                                        <div className={cn("relative p-8 flex flex-col justify-between shrink-0 bg-gradient-to-br min-h-[220px]", widget.gradient)}>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setSelectedId(null) }}
                                                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors z-20"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>

                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }}
                                                transition={{ delay: 0.1, duration: 0.3 }}
                                                className="w-16 h-16 rounded-3xl flex items-center justify-center bg-white/20 backdrop-blur-md text-white shadow-xl mb-auto"
                                            >
                                                <widget.icon className="w-8 h-8" />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                                                transition={{ delay: 0.2, duration: 0.3 }}
                                            >
                                                <h2 className="text-4xl font-bold text-white mb-2">{widget.title}</h2>
                                                <p className="text-white/80 font-medium text-lg">{widget.subtitle}</p>
                                            </motion.div>
                                        </div>

                                        {/* Content body with delayed entrance */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                            transition={{ delay: 0.15, duration: 0.4 }}
                                            className="p-10 bg-white dark:bg-zinc-900 flex-1 overflow-y-auto"
                                        >
                                            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8 leading-relaxed">
                                                {widget.content}
                                            </p>

                                            <div className="space-y-4">
                                                {widget.details.map((detail, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.3 + (i * 0.05) }}
                                                        className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800"
                                                    >
                                                        <div className={cn("w-2 h-2 rounded-full", widget.color)} />
                                                        <span className="font-semibold text-gray-800 dark:text-gray-200">{detail}</span>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <motion.button
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                onClick={(e) => { e.stopPropagation(); setSelectedId(null) }}
                                                className={cn(
                                                    "mt-10 w-full py-4 rounded-full text-white font-bold text-lg hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-xl bg-gradient-to-r",
                                                    widget.gradient
                                                )}
                                            >
                                                Fermer
                                            </motion.button>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </Container>
        </section>
    )
}
