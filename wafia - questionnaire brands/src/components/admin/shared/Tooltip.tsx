import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface TooltipProps {
    content: string;
    detailedContent?: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    children: React.ReactNode;
    showHelpIcon?: boolean;
}

export function Tooltip({
    content,
    detailedContent,
    position = 'top',
    children,
    showHelpIcon = false
}: TooltipProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [showDetailed, setShowDetailed] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    // Close modal on Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && showDetailed) {
                setShowDetailed(false);
            }
        };

        if (showDetailed) {
            window.addEventListener('keydown', handleEscape);
            return () => window.removeEventListener('keydown', handleEscape);
        }
    }, [showDetailed]);

    return (
        <div
            ref={containerRef}
            className="relative inline-flex items-center gap-1"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {children}

            {showHelpIcon && detailedContent && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowDetailed(!showDetailed);
                    }}
                    className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-500 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Plus d'informations"
                    type="button"
                >
                    <HelpCircle className="w-3 h-3" />
                </button>
            )}

            {/* Tooltip simple (hover) */}
            <AnimatePresence>
                {showTooltip && !showDetailed && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 5 : -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={cn(
                            "absolute z-50 px-3 py-2 text-xs text-white bg-zinc-900 rounded-lg shadow-xl border border-zinc-800 whitespace-nowrap pointer-events-none max-w-xs",
                            positionClasses[position]
                        )}
                    >
                        {content}
                        <div className="absolute w-2 h-2 bg-zinc-900 border-l border-b border-zinc-800 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Contenu détaillé (clic) */}
            <AnimatePresence>
                {showDetailed && detailedContent && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
                            onClick={() => setShowDetailed(false)}
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
                        >
                            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl mx-4">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                            <HelpCircle className="w-4 h-4 text-blue-500" />
                                        </div>
                                        <h3 className="font-semibold text-white">Détails</h3>
                                    </div>
                                    <button
                                        onClick={() => setShowDetailed(false)}
                                        className="text-zinc-500 hover:text-white transition-colors"
                                        aria-label="Fermer"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="text-sm text-zinc-300 space-y-3">
                                    {detailedContent}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
