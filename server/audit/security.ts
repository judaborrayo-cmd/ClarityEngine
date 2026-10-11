import { createHash, createHmac, randomBytes } from "node:crypto";

export const opaqueToken = () => randomBytes(32).toString("base64url");
export const tokenHash = (value: string) =>
  createHash("sha256").update(value).digest("hex");
export const validToken = (value: string) => /^[A-Za-z0-9_-]{43}$/.test(value);
export function resumeToken(claim: string, checkoutId: string, secret: string) {
  return createHmac("sha256", secret)
    .update(`${claim}:${checkoutId}`)
    .digest("base64url");
}
