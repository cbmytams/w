import { siteConfig } from "@/lib/site";

// Escape `<` to prevent `</script>` injection if a JSON-LD value ever
// contains user-derived strings. Inert in the JSON spec, safe in HTML.
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
import type { AuthorProfile } from "@/lib/authors";

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: new URL(siteConfig.logo, siteConfig.url).toString(),
  ...(siteConfig.socials.length > 0 ? { sameAs: siteConfig.socials } : {}),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: "fr",
};

export function personSchema(author: AuthorProfile, profileUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    description: author.shortBio,
    image: author.image,
    url: profileUrl,
    jobTitle: author.role,
    homeLocation: author.location,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    knowsAbout: author.knowsAbout,
    sameAs: author.sameAs,
  };
}

export function profilePageSchema(author: AuthorProfile, profileUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: profileUrl,
    inLanguage: "fr",
    mainEntity: personSchema(author, profileUrl),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  url,
  serviceType,
}: {
  name: string;
  description: string;
  url: string;
  serviceType: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "FR",
    url,
  };
}

export function collectionPageSchema({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: { url: string; name: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: item.url,
        name: item.name,
      })),
    },
  };
}

export function articleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  author,
  keywords,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: AuthorProfile;
  keywords?: string[];
}) {
  const authorProfileUrl = new URL(
    `/equipe/${author.slug}`,
    siteConfig.url
  ).toString();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    author: personSchema(author, authorProfileUrl),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: new URL(siteConfig.logo, siteConfig.url).toString(),
      },
    },
    mainEntityOfPage: url,
    inLanguage: "fr",
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
  };
}
