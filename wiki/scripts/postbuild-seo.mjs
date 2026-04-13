import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WIKI_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(WIKI_ROOT, "dist");
const CONTENT_DIR = path.join(WIKI_ROOT, "src", "content", "blog");

const SITE_NAME = "Wiki de l'Influence";
const BRAND_NAME = "Wafia";
const DEFAULT_DESCRIPTION =
  "Guides, analyses et stratégies sur l'influence, les plateformes et la monétisation des créateurs.";
const WIKI_BASE_PATH = "/wiki";

const THEME_LABELS = {
  algorithmes: "Algorithmes",
  monetisation: "Monétisation",
  croissance: "Croissance",
  branding: "Branding",
};

const PLATFORM_LABELS = {
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube",
  twitch: "Twitch",
  snapchat: "Snapchat",
  x: "X (Twitter)",
  facebook: "Facebook",
};

function normalizeOrigin(rawOrigin) {
  const fallback = "https://wafia.fr";
  const candidate = (rawOrigin || fallback).trim();
  try {
    const url = new URL(candidate);
    return url.origin;
  } catch {
    return fallback;
  }
}

const SITE_ORIGIN = normalizeOrigin(
  process.env.WIKI_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL
);
const SITE_HOST = new URL(SITE_ORIGIN).hostname;
const OG_IMAGE_URL = new URL(
  `${WIKI_BASE_PATH}/og-image.svg`,
  SITE_ORIGIN
).toString();

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripMarkdown(input) {
  return String(input || "")
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/`{1,3}[^`]+`{1,3}/g, " ")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/_{1,2}(.*?)_{1,2}/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeDescription(value, fallback = DEFAULT_DESCRIPTION) {
  const clean = stripMarkdown(value);
  if (!clean) return fallback;
  if (clean.length <= 165) return clean;
  return `${clean.slice(0, 162).trimEnd()}...`;
}

function extractMetaDescription(markdownBody) {
  const match = markdownBody.match(/^\*\*Meta description\s*:\*\*\s*(.+)$/im);
  return match ? match[1].trim() : "";
}

function extractFirstParagraph(markdownBody) {
  const cleaned = markdownBody
    .replace(/^#\s+.*$/gm, "")
    .replace(/^\*\*Slug\s*:.*$/gim, "")
    .replace(/^\*\*Meta description\s*:.*$/gim, "")
    .replace(/^\*\*Cat[ée]gorie\s*:.*$/gim, "")
    .replace(/^---$/gm, "")
    .trim();

  const paragraphs = cleaned
    .split(/\n\s*\n/g)
    .map((part) => part.trim())
    .filter((part) => part && !part.startsWith("## "));

  return paragraphs[0] || "";
}

function toIsoDate(value) {
  if (!value) return new Date().toISOString();
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toISOString();
  return date.toISOString();
}

function toPubDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toUTCString();
  return date.toUTCString();
}

function readTimeFromContent(markdownBody) {
  const words = stripMarkdown(markdownBody).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 225))} min`;
}

function buildWikiUrl(routePath) {
  const normalized =
    routePath === "/" ? WIKI_BASE_PATH : `${WIKI_BASE_PATH}${routePath}`;
  return new URL(normalized, SITE_ORIGIN).toString();
}

function routeFilePath(routePath) {
  if (routePath === "/") return path.join(DIST_DIR, "index.html");
  const relative = routePath.replace(/^\//, "");
  return path.join(DIST_DIR, relative, "index.html");
}

function setTitle(html, title) {
  const tag = `<title>${escapeHtml(title)}</title>`;
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, tag);
  }
  return html.replace("</head>", `    ${tag}\n</head>`);
}

function setMetaByName(html, name, content) {
  const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`;
  const regex = new RegExp(
    `<meta\\s+name=["']${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`,
    "i"
  );
  if (regex.test(html)) return html.replace(regex, tag);
  return html.replace("</head>", `    ${tag}\n</head>`);
}

function setMetaByProperty(html, property, content) {
  const tag = `<meta property="${property}" content="${escapeHtml(content)}" />`;
  const regex = new RegExp(
    `<meta\\s+property=["']${property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`,
    "i"
  );
  if (regex.test(html)) return html.replace(regex, tag);
  return html.replace("</head>", `    ${tag}\n</head>`);
}

