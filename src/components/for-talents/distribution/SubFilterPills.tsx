"use client";
import { SubCategory } from "./types";
import { cn } from "@/lib/utils";

interface SubFilterPillsProps {
    subCategories: SubCategory[];
    activeSubCategoryId: string;
    onChange: (id: string) => void;
}

export function SubFilterPills({ subCategories, activeSubCategoryId, onChange }: SubFilterPillsProps) {
    return (
        <div className="flex items-center gap-2 px-8 py-4 overflow-x-auto no-scrollbar mask-gradient-right">
            {subCategories.map((sub) => {
                const isActive = activeSubCategoryId === sub.id;
                return (
                    <button
                        key={sub.id}
                        onClick={() => onChange(sub.id)}
                        className={cn(
                            "relative px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all duration-300 border whitespace-nowrap",
                            isActive
                                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm"
                                : "border-transparent text-slate-500 hover:bg-black/5 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                        )}
                    >
                        {sub.label}
                    </button>
                );
            })}
        </div>
    );
}
