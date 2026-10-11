import { test } from "node:test";
import express from "express";
import { createAuditRouter } from "./routes";
import { TestAuditPayment } from "./test-fixtures";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { localQaEnabled, createLocalQaRun } from "./local-qa";
import { PostgresAuditStore, type AuditDatabase } from "./store";
import { opaqueToken, tokenHash } from "./security";
import { questionnaire } from "../../shared/marketing-clarity-audit/scoring";
const env = {
  NODE_ENV: "development",
  AUDIT_LOCAL_QA_ENABLED: "1",
  AUDIT_APP_ORIGIN: "http://localhost:3001",
  STRIPE_SECRET_KEY: "sk_test_isolated",
};

test("local QA fails closed for production, hosted environments, live keys and missing opt-in", async () => {
  assert.equal(localQaEnabled(env), true);
  for (const override of [
    { NODE_ENV: "production" },
    { NODE_ENV: "test" },
    { VERCEL: "1" },
    { VERCEL_ENV: "preview" },
    { STRIPE_SECRET_KEY: "sk_live_fake" },
    { AUDIT_LOCAL_QA_ENABLED: "0" },
    { AUDIT_APP_ORIGIN: "https://example.com" },
  ]) {
    const unsafe = { ...env, ...override };
    assert.equal(localQaEnabled(unsafe), false);
    await assert.rejects(
      createLocalQaRun({
        env: unsafe,
        sourceToken: opaqueToken(),
        database: {
          query: async () => {
            throw Error("Database must not be touched");
          },
          connect: async () => {
            throw Error("unused");
          },
        },
        verifyTestPurchase: async () => {
          throw Error("Stripe must not be touched");
        },
      }),
      /Local QA is disabled/,
    );
  }
});

test("QA copy has fresh answers, same identity, private access and never consumes source retake or overwrites data", async (t) => {
  const db = new PGlite();
  t.after(() => db.close());
  for (const file of [
    "0001_marketing_audit.sql",
    "0002_marketing_audit_retake.sql",
    "0003_marketing_audit_work_notes.sql",
    "0004_marketing_audit_checklist.sql",
  ])
    await db.exec(
      readFileSync(
        new URL(`../../migrations/${file}`, import.meta.url),
        "utf8",
      ),
    );
  const query: AuditDatabase["query"] = async (sql, args) => {
    const result = await db.query(sql, args);
    return { rows: result.rows, rowCount: result.affectedRows ?? null };
  };
  const database = { query, connect: async () => ({ query, release() {} }) };
  const store = new PostgresAuditStore("test-only", database);
  const token = opaqueToken(),
    hash = tokenHash(token);
  const context = {
    name: "QA Purchaser",
    email: "qa@example.com",
    companyName: "Original business",
    websiteUrl: "https://example.com",
    businessType: "professional_services",
    primaryMarketingGoal: "leads",
  };
  await store.initiate("cs_test_original", "claim", hash);
  await store.verify("cs_test_original");
  await store.saveContext(hash, context);
  for (const q of questionnaire.questions)
    await store.saveAnswer(hash, q.id, q.sectionId === 1 ? "D" : "A");
  await store.complete(hash);
  await store.saveWorkNote(hash, 1, "primary-0", "Original notes");
  await store.saveChecklist(hash, 1, "OFF_01", true);
  const snapshot = JSON.stringify(await store.read(hash));
  const preserved = async () =>
    JSON.stringify(
      await query(
        "SELECT s.*, (SELECT jsonb_agg(n) FROM marketing_audit_work_notes n WHERE n.session_id=s.id) AS notes, (SELECT jsonb_agg(c) FROM marketing_audit_checklist c WHERE c.session_id=s.id) AS checklist FROM marketing_audit_sessions s WHERE token_hash=$1",
        [hash],
      ),
    );
  const before = await preserved();
  await assert.rejects(
    createLocalQaRun({
      database,
      env,
      sourceToken: token,
      verifyTestPurchase: async () => false,
    }),
    /Stripe could not verify/,
  );
  await assert.rejects(
    createLocalQaRun({
      database,
      env,
      sourceToken: opaqueToken(),
      verifyTestPurchase: async () => {
        throw Error("Must not call Stripe for unknown source");
      },
    }),
    /original paid Stripe test purchase/,
  );
  assert.equal(
    (await query("SELECT * FROM marketing_audit_sessions")).rows.length,
    1,
  );
  let checks = 0;
  const run = await createLocalQaRun({
    database,
    env,
    sourceToken: token,
    verifyTestPurchase: async (id) => {
      assert.equal(id, "cs_test_original");
      checks++;
      return true;
    },
  });
  assert.equal(checks, 1);
  assert.notEqual(run.token, token);
  assert.match(run.resumeUrl, /^http:\/\/localhost:3001\/audit\/resume\//);
  assert.equal(await preserved(), before);
  assert.equal(JSON.stringify(await store.read(hash)), snapshot);
  assert.equal(
    (await query("SELECT * FROM marketing_audit_retakes")).rows.length,
    0,
  );
  const old = { ...process.env };
  Object.assign(process.env, env);
  t.after(() => {
    for (const key of Object.keys(env)) {
      if (old[key] === undefined) delete process.env[key];
      else process.env[key] = old[key];
    }
  });
  const qaHash = tokenHash(run.token),
    qa = (await store.read(qaHash))!;
  assert.deepEqual(qa.context, context);
  assert.deepEqual(qa.answers, {});
  assert.equal(qa.report, null);
  assert.deepEqual(await store.workNotes(qaHash, 1), {});
  assert.deepEqual(await store.checklist(qaHash, 1), {});
  assert.equal(
    await store.saveContext(qaHash, {
      ...context,
      companyName: "Another business",
    }),
    false,
  );
  for (const q of questionnaire.questions)
    await store.saveAnswer(qaHash, q.id, "B");
  await store.complete(qaHash);
  assert.equal(await preserved(), before);
  assert.equal(
    (await query("SELECT * FROM marketing_audit_notifications")).rows.length,
    1,
  );
  assert.equal(await store.startRetake(hash), true); // Real allowance remains available.
  const app = express();
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  t.after(() => new Promise<void>((resolve) => server.close(() => resolve())));
  const origin = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
  app.use(
    "/api/audit",
    createAuditRouter({
      store,
      payment: new TestAuditPayment(),
      origin,
      tokenSecret: "local-test-secret-long-enough-for-tests",
    }),
  );
  const allowed = await fetch(`${origin}/api/audit/${run.token}`);
  assert.equal(allowed.status, 200);
  assert.equal((await allowed.json()).localQa, true);
  assert.equal(
    (await (await fetch(`${origin}/api/audit/${run.token}/report`)).json())
      .localQa,
    true,
  );
  process.env.NODE_ENV = "production";
  assert.equal((await fetch(`${origin}/api/audit/${run.token}`)).status, 404);
  assert.equal(
    (await fetch(`${origin}/api/audit/${run.token}/report`)).status,
    404,
  );
  assert.equal(
    (await fetch(`${origin}/api/audit/${run.token}/download/report`)).status,
    404,
  );
  assert.equal((await fetch(`${origin}/api/audit/${token}`)).status, 200);
  assert.equal(await store.read(qaHash), undefined);
  process.env.NODE_ENV = "development";
  process.env.AUDIT_LOCAL_QA_ENABLED = "0";
  assert.equal(await store.read(qaHash), undefined);
  assert.ok(await store.read(hash));
});
