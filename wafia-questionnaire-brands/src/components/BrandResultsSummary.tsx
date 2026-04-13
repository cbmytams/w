/**
 * WAFIA BRAND DIAGNOSTIC - RESULTS SUMMARY
 * Premium results page with Lead Score, Radar, Services, Package, and CTA
 */

import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  Package,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import type { BrandDiagnosticResult } from "../types";
import {
  scoresToRadarData,
  getLevelLabel,
  getLevelColor,
} from "../utils/scoring";

interface BrandResultsSummaryProps {
  result: BrandDiagnosticResult;
  onReset: () => void;
}

const CARD_BASE =
  "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8";

export function BrandResultsSummary({
  result,
  onReset,
}: BrandResultsSummaryProps) {
  const radarData = scoresToRadarData(result.scores);
  const levelLabel = getLevelLabel(result.level);
  const levelColor = getLevelColor(result.level);
  const tier = result.leadScore.tier;
  const includedServices = result.services.filter((s) => s.included);

  const tierColors: Record<string, string> = {
    hot: "#EF4444",
    warm: "#F97316",
    cool: "#3B82F6",
    cold: "#6B7280",
  };

  const tierLabels: Record<string, string> = {
    hot: "🔥 Lead Prioritaire",
    warm: "☀️ Lead Qualifié",
    cool: "🌤️ Lead à Qualifier",
    cold: "❄️ Lead à Maturer",
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-white/10 bg-white/5 mb-6">
            <Sparkles className="w-4 h-4 text-[var(--heat-start)]" />
            <span className="text-xs font-mono tracking-widest uppercase text-zinc-300">
              Résultats du Diagnostic
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Votre profil
            <span className="bg-gradient-to-r from-[var(--heat-start)] to-[var(--heat-end)] bg-clip-text text-transparent">
              {" "}
              stratégique
            </span>
          </h1>

          {/* Level Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border"
            style={{
              borderColor: levelColor + "40",
              color: levelColor,
              backgroundColor: levelColor + "15",
            }}
          >
            <span className="text-sm font-bold tracking-wide">
              {levelLabel}
            </span>
            <span className="text-sm opacity-60">·</span>
            <span className="text-sm font-mono">{result.overallScore}/100</span>
          </motion.div>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={CARD_BASE}
          >
            <h3 className="text-sm font-mono tracking-widest uppercase text-zinc-400 mb-6">
              Maturité Marketing
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis
                  dataKey="pillar"
                  tick={{ fill: "#a1a1aa", fontSize: 12, fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: "#52525b", fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="var(--heat-start)"
                  fill="var(--heat-start)"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Lead Score Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={CARD_BASE}
          >
            <h3 className="text-sm font-mono tracking-widest uppercase text-zinc-400 mb-6">
              Lead Score
            </h3>

            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-5xl font-black text-white">
                  {result.leadScore.total}
                </div>
                <div className="text-sm text-zinc-500 mt-1">/100 points</div>
              </div>
              <div
                className="px-4 py-2 rounded-full text-sm font-bold"
                style={{
                  backgroundColor: tierColors[tier] + "20",
                  color: tierColors[tier],
                  border: `1px solid ${tierColors[tier]}40`,
                }}
              >
                {tierLabels[tier]}
              </div>
            </div>

            {/* Score Breakdown Bars */}
            <div className="space-y-3">
              {[
                {
                  label: "Budget",
                  value: result.leadScore.breakdown.budget,
                  weight: "30%",
                },
                {
                  label: "Urgence",
                  value: result.leadScore.breakdown.urgency,
                  weight: "20%",
                },
                {
                  label: "Maturité",
                  value: result.leadScore.breakdown.maturity,
                  weight: "15%",
                },
                {
                  label: "Fit Services",
                  value: result.leadScore.breakdown.fit,
                  weight: "20%",
                },
                {
                  label: "Décision",
                  value: result.leadScore.breakdown.decision,
                  weight: "15%",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">{item.label}</span>
                    <span className="text-zinc-500 font-mono">
                      {item.value}/100 ({item.weight})
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--heat-start)] to-[var(--heat-end)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{
                        delay: 0.5,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* North Star & Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* North Star Objective */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={CARD_BASE}
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-[var(--heat-start)]" />
              <h3 className="text-sm font-mono tracking-widest uppercase text-zinc-400">
                Objectif Prioritaire
              </h3>
            </div>
            <div className="text-2xl font-bold text-white mb-3 capitalize">
              {result.northStar === "awareness"
                ? "🎯 Notoriété"
                : result.northStar === "traffic"
                  ? "🚀 Trafic"
                  : result.northStar === "conversion"
                    ? "💰 Conversion"
                    : result.northStar === "retention"
                      ? "🤝 Fidélisation"
                      : "Non défini"}
            </div>
            <ul className="space-y-2 mt-6">
              {result.recommendations.map((rec, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-zinc-300"
                >
                  <span className="text-[var(--heat-start)] mt-0.5">→</span>
                  {rec}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Recommandés */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={CARD_BASE}
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-[var(--heat-start)]" />
              <h3 className="text-sm font-mono tracking-widest uppercase text-zinc-400">
                Services Recommandés
              </h3>
            </div>
            <div className="space-y-3">
              {result.services.map((service) => (
                <div key={service.id} className="flex items-start gap-3 py-2">
                  {service.included ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" />
                  )}
                  <div>
                    <div
                      className={`text-sm font-semibold ${service.included ? "text-white" : "text-zinc-600"}`}
                    >
                      {service.label}
                    </div>
                    {service.included && service.reason && (
                      <div className="text-xs text-zinc-500 mt-0.5">
                        {service.reason}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Package Suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-3xl border border-[var(--heat-start)]/20 bg-gradient-to-br from-[var(--heat-start)]/10 to-transparent backdrop-blur-md p-8 sm:p-10 mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-[var(--heat-start)]" />
            <h3 className="text-sm font-mono tracking-widest uppercase text-zinc-400">
              Package Recommandé
            </h3>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                {result.package.label}
              </h2>
              <p className="text-zinc-400 max-w-lg">{result.package.summary}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-bold text-white">
                {result.package.priceRange}
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                {result.package.duration}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {result.package.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-zinc-300"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--heat-start)] shrink-0" />
                {feature}
              </div>
            ))}
          </div>

          {/* Objective */}
          <div className="py-3 px-4 rounded-xl bg-white/5 border border-white/5 text-sm text-zinc-300 inline-block">
            🎯{" "}
            <span className="font-semibold text-white">
              {result.package.objective}
            </span>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center py-12"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Prêt à passer à l'action ?
          </h3>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            Notre équipe vous contactera sous 24h avec une proposition
            personnalisée basée sur votre diagnostic.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://wafia.co/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-zinc-900 font-bold text-base shadow-[0_0_40px_-10px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_-10px_rgba(249,115,22,0.6)] transition-all"
            >
              Discutons de votre projet
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Refaire le diagnostic
            </button>
          </div>

          {/* Included Services Summary */}
          {includedServices.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {includedServices.map((s) => (
                <span
                  key={s.id}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-400"
                >
                  {s.label}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
