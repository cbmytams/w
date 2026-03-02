import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ExternalLink, Clock } from 'lucide-react';

import type { Lead } from '../../types';
import {
    formatLeadDate,
    getLeadCompletionPercent,
    getLeadInterestScore,
    getLeadInterestTier,
    getLeadProgress,
    getLeadTags,
    getPillarLabel
} from '../../lib/leadInsights';

interface LeadCardProps {
    lead: Lead;
    onOpenDetails?: (lead: Lead) => void;
}

export function LeadCard({ lead, onOpenDetails }: LeadCardProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: lead.id,
        data: { lead }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-[#0f0f12] border border-emerald-500/50 p-4 rounded-xl opacity-50 cursor-grabbing shadow-2xl z-50 ring-2 ring-emerald-500/20"
            >
                <div className="h-4 w-1/2 bg-white/10 rounded mb-2" />
                <div className="h-3 w-3/4 bg-white/5 rounded" />
            </div>
        );
    }

    const completion = getLeadCompletionPercent(lead);
    const interestScore = getLeadInterestScore(lead);
    const interestTier = getLeadInterestTier(interestScore);
    const progress = getLeadProgress(lead);
    const tags = getLeadTags(lead);

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="group bg-[#0f0f12] border border-white/5 p-4 rounded-xl hover:border-white/20 hover:bg-white/[0.02] cursor-grab active:cursor-grabbing transition-all hover:shadow-lg hover:shadow-emerald-500/5"
        >
            <div className="flex items-start justify-between mb-2">
                <div>
                    <div className="font-bold text-white text-sm">{lead.name}</div>
                    <div className="text-xs text-zinc-500 truncate max-w-[140px]">{lead.email}</div>
                    <div className="text-[10px] text-zinc-600 mt-1">
                        {getPillarLabel(progress.pillar)} • {progress.label}
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <div className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-zinc-300">
                        {interestScore}
                    </div>
                    <div className={`text-[10px] px-2 py-0.5 rounded-full border ${interestTier.color}`}>
                        {interestTier.label}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[var(--heat-start)] to-[var(--heat-end)]"
                        style={{ width: `${completion}%` }}
                    />
                </div>
                <span className="text-[10px] text-zinc-500">{completion}%</span>
            </div>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                    <Clock className="w-3 h-3" /> {formatLeadDate(lead.date)}
                </div>
                <button
                    type="button"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                        event.stopPropagation();
                        onOpenDetails?.(lead);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white/10 rounded hover:bg-white/20 text-white"
                    aria-label="Open lead details"
                    data-testid="lead-details-open"
                >
                    <ExternalLink className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}
