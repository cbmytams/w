"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EstimatorModalProps {
    isOpen: boolean
    onClose: () => void
}

export function EstimatorModal({ isOpen, onClose }: EstimatorModalProps) {
    const [estimatorData, setEstimatorData] = useState({ objective: "", budget: "", timing: "" })

    // Gestion de la touche Escape pour fermer le modal
    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") onClose()
    }, [onClose])

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            // Empêcher le scroll du body quand le modal est ouvert
            document.body.style.overflow = "hidden"
            return () => {
                document.removeEventListener("keydown", handleEscape)
                document.body.style.overflow = ""
            }
        }
    }, [isOpen, handleEscape])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="estimator-modal-title"
                        className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 id="estimator-modal-title" className="text-3xl font-bold text-gray-900 mb-2">Estimez votre plan</h3>
                                    <p className="text-gray-600">En 30 secondes, sans engagement</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        1. Votre objectif principal ?
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {["Notoriété", "Trafic", "Conversion", "Fidélisation"].map((obj) => (
                                            <button
                                                key={obj}
                                                onClick={() => setEstimatorData({ ...estimatorData, objective: obj })}
                                                className={`p-4 rounded-xl border-2 font-medium transition-all ${estimatorData.objective === obj
                                                    ? "border-orange-500 bg-orange-50 text-orange-700"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                {obj}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        2. Budget range ?
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["< 10K€", "10-50K€", "> 50K€"].map((budget) => (
                                            <button
                                                key={budget}
                                                onClick={() => setEstimatorData({ ...estimatorData, budget })}
                                                className={`p-4 rounded-xl border-2 font-medium transition-all ${estimatorData.budget === budget
                                                    ? "border-orange-500 bg-orange-50 text-orange-700"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                {budget}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        3. Timing souhaité ?
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["Urgent (< 1 mois)", "Court terme (1-3 mois)", "Long terme (3+ mois)"].map((timing) => (
                                            <button
                                                key={timing}
                                                onClick={() => setEstimatorData({ ...estimatorData, timing })}
                                                className={`p-4 rounded-xl border-2 font-medium transition-all text-sm ${estimatorData.timing === timing
                                                    ? "border-orange-500 bg-orange-50 text-orange-700"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                {timing}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {estimatorData.objective && estimatorData.budget && estimatorData.timing && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200"
                                    >
                                        <h4 className="font-bold text-lg text-gray-900 mb-3">📋 Plan recommandé :</h4>
                                        <ul className="space-y-2 text-gray-700 mb-6">
                                            <li className="flex gap-2"><Check className="w-5 h-5 text-green-600 shrink-0" /> Audit complet + définition KPIs</li>
                                            <li className="flex gap-2"><Check className="w-5 h-5 text-green-600 shrink-0" /> Casting documenté (5-15 créateurs selon budget)</li>
                                            <li className="flex gap-2"><Check className="w-5 h-5 text-green-600 shrink-0" /> Production + coordination ops</li>
                                            <li className="flex gap-2"><Check className="w-5 h-5 text-green-600 shrink-0" /> Dashboard live + reporting actionnable</li>
                                        </ul>
                                        <Button asChild className="w-full h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                                            <Link href="/contact?type=brand">
                                                Réserver un call stratégique <ArrowRight className="ml-2 h-5 w-5" />
                                            </Link>
                                        </Button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
