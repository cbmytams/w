"use client";

import { useState } from "react";
import { Download, FileSpreadsheet, Loader2, FileText } from "lucide-react";

export default function BrandsExportsPage() {
  const [exporting, setExporting] = useState(false);

  const handleExport = async (format: string) => {
    setExporting(true);
    try {
      window.location.href = `/api/v1/questionnaires/exports?type=BRANDS&format=${format}&version=v1`;
    } finally {
      setTimeout(() => setExporting(false), 2500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="surface-card p-6">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/25 font-medium mb-1">Exports</div>
        <h1 className="text-lg font-semibold text-white/90">Télécharger les données Brands</h1>
        <p className="text-sm text-white/40 mt-1">Exportez l'ensemble des réponses au questionnaire Marques.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <button
          onClick={() => handleExport("csv")}
          disabled={exporting}
          className="surface-card p-8 text-left group hover:border-emerald-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition">
              <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-white/20 group-hover:text-white/60 transition">
              {exporting ? (
                <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
              ) : (
                <Download className="w-5 h-5" />
              )}
            </div>
          </div>
          <h3 className="text-base font-semibold text-white/80 group-hover:text-white transition">Export CSV</h3>
          <p className="text-sm text-white/35 mt-2 leading-relaxed">
            Compatible Excel, Google Sheets et tout tableur. Toutes les réponses dans un fichier structuré.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
            {exporting ? "En cours…" : "Télécharger"}
          </div>
        </button>

        <div className="surface-card p-8 opacity-40 cursor-not-allowed">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-6">
            <FileText className="w-6 h-6 text-white/30" />
          </div>
          <h3 className="text-base font-semibold text-white/60">Export PDF</h3>
          <p className="text-sm text-white/30 mt-2 leading-relaxed">
            Rapports formatés avec briefs détaillés. Disponible prochainement.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs font-medium text-white/30">
            Bientôt disponible
          </div>
        </div>
      </div>
    </div>
  );
}
