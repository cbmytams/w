import { useState } from 'react';
import { RefreshCw, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import type { DiagnosticResult } from '../types';
import { DiagnosticRadarChart } from './DiagnosticRadarChart';
import { getLevelLabel } from '../utils/scoring';
import { TalentAcquisitionModal } from './TalentAcquisitionModal';

interface ResultsSummaryProps {
    result: DiagnosticResult;
    onReset: () => void;
}

export function ResultsSummary({ result, onReset }: ResultsSummaryProps) {
    const { overallScore, level, recommendations } = result;
    const levelLabel = getLevelLabel(level);

    // Auto-open modal if URL is /questionnaire/fiche
    const shouldAutoOpen = typeof window !== 'undefined' && window.location.pathname === '/questionnaire/fiche';
    const [isTalentModalOpen, setIsTalentModalOpen] = useState(shouldAutoOpen);

    return (
        <div
            className="h-full min-h-0 px-4 sm:px-6 py-6 sm:py-8 md:py-12 overflow-y-auto custom-scrollbar"
            data-testid="results-summary"
        >
            <TalentAcquisitionModal
                isOpen={isTalentModalOpen}
                onClose={() => setIsTalentModalOpen(false)}
            />

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">

                {/* Left Col: The "Cover" Visual */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-[var(--heat-start)] to-[var(--heat-end)] opacity-10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                            <span className="w-2 h-2 rounded-full bg-[var(--heat-end)] animate-pulse" />
                            <span className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-300">
                                Analyse Terminée
                            </span>
                        </div>

                        <div className="relative inline-block select-none">
                            {/* Decorative Shadow/Outline Text - OPTIMIZED FOR MOBILE */}
                            <span className="absolute top-1 left-1 text-[clamp(5rem,15vw,10rem)] font-black leading-none tracking-tighter text-transparent"
                                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                                {overallScore}
                            </span>

                            {/* Main Score Text with Heat Gradient - OPTIMIZED FOR MOBILE */}
                            <h1 className="relative z-10 text-[clamp(5rem,15vw,10rem)] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 filter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                {overallScore}
                            </h1>

                            {/* /100 Badge */}
                            <div className="absolute top-0 -right-2 sm:-right-4 md:-right-8 flex flex-col items-center">
                                <span className="text-2xl md:text-3xl font-bold text-zinc-500 line-through decoration-[var(--heat-accent)]/50 decoration-2">100</span>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col md:flex-row items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="h-px w-16 bg-gradient-to-r from-[var(--heat-start)] to-transparent" />
                                <span className="text-3xl md:text-4xl font-black uppercase italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[var(--heat-start)] to-[var(--heat-end)]">
                                    {levelLabel}
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 sm:mt-12 w-full max-w-sm mx-auto md:mx-0 opacity-80 hover:opacity-100 transition-opacity">
                            <DiagnosticRadarChart scores={result.scores} />
                        </div>
                    </div>
                </motion.div>

                {/* Right Col: The Action Plan */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col gap-8"
                >
                    <div className="glass-panel p-8 rounded-3xl border-t border-white/10">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-6 h-6 text-[var(--heat-start)]" />
                            <h3 className="text-xl font-bold">Plan d'action prioritaire</h3>
                        </div>

                        <div className="space-y-4">
                            {recommendations.slice(0, 3).map((rec, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                                >
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono">
                                        {i + 1}
                                    </span>
                                    <p className="text-sm md:text-base text-zinc-200 leading-relaxed">
                                        {rec}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button // Changed from <a> to <button>
                            onClick={() => setIsTalentModalOpen(true)} // Added onClick to open modal
                            className="flex-1 btn-gradient py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(236,72,153,0.3)] hover:translate-y-[-2px] transition-transform"
                            style={{ background: 'linear-gradient(135deg, var(--heat-start), var(--heat-end))' }}
                        >
                            <Sparkles className="w-5 h-5" />
                            Débloquer ma croissance
                        </button>
                        <button
                            onClick={onReset}
                            className="px-6 py-4 rounded-xl border border-white/10 hover:bg-white/5 font-semibold transition-colors flex items-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Recommencer
                        </button>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
