import "@/app/questionnaire/questionnaire.css";

export const metadata = {
    title: "Wafia Diagnostic",
    description: "Diagnostic analytique pour Talents et Marques",
    themeColor: "#020202",
};

export default function QuestionnaireLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="wafia-questionnaire-root min-h-screen bg-[#020202] text-white">
            {/* Container is specifically scoped so the CSS won't leak randomly,
          although we are just dropping the built CSS file. */}
            {children}
        </div>
    );
}
