import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const KEY_LEN = 64;

export function hashPassword(plain: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(plain, salt, KEY_LEN).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(stored: string, plain: string): boolean {
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;
  let storedBuf: Buffer;
  try {
    storedBuf = Buffer.from(hashHex, "hex");
  } catch {
    return false;
  }
  if (storedBuf.length !== KEY_LEN) return false;
  const candidate = scryptSync(plain, salt, KEY_LEN);
  return timingSafeEqual(candidate, storedBuf);
}
