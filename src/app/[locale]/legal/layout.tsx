import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/common/PageShell";
import { FloatingNavigation } from "@/components/for-brands/FloatingNavigation";

export default async function LegalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });

  const legalLinks = [
    { href: "/legal/mentions", label: t("nav.links.mentions") },
    { href: "/legal/privacy", label: t("nav.links.privacy") },
    { href: "/legal/cookies", label: t("nav.links.cookies") },
  ] as const;

  return (
    <PageShell>
      <FloatingNavigation
        routeLinks={legalLinks}
        estimateHref="/contact/brands"
        mobileLabel={t("nav.mobileLabel")}
        navAriaLabel={t("nav.ariaLabel")}
        mobileNavAriaLabel={t("nav.mobileAriaLabel")}
      />
      <div className="relative z-10 min-h-screen bg-[#f5f5f2] px-5 pt-[7.5rem] pb-28 sm:px-8 sm:pt-[8.75rem]">
        <div className="mx-auto max-w-3xl">{children}</div>
      </div>
    </PageShell>
  );
}
