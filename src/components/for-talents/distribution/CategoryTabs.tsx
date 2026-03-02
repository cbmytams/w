"use client";

import { motion } from "framer-motion";
import { Category } from "./types";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
    categories: Category[];
    activeCategoryId: string;
    onChange: (id: string) => void;
}

const TAB_STYLES = {
    distribution: {
        text: "text-orange-600 dark:text-orange-400",
        underline: "bg-gradient-to-r from-orange-500 to-red-500"
    },
    labels: {
        text: "text-pink-600 dark:text-pink-400",
        underline: "bg-gradient-to-r from-pink-500 to-fuchsia-500"
    },
    access: {
        text: "text-blue-600 dark:text-blue-400",
        underline: "bg-gradient-to-r from-blue-500 to-cyan-500"
    }
} as const;

export function CategoryTabs({ categories, activeCategoryId, onChange }: CategoryTabsProps) {
    return (
        <div className="flex items-center gap-10 border-b border-gray-100/60 dark:border-white/5 px-8">
            {categories.map((category) => {
                const isActive = activeCategoryId === category.id;
                const accent = TAB_STYLES[category.id as keyof typeof TAB_STYLES] ?? TAB_STYLES.distribution;
                return (
                    <button
                        key={category.id}
                        onClick={() => onChange(category.id)}
                        className={cn(
                            "relative py-5 text-xs font-extrabold uppercase tracking-[0.2em] transition-colors duration-300 font-heading",
                            isActive
                                ? accent.text
                                : "text-gray-300 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-300"
                        )}
                    >
                        {category.label}
                        {isActive && (
                            <motion.div
                                layoutId="activeTabIndicator"
                                className={cn(
                                    "absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full shadow-[0_-4px_12px_rgba(249,115,22,0.25)]",
                                    accent.underline
                                )}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
