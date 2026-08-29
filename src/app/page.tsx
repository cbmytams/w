import { OrbHomePage } from "@/components/home/home-orb/OrbHomePage";
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
 * Homepage — orb experience.
 * Server Component wrapper: metadata stays server-side, the interactive
 * experience lives in <OrbHomePage /> (client).
 */
export default function Homepage() {
  return <OrbHomePage />;
}
