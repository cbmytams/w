import { HomeClient } from "@/components/home/HomeClient"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Accueil",
    description:
        "Studio créatif et moteur d'influence Wafia pour marques, agences et talents.",
    openGraph: {
        title: "Wafia | Influence & Creative Studio",
        description:
            "Studio créatif et moteur d'influence Wafia pour marques, agences et talents."
    },
    twitter: {
        card: "summary_large_image",
        title: "Wafia | Influence & Creative Studio",
        description:
            "Studio créatif et moteur d'influence Wafia pour marques, agences et talents."
    }
};

/**
 * Homepage - Server Component
 * 
 * Renders the Client Component for the main interactive experience.
 * This structure allows us to add `generateMetadata` or other server-side logic here if needed.
 */
export default function Homepage() {
    return <HomeClient />
}
