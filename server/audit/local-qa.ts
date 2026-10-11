import { randomUUID } from "node:crypto";
import { opaqueToken, tokenHash, validToken } from "./security";
import type { AuditDatabase } from "./store";

export const localQaPrefix = "qa_local:";
export function localQaEnabled(env: NodeJS.ProcessEnv = process.env) {
  if (
    env.NODE_ENV !== "development" ||
    env.AUDIT_LOCAL_QA_ENABLED !== "1" ||
    env.VERCEL ||
    env.VERCEL_ENV ||
    !env.STRIPE_SECRET_KEY?.startsWith("sk_test_")
  )
    return false;
  try {
    const origin = new URL(env.AUDIT_APP_ORIGIN ?? "");
    return (
      origin.protocol === "http:" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname) &&
      !origin.username &&
      !origin.password &&
      origin.pathname === "/" &&
      !origin.search &&
      !origin.hash
    );
  } catch {
    return false;
  }
}
export function isLocalQaCheckout(checkoutId: string) {
  return checkoutId.startsWith(localQaPrefix);
}

// CLI-only creation. No application endpoint imports or calls this function.
export async function createLocalQaRun({
  database,
  sourceToken,
  verifyTestPurchase,
  env = process.env,
}: {
  database: AuditDatabase;
  sourceToken: string;
  verifyTestPurchase: (checkoutId: string) => Promise<boolean>;
  env?: NodeJS.ProcessEnv;
}) {
  if (!localQaEnabled(env))
    throw new Error(
      "Local QA is disabled. Requires development mode, explicit opt-in, localhost origin, a Stripe test key, and no Vercel environment.",
    );
  if (!validToken(sourceToken))
    throw new Error(
      "Use the complete private link for the original paid test purchase.",
    );
  const source = (
    await database.query(
      "SELECT id,checkout_id,context FROM marketing_audit_sessions WHERE token_hash=$1 AND payment_verified=true",
      [tokenHash(sourceToken)],
    )
  ).rows[0];
  if (!source?.context || !source.checkout_id.startsWith("cs_test_"))
    throw new Error(
      "The source must be an original paid Stripe test purchase with saved business details.",
    );
  if (!(await verifyTestPurchase(source.checkout_id)))
    throw new Error("Stripe could not verify the paid $27 test purchase.");
  const token = opaqueToken();
  await database.query(
    "INSERT INTO marketing_audit_sessions(id,checkout_id,claim_hash,token_hash,payment_verified,context) VALUES($1,$2,$3,$4,true,$5::jsonb)",
    [
      randomUUID(),
      `${localQaPrefix}${source.id}:${randomUUID()}`,
      tokenHash(opaqueToken()),
      tokenHash(token),
      JSON.stringify(source.context),
    ],
  );
  const origin = new URL(env.AUDIT_APP_ORIGIN!).origin;
  return {
    token,
    resumeUrl: `${origin}/audit/resume/${token}`,
    resultsUrl: `${origin}/audit/results/${token}`,
  };
}
