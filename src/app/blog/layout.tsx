import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { siteConfig, sitePaths } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wafia Knowledge - Wiki de l'Influence",
  description: "Blog Wafia Knowledge sur l'influence, les plateformes et la monetisation des createurs.",
  alternates: {
    canonical: sitePaths.blog,
  },
  openGraph: {
    title: "Wafia Knowledge - Wiki de l'Influence | Wafia",
    description: "Blog Wafia Knowledge sur l'influence, les plateformes et la monetisation des createurs.",
    url: sitePaths.blog,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wafia Knowledge - Wiki de l'Influence | Wafia",
    description: "Blog Wafia Knowledge sur l'influence, les plateformes et la monetisation des createurs.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${playfair.variable} ${inter.variable}`}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        color: "#fff",
        overflow: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {children}
    </div>
  );
}
