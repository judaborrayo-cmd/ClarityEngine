import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import Stripe from "stripe";
import { createLocalQaRun, localQaEnabled } from "../server/audit/local-qa";

async function main() {
  if (!localQaEnabled())
    throw new Error(
      "Local QA is disabled. Enable AUDIT_LOCAL_QA_ENABLED=1 with NODE_ENV=development, a localhost AUDIT_APP_ORIGIN, and a Stripe test key. This helper cannot run on Vercel or in production.",
    );
  if (!process.env.DATABASE_URL || !process.env.MARKETING_AUDIT_STRIPE_PRICE_ID)
    throw new Error(
      "Configure the local test database and audit Price ID first.",
    );
  const prompt = createInterface({ input: stdin, output: stdout });
  let link: URL;
  try {
    link = new URL(
      (
        await prompt.question(
          "LOCAL QA ONLY — enter your original private results/resume URL (not a secret key): ",
        )
      ).trim(),
    );
  } finally {
    prompt.close();
  }
  if (
    link.origin !== new URL(process.env.AUDIT_APP_ORIGIN!).origin ||
    !/^\/audit\/(results|resume)\/[A-Za-z0-9_-]{43}$/.test(link.pathname)
  )
    throw new Error(
      "Enter the original private results/resume URL from this localhost app.",
    );
  neonConfig.webSocketConstructor = ws;
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  try {
    const run = await createLocalQaRun({
      database: pool,
      sourceToken: link.pathname.split("/").at(-1)!,
      verifyTestPurchase: async (id) => {
        const session = await stripe.checkout.sessions.retrieve(id, {
          expand: ["line_items"],
        });
        return (
          !session.livemode &&
          session.payment_status === "paid" &&
          session.mode === "payment" &&
          session.amount_total === 2700 &&
          session.currency === "usd" &&
          session.metadata?.product === "marketing-clarity-audit" &&
          session.line_items?.data.length === 1 &&
          session.line_items.data[0].quantity === 1 &&
          session.line_items.data[0].price?.id ===
            process.env.MARKETING_AUDIT_STRIPE_PRICE_ID
        );
      },
    });
    console.log(
      "\nLOCAL QA ONLY — fresh blank assessment for the same business. Original data and included retake are untouched.",
    );
    console.log(
      `Open QA assessment: ${run.resumeUrl}\nQA results after completion: ${run.resultsUrl}\nKeep these private links local; they stop working when local QA is disabled.`,
    );
  } finally {
    await pool.end();
  }
}
main().catch(() => {
  console.error(
    "QA run was not created. Check local QA opt-in, test-mode configuration, and the original paid private URL. No source data was changed.",
  );
  process.exitCode = 1;
});
