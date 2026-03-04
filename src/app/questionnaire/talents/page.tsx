import type { Metadata } from 'next';
import { QuestionnaireEngine } from "@/components/questionnaire-public/QuestionnaireEngine";

export const metadata: Metadata = {
    title: 'Diagnostic Talents | Wafia',
    description: 'Passez le diagnostic exclusif Wafia pour faire évoluer votre carrière de créateur de contenu.'
};

export default function TalentsQuestionnairePage() {
    return (
        <main className="w-full min-h-screen bg-[#050510] text-[#E0E0E0] overflow-hidden selection:bg-purple-500/30 font-sans">
            <QuestionnaireEngine type="TALENTS" />
        </main>
    );
}
