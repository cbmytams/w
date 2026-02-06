"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Circle, ArrowRight } from "lucide-react"
import type { TALENT_SERVICES } from "@/constants"

type Service = typeof TALENT_SERVICES.services[number]

interface ServiceDetailDrawerProps {
    service: Service | null
    onClose: () => void
}

export function ServiceDetailDrawer({ service, onClose }: ServiceDetailDrawerProps) {
    // Lock body scroll when drawer is open
    useEffect(() => {
        if (service) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [service])

    // Handle Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && service) {
                onClose()
            }
        }

        window.addEventListener("keydown", handleEscape)
        return () => window.removeEventListener("keydown", handleEscape)
    }, [service, onClose])

    if (!service || !service.detail) return null

    const { detail } = service

    return (
        <AnimatePresence>
            {service && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-screen w-full sm:w-[90%] md:w-[700px] lg:w-[800px] bg-white dark:bg-slate-900 z-50 overflow-y-auto shadow-2xl"
                    >
                        <div className="relative min-h-full">
                            {/* Header with Close Button */}
                            <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-6 sm:px-8 py-6">
                                <button
                                    onClick={onClose}
                                    className="absolute right-6 top-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5 text-slate-600 dark:text-white/70" />
                                </button>

                                <div className="pr-12">
                                    {/* Icon + Title */}
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="text-5xl">{service.icon}</div>
                                        <div>
                                            <div className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 tracking-widest mb-1">
                                                {service.number}
                                            </div>
                                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                                                {service.headline}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Gradient Line */}
                                    <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full w-24" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-6 sm:px-8 py-8 space-y-10">
                                {/* Intro */}
                                {detail.intro && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <p className="text-lg text-slate-700 dark:text-white/80 leading-relaxed italic border-l-4 border-purple-500 pl-4">
                                            {detail.intro}
                                        </p>
                                    </motion.div>
                                )}

                                {/* What We Do */}
                                {detail.whatWeDo && detail.whatWeDo.length > 0 && (
                                    <motion.section
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h3 className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 tracking-widest mb-4">
                                            CE QU'ON FAIT
                                        </h3>
                                        <ul className="space-y-3">
                                            {detail.whatWeDo.map((item, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 + i * 0.05 }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <Circle className="w-2 h-2 mt-2 shrink-0 text-purple-500 fill-purple-500" />
                                                    <span className="text-slate-700 dark:text-white/80 leading-relaxed">
                                                        {item}
                                                    </span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.section>
                                )}

                                {/* Deliverables */}
                                {detail.deliverables && detail.deliverables.length > 0 && (
                                    <motion.section
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/10"
                                    >
                                        <h3 className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 tracking-widest mb-4">
                                            LIVRABLES
                                        </h3>
                                        <ul className="space-y-3">
                                            {detail.deliverables.map((item, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 + i * 0.05 }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <Check className="w-5 h-5 mt-0.5 shrink-0 text-green-600 dark:text-green-400" />
                                                    <span className="text-slate-700 dark:text-white/80 leading-relaxed">
                                                        {item}
                                                    </span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.section>
                                )}

                                {/* How It Works */}
                                {detail.howItWorks && detail.howItWorks.length > 0 && (
                                    <motion.section
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <h3 className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 tracking-widest mb-6">
                                            COMMENT ÇA MARCHE
                                        </h3>
                                        <div className="space-y-6">
                                            {detail.howItWorks.map((step, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.4 + i * 0.1 }}
                                                    className="flex gap-4"
                                                >
                                                    {/* Step Number */}
                                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                                        {i + 1}
                                                    </div>

                                                    {/* Step Content */}
                                                    <div className="flex-1 pt-1">
                                                        <div className="font-semibold text-slate-900 dark:text-white mb-1">
                                                            {step.step}
                                                        </div>
                                                        <div className="text-sm text-slate-600 dark:text-white/70">
                                                            {step.description}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.section>
                                )}

                                {/* For Who */}
                                {detail.forWho && (
                                    <motion.section
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-500/10 dark:to-violet-500/10 rounded-2xl p-6 border border-purple-200 dark:border-purple-500/20"
                                    >
                                        <h3 className="text-xs font-mono font-semibold text-purple-700 dark:text-purple-400 tracking-widest mb-3">
                                            POUR QUI
                                        </h3>
                                        <p className="text-slate-800 dark:text-white/90 leading-relaxed font-medium">
                                            {detail.forWho}
                                        </p>
                                    </motion.section>
                                )}

                                {/* CTA at Bottom */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="pt-6 border-t border-slate-200 dark:border-white/10"
                                >
                                    <a
                                        href="/contact?type=talent"
                                        className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all"
                                    >
                                        Demander un diagnostic
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </motion.div>
                            </div>

                            {/* Bottom Padding */}
                            <div className="h-12" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
