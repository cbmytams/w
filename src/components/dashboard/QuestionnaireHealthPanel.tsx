"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Save,
  Database,
  ServerCrash,
  Activity,
} from "lucide-react";
import { StatCard } from "./StatCard";

interface HealthIssue {
  type: string;
  message: string;
}

interface HealthData {
  status: "ok" | "warning" | "critical";
  version: string;
  totalQuestions: number;
  issues: HealthIssue[];
}

interface HealthResponse {
  success: boolean;
  data?: HealthData;
}

export function QuestionnaireHealthPanel({
  type,
}: {
  type: "TALENTS" | "BRANDS";
}) {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [purging, setPurging] = useState(false);

  const refreshHealth = useCallback(() => {
    setLoading(true);
    fetch(`/api/v1/questionnaires/health?type=${type}`)
      .then((res) => res.json())
      .then((json: HealthResponse) => {
        setData(
          json.success && json.data
            ? json.data
            : {
                status: "critical",
                version: "unknown",
                totalQuestions: 0,
                issues: [
                  {
                    type: "error",
                    message: "Failed to load health data",
                  },
                ],
              }
        );
        setLoading(false);
      })
      .catch(() => {
        setData({
          status: "critical",
          version: "unknown",
          totalQuestions: 0,
          issues: [{ type: "error", message: "Failed to load health data" }],
        });
        setLoading(false);
      });
  }, [type]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      refreshHealth();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [refreshHealth]);

  const handleExport = async () => {
    setExporting(true);
    try {
      window.location.href = `/api/v1/questionnaires/exports?type=${type}&format=csv&version=v1`;
    } finally {
      setTimeout(() => setExporting(false), 1500);
    }
  };

  const handlePurge = async () => {
    if (
      !confirm(
        "Voulez-vous vraiment purger les données orphelines (Ghost Respondents) ? Cette action est irréversible."
      )
    )
      return;
    setPurging(true);
    try {
      await fetch(`/api/v1/questionnaires/health?type=${type}`, {
        method: "DELETE",
      });
      refreshHealth();
    } finally {
      setPurging(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-questionnaire-surface border border-questionnaire-muted p-12 flex flex-col items-center justify-center min-h-[300px] glass-panel">
        <Activity className="w-8 h-8 text-questionnaire-primary animate-pulse mb-4" />
        <div className="text-sm text-slate-400 font-medium animate-pulse tracking-wide uppercase">
          Exécution des diagnostics d'intégrité...
        </div>
      </div>
    );
  }

  if (!data) return null;

  const isOk = data.status === "ok";
  const statusColor = isOk
    ? "text-green-500"
    : data.status === "warning"
      ? "text-yellow-500"
      : "text-red-500";
  const StatusIcon = isOk
    ? CheckCircle
    : data.status === "warning"
      ? AlertTriangle
      : ServerCrash;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 p-8 rounded-2xl bg-questionnaire-surface border border-questionnaire-muted relative overflow-hidden card-3d">
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <StatusIcon className={`w-6 h-6 ${statusColor}`} />
            <h2 className="text-2xl font-bold font-heading text-white tracking-tight">
              Status d'Intégrité
            </h2>
          </div>
          <p className="text-sm text-slate-400">
            Scan complet de la base de données et des correspondances avec le
            schéma.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="text-right mr-4">
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-semibold">
              Version Schéma
            </div>
            <div className="font-mono text-sm bg-white/5 border border-white/10 px-2 py-1 rounded text-questionnaire-primary">
              {data.version}
            </div>
          </div>
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="px-4 py-2.5 bg-gradient-to-r from-questionnaire-primary to-questionnaire-secondary text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-questionnaire-primary/25 transition-all flex items-center gap-2 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-questionnaire-primary"
          >
            <Save className="w-4 h-4" />
            {exporting ? "Exportation..." : "Exporter CSV"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Questions Valides"
          value={data.totalQuestions}
          icon={Database}
          description="Questions mappées dans le QuestionnaireMap"
        />
        <StatCard
          title="Anomalies Détectées"
          value={data.issues.length}
          icon={AlertTriangle}
          trend={
            data.issues.length === 0
              ? "Optimal"
              : `${data.issues.length} Fixes requis`
          }
          trendPositive={data.issues.length === 0}
          colorClass={
            data.issues.length > 0 ? "text-red-500" : "text-slate-500"
          }
          description="Problèmes de parsing ou respondents fantômes"
        />
      </div>

      <div className="rounded-2xl bg-questionnaire-surface border border-questionnaire-muted overflow-hidden glass-panel">
        <div className="p-6 border-b border-questionnaire-muted bg-white/[0.01] flex justify-between items-center">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Journal des Anomalies
          </h3>
          {data.issues.some((i) => i.type === "ghost_respondent") && (
            <button
              onClick={handlePurge}
              disabled={purging}
              className="text-xs font-semibold bg-red-500/20 text-red-400 px-3 py-1.5 rounded-md hover:bg-red-500/30 transition-colors"
            >
              {purging ? "Purge en cours..." : "Purger les Fantômes"}
            </button>
          )}
        </div>
        <div className="p-6">
          {data.issues.length > 0 ? (
            <ul className="space-y-3">
              {data.issues.map((issue, idx) => (
                <li
                  key={idx}
                  className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex items-start gap-4 transition-colors hover:bg-red-500/10"
                >
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-red-400 mb-1 font-semibold">
                      {issue.type}
                    </strong>
                    <p className="text-sm text-slate-300">{issue.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 rounded-xl bg-green-500/5 border border-green-500/10 flex flex-col items-center justify-center text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4 opacity-80" />
              <h4 className="text-lg font-medium text-green-400 mb-1">
                Système Nominal
              </h4>
              <p className="text-sm text-green-500/70">
                Aucune anomalie détectée dans la structure des données. Les
                correspondances entre la base et les schémas front-end sont
                parfaites.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
