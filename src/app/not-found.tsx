import type { Metadata } from "next";
import NotFoundClient from "@/components/NotFoundClient";

export const metadata: Metadata = {
  title: "Page introuvable",
  description:
    "La page demandée n'existe pas. Retrouvez toutes nos ressources sur l'influence marketing.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundClient />;
}
