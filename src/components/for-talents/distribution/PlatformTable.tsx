"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    Gauge,
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
    categoryId?: string;
    subCategoryId?: string;
}

const CATEGORY_STYLES = {
    distribution: {
        glow: "from-orange-500/12 via-orange-400/6 to-transparent",
        ring: "ring-orange-500/25",
        cta:
            "bg-slate-900 text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/25 dark:bg-white/10 dark:text-white dark:hover:bg-orange-500/30",
        borderHover: "hover:border-orange-200/70 dark:hover:border-orange-500/30",
        titleHover: "group-hover:text-orange-600 dark:group-hover:text-orange-300"
    },
    labels: {
        glow: "from-fuchsia-500/12 via-pink-500/6 to-transparent",
        ring: "ring-pink-500/25",
        cta:
            "bg-slate-900 text-white hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/25 dark:bg-white/10 dark:text-white dark:hover:bg-pink-500/30",
        borderHover: "hover:border-pink-200/70 dark:hover:border-pink-500/30",
        titleHover: "group-hover:text-pink-600 dark:group-hover:text-pink-300"
    },
    access: {
        glow: "from-blue-500/12 via-cyan-500/6 to-transparent",
        ring: "ring-blue-500/25",
        cta:
            "bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 dark:bg-white/10 dark:text-white dark:hover:bg-blue-500/30",
        borderHover: "hover:border-blue-200/70 dark:hover:border-blue-500/30",
        titleHover: "group-hover:text-blue-600 dark:group-hover:text-blue-300"
    }
} as const;

const ACCESS_BADGES = {
    Premium: {
        className:
            "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30",
        icon: <Sparkles size={10} strokeWidth={2.5} />
    },
    Direct: {
        className:
            "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30",
        icon: <Shield size={10} strokeWidth={2.5} />
    },
    Partner: {
        className:
            "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/30",
        icon: <Globe size={10} strokeWidth={2.5} />
    },
    Major: {
        className:
            "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30",
        icon: <Radio size={10} strokeWidth={2.5} />
    },
    Access: {
        className:
            "bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/10 dark:text-white/70 dark:border-white/15",
        icon: <ShieldCheck size={10} strokeWidth={2.5} />
    },
    Viral: {
        className:
            "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-500/10 dark:text-pink-300 dark:border-pink-500/30",
        icon: <Zap size={10} strokeWidth={2.5} />
    },
    default: {
        className:
            "bg-gray-100 text-gray-600 border-gray-200 dark:bg-white/5 dark:text-gray-300 dark:border-white/10",
        icon: null
    }
} as const;

type AccessBadgeKey = keyof typeof ACCESS_BADGES;

const getAccessBadge = (accessType?: string) => {
    return ACCESS_BADGES[accessType as AccessBadgeKey] ?? ACCESS_BADGES.default;
};

