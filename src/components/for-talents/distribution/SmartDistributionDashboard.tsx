"use client";

import { useState, useMemo } from "react";
import { CategoryTabs } from "./CategoryTabs";
import { SubFilterPills } from "./SubFilterPills";
import { PlatformTable } from "./PlatformTable";
import { Globe, ShieldCheck } from "lucide-react";

import { DASHBOARD_DATA } from "./data";

export function SmartDistributionDashboard() {
    const [activeCategoryId, setActiveCategoryId] = useState<string>("distribution");
    const [activeSubCategoryId, setActiveSubCategoryId] = useState<string>("dsps");

    const currentCategory = useMemo(() =>
        DASHBOARD_DATA.find(c => c.id === activeCategoryId) || DASHBOARD_DATA[0],
        [activeCategoryId]);

    const currentSubCategories = currentCategory.subCategories;

    const currentPlatforms = useMemo(() => {
        const sub = currentSubCategories.find(s => s.id === activeSubCategoryId);
        return sub ? sub.platforms : [];
    }, [currentSubCategories, activeSubCategoryId]);

    const handleCategoryChange = (id: string) => {
        setActiveCategoryId(id);
        const output = DASHBOARD_DATA.find(c => c.id === id);
        if (output && output.subCategories.length > 0) {
            setActiveSubCategoryId(output.subCategories[0].id);
        }
    };

    return (
        <div className="w-full relative overflow-hidden rounded-[24px] border border-black/5 dark:border-white/10 bg-white/70 dark:bg-[#0b111a]/70 backdrop-blur-3xl shadow-2xl">
            <div className="relative z-10 flex flex-col">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-8 gap-4">
                    <div className="flex items-center gap-5">
                        <div className="relative w-12 h-12 rounded-2xl bg-black dark:bg-white flex items-center justify-center shadow-sm">
                            <Globe className="w-6 h-6 text-white dark:text-black" strokeWidth={1.5} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white leading-none font-heading">
                                    Network Status
                                </h2>
                                <span className="hidden md:inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-100/50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Operational
                                </span>
                            </div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mt-2">
                                Distribution & Access Control
                            </p>
                        </div>
                    </div>

                    {/* System Status Pill (Mobile) */}
                    <div className="flex md:hidden items-center gap-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 px-3 py-2 rounded-2xl self-start shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">System Normal</span>
                    </div>
                </div>

                <div className="px-8 border-b border-black/5 dark:border-white/5">
                    {/* Level 1 Navigation: Tabs */}
                    <CategoryTabs
                        categories={DASHBOARD_DATA}
                        activeCategoryId={activeCategoryId}
                        onChange={handleCategoryChange}
                    />
                </div>

                {/* Level 2 Navigation: Sub-Filters */}
                <div className="bg-slate-50/50 dark:bg-white/[0.01]">
                    <SubFilterPills
                        subCategories={currentSubCategories}
                        activeSubCategoryId={activeSubCategoryId}
                        onChange={setActiveSubCategoryId}
                    />
                </div>

                {/* Level 3 Content: Data Grid */}
                <div className="bg-white/40 dark:bg-transparent">
                    <PlatformTable
                        platforms={currentPlatforms}
                        subCategoryId={activeSubCategoryId}
                    />
                </div>

                {/* Empty State */}
                {currentPlatforms.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-16">
                        <ShieldCheck strokeWidth={1} className="w-12 h-12 mb-4 opacity-50" />
                        <p className="text-sm font-medium">Aucune plateforme listée.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
