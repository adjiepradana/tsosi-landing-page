import crypto from "crypto";

/**
 * Generates a secure, cryptographically random result access token
 */
export function generateResultToken(): string {
  return crypto.randomBytes(24).toString("hex");
}

/**
 * Computes SHA-256 hash of the token for secure storage and lookup
 */
export function hashResultToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
