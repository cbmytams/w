"use client";

import { motion } from "framer-motion";
import { SubCategory } from "./types";
import { cn } from "@/lib/utils";

interface SubFilterPillsProps {
    subCategories: SubCategory[];
    activeSubCategoryId: string;
    onChange: (id: string) => void;
    categoryId?: string;
}

const PILL_STYLES = {
    distribution: "bg-orange-50/80 border-orange-200/60 text-orange-600 dark:bg-orange-500/10 dark:border-orange-500/30 dark:text-orange-300 shadow-sm",
    labels: "bg-pink-50/80 border-pink-200/60 text-pink-600 dark:bg-pink-500/10 dark:border-pink-500/30 dark:text-pink-300 shadow-sm",
    access: "bg-blue-50/80 border-blue-200/60 text-blue-600 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-300 shadow-sm"
} as const;

export function SubFilterPills({ subCategories, activeSubCategoryId, onChange, categoryId = "distribution" }: SubFilterPillsProps) {
    return (
        <div className="flex items-center gap-2 px-6 py-4 overflow-x-auto no-scrollbar mask-gradient-right">
            {subCategories.map((sub) => {
                const isActive = activeSubCategoryId === sub.id;
                const activeClass = PILL_STYLES[categoryId as keyof typeof PILL_STYLES] ?? PILL_STYLES.distribution;
                return (
                    <button
                        key={sub.id}
                        onClick={() => onChange(sub.id)}
                        className={cn(
                            "relative px-5 py-2 rounded-full text-[11px] font-bold tracking-wide transition-all duration-300 border",
                            isActive
                                ? activeClass
                                : "border-transparent text-gray-400 hover:bg-white/80 hover:text-gray-900 hover:shadow-sm dark:text-gray-500 dark:hover:bg-white/5 dark:hover:text-gray-200"
                        )}
                    >
                        {sub.label}
                    </button>
                );
            })}
        </div>
    );
}
