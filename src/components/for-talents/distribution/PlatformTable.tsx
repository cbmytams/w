"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SPRING } from "@/lib/design-tokens";
import {
    ArrowRight,
    Globe,
    Music,
    Radio,
    Shield,
    ShieldCheck,
    Sparkles,
    X,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Platform } from "./types";

interface PlatformTableProps {
    platforms: Platform[];
    subCategoryId?: string;
}

const getAccessIcon = (type: string) => {
    switch (type) {
        case "Premium": return <Sparkles size={11} strokeWidth={2.5} />;
        case "Direct": return <Shield size={11} strokeWidth={2.5} />;
        case "Partner": return <Globe size={11} strokeWidth={2.5} />;
        case "Major": return <Radio size={11} strokeWidth={2.5} />;
        case "Viral": return <Zap size={11} strokeWidth={2.5} />;
        default: return <ShieldCheck size={11} strokeWidth={2.5} />;
    }
};

export function PlatformTable({ platforms, subCategoryId }: PlatformTableProps) {
    const [selection, setSelection] = useState<{ id: string; subCategoryId?: string } | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isCompact, setIsCompact] = useState(false);
    const selectedId =
        selection && selection.subCategoryId === subCategoryId ? selection.id : null;

    const selectedPlatform = useMemo(
        () => platforms.find((platform) => platform.id === selectedId) ?? null,
        [platforms, selectedId]
    );

    useEffect(() => {
        const node = containerRef.current;
        if (!node || typeof ResizeObserver === "undefined") return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const width = entry.contentRect.width;
                setIsCompact(width < 720);
            }
        });

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const showSpeed = subCategoryId === "dsps";
    const showDesktopCols = !isCompact;
    const showSpeedColumn = showDesktopCols && showSpeed;
    const nameCol = cn(
        "col-span-12",
        showDesktopCols && (showSpeed ? "lg:col-span-5" : "lg:col-span-6")
    );

    return (
        <div ref={containerRef} className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar pb-8 relative">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-5 px-8 py-3 border-b border-black/5 dark:border-white/5 sticky top-0 z-10 bg-white/80 dark:bg-[#080808]/80 backdrop-blur-xl">
                <div className={cn("text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]", nameCol)}>
                    Plateforme
                </div>
                {showDesktopCols && (
                    <>
                        <div className="hidden lg:block lg:col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                            Accès / Deal
                        </div>
                        <div className="hidden lg:block lg:col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                            Statut
                        </div>
                        {showSpeedColumn && (
                            <div className="hidden lg:block lg:col-span-1 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                                Délai
                            </div>
                        )}
                        <div className="hidden lg:block lg:col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-right">
                            Action
                        </div>
                    </>
                )}
            </div>

            {/* Rows */}
            <div className="flex flex-col px-6 md:px-8 py-6 gap-2">
                {platforms.map((platform, index) => {
                    const speedValue = platform.metrics?.speed ?? platform.speed;
                    const reachValue = platform.reach ?? platform.metrics?.geo;
                    const isSelected = selectedId === platform.id;

                    return (
                        <motion.button
                            type="button"
                            key={platform.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04 }}
                            onClick={() => setSelection({ id: platform.id, subCategoryId })}
                            className={cn(
                                "group relative w-full text-left rounded-xl transition-all duration-300 overflow-hidden",
                                "border border-transparent hover:border-black/5 dark:hover:border-white/10",
                                "hover:bg-black/[0.02] dark:hover:bg-white/[0.04]",
                                isSelected && "bg-black/[0.03] dark:bg-white/[0.05] border-black/10 dark:border-white/10"
                            )}
                        >
                            <div className="relative grid grid-cols-12 gap-5 items-center p-4">
                                {/* Name & Logo */}
                                <div className={cn("flex items-center gap-4", nameCol)}>
                                    <div className="w-12 h-12 rounded-[14px] bg-white dark:bg-white/5 shadow-sm border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0">
                                        {platform.logo ? (
                                            <Image
                                                src={platform.logo}
                                                alt={platform.name}
                                                width={28}
                                                height={28}
                                                className="w-full h-full max-w-[28px] max-h-[28px] object-contain transition-transform duration-300 group-hover:scale-110"
                                            />
                                        ) : (
                                            <Music className="w-5 h-5 text-slate-400" />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-[15px] font-bold text-black dark:text-white leading-none">
                                            {platform.name}
                                        </h3>
                                        {reachValue && (
                                            <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                                                {reachValue}
                                            </p>
                                        )}
                                        {/* Mobile view pills */}
                                        {!showDesktopCols && (
                                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                                <span className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[10px] font-bold text-slate-700 bg-black/5 dark:text-slate-200 dark:bg-white/10">
                                                    {getAccessIcon(platform.accessType ?? "")}
                                                    {platform.accessType ?? "—"}
                                                </span>
                                                <span className={cn(
                                                    "inline-flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[10px] font-bold",
                                                    platform.isLive
                                                        ? "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-500/10"
                                                        : "text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-500/10"
                                                )}>
                                                    <span className={cn("w-1.5 h-1.5 rounded-full", platform.isLive ? "bg-emerald-500" : "bg-amber-500")} />
                                                    {platform.status}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {showDesktopCols && (
                                    <>
                                        {/* Access Type */}
                                        <div className="hidden lg:flex lg:col-span-2">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-700 bg-black/5 dark:text-slate-300 dark:bg-white/10">
                                                {getAccessIcon(platform.accessType ?? "")}
                                                {platform.accessType ?? "—"}
                                            </span>
                                        </div>

                                        {/* Status */}
                                        <div className="hidden lg:flex lg:col-span-2 items-center">
                                            <span className={cn(
                                                "inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold",
                                                platform.isLive
                                                    ? "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-500/10"
                                                    : "text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-500/10"
                                            )}>
                                                <span className={cn("w-1.5 h-1.5 rounded-full", platform.isLive ? "bg-emerald-500" : "bg-amber-500")} />
                                                {platform.status}
                                            </span>
                                        </div>

                                        {/* Speed */}
                                        {showSpeedColumn && (
                                            <div className="hidden lg:flex lg:col-span-1 items-center">
                                                <span className="text-[12px] font-bold text-slate-600 dark:text-slate-400">
                                                    {speedValue || "—"}
                                                </span>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Action Button */}
                                {showDesktopCols && (
                                    <div className="col-span-12 lg:col-span-2 flex justify-end">
                                        <div className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-black dark:text-white transition-colors group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black shadow-sm">
                                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Drawer */}
            <AnimatePresence>
                {selectedPlatform && (
                    <motion.div className="absolute inset-0 z-30">
                        <motion.button
                            type="button"
                            aria-label="Fermer"
                            className="absolute inset-0 bg-black/10 dark:bg-black/60 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelection(null)}
                        />
                        <motion.aside
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ type: "spring", ...SPRING.responsive }}
                            className="absolute right-0 top-0 h-full w-full sm:w-[460px] bg-white dark:bg-[#0b111a] border-l border-black/5 dark:border-white/10 shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-black/5 dark:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-[14px] bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center">
                                        {selectedPlatform.logo ? (
                                            <Image src={selectedPlatform.logo} alt={selectedPlatform.name} width={32} height={32} className="object-contain" />
                                        ) : (
                                            <Music className="w-6 h-6 text-slate-400" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-black dark:text-white leading-none font-heading tracking-tight">
                                            {selectedPlatform.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                                {getAccessIcon(selectedPlatform.accessType ?? "")}
                                                {selectedPlatform.accessType}
                                            </span>
                                            <span className="text-slate-300 dark:text-slate-600">•</span>
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-widest",
                                                selectedPlatform.isLive ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                                            )}>
                                                {selectedPlatform.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelection(null)}
                                    className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
                                <div>
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">
                                        À propos
                                    </h4>
                                    <p className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                        {selectedPlatform.description || "Information détaillée indisponible."}
                                    </p>
                                </div>

                                {selectedPlatform.metrics && (
                                    <div className="mt-10 grid grid-cols-2 gap-4">
                                        {[
                                            { label: "Délai moyen", value: selectedPlatform.metrics.speed },
                                            { label: "Part des revenus", value: selectedPlatform.metrics.share },
                                            { label: "Support", value: selectedPlatform.metrics.support },
                                            { label: "Territoires", value: selectedPlatform.metrics.geo }
                                        ].map((item) => (
                                            <div key={item.label} className="bg-slate-50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-5">
                                                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em]">
                                                    {item.label}
                                                </div>
                                                <div className="text-[16px] font-bold text-black dark:text-white mt-1.5">
                                                    {item.value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
