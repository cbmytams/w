import { PageShell } from "@/components/common/PageShell";
import { FloatingNavigation } from "@/components/for-brands/FloatingNavigation";

const LEGAL_LINKS = [
  { href: "/legal/mentions", label: "Mentions légales" },
  { href: "/legal/privacy", label: "Confidentialité" },
  { href: "/legal/cookies", label: "Cookies" },
] as const;

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageShell>
      <FloatingNavigation
        routeLinks={LEGAL_LINKS}
        estimateHref="/contact/brands"
        mobileLabel="Informations légales"
        navAriaLabel="Navigation légale"
        mobileNavAriaLabel="Navigation mobile légale"
      />
      <div className="relative z-10 min-h-screen bg-[#f5f5f2] px-5 pt-[7.5rem] pb-28 sm:px-8 sm:pt-[8.75rem]">
        <div className="mx-auto max-w-3xl">{children}</div>
      </div>
    </PageShell>
  );
}
