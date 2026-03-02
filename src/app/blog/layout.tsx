import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

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
  description: "Wiki interactif Wafia Knowledge sur l'influence, les plateformes et la monetisation.",
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
