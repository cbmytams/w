const { randomBytes } = require("node:crypto");
const { mkdir, readFile, writeFile } = require("node:fs/promises");
const path = require("node:path");

function normalizeSecret(secret) {
  if (typeof secret !== "string") return undefined;
  const trimmed = secret.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

async function ensureStandaloneNextAuthSecret({
  env = process.env,
  secretFile = path.join(process.cwd(), ".next", "standalone", ".nextauth-local-secret"),
  generateSecret = () => randomBytes(32).toString("hex"),
} = {}) {
  const envSecret = normalizeSecret(env.NEXTAUTH_SECRET);

  if (envSecret) {
    return {
      secret: envSecret,
      source: "env",
      filePath: secretFile,
    };
  }

  await mkdir(path.dirname(secretFile), { recursive: true });

  try {
    const fileSecret = normalizeSecret(await readFile(secretFile, "utf8"));
    if (fileSecret) {
      return {
        secret: fileSecret,
        source: "file",
        filePath: secretFile,
      };
    }
  } catch (error) {
    if (!error || typeof error !== "object" || error.code !== "ENOENT") {
      throw error;
    }
  }

  const generatedSecret = normalizeSecret(generateSecret());
  if (!generatedSecret) {
    throw new Error("Unable to generate a standalone NEXTAUTH_SECRET.");
  }

  await writeFile(secretFile, `${generatedSecret}\n`, { mode: 0o600 });

  return {
    secret: generatedSecret,
    source: "generated",
    filePath: secretFile,
  };
}

module.exports = {
  ensureStandaloneNextAuthSecret,
  normalizeSecret,
};
