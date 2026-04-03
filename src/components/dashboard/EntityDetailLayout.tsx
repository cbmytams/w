import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface EntityDetailLayoutProps {
    title: string;
    subtitle: string;
    backHref: string;
    backLabel: string;
    headerSlot?: React.ReactNode;
    sidebarSlot?: React.ReactNode;
    children: React.ReactNode;
}

export function EntityDetailLayout({
    title,
    subtitle,
    backHref,
    backLabel,
    headerSlot,
    sidebarSlot,
    children
}: EntityDetailLayoutProps) {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <Link href={backHref} className="inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white text-sm font-medium backdrop-blur-xl mb-6">
                <ArrowLeft className="w-4 h-4" />
                {backLabel}
            </Link>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Main Content Area */}
                <div className="flex-1 w-full space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 p-8 rounded-2xl bg-questionnaire-surface border border-questionnaire-muted relative overflow-hidden card-3d">
                        {/* Background Texture matching Social Cut */}
                        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

                        <div className="relative z-10">
                            <h1 className="text-3xl md:text-5xl font-bold font-heading text-white tracking-tight leading-tight">{title}</h1>
                            <div className="text-sm text-slate-300 mt-2 font-medium">{subtitle}</div>
                        </div>
                        {headerSlot && <div className="relative z-10">{headerSlot}</div>}
                    </div>

                    <div className="space-y-8">
                        {children}
                    </div>
                </div>

                {/* Sticky Sidebar */}
                {sidebarSlot && (
                    <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-8 space-y-6">
                        {sidebarSlot}
                    </div>
                )}
            </div>
        </div>
    );
}
