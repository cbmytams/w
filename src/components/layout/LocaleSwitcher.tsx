"use client";

import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher({ className }: { className?: string }) {
  const current = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("language")} className={className}>
      {routing.locales.map((locale) => (
        // Plain anchor on purpose: <html lang> and the message provider live in
        // the root layout, which a soft navigation would not re-render.
        <a
          key={locale}
          href={getPathname({ href: pathname, locale })}
          lang={locale}
          hrefLang={locale}
          aria-current={locale === current ? "true" : undefined}
          aria-label={t("switchTo", { language: t(`languages.${locale}`) })}
        >
          {locale.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}
