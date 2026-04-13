import type { Metadata } from "next";
import { QuestionnaireIframe } from "@/components/questionnaire/QuestionnaireIframe";

export const metadata: Metadata = {
  title: "Diagnostic Talents | Wafia",
  description:
    "Analyse de maturité pour créateurs de contenu. Identifiez vos forces, vos blocages et débloquez votre croissance.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TalentsQuestionnairePage() {
  return <QuestionnaireIframe type="talents" />;
}
