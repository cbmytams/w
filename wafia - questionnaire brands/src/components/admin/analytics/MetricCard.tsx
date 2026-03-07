import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus, HelpCircle, X } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface MetricCardProps {
    title: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon: LucideIcon;
    tooltip: string;
    helpText?: React.ReactNode;
    priority?: 'hero' | 'primary' | 'secondary';
    interpretation?: 'good' | 'warning' | 'critical';
    className?: string;
}

export function MetricCard({
    title,
    value,
    change,
    trend,
    icon: Icon,
    tooltip,
    helpText,
    priority = 'primary',
    interpretation,
    className
}: MetricCardProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [showDetailed, setShowDetailed] = useState(false);
    const trendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
    const TrendIcon = trendIcon;

    const priorityStyles = {
        hero: 'col-span-2 p-8',
        primary: 'p-6',
        secondary: 'p-4 opacity-80'
    };

    const interpretationStyles = {
        good: 'border-emerald-500/20 bg-emerald-500/5',
        warning: 'border-amber-500/20 bg-amber-500/5',
        critical: 'border-red-500/20 bg-red-500/5'
    };

    return (
        <div className={cn(
            "bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl transition-all hover:border-white/20 relative group",
            priorityStyles[priority],
            interpretation && interpretationStyles[interpretation],
            className
        )}>
            {/* Header with icon, title, and help button */}
            <div className="flex items-start justify-between mb-4">
                <div
                    className="flex items-center gap-2 group/tooltip relative"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <div className="p-2 bg-white/5 rounded-lg">
                        <Icon className="w-5 h-5 text-white/70" />
                    </div>
                    <span className="text-sm font-medium text-zinc-400">
                        {title}
                    </span>

                    {/* Simple Tooltip (hover) */}
                    <AnimatePresence>
                        {showTooltip && !showDetailed && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute bottom-full left-0 mb-2 z-50 px-3 py-2 text-xs text-white bg-zinc-900 rounded-lg shadow-xl border border-zinc-800 whitespace-nowrap max-w-xs pointer-events-none"
                            >
                                {tooltip}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Help Icon Button */}
                {helpText && (
                    <button
                        onClick={() => setShowDetailed(true)}
                        className="w-5 h-5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-500 hover:text-white flex items-center justify-center transition-colors shrink-0"
                        aria-label="Plus d'informations"
                        type="button"
                    >
                        <HelpCircle className="w-3 h-3" />
                    </button>
                )}
            </div>

            <div className="space-y-2">
                <div className={cn(
                    "font-black text-white tracking-tight",
                    priority === 'hero' ? 'text-6xl' : priority === 'primary' ? 'text-4xl' : 'text-3xl'
                )}>
                    {value}
                </div>

                {change && (
                    <div className="flex items-center gap-1">
                        <TrendIcon className={cn(
                            "w-4 h-4",
                            trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : 'text-zinc-500'
                        )} />
                        <span className={cn(
                            "text-xs font-semibold",
                            trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : 'text-zinc-500'
                        )}>
                            {change}
                        </span>
                        <span className="text-xs text-zinc-600">vs période précédente</span>
                    </div>
                )}
            </div>

            {/* Detailed Help Modal */}
            <AnimatePresence>
                {showDetailed && helpText && (
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
                                    {helpText}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
