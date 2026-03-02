import type { Metadata } from "next";
import { QuestionnaireHealthPanel } from "@/components/dashboard/QuestionnaireHealthPanel";

export const metadata: Metadata = {
    title: "Health Monitor | Brands | WAFIA",
};

export default function BrandsHealthPage() {
    return (
        <div className="space-y-6">
            <div className="surface-card p-6">
                <div className="text-xs uppercase tracking-[0.3em] text-soft">Monitor</div>
                <h1 className="text-2xl font-semibold mt-2">Intégrité Brands</h1>
                <p className="text-sm text-muted mt-2">
                    Analyse en temps réel de la robustesse de la base de données et des questionnaires.
                </p>
            </div>

            <QuestionnaireHealthPanel type="BRANDS" />
        </div>
    );
}
