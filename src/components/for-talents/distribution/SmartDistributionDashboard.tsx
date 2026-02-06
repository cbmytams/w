"use client";

import { useState, useMemo } from "react";
import { Category, SubCategory } from "./types";
import { CategoryTabs } from "./CategoryTabs";
import { SubFilterPills } from "./SubFilterPills";
import { PlatformTable } from "./PlatformTable";
import { Globe, ShieldCheck } from "lucide-react";

import { DASHBOARD_DATA } from "./data";

export function SmartDistributionDashboard() {
    const [activeCategoryId, setActiveCategoryId] = useState<string>("distribution");
    // Initialize with the first subcategory of the first category
    const [activeSubCategoryId, setActiveSubCategoryId] = useState<string>("dsps");

    // Derived state for current category and subcategories
    const currentCategory = useMemo(() =>
        DASHBOARD_DATA.find(c => c.id === activeCategoryId) || DASHBOARD_DATA[0],
        [activeCategoryId]);

    const currentSubCategories = currentCategory.subCategories;

    // Filtered platforms
    const currentPlatforms = useMemo(() => {
        const sub = currentSubCategories.find(s => s.id === activeSubCategoryId);
        return sub ? sub.platforms : [];
    }, [currentSubCategories, activeSubCategoryId]);

    const handleCategoryChange = (id: string) => {
        setActiveCategoryId(id);
        // Reset subcategory to first available in new category
        const output = DASHBOARD_DATA.find(c => c.id === id);
        if (output && output.subCategories.length > 0) {
            setActiveSubCategoryId(output.subCategories[0].id);
        }
    };

    return (
        <div className="w-full h-full relative overflow-hidden rounded-[2.5rem] border border-white/60 dark:border-white/10 bg-white/80 dark:bg-zinc-900/85 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(15,23,42,0.12)]">
            {/* Ambient Glows */}
            <div className="absolute -top-24 right-[-140px] h-64 w-64 rounded-full bg-orange-500/20 blur-3xl opacity-70" />
            <div className="absolute -bottom-32 left-[-140px] h-64 w-64 rounded-full bg-pink-500/20 blur-3xl opacity-60" />

            <div className="relative z-10 flex h-full flex-col">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-7 gap-4">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-2xl" />
                            <div className="relative w-14 h-14 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center border border-orange-100/60 dark:border-orange-500/20 shadow-[0_8px_20px_rgba(249,115,22,0.12)]">
                                <Globe className="w-7 h-7 text-orange-500" strokeWidth={1.5} />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white leading-none font-heading">
                                    Network Status
                                </h2>
                                <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Operational
                                </span>
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-2">
                                Distribution & Access Control
                            </p>
                        </div>
                    </div>

                    {/* System Status Pill (Mobile) */}
                    <div className="flex md:hidden items-center gap-2 bg-white/70 dark:bg-white/5 border border-gray-100/80 dark:border-white/10 px-3 py-2 rounded-2xl self-start shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">System Normal</span>
                    </div>
                </div>

                {/* Level 1 Navigation: Tabs */}
                <CategoryTabs
                    categories={DASHBOARD_DATA}
                    activeCategoryId={activeCategoryId}
                    onChange={handleCategoryChange}
                />

                {/* Level 2 Navigation: Sub-Filters */}
                <div className="border-b border-gray-100/60 dark:border-white/5 bg-white/40 dark:bg-white/[0.02]">
                    <SubFilterPills
                        subCategories={currentSubCategories}
                        activeSubCategoryId={activeSubCategoryId}
                        onChange={setActiveSubCategoryId}
                        categoryId={activeCategoryId}
                    />
                </div>

                {/* Level 3 Content: Data Grid */}
                <PlatformTable
                    platforms={currentPlatforms}
                    categoryId={activeCategoryId}
                    subCategoryId={activeSubCategoryId}
                />

                {/* Empty State if no platforms */}
                {currentPlatforms.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-12">
                        <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-4">
                            <ShieldCheck size={32} strokeWidth={1.5} className="opacity-50" />
                        </div>
                        <p className="text-sm font-medium">Aucune plateforme listée dans cette catégorie</p>
                    </div>
                )}

                {/* Footer / Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/90 dark:from-zinc-900 to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
