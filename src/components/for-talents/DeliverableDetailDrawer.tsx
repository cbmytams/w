"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { TALENT_DELIVERABLES } from "@/constants"

type DeliverableItem = typeof TALENT_DELIVERABLES.items[number]

interface DeliverableDetailDrawerProps {
    item: DeliverableItem | null
    onClose: () => void
}

export function DeliverableDetailDrawer({ item, onClose }: DeliverableDetailDrawerProps) {
    // Lock body scroll when drawer is open
    useEffect(() => {
        if (item) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [item])

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        if (item) {
            window.addEventListener("keydown", handleEscape)
        }

        return () => {
            window.removeEventListener("keydown", handleEscape)
        }
    }, [item, onClose])

    if (!item) return null

    return (
        <AnimatePresence>
            {item && (
                <>
                    {/* Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-[520px] bg-white dark:bg-slate-900 z-50 shadow-2xl overflow-y-auto"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="drawer-title"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10"
                            aria-label="Fermer"
                        >
                            <X className="w-5 h-5 text-slate-900 dark:text-white" />
                        </button>

                        {/* Content */}
                        <div className="p-6 sm:p-8 pb-32">
                            {/* Header */}
                            <div className="mb-8">
                                <div className="text-6xl mb-4">{item.icon}</div>
                                <h2 id="drawer-title" className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    {item.title}
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                                    {item.subtitle}
                                </p>
                            </div>

                            {/* Intro */}
                            {item.detail && (
                                <>
                                    <div className="mb-8">
                                        <p className="text-slate-700 dark:text-white/80 leading-relaxed text-base">
                                            {item.detail.intro}
                                        </p>
                                    </div>

                                    {/* Ce qu'on fait */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                                            Ce qu'on fait
                                        </h3>
                                        <ul className="space-y-3">
                                            {item.detail.whatWeDo.map((task, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                                                    <span className="text-slate-700 dark:text-white/80 leading-relaxed">
                                                        {task}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Ce que tu obtiens */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                                            Ce que tu obtiens
                                        </h3>
                                        <ul className="space-y-3">
                                            {item.detail.deliverables.map((deliverable, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <Check className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                                                    <span className="text-slate-700 dark:text-white/80 leading-relaxed">
                                                        {deliverable}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Comment ça se passe */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                                            Comment ça se passe
                                        </h3>
                                        <div className="space-y-4">
                                            {item.detail.howItWorks.map((step, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <div className="shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                                                            0{i + 1}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-900 dark:text-white mb-1">
                                                            {step.step}
                                                        </div>
                                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                                            {step.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Pour qui */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                                            Pour qui
                                        </h3>
                                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border-l-4 border-purple-500">
                                            <p className="text-slate-700 dark:text-white/80 italic">
                                                {item.detail.forWho}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Sticky Footer CTA */}
                        <div className="fixed bottom-0 right-0 w-full sm:w-[520px] bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-6">
                            <Link
                                href="/contact?type=talent"
                                className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-violet-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Demander un diagnostic
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
