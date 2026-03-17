import React from 'react';
import { CompletionBar } from './CompletionBar';

interface SectionCardProps {
    id: string;
    title: string;
    percent: number;
    children: React.ReactNode;
}

export function SectionCard({ id, title, percent, children }: SectionCardProps) {
    return (
        <div id={id} className="rounded-2xl bg-questionnaire-surface border border-questionnaire-muted overflow-hidden glass-panel mb-8 scroll-mt-24">
            <div className="p-5 md:p-6 border-b border-questionnaire-muted flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.01]">
                <h3 className="text-lg font-semibold text-white font-display tracking-tight">{title}</h3>
                <div className="w-full md:max-w-[200px] flex items-center gap-3">
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{percent}% de complétion</span>
                    <CompletionBar percent={percent} />
                </div>
            </div>
            <div className="p-5 md:p-6 grid gap-4 grid-cols-1 md:grid-cols-2">
                {children}
            </div>
        </div>
    );
}
