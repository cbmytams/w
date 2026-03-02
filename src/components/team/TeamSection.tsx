"use client";

import React from "react";
import { TEAM } from "@/data/team";
import { TeamCard } from "./TeamCard";

export function TeamSection() {
    return (
        <section className="w-full section-spacing bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)] border-t border-[var(--neutral-200)] dark:border-[var(--neutral-800)] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[var(--background)]/80 to-transparent opacity-50 blur-3xl -z-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Section Header */}
                <div className="mb-16 md:mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-[var(--background)] border border-[var(--neutral-200)] dark:border-[var(--neutral-800)] shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-primary)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand-primary)]"></span>
                        </span>
                        <span className="text-xs font-semibold text-[var(--neutral-800)] dark:text-[var(--neutral-200)] uppercase tracking-wider">
                            Humans First
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-6 font-[family-name:var(--font-heading)]">
                        L&apos;architecture derrière Wafia
                    </h2>
                    <p className="text-lg text-[var(--neutral-800)] dark:text-[var(--neutral-200)] max-w-2xl mx-auto leading-relaxed">
                        Pas d&apos;algorithmes obscurs. Juste des experts qui construisent des carrières durables.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {TEAM.map((member, index) => (
                        <TeamCard
                            key={member.id}
                            member={member}
                            index={index}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

