import { motion } from "framer-motion";
import { X, Mail, Copy, BadgeCheck, Clock } from "lucide-react";
import type { Lead } from "../../types";
import { toast } from "sonner";
import {
  getLeadCompletionPercent,
  getLeadInterestScore,
  getLeadInterestTier,
  getLeadProgress,
  getLeadTags,
  getPillarLabel,
} from "../../lib/leadInsights";

interface LeadDetailsPanelProps {
  lead: Lead;
  onClose: () => void;
}

const STATUS_LABELS: Record<Lead["status"], string> = {
  new: "Nouveau",
  contacted: "Contacté",
  signed: "Signé",
  archived: "Archivé",
  qualified: "Qualifié",
};

const STATUS_STYLES: Record<Lead["status"], string> = {
  new: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  contacted: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
  signed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  archived: "bg-zinc-500/10 text-zinc-300 border-zinc-500/30",
  qualified: "bg-purple-500/10 text-purple-300 border-purple-500/30",
};

const formatDate = (value: string) => {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
};

export function LeadDetailsPanel({ lead, onClose }: LeadDetailsPanelProps) {
  const answers = Object.entries(lead.answers || {});
  const completion = getLeadCompletionPercent(lead);
  const tags = getLeadTags(lead);
  const interest = getLeadInterestScore(lead);
  const interestTier = getLeadInterestTier(interest);
  const progress = getLeadProgress(lead);
  const displayEmail = lead.email || lead.emailMasked || "";
  const hasFullEmail = Boolean(
    lead.email &&
    lead.email !== lead.emailMasked &&
    lead.email.includes("@") &&
    !lead.email.includes("*")
  );

  const handleCopyEmail = async () => {
    if (!lead.email) {
      toast.error("Aucun email disponible.");
      return;
    }
    try {
      await navigator.clipboard.writeText(lead.email);
      toast.success("Email copié.");
    } catch {
      toast.error("Impossible de copier l'email.");
    }
  };

  const handleEmail = () => {
    if (!lead.email) {
      toast.error("Aucun email disponible.");
      return;
    }
    window.location.href = `mailto:${lead.email}`;
  };

  return (
    <motion.div
      data-testid="lead-details-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full border-l border-white/5 bg-[#0b0b0b]/95 backdrop-blur-xl flex flex-col shadow-2xl"
    >
      {/* HEADER */}
      <div className="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0a] shrink-0">
        <div>
          <div className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
            Lead Details
          </div>
          <div className="text-lg font-bold text-white tracking-tight">
            {lead.name || "Anonymous"}
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 text-zinc-500 hover:text-white transition-colors"
          aria-label="Close lead details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest border ${STATUS_STYLES[lead.status]}`}
            >
              {STATUS_LABELS[lead.status]}
            </span>
            <div className="text-xs text-zinc-500 flex items-center gap-2">
              <Clock className="w-3 h-3" />
              {formatDate(lead.date)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                Score
              </div>
              <div className="text-2xl font-bold text-white">{lead.score}</div>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                Niveau
              </div>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-[var(--heat-start)]" />
                {lead.level}
              </div>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                Intérêt
              </div>
              <div
                className={`text-sm font-semibold px-2 py-1 rounded-full border w-fit ${interestTier.color}`}
              >
                {interest} • {interestTier.label}
              </div>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] col-span-2">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                Progression
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--heat-start)] to-[var(--heat-end)]"
                    style={{ width: `${completion}%` }}
                  />
                </div>
                <span className="text-xs text-zinc-400">{completion}%</span>
              </div>
              <div className="mt-2 text-xs text-zinc-500">
                {getPillarLabel(progress.pillar)} • {progress.label}
              </div>
            </div>
            {tags.length > 0 && (
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] col-span-2">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                  Tags
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs uppercase tracking-widest text-zinc-500 font-mono">
            Contact
          </div>
          <div className="flex flex-col gap-3">
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="text-xs text-zinc-500">Email</div>
              <div className="text-sm text-white break-all">
                {displayEmail || "Non renseigné"}
              </div>
              {!hasFullEmail && displayEmail && (
                <div className="text-[11px] text-zinc-500 mt-1">
                  Donnée masquée selon votre niveau d'accès.
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleEmail}
                disabled={!hasFullEmail}
                className="flex-1 py-3 rounded-xl bg-white text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Envoyer un email
              </button>
              <button
                onClick={handleCopyEmail}
                disabled={!hasFullEmail}
                className="px-4 py-3 rounded-xl border border-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copier
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs uppercase tracking-widest text-zinc-500 font-mono">
            Réponses
          </div>
          {answers.length === 0 ? (
            <div className="text-sm text-zinc-500">
              Aucune réponse disponible.
            </div>
          ) : (
            <div className="space-y-3">
              {answers.slice(0, 12).map(([key, value]) => (
                <div
                  key={key}
                  className="p-3 rounded-lg border border-white/5 bg-white/[0.02]"
                >
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                    {key}
                  </div>
                  <div className="text-sm text-white break-words">
                    {Array.isArray(value) ? value.join(", ") : String(value)}
                  </div>
                </div>
              ))}
              {answers.length > 12 && (
                <div className="text-xs text-zinc-500">
                  … {answers.length - 12} réponses supplémentaires
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
