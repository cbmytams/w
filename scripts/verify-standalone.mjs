import { access } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");
const standaloneNextDir = path.join(standaloneDir, ".next");
const serverPath = path.join(standaloneDir, "server.js");
const port = Number(process.env.STANDALONE_PORT || 3410);
const baseUrl = `http://127.0.0.1:${port}`;
const canonicalOrigin = (process.env.CANONICAL_ORIGIN || "https://wafia.fr").replace(/\/$/, "");

async function assertExists(target) {
  try {
    await access(target);
  } catch {
    throw new Error(`Missing required standalone artifact: ${target}`);
  }
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/`, { redirect: "manual" });
      if (response.ok || response.status === 500) {
        return;
      }
    } catch {
      // Server not ready yet.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("Standalone server did not become ready in time.");
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Expected ${url} to be OK, got ${response.status}`);
  }

  return response.text();
}

async function fetchOk(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Expected ${url} to be OK, got ${response.status}`);
  }

  return response;
}

function assertNoLocalhostLeak(content, label) {
  if (/http:\/\/localhost:3000/i.test(content)) {
    throw new Error(`Detected localhost leak in ${label}.`);
  }
}

function assertCanonicalOrigin(content, label) {
  const canonical = content.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (!canonical) {
    throw new Error(`Missing canonical tag in ${label}.`);
  }

  if (!canonical.startsWith(canonicalOrigin)) {
    throw new Error(`Canonical origin mismatch in ${label}: ${canonical}`);
  }
}

function extractAsset(html, pattern, label) {
  const match = html.match(pattern);
  if (!match?.[1]) {
    throw new Error(`Unable to find ${label} in standalone HTML output.`);
  }

  return match[1];
}

async function verifyRuntime() {
  const [
    homeHtml,
    servicesHtml,
    wikiHtml,
    wikiArticleHtml,
    brandsHtml,
    robotsTxt,
    sitemapXml,
    wikiSitemapXml,
    llmsTxt,
    rssXml,
  ] =
    await Promise.all([
      fetchText(`${baseUrl}/`),
      fetchText(`${baseUrl}/services`),
      fetchText(`${baseUrl}/wiki`),
      fetchText(`${baseUrl}/wiki/guide-tiktok-2025-strategie-influenceur`),
      fetchText(`${baseUrl}/for-brands`),
      fetchText(`${baseUrl}/robots.txt`),
      fetchText(`${baseUrl}/sitemap.xml`),
      fetchText(`${baseUrl}/wiki/sitemap.xml`),
      fetchText(`${baseUrl}/llms.txt`),
      fetchText(`${baseUrl}/rss.xml`),
    ]);

  const cssAsset = extractAsset(brandsHtml, /href="(\/_next\/static\/[^"]+\.css)"/, "CSS asset");
  const fontAsset = extractAsset(brandsHtml, /href="(\/_next\/static\/[^"]+\.woff2)"/, "font asset");

  [
    [homeHtml, "/"],
    [servicesHtml, "/services"],
    [wikiHtml, "/wiki"],
    [wikiArticleHtml, "/wiki/[slug]"],
    [robotsTxt, "/robots.txt"],
    [sitemapXml, "/sitemap.xml"],
    [wikiSitemapXml, "/wiki/sitemap.xml"],
    [llmsTxt, "/llms.txt"],
    [rssXml, "/rss.xml"],
  ].forEach(([content, label]) => {
    assertNoLocalhostLeak(content, label);
  });

  assertCanonicalOrigin(homeHtml, "/");
  assertCanonicalOrigin(servicesHtml, "/services");
  assertCanonicalOrigin(wikiHtml, "/wiki");
  assertCanonicalOrigin(wikiArticleHtml, "/wiki/[slug]");

  if (!robotsTxt.includes(`${canonicalOrigin}/sitemap.xml`)) {
    throw new Error("robots.txt does not declare canonical /sitemap.xml.");
  }
  if (!robotsTxt.includes(`${canonicalOrigin}/wiki/sitemap.xml`)) {
    throw new Error("robots.txt does not declare canonical /wiki/sitemap.xml.");
  }
  if (!sitemapXml.includes(canonicalOrigin)) {
    throw new Error("sitemap.xml does not use canonical origin.");
  }
  if (!wikiSitemapXml.includes(canonicalOrigin)) {
    throw new Error("wiki/sitemap.xml does not use canonical origin.");
  }
  if (!llmsTxt.includes(canonicalOrigin)) {
    throw new Error("llms.txt does not use canonical origin.");
  }
  if (!rssXml.includes(canonicalOrigin)) {
    throw new Error("rss.xml does not use canonical origin.");
  }

  await Promise.all([
    fetchOk(`${baseUrl}/`),
    fetchOk(`${baseUrl}/for-brands`),
    fetchOk(`${baseUrl}/studio`),
    fetchOk(`${baseUrl}/wiki`),
    fetchOk(`${baseUrl}/rss.xml`),
    fetchOk(`${baseUrl}${cssAsset}`),
    fetchOk(`${baseUrl}${fontAsset}`),
    fetchOk(`${baseUrl}/logos/adidas-2.svg`),
    fetchOk(`${baseUrl}/llms.txt`),
    fetchOk(`${baseUrl}/_next/image?url=%2Flogos%2Fofficial%2Fbasic-fit-light.png&w=828&q=75`),
  ]);
}

async function main() {
  await Promise.all([
    assertExists(serverPath),
    assertExists(path.join(standaloneNextDir, "static")),
    assertExists(path.join(standaloneNextDir, "routes-manifest.json")),
    assertExists(path.join(standaloneNextDir, "images-manifest.json")),
    assertExists(path.join(standaloneDir, "public")),
  ]);

  const server = spawn("node", [serverPath], {
    cwd: root,
    env: {
      ...process.env,
      PORT: String(port),
      HOSTNAME: "127.0.0.1",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let stderr = "";

  server.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  try {
    await waitForServer();
    await verifyRuntime();
    process.stdout.write("Standalone runtime verified successfully.\n");
  } finally {
    server.kill("SIGTERM");
  }

  const exitCode = await new Promise((resolve) => {
    server.on("exit", resolve);
  });

  if (exitCode !== 0 && exitCode !== null && exitCode !== 143) {
    throw new Error(`Standalone server exited with code ${exitCode}.\n${stderr}`);
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
