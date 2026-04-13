import { useMemo, useState } from "react";
import { Search, ArrowUpDown, Filter, ChevronRight } from "lucide-react";
import type { Lead } from "../../types";
import { cn } from "../../utils/cn";
import {
  formatLeadDate,
  getLeadCompletionPercent,
  getLeadInterestScore,
  getLeadInterestTier,
  getLeadProgress,
  getLeadTags,
  getPillarLabel,
} from "../../lib/leadInsights";

interface LeadsDirectoryProps {
  leads: Lead[];
  onOpenLead?: (lead: Lead) => void;
}

const STATUS_LABELS: Record<Lead["status"], string> = {
  new: "Nouveau",
  contacted: "Contacté",
  signed: "Signé",
  archived: "Archivé",
  qualified: "Qualifié",
};

const SORT_OPTIONS = [
  { id: "interest", label: "Intérêt (desc)" },
  { id: "score", label: "Score (desc)" },
  { id: "completion", label: "Completion (desc)" },
  { id: "date", label: "Date (desc)" },
  { id: "name", label: "Nom (A-Z)" },
  { id: "status", label: "Statut" },
] as const;

export function LeadsDirectory({ leads, onOpenLead }: LeadsDirectoryProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Lead["status"]>(
    "all"
  );
  const [levelFilter, setLevelFilter] = useState("all");
  const [sortBy, setSortBy] =
    useState<(typeof SORT_OPTIONS)[number]["id"]>("interest");

  const levels = useMemo(() => {
    const unique = new Set<string>();
    leads.forEach((lead) => {
      if (lead.level) unique.add(lead.level);
    });
    return Array.from(unique);
  }, [leads]);

  const filtered = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    return leads
      .filter((lead) => {
        if (statusFilter !== "all" && lead.status !== statusFilter)
          return false;
        if (levelFilter !== "all" && lead.level !== levelFilter) return false;
        if (!lowerQuery) return true;
        return (
          lead.name.toLowerCase().includes(lowerQuery) ||
          lead.email.toLowerCase().includes(lowerQuery)
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "interest":
            return getLeadInterestScore(b) - getLeadInterestScore(a);
          case "completion":
            return getLeadCompletionPercent(b) - getLeadCompletionPercent(a);
          case "date":
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          case "name":
            return a.name.localeCompare(b.name);
          case "status":
            return a.status.localeCompare(b.status);
          case "score":
          default:
            return b.score - a.score;
        }
      });
  }, [leads, query, statusFilter, levelFilter, sortBy]);

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Controls */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un créateur, un email..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/20"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <Filter className="w-4 h-4" />
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as Lead["status"] | "all")
            }
            className="bg-white/5 border border-white/10 rounded-full px-3 py-2 text-xs text-white"
          >
            <option value="all">Tous les statuts</option>
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={levelFilter}
            onChange={(event) => setLevelFilter(event.target.value)}
            className="bg-white/5 border border-white/10 rounded-full px-3 py-2 text-xs text-white"
          >
            <option value="all">Tous les niveaux</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" />
            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value as (typeof SORT_OPTIONS)[number]["id"]
                )
              }
              className="bg-white/5 border border-white/10 rounded-full px-3 py-2 text-xs text-white"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1.5fr_1fr_auto] gap-3 px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-500 font-mono border-b border-white/5">
          <div>Créateur</div>
          <div>Niveau</div>
          <div>Intérêt</div>
          <div>Score</div>
          <div>Progress</div>
          <div>Statut</div>
          <div>Tags</div>
          <div>Dernier pas</div>
          <div></div>
        </div>
        <div className="max-h-[520px] overflow-y-auto custom-scrollbar">
          {filtered.length === 0 && (
            <div className="p-8 text-sm text-zinc-500">
              Aucun profil trouvé.
            </div>
          )}
          {filtered.map((lead) => {
            const completion = getLeadCompletionPercent(lead);
            const tags = getLeadTags(lead);
            const interest = getLeadInterestScore(lead);
            const interestTier = getLeadInterestTier(interest);
            const progress = getLeadProgress(lead);
            return (
              <div
                key={lead.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1.5fr_1fr_auto] gap-3 px-6 py-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-white">
                    {lead.name || "Anonymous"}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {lead.email || "Email inconnu"}
                  </div>
                  <div className="text-[10px] text-zinc-600">
                    {formatLeadDate(lead.date)}
                  </div>
                </div>
                <div className="text-xs text-zinc-300">{lead.level}</div>
                <div
                  className={`text-[10px] px-2 py-1 rounded-full border w-fit ${interestTier.color}`}
                >
                  {interest}
                </div>
                <div className="text-xs text-zinc-300">{lead.score}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--heat-start)] to-[var(--heat-end)]"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-zinc-500">
                    {completion}%
                  </span>
                </div>
                <div className="text-xs text-zinc-400">
                  {STATUS_LABELS[lead.status]}
                </div>
                <div className="flex flex-wrap gap-1">
                  {tags.length === 0 ? (
                    <span className="text-[10px] text-zinc-600">-</span>
                  ) : (
                    tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))
                  )}
                </div>
                <div className="text-[10px] text-zinc-500">
                  {getPillarLabel(progress.pillar)} • {progress.label}
                </div>
                <button
                  onClick={() => onOpenLead?.(lead)}
                  className={cn(
                    "text-xs text-white flex items-center gap-1 px-3 py-2 rounded-full",
                    "bg-white/5 hover:bg-white/10 transition-colors"
                  )}
                >
                  Détails <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