function setCanonical(html, canonicalUrl) {
  const tag = `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`;
  const regex = /<link\s+rel=["']canonical["'][^>]*>/i;
  if (regex.test(html)) return html.replace(regex, tag);
  return html.replace("</head>", `    ${tag}\n</head>`);
}

function setLdJson(html, object) {
  const serialized = JSON.stringify(object);
  const script = `<script type="application/ld+json" id="wiki-ld">${serialized}</script>`;
  const stripped = html.replace(
    /<script[^>]+id=["']wiki-ld["'][\s\S]*?<\/script>\s*/gi,
    ""
  );
  return stripped.replace("</head>", `    ${script}\n</head>`);
}

function setPlausibleDomain(html, host) {
  const regex =
    /<script\s+defer\s+data-domain=["'][^"']*["']\s+src=["']https:\/\/plausible\.io\/js\/script\.js["']><\/script>/i;
  const tag = `<script defer data-domain="${escapeHtml(host)}" src="https://plausible.io/js/script.js"></script>`;
  if (regex.test(html)) return html.replace(regex, tag);
  return html.replace("</head>", `    ${tag}\n</head>`);
}

function stripLegacyPlaceholders(html) {
  return html.replace(
    /<!--\s*Replace\s+wiki-influence\.com[\s\S]*?-->\s*/gi,
    ""
  );
}

function setRobotsMeta(html) {
  return setMetaByName(
    html,
    "robots",
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
  );
}

function applyMeta(html, meta) {
  let out = stripLegacyPlaceholders(html);
  out = setTitle(out, meta.title);
  out = setMetaByName(out, "description", meta.description);
  out = setMetaByName(out, "author", BRAND_NAME);
  out = setRobotsMeta(out);
  out = setMetaByProperty(out, "og:type", meta.ogType || "website");
  out = setMetaByProperty(out, "og:title", meta.title);
  out = setMetaByProperty(out, "og:description", meta.description);
  out = setMetaByProperty(out, "og:url", meta.url);
  out = setMetaByProperty(out, "og:image", OG_IMAGE_URL);
  out = setMetaByProperty(out, "og:site_name", SITE_NAME);
  out = setMetaByProperty(out, "og:locale", "fr_FR");
  out = setMetaByName(out, "twitter:card", "summary_large_image");
  out = setMetaByName(out, "twitter:title", meta.title);
  out = setMetaByName(out, "twitter:description", meta.description);
  out = setMetaByName(out, "twitter:image", OG_IMAGE_URL);
  out = setCanonical(out, meta.url);
  out = setPlausibleDomain(out, SITE_HOST);
  if (meta.ldJson) out = setLdJson(out, meta.ldJson);
  return out;
}

async function readArticles() {
  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && /\.(md|mdx)$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "fr"));

  const articles = [];
  for (const file of files) {
    const absolutePath = path.join(CONTENT_DIR, file);
    const raw = await fs.readFile(absolutePath, "utf8");
    const { data, content } = matter(raw);
    const titleFromBody = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
    const title = String(
      data.title || titleFromBody || file.replace(/\.mdx?$/, "")
    ).trim();
    const slug = String(data.slug || file.replace(/\.mdx?$/, "")).trim();
    const metaDescription = extractMetaDescription(content);
    const firstParagraph = extractFirstParagraph(content);
    const description = normalizeDescription(
      data.description || metaDescription || firstParagraph,
      DEFAULT_DESCRIPTION
    );
    const publishedAt = toIsoDate(data.publishedAt);
    const article = {
      file,
      title,
      slug,
      description,
      publishedAt,
      category: String(data.category || "Article"),
      theme: data.theme ? String(data.theme) : "",
      platform: data.platform ? String(data.platform) : "",
      readTime: readTimeFromContent(content),
    };
    articles.push(article);
  }

  articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return articles;
}

function buildSitemapXml(routes) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>`;
  const open = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const close = `</urlset>`;
  const rows = routes
    .map((route) => {
      const lastmod = route.lastmod
        ? `<lastmod>${escapeXml(route.lastmod)}</lastmod>`
        : "";
      return `  <url>
    <loc>${escapeXml(route.url)}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
    ${lastmod}
  </url>`;
    })
    .join("\n");

  return `${header}\n${open}\n${rows}\n${close}\n`;
}

function buildRssXml(articles) {
  const items = articles
    .map((article) => {
      const url = buildWikiUrl(`/blog/${article.slug}`);
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(url)}</link>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${escapeXml(toPubDate(article.publishedAt))}</pubDate>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${escapeXml(buildWikiUrl("/blog"))}</link>
    <description>${escapeXml(DEFAULT_DESCRIPTION)}</description>
    <language>fr-FR</language>
    <atom:link href="${escapeXml(buildWikiUrl("/rss.xml"))}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

function articleLdJson(article, url) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "fr-FR",
    author: {
      "@type": "Organization",
      name: BRAND_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      logo: {
        "@type": "ImageObject",
        url: OG_IMAGE_URL,
      },
    },
    mainEntityOfPage: url,
  };
}

function collectionLdJson(name, description, url) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    inLanguage: "fr-FR",
    url,
  };
}

async function writeRoutePage(templateHtml, routePath, meta) {
  const finalHtml = applyMeta(templateHtml, meta);
  const outputFile = routeFilePath(routePath);
  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, finalHtml, "utf8");
}

async function main() {
  const distIndexPath = path.join(DIST_DIR, "index.html");
  const templateBase = await fs.readFile(distIndexPath, "utf8");
  const articles = await readArticles();

  const uniqueThemes = [
    ...new Set(articles.map((a) => a.theme).filter(Boolean)),
  ].sort();
  const uniquePlatforms = [
    ...new Set(articles.map((a) => a.platform).filter(Boolean)),
  ].sort();

  const rootUrl = buildWikiUrl("/");
  const blogUrl = buildWikiUrl("/blog");

  const rootMeta = {
    title: `${SITE_NAME} | ${BRAND_NAME}`,
    description: DEFAULT_DESCRIPTION,
    url: rootUrl,
    ogType: "website",
    ldJson: collectionLdJson(SITE_NAME, DEFAULT_DESCRIPTION, rootUrl),
  };

  await writeRoutePage(templateBase, "/", rootMeta);

  const rootTemplate = await fs.readFile(distIndexPath, "utf8");

  await writeRoutePage(rootTemplate, "/blog", {
    title: `${SITE_NAME} | Articles, Plateformes et Stratégie`,
    description: DEFAULT_DESCRIPTION,
    url: blogUrl,
    ogType: "website",
    ldJson: collectionLdJson(SITE_NAME, DEFAULT_DESCRIPTION, blogUrl),
  });

  for (const theme of uniqueThemes) {
    const label = THEME_LABELS[theme] || theme;
    const routePath = `/blog/theme/${theme}`;
    const url = buildWikiUrl(routePath);
    const description = normalizeDescription(
      `Articles et méthodes sur ${label.toLowerCase()} pour structurer une stratégie influence durable.`
    );

    await writeRoutePage(rootTemplate, routePath, {
      title: `${label} | ${SITE_NAME}`,
      description,
      url,
      ogType: "website",
      ldJson: collectionLdJson(`${SITE_NAME} - ${label}`, description, url),
    });
  }

  for (const platform of uniquePlatforms) {
    const label = PLATFORM_LABELS[platform] || platform;
    const routePath = `/blog/platform/${platform}`;
    const url = buildWikiUrl(routePath);
    const description = normalizeDescription(
      `Guides ${label} pour créateurs: formats, distribution, croissance et monétisation.`
    );

    await writeRoutePage(rootTemplate, routePath, {
      title: `${label} | ${SITE_NAME}`,
      description,
      url,
      ogType: "website",
      ldJson: collectionLdJson(`${SITE_NAME} - ${label}`, description, url),
    });
  }

  for (const article of articles) {
    const routePath = `/blog/${article.slug}`;
    const url = buildWikiUrl(routePath);
    await writeRoutePage(rootTemplate, routePath, {
      title: `${article.title} | ${SITE_NAME}`,
      description: article.description,
      url,
      ogType: "article",
      ldJson: articleLdJson(article, url),
    });
  }

  const nowIso = new Date().toISOString();
  const sitemapRoutes = [
    { url: rootUrl, changefreq: "weekly", priority: 1.0, lastmod: nowIso },
    { url: blogUrl, changefreq: "weekly", priority: 0.9, lastmod: nowIso },
    ...uniqueThemes.map((theme) => ({
      url: buildWikiUrl(`/blog/theme/${theme}`),
      changefreq: "weekly",
      priority: 0.8,
      lastmod: nowIso,
    })),
    ...uniquePlatforms.map((platform) => ({
      url: buildWikiUrl(`/blog/platform/${platform}`),
      changefreq: "weekly",
      priority: 0.8,
      lastmod: nowIso,
    })),
    ...articles.map((article) => ({
      url: buildWikiUrl(`/blog/${article.slug}`),
      changefreq: "monthly",
      priority: 0.9,
      lastmod: article.publishedAt,
    })),
  ];

  const sitemapXml = buildSitemapXml(sitemapRoutes);
  await fs.writeFile(path.join(DIST_DIR, "sitemap.xml"), sitemapXml, "utf8");

  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${buildWikiUrl("/sitemap.xml")}\n`;
  await fs.writeFile(path.join(DIST_DIR, "robots.txt"), robotsTxt, "utf8");

  const rssXml = buildRssXml(articles);
  await fs.writeFile(path.join(DIST_DIR, "rss.xml"), rssXml, "utf8");

  console.log(
    `[wiki:postbuild-seo] OK - ${articles.length} articles, ${uniqueThemes.length} thèmes, ${uniquePlatforms.length} plateformes.`
  );
  console.log(`[wiki:postbuild-seo] Base URL: ${SITE_ORIGIN}${WIKI_BASE_PATH}`);
}

main().catch((error) => {
  console.error("[wiki:postbuild-seo] ERROR", error);
  process.exit(1);
});
