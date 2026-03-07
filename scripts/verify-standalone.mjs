import { access } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");
const standaloneNextDir = path.join(standaloneDir, ".next");
const serverPath = path.join(standaloneDir, "server.js");
const port = Number(process.env.STANDALONE_PORT || 3410);
const baseUrl = `http://127.0.0.1:${port}`;

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

function extractAsset(html, pattern, label) {
  const match = html.match(pattern);
  if (!match?.[1]) {
    throw new Error(`Unable to find ${label} in standalone HTML output.`);
  }

  return match[1];
}

async function verifyRuntime() {
  const brandsHtml = await fetchText(`${baseUrl}/for-brands`);

  const cssAsset = extractAsset(brandsHtml, /href="(\/_next\/static\/[^"]+\.css)"/, "CSS asset");
  const fontAsset = extractAsset(brandsHtml, /href="(\/_next\/static\/[^"]+\.woff2)"/, "font asset");

  await Promise.all([
    fetchOk(`${baseUrl}/`),
    fetchOk(`${baseUrl}/for-brands`),
    fetchOk(`${baseUrl}/studio`),
    fetchOk(`${baseUrl}/wiki`),
    fetchOk(`${baseUrl}${cssAsset}`),
    fetchOk(`${baseUrl}${fontAsset}`),
    fetchOk(`${baseUrl}/logos/adidas-2.svg`),
    fetchOk(`${baseUrl}/_next/image?url=%2Fbasic_fit_campaign.png&w=828&q=75`),
  ]);
}

async function main() {
  await Promise.all([
    assertExists(serverPath),
    assertExists(path.join(standaloneNextDir, "static")),
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
