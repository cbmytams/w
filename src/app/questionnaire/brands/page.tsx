import type { Metadata } from 'next';
import { QuestionnaireIframe } from '@/components/questionnaire/QuestionnaireIframe';

export const metadata: Metadata = {
    title: 'Diagnostic Marques | Wafia',
    description: 'Estimez votre plan budget et diagnostic avec Wafia Studio.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function BrandsQuestionnairePage() {
    return <QuestionnaireIframe type="brands" />;
}
