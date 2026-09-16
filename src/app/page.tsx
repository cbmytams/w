import ForBrandsPage from "./for-brands/page";
import { sitePaths } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Wafia | Agence d'influence pour les marques",
  },
  description:
    "Wafia structure les campagnes d'influence des marques : strategie, casting createurs, production studio, diffusion paid et reporting. Des campagnes pensees comme des actifs de marque.",
  alternates: {
    canonical: sitePaths.home,
  },
  openGraph: {
    title: "Wafia | Agence d'influence pour les marques",
    description:
      "Wafia structure les campagnes d'influence des marques : strategie, casting createurs, production studio, diffusion paid et reporting.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wafia | Agence d'influence pour les marques",
    description:
      "Wafia structure les campagnes d'influence des marques : strategie, casting createurs, production studio, diffusion paid et reporting.",
  },
};

/**
 * Homepage — page Marques (single-page prod).
 * Le contenu vit dans src/app/for-brands/page.tsx.
 */
export default function Homepage() {
  return <ForBrandsPage />;
}
