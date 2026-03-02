import { QuestionnaireEngine } from "@/components/questionnaire-public/QuestionnaireEngine";

export default function TalentsQuestionnairePage() {
    return (
        <main className="w-full min-h-screen bg-[#050510] text-[#E0E0E0] overflow-hidden selection:bg-purple-500/30 font-sans">
            <QuestionnaireEngine type="TALENTS" />
        </main>
    );
}
