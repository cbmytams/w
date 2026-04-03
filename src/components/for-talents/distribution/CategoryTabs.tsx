"use client";

import { motion } from "framer-motion";
import { Category } from "./types";
import { SPRING } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
    categories: Category[];
    activeCategoryId: string;
    onChange: (id: string) => void;
}

export function CategoryTabs({ categories, activeCategoryId, onChange }: CategoryTabsProps) {
    return (
        <div className="flex items-center gap-8 md:gap-12 overflow-x-auto no-scrollbar mask-gradient-right">
            {categories.map((category) => {
                const isActive = activeCategoryId === category.id;
                return (
                    <button
                        key={category.id}
                        onClick={() => onChange(category.id)}
                        className={cn(
                            "relative py-6 text-[12px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 whitespace-nowrap",
                            isActive
                                ? "text-black dark:text-white"
                                : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-300"
                        )}
                    >
                        {category.label}
                        {isActive && (
                            <motion.div
                                layoutId="activeCategoryTab"
                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-black dark:bg-white"
                                transition={{ type: "spring", ...SPRING.responsive }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
