import { localizedPath, pageAlternates } from "@/lib/seo";

describe("localized SEO paths", () => {
  it("keeps the default locale unprefixed", () => {
    expect(localizedPath("/", "fr")).toBe("/");
    expect(localizedPath("/legal/privacy", "fr")).toBe("/legal/privacy");
  });

  it("prefixes other locales", () => {
    expect(localizedPath("/", "en")).toBe("/en");
    expect(localizedPath("/contact/brands", "en")).toBe("/en/contact/brands");
  });

  it("builds canonical and hreflang alternates", () => {
    expect(pageAlternates("en", "/contact")).toEqual({
      canonical: "/en/contact",
      languages: {
        fr: "/contact",
        en: "/en/contact",
        es: "/es/contact",
        "zh-Hans": "/zh/contact",
        "x-default": "/contact",
      },
    });
  });
});
