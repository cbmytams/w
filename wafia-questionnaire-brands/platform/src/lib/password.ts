import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scrypt = promisify(scryptCb);
const KEY_LENGTH = 64;

export const PASSWORD_ALGO = "scrypt:v1";

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("base64url");
  const derived = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  return `${salt}:${derived.toString("base64url")}`;
}

export async function verifyPassword(
  password: string,
  passwordHash: string | null | undefined
) {
  if (!passwordHash) return false;
  const [salt, stored] = passwordHash.split(":");
  if (!salt || !stored) return false;

  const derived = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  const storedBuffer = Buffer.from(stored, "base64url");
  if (storedBuffer.length !== derived.length) return false;
  return timingSafeEqual(storedBuffer, derived);
}

export function generateTemporaryPassword(length = 18) {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*";
  const bytes = randomBytes(length);
  let output = "";
  for (let i = 0; i < length; i += 1) {
    output += chars[bytes[i] % chars.length];
  }
  return output;
}
