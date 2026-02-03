"use client"

import { motion } from "framer-motion"
import { Check, Clock, TrendingUp, DollarSign, PenTool, ShieldCheck } from "lucide-react"

export function DealFlowWidget() {
    return (
        <div className="relative w-full max-w-md mx-auto aspect-[4/5] flex flex-col justify-center">
            {/* Background Gradient Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-pink-200/40 via-purple-200/40 to-orange-200/40 blur-3xl rounded-full opacity-60" />

            {/* Main Card Stack */}
            <div className="relative z-10 space-y-4">

                {/* Card 1: Signed Deal (Premium status) */}
                <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.95 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/80 backdrop-blur-xl border border-white/40 p-5 rounded-3xl shadow-2xl shadow-purple-500/10 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500"
                >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />

                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                                <DollarSign size={20} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 leading-tight">Brand X</h4>
                                <span className="text-xs font-medium text-gray-500">Campagne Q1</span>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1.5 border border-green-200">
                            <ShieldCheck size={12} />
                            Sécurisé
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-xs text-gray-400 font-medium mb-1">Montant sécurisé</div>
                                <div className="text-2xl font-bold text-gray-900 tracking-tight">8 500 €</div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex -space-x-2 mb-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white" />
                                    <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white" />
                                    <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">✓</div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Card 2: Negotiating (Active) */}
                <motion.div
                    initial={{ y: 40, opacity: 0, scale: 0.9 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/90 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-xl shadow-pink-500/10 relative"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <TrendingUp size={20} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 leading-tight">Agency Pro</h4>
                                <span className="text-xs font-medium text-gray-500">Négociation</span>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full flex items-center gap-1.5 border border-blue-100">
                            <Clock size={12} />
                            En cours
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <div className="text-sm font-medium text-gray-500">Offre initiale</div>
                        <div className="text-sm font-bold text-gray-400 line-through">10 000 €</div>
                    </div>

                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-1/2">
                        <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            whileInView={{ scale: 1, rotate: 6 }}
                            transition={{ type: "spring", bounce: 0.5, delay: 0.8 }}
                            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg shadow-pink-500/30 flex items-center gap-1"
                        >
                            <TrendingUp size={12} />
                            +20%
                        </motion.div>
                    </div>

                    <div className="mt-3 flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
                        <div className="text-sm font-medium text-blue-900">Nouvelle offre</div>
                        <div className="text-lg font-bold text-blue-600">12 000 €</div>
                    </div>
                </motion.div>

                {/* Floating 'Signing' Badge */}
                <motion.div
                    className="absolute -bottom-6 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 z-20"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <PenTool size={18} className="text-gray-600" />
                        </div>
                        <motion.div
                            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Status</div>
                        <div className="text-sm font-bold text-gray-900 flex items-center gap-1">
                            Closing...
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="text-pink-500 text-lg leading-none"
                            >
                                •
                            </motion.span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}
