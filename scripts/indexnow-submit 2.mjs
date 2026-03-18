import process from "node:process";

const API_ENDPOINT = "https://api.indexnow.org/IndexNow";

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getUrls() {
  const raw = process.env.INDEXNOW_URLS?.trim();
  if (!raw) {
    throw new Error("Missing required environment variable: INDEXNOW_URLS");
  }

  const urls = raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (urls.length === 0) {
    throw new Error("INDEXNOW_URLS must contain at least one URL.");
  }

  for (const url of urls) {
    try {
      new URL(url);
    } catch {
      throw new Error(`INDEXNOW_URLS contains an invalid absolute URL: ${url}`);
    }
  }

  return urls;
}

async function main() {
  const host = requireEnv("INDEXNOW_HOST");
  const key = requireEnv("INDEXNOW_KEY");
  const keyLocation = process.env.INDEXNOW_KEY_LOCATION?.trim() || `https://${host}/${key}.txt`;
  const urlList = getUrls();

  const payload = {
    host,
    key,
    keyLocation,
    urlList,
  };

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`IndexNow submission failed with ${response.status}: ${body}`);
  }

  process.stdout.write(`IndexNow submission sent for ${urlList.length} URL(s).\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
