import type { Metadata } from "next";
import { QuestionnaireHealthPanel } from "@/components/dashboard/QuestionnaireHealthPanel";

export const metadata: Metadata = {
  title: "Health Monitor | Brands | WAFIA",
};

export default function BrandsHealthPage() {
  return (
    <div className="space-y-6">
      <div className="surface-card p-6">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/25 font-medium mb-1">
          Monitor
        </div>
        <h1 className="text-lg font-semibold text-white/90">
          Intégrité Brands
        </h1>
        <p className="text-sm text-white/40 mt-1">
          Analyse en temps réel de la robustesse de la base de données et des
          questionnaires.
        </p>
      </div>

      <QuestionnaireHealthPanel type="BRANDS" />
    </div>
  );
}
