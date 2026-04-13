import type { Metadata } from "next";
import "@/app/questionnaire/questionnaire.css";

export const metadata: Metadata = {
  title: "Wafia Diagnostic",
  description: "Diagnostic analytique pour Talents et Marques",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport = {
  themeColor: "#020202",
};

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      id="main-content"
      className="wafia-questionnaire-root min-h-screen bg-[#020202] text-white"
    >
      {/* Container is specifically scoped so the CSS won't leak randomly,
          although we are just dropping the built CSS file. */}
      {children}
    </main>
  );
}
