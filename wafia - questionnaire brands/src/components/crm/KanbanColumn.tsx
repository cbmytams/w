import { useDroppable } from '@dnd-kit/core';
import type { Lead } from '../../types';
import { LeadCard } from './LeadCard';

interface KanbanColumnProps {
    id: string;
    title: string;
    count: number;
    leads: Lead[];
    color: string;
    onOpenLead?: (lead: Lead) => void;
}

export function KanbanColumn({ id, title, count, leads, color, onOpenLead }: KanbanColumnProps) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div className="flex flex-col h-full min-w-[280px] w-[300px]">
            <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${color}`} />
                    <h3 className="text-xs font-bold uppercase text-zinc-400 tracking-wider">
                        {title}
                    </h3>
                </div>
                <span className="bg-white/5 text-zinc-500 text-[10px] font-mono px-2 py-0.5 rounded-full">
                    {count}
                </span>
            </div>

            <div
                ref={setNodeRef}
                className="flex-1 bg-white/[0.02] rounded-xl border border-white/5 p-3 space-y-3 overflow-y-auto custom-scrollbar"
            >
                {leads.map(lead => (
                    <LeadCard key={lead.id} lead={lead} onOpenDetails={onOpenLead} />
                ))}
                {leads.length === 0 && (
                    <div className="h-24 flex items-center justify-center border-2 border-dashed border-white/5 rounded-lg text-xs text-zinc-600">
                        Drop here
                    </div>
                )}
            </div>
        </div>
    );
}