export function PlatformTable({ platforms, categoryId = "distribution", subCategoryId }: PlatformTableProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isCompact, setIsCompact] = useState(false);

    const selectedPlatform = useMemo(
        () => platforms.find((platform) => platform.id === selectedId) ?? null,
        [platforms, selectedId]
    );

    useEffect(() => {
        setSelectedId(null);
    }, [categoryId, subCategoryId]);

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
    const accent = CATEGORY_STYLES[categoryId as keyof typeof CATEGORY_STYLES] ?? CATEGORY_STYLES.distribution;
    const actionClasses = cn(
        "inline-flex items-center gap-2 rounded-2xl font-bold uppercase tracking-wide transition-all border border-transparent",
        showDesktopCols ? "px-5 py-2.5 text-[11px]" : "px-4 py-2 text-[10px]",
        accent.cta
    );
    const nameCol = cn(
        "col-span-12",
        showDesktopCols && (showSpeed ? "lg:col-span-5" : "lg:col-span-6")
    );

    return (
        <div ref={containerRef} className="flex-1 overflow-y-auto custom-scrollbar pb-8 relative">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-5 px-8 py-4 border-b border-gray-100/50 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl sticky top-0 z-10">
                <div className={cn("col-span-12 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]", nameCol)}>
                    Plateforme
                </div>
                {showDesktopCols && (
                    <>
                        <div className="hidden lg:block lg:col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                            Accès
                        </div>
                        <div className="hidden lg:block lg:col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                            Status
                        </div>
                        {showSpeedColumn && (
                            <div className="hidden lg:block lg:col-span-1 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                Vitesse
                            </div>
                        )}
                        <div className="hidden lg:block lg:col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-right">
                            Détails
                        </div>
                    </>
                )}
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-4 px-6 md:px-8 py-6">
                {platforms.map((platform, index) => {
                    const badge = getAccessBadge(platform.accessType);
                    const speedValue = platform.metrics?.speed ?? platform.speed;
                    const reachValue = platform.reach ?? platform.metrics?.geo;
                    const isSelected = selectedId === platform.id;

                    return (
                        <motion.div
                            key={platform.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04 }}
                            className={cn(
                                "group relative rounded-3xl border border-gray-100/60 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-[0_10px_24px_-12px_rgba(15,23,42,0.12)] overflow-hidden transition-all duration-500",
                                accent.borderHover,
                                isSelected
                                    ? cn("ring-1", accent.ring)
                                    : "hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-12px_rgba(15,23,42,0.12)] hover:bg-white/80"
                            )}
                        >
                            <div
                                className={cn(
                                    "absolute inset-0 rounded-3xl bg-gradient-to-r transition-opacity",
                                    accent.glow,
                                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                )}
                            />
                            <div className="relative grid grid-cols-12 gap-5 items-center p-5 md:p-6">
                                {/* Name & Logo */}
                                <div className={cn("col-span-12 flex items-center gap-4", nameCol)}>
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 p-2.5 shadow-sm border border-gray-100/60 dark:border-white/10 flex items-center justify-center shrink-0">
                                        {platform.logo ? (
                                            <img
                                                src={platform.logo}
                                                alt={platform.name}
                                                className="w-full h-full max-w-[32px] max-h-[32px] object-contain opacity-90 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                    e.currentTarget.parentElement?.classList.add("fallback-icon");
                                                }}
                                            />
                                        ) : (
                                            <Music className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className={cn("text-base font-bold text-gray-900 dark:text-gray-100 transition-colors", accent.titleHover)}>
                                            {platform.name}
                                        </h3>
                                        {reachValue && (
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{reachValue}</p>
                                        )}
                                        {!showDesktopCols && (
                                            <div className="mt-3 flex flex-wrap items-center gap-3">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span
                                                        className={cn(
                                                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border",
                                                            badge.className
                                                        )}
                                                    >
                                                        {badge.icon}
                                                        {platform.accessType ?? "—"}
                                                    </span>
                                                    <span
                                                        className={cn(
                                                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold border",
                                                            platform.isLive
                                                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30"
                                                                : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30"
                                                        )}
                                                    >
                                                        <span className="relative flex h-2 w-2">
                                                            <span
                                                                className={cn(
                                                                    "absolute inline-flex h-full w-full rounded-full opacity-60",
                                                                    platform.isLive ? "bg-emerald-400" : "bg-amber-400"
                                                                )}
                                                            />
                                                            <span
                                                                className={cn(
                                                                    "relative inline-flex rounded-full h-2 w-2",
                                                                    platform.isLive ? "bg-emerald-500" : "bg-amber-500"
                                                                )}
                                                            />
                                                        </span>
                                                        {platform.status}
                                                    </span>
                                                    {showSpeed && speedValue && (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold border bg-slate-50 text-slate-700 border-slate-200 dark:bg-white/10 dark:text-white/70 dark:border-white/15">
                                                            <Gauge size={10} strokeWidth={2.5} />
                                                            {speedValue}
                                                        </span>
                                                    )}
                                                </div>
                                                <motion.button
                                                    type="button"
                                                    whileHover={{ y: -1 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setSelectedId(platform.id)}
                                                    className={cn(actionClasses, "ml-auto")}
                                                >
                                                    <span>Voir détails</span>
                                                    <ArrowRight size={14} />
                                                </motion.button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {showDesktopCols && (
                                    <>
                                        {/* Access Type */}
                                        <div className="hidden lg:flex lg:col-span-2">
                                            <span
                                                className={cn(
                                                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border",
                                                    badge.className
                                                )}
                                            >
                                                {badge.icon}
                                                {platform.accessType ?? "—"}
                                            </span>
                                        </div>

                                        {/* Status */}
                                        <div className="hidden lg:flex lg:col-span-2 items-center">
                                            <span
                                                className={cn(
                                                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-bold border",
                                                    platform.isLive
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30"
                                                        : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30"
                                                )}
                                            >
                                                <span className="relative flex h-2 w-2">
                                                    <span
                                                        className={cn(
                                                            "absolute inline-flex h-full w-full rounded-full opacity-60",
                                                            platform.isLive ? "bg-emerald-400" : "bg-amber-400"
                                                        )}
                                                    />
                                                    <span
                                                        className={cn(
                                                            "relative inline-flex rounded-full h-2 w-2",
                                                            platform.isLive ? "bg-emerald-500" : "bg-amber-500"
                                                        )}
                                                    />
                                                </span>
                                                {platform.status}
                                            </span>
                                        </div>

                                        {/* Speed */}
                                        {showSpeedColumn && (
                                            <div className="hidden lg:flex lg:col-span-1 items-center text-xs font-bold text-gray-700 dark:text-gray-300">
                                                {speedValue ? (
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Gauge size={12} strokeWidth={2.5} className="text-gray-400" />
                                                        {speedValue}
                                                    </span>
                                                ) : (
                                                    "—"
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Action */}
                                {showDesktopCols && (
                                    <div className="col-span-12 lg:col-span-2 flex justify-end">
                                        <motion.button
                                            type="button"
                                            whileHover={{ y: -1 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedId(platform.id)}
                                            className={actionClasses}
                                        >
                                            <span className="hidden sm:inline">Voir détails</span>
                                            <span className="sm:hidden">Détails</span>
                                            <ArrowRight size={14} />
                                        </motion.button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
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
                            className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                        />
                        <motion.aside
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 30 }}
                            className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border-l border-white/60 dark:border-white/10 shadow-[0_30px_80px_rgba(15,23,42,0.35)]"
                        >
                            <div className="absolute inset-0 pointer-events-none">
                                <div className={cn("h-44 w-full bg-gradient-to-br opacity-80", accent.glow)} />
                                <div className="absolute top-0 left-0 right-0 h-40 bg-[radial-gradient(220px_120px_at_20%_20%,rgba(255,255,255,0.5),transparent)] dark:bg-[radial-gradient(220px_120px_at_20%_20%,rgba(255,255,255,0.08),transparent)]" />
                            </div>

                            <div className="relative h-full flex flex-col p-5 sm:p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 p-2.5 shadow-sm border border-gray-100/60 dark:border-white/10 flex items-center justify-center">
                                            {selectedPlatform.logo ? (
                                                <img
                                                    src={selectedPlatform.logo}
                                                    alt={selectedPlatform.name}
                                                    className="w-full h-full object-contain opacity-90"
                                                />
                                            ) : (
                                                <Music className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading">
                                                {selectedPlatform.name}
                                            </h3>
                                            {(selectedPlatform.reach || selectedPlatform.metrics?.geo) && (
                                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    {selectedPlatform.reach ?? selectedPlatform.metrics?.geo}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedId(null)}
                                        className="w-10 h-10 rounded-2xl border border-gray-200/70 dark:border-white/10 text-gray-500 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10 transition"
                                    >
                                        <X size={16} className="mx-auto" />
                                    </button>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 mt-4">
                                    {(() => {
                                        const badge = getAccessBadge(selectedPlatform.accessType);
                                        return (
                                            <span
                                                className={cn(
                                                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border",
                                                    badge.className
                                                )}
                                            >
                                                {badge.icon}
                                                {selectedPlatform.accessType ?? "—"}
                                            </span>
                                        );
                                    })()}
                                    <span
                                        className={cn(
                                            "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-bold border",
                                            selectedPlatform.isLive
                                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30"
                                                : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30"
                                        )}
                                    >
                                        <span className="relative flex h-2 w-2">
                                            <span
                                                className={cn(
                                                    "absolute inline-flex h-full w-full rounded-full opacity-60",
                                                    selectedPlatform.isLive ? "bg-emerald-400" : "bg-amber-400"
                                                )}
                                            />
                                            <span
                                                className={cn(
                                                    "relative inline-flex rounded-full h-2 w-2",
                                                    selectedPlatform.isLive ? "bg-emerald-500" : "bg-amber-500"
                                                )}
                                            />
                                        </span>
                                        {selectedPlatform.status}
                                    </span>
                                    {showSpeed && (selectedPlatform.metrics?.speed || selectedPlatform.speed) && (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold border bg-slate-50 text-slate-700 border-slate-200 dark:bg-white/10 dark:text-white/70 dark:border-white/15">
                                            <Gauge size={10} strokeWidth={2.5} />
                                            {selectedPlatform.metrics?.speed ?? selectedPlatform.speed}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                        Description
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-white/80 leading-relaxed">
                                        {selectedPlatform.description || "Information détaillée à venir pour ce partenaire."}
                                    </p>
                                </div>

                                {selectedPlatform.metrics && (
                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        {[
                                            { label: "Vitesse", value: selectedPlatform.metrics.speed },
                                            { label: "Part moyenne", value: selectedPlatform.metrics.share },
                                            { label: "Support", value: selectedPlatform.metrics.support },
                                            { label: "Territoires", value: selectedPlatform.metrics.geo }
                                        ].map((item) => (
                                            <div
                                                key={item.label}
                                                className="rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white/80 dark:bg-white/5 p-3 shadow-sm"
                                            >
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                    {item.label}
                                                </div>
                                                <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                                                    {item.value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-auto pt-6">
                                    <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 text-xs text-gray-500 dark:text-white/70">
                                        Besoin d'un accès prioritaire ou d'un deal sur-mesure ? On s'en occupe pour toi.
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
