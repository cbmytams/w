import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import * as standaloneAuthSecret from "../../../scripts/standalone-auth-secret.cjs";

const { ensureStandaloneNextAuthSecret } = standaloneAuthSecret as {
  ensureStandaloneNextAuthSecret: (options: {
    env?: Record<string, string>;
    secretFile?: string;
    generateSecret?: () => string;
  }) => Promise<{ secret: string; source: string; filePath: string }>;
};

describe("standalone next-auth secret bootstrap", () => {
  it("prefers NEXTAUTH_SECRET from the environment", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "wafia-auth-secret-"));
    const secretFile = path.join(tmpDir, ".nextauth-local-secret");

    const result = await ensureStandaloneNextAuthSecret({
      env: { NEXTAUTH_SECRET: "env-secret-value" },
      secretFile,
      generateSecret: () => "generated-secret",
    });

    expect(result).toEqual({
      secret: "env-secret-value",
      source: "env",
      filePath: secretFile,
    });
    expect(fs.existsSync(secretFile)).toBe(false);
  });

  it("creates and reuses a persisted local secret when env is missing", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "wafia-auth-secret-"));
    const secretFile = path.join(tmpDir, ".nextauth-local-secret");

    const first = await ensureStandaloneNextAuthSecret({
      env: {},
      secretFile,
      generateSecret: () => "generated-secret",
    });

    const second = await ensureStandaloneNextAuthSecret({
      env: {},
      secretFile,
      generateSecret: () => "different-secret",
    });

    expect(first).toEqual({
      secret: "generated-secret",
      source: "generated",
      filePath: secretFile,
    });
    expect(second).toEqual({
      secret: "generated-secret",
      source: "file",
      filePath: secretFile,
    });
    expect(fs.readFileSync(secretFile, "utf8").trim()).toBe("generated-secret");
  });
});
