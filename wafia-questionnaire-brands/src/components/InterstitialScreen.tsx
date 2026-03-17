/**
 * WAFIA BRAND DIAGNOSTIC - INTERSTITIAL SCREEN
 * Écran de transition narratif entre les sections du diagnostic marque
 */

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { SECTION_LABELS } from '../constants';
import type { BrandSection } from '../types';

interface InterstitialScreenProps {
    prevCategory: string;
    nextCategory: BrandSection;
    onComplete: () => void;
}

export function InterstitialScreen({ prevCategory, nextCategory, onComplete }: InterstitialScreenProps) {
    const nextSection = SECTION_LABELS[nextCategory] || {
        label: 'Section suivante',
        description: 'Continuons le diagnostic',
        emoji: '📋',
    };

    useEffect(() => {
        // Auto-advance after 2.5 seconds if user doesn't click
        const timer = setTimeout(onComplete, 2500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div
            data-testid="interstitial-screen"
            className="h-full min-h-0 flex flex-col items-center justify-center text-center p-[clamp(1.5rem,4vh,2.5rem)] cursor-pointer"
            onClick={onComplete}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
            >
                <div className="mb-8 flex justify-center">
                    <motion.div
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center"
                    >
                        <span className="text-4xl">{nextSection.emoji}</span>
                    </motion.div>
                </div>

                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 uppercase"
                >
                    {prevCategory === 'QUICK_LEAD' ? (
                        "Contact Initialisé"
                    ) : (
                        <Sparkles className="w-6 h-6 text-[var(--heat-start)] inline-block mr-2 align-middle" />
                    )}
                    {prevCategory !== 'QUICK_LEAD' && "Section Validée"}
                </motion.h2>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg sm:text-xl text-zinc-300 mb-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
                >
                    <span>Passons à la suite :</span>
                    <span className="font-bold px-3 py-1 rounded-lg bg-[var(--heat-start)]/10 text-[var(--heat-start)]">
                        {nextSection.label}
                    </span>
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-sm text-zinc-500 mb-12"
                >
                    {nextSection.description}
                </motion.p>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "linear" }}
                    className="h-1 bg-white/20 rounded-full max-w-xs mx-auto overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--heat-start)] to-[var(--heat-end)]" />
                </motion.div>
            </motion.div>
        </div>
    );
}
