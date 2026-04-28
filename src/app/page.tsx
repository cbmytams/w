import { HomeClient } from "@/components/home/HomeClient";
import { sitePaths } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Wafia | Influence, Talents & Studio",
  },
  description:
    "Wafia structure les campagnes des marques et les carrières des talents : influence marketing, talent management 360, production studio et reporting.",
  alternates: {
    canonical: sitePaths.home,
  },
  openGraph: {
    title: "Wafia | Influence, Talents & Studio",
    description:
      "Wafia structure les campagnes des marques et les carrières des talents : influence marketing, talent management 360, production studio et reporting.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wafia | Influence, Talents & Studio",
    description:
      "Wafia structure les campagnes des marques et les carrières des talents : influence marketing, talent management 360, production studio et reporting.",
  },
};

/**
 * Homepage - Server Component
 *
 * Renders the Client Component for the main interactive experience.
 * This structure allows us to add `generateMetadata` or other server-side logic here if needed.
 */
export default function Homepage() {
  return <HomeClient />;
}
