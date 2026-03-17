/**
 * WAFIA BRAND DIAGNOSTIC - LANDING SCREEN
 * Direction: Premium warm gradient (Orange/Red) — Brand identity
 */

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface DiagnosticLandingProps {
    onStart: () => void;
}

export function DiagnosticLanding({ onStart }: DiagnosticLandingProps) {
    return (
        <div className="h-full min-h-0 flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[var(--bg-deep)]">

            {/* Background Ambient Glows (Orange/Red) */}
            {/* Background Ambient Glows (Orange/Red) */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--heat-start)]/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--heat-end)]/10 blur-[100px] pointer-events-none" />

            {/* Layout Grid Lines (Editorial) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="w-px h-full bg-white absolute left-8 md:left-24 hidden md:block" />
                <div className="w-px h-full bg-white absolute right-8 md:right-24 hidden md:block" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-[var(--heat-start)] animate-pulse" />
                    <span className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-300">
                        Diagnostic Stratégique
                    </span>
                </motion.div>

                {/* Main Title */}
                <h1 className="flex flex-col items-center text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 sm:mb-12 leading-[1.1]">
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
                    >
                        Votre stratégie
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
                    >
                        mérite un
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                        className="bg-gradient-to-r from-[var(--heat-start)] via-[var(--heat-accent)] to-[var(--heat-end)] bg-clip-text text-transparent"
                    >
                        diagnostic.
                    </motion.span>
                </h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-base sm:text-lg text-zinc-400 max-w-xl mb-10 sm:mb-14"
                >
                    Identifiez vos leviers de croissance, obtenez un plan d&apos;action personnalisé et un package adapté à vos objectifs.
                </motion.p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {/* Primary CTA: Full Diagnostic */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onStart}
                        data-testid="start-diagnostic"
                        className="group relative px-10 py-5 rounded-full bg-white text-zinc-900 font-bold text-lg shadow-[0_0_40px_-10px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_-10px_rgba(249,115,22,0.6)] transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Lancer le diagnostic
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>

                </div>



                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-12 sm:mt-24 text-center"
                >
                    <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium">
                        Wafia Brand Strategy ™
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
