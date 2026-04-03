import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    trend?: string;
    trendPositive?: boolean;
    description?: string;
    colorClass?: string;
}

export function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    trendPositive,
    description,
    colorClass = "text-questionnaire-primary"
}: StatCardProps) {
    return (
        <div className="p-6 rounded-2xl bg-questionnaire-surface border border-questionnaire-muted glass-panel relative overflow-hidden group transition-all hover:-translate-y-1">
            <div className="absolute -top-4 -right-4 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                {Icon && <Icon className={`w-32 h-32 ${colorClass}`} />}
            </div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{title}</h3>
            </div>

            <div className="flex items-baseline gap-3 relative z-10">
                <div className="text-4xl font-heading font-bold text-white tracking-tight">{value}</div>
                {trend && (
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${trendPositive ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        {trend}
                    </span>
                )}
            </div>

            {description && (
                <p className="mt-3 text-xs text-slate-500 relative z-10 font-medium">{description}</p>
            )}
        </div>
    );
}
