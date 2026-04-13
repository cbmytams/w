import { spawn } from "node:child_process";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  ensureStandaloneNextAuthSecret,
} = require("./standalone-auth-secret.cjs");

const root = process.cwd();
const serverPath = path.join(root, ".next", "standalone", "server.js");

const { secret, source, filePath } = await ensureStandaloneNextAuthSecret();

if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = secret;

  if (source !== "env") {
    process.stdout.write(
      `NEXTAUTH_SECRET not set; using ${source === "generated" ? "generated" : "persisted"} standalone secret at ${filePath}.\n`
    );
  }
}

const child = spawn(process.execPath, [serverPath], {
  cwd: root,
  env: process.env,
  stdio: "inherit",
});

const forwardSignal = (signal) => {
  if (!child.killed) {
    child.kill(signal);
  }
};

process.on("SIGINT", forwardSignal);
process.on("SIGTERM", forwardSignal);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
