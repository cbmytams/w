import { useState } from "react";
import { LayoutGrid, ListChecks, ArrowUpDown } from "lucide-react";
import { KanbanBoard } from "./KanbanBoard";
import { LeadsDirectory } from "./LeadsDirectory";
import { useAdminData } from "../../context/AdminContext";
import type { Lead } from "../../types";
import { cn } from "../../utils/cn";

interface LeadsHubProps {
  onOpenLead?: (lead: Lead) => void;
}

export function LeadsHub({ onOpenLead }: LeadsHubProps) {
  const { leads, metrics } = useAdminData();
  const [view, setView] = useState<"pipeline" | "directory">("pipeline");
  const [sortBy, setSortBy] = useState<"interest" | "score" | "recent">(
    "interest"
  );
  const queue = {
    p1: leads.filter((lead) => lead.priority === "P1").length,
    p2: leads.filter((lead) => lead.priority === "P2").length,
    late: leads.filter((lead) => lead.slaState === "LATE").length,
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="glass-panel px-4 py-3 rounded-2xl border border-white/10">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
              Total
            </div>
            <div className="text-xl font-bold text-white">
              {metrics.totalLeads}
            </div>
          </div>
          <div className="glass-panel px-4 py-3 rounded-2xl border border-white/10">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
              Actifs
            </div>
            <div className="text-xl font-bold text-white">
              {metrics.activeLeads}
            </div>
          </div>
          <div className="glass-panel px-4 py-3 rounded-2xl border border-white/10">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
              Qualifiés
            </div>
            <div className="text-xl font-bold text-white">
              {leads.filter((l) => l.status === "qualified").length}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-2 text-xs text-zinc-400">
            <ArrowUpDown className="w-4 h-4" />
            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as "interest" | "score" | "recent")
              }
              className="bg-transparent text-xs text-white outline-none"
            >
              <option value="interest">Intérêt</option>
              <option value="score">Score</option>
              <option value="recent">Récent</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1">
            <button
              onClick={() => setView("pipeline")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors",
                view === "pipeline"
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              Pipeline
            </button>
            <button
              onClick={() => setView("directory")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors",
                view === "directory"
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <ListChecks className="w-4 h-4" />
              Directory
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="glass-panel px-4 py-3 rounded-2xl border border-red-500/20 bg-red-500/5">
          <div className="text-[10px] uppercase tracking-widest text-red-300/80 font-mono">
            Queue P1
          </div>
          <div className="text-xl font-bold text-white">{queue.p1}</div>
          <div className="text-xs text-zinc-400">
            Leads prioritaires à traiter
          </div>
        </div>
        <div className="glass-panel px-4 py-3 rounded-2xl border border-amber-500/20 bg-amber-500/5">
          <div className="text-[10px] uppercase tracking-widest text-amber-300/80 font-mono">
            Queue P2
          </div>
          <div className="text-xl font-bold text-white">{queue.p2}</div>
          <div className="text-xs text-zinc-400">À suivre cette semaine</div>
        </div>
        <div className="glass-panel px-4 py-3 rounded-2xl border border-zinc-500/20 bg-white/5">
          <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">
            SLA en retard
          </div>
          <div className="text-xl font-bold text-white">{queue.late}</div>
          <div className="text-xs text-zinc-400">Actions hors délai</div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {view === "pipeline" ? (
          <KanbanBoard onOpenLead={onOpenLead} sortBy={sortBy} />
        ) : (
          <LeadsDirectory leads={leads} onOpenLead={onOpenLead} />
        )}
      </div>
    </div>
  );
}
