import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import Stripe from "stripe";

// Run only inside a production build, using Vercel's existing secrets in place.
// No secret export, public migration endpoint, customer edits, or payment creation.
if (process.env.VERCEL_ENV === "production" && process.env.AUDIT_VERSIONED_ENABLED === "true") {
  assert.equal(process.env.AUDIT_V2_PREVIEW === "true", false, "Production must not use test mode");
  assert.equal(process.env.AUDIT_INTEGRATION_TEST_MODE === "true", false, "Production must not use integration fixtures");
  const { DATABASE_URL, STRIPE_SECRET_KEY, MARKETING_AUDIT_STRIPE_PRICE_ID, AUDIT_TOKEN_SECRET, STRIPE_WEBHOOK_SECRET, AUDIT_APP_ORIGIN } = process.env;
  assert.ok(DATABASE_URL && STRIPE_SECRET_KEY && MARKETING_AUDIT_STRIPE_PRICE_ID && AUDIT_TOKEN_SECRET && STRIPE_WEBHOOK_SECRET && AUDIT_APP_ORIGIN, "Missing production configuration");
  assert.match(STRIPE_SECRET_KEY, /^(sk|rk)_live_/, "Requires live Stripe mode");
  assert.equal(new URL(AUDIT_APP_ORIGIN).origin, "https://www.clarity-engine.org");
  assert.equal(new URL(DATABASE_URL).searchParams.get('options')?.includes('clarity_audit_v2_staging') ?? false, false);
  const stripe = new Stripe(STRIPE_SECRET_KEY);
  const price = await stripe.prices.retrieve(MARKETING_AUDIT_STRIPE_PRICE_ID);
  assert.ok(price.active && price.livemode && price.type === "one_time");
  assert.equal(price.currency, "usd"); assert.equal(price.unit_amount, 2700);
  console.log("Assessment release: existing live one-time USD27 price verified; no payment created.");
  neonConfig.webSocketConstructor = ws;
  const pool = new Pool({connectionString:DATABASE_URL});
  const conn = await pool.connect();
  try {
    await conn.query('BEGIN');
    await conn.query("SET LOCAL lock_timeout='10s'");
    await conn.query("SET LOCAL statement_timeout='45s'");
    await conn.query("SELECT pg_advisory_xact_lock(460035)");
    // Block concurrent edits only for this short schema transaction, so snapshots are comparable.
    await conn.query('LOCK TABLE marketing_audit_sessions, marketing_audit_retakes IN SHARE ROW EXCLUSIVE MODE');
    const fingerprint = async () => (await conn.query(`SELECT
      (SELECT md5(COALESCE(string_agg(md5(id::text || content_version || answers::text || COALESCE(report::text,'')),'' ORDER BY id),'')) FROM marketing_audit_sessions) AS sessions,
      (SELECT md5(COALESCE(string_agg(md5(session_id::text || content_version || answers::text || COALESCE(report::text,'')),'' ORDER BY session_id),'')) FROM marketing_audit_retakes) AS retakes`)).rows[0];
    const before = await fingerprint();
    await conn.query(await readFile(new URL('../migrations/0006_marketing_audit_v2_preview.sql',import.meta.url),'utf8'));
    assert.deepEqual(await fingerprint(),before,'Existing answers, versions and reports must remain unchanged');
    await conn.query('COMMIT');
    console.log('Assessment release: additive versioning migration applied; existing answers, versions and reports unchanged.');
  } catch(e) {
    await conn.query('ROLLBACK');
    throw new Error('Assessment migration failed and was rolled back', {cause:e});
  } finally {conn.release(); await pool.end();}
}
