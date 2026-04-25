#!/usr/bin/env node
// Usage: node scripts/hash-password.mjs '<plaintext>'
// Prints a bcrypt hash (cost=12) suitable for *_PASSWORD_HASH env vars.
import bcrypt from "bcryptjs";

const plain = process.argv[2];
if (!plain) {
  console.error("Usage: node scripts/hash-password.mjs '<plaintext>'");
  process.exit(1);
}

const hash = await bcrypt.hash(plain, 12);
console.log(hash);
