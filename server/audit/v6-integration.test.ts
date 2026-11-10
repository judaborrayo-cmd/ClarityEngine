import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import express from "express";
import { VersionedAuditStore } from "./versioned-store";
import type { AuditDatabase } from "./store";
import { createAuditRouter } from "./routes";
import { TestAuditPayment } from "./test-fixtures";
import { StripeAuditPayment } from "./payment";
import { opaqueToken, tokenHash } from "./security";
import { sample } from "../../shared/marketing-clarity-audit/v2-goals/review-fixtures";
import {
  versions,
  requiredSetupFields,
  assessmentQuestions,
} from "../../shared/marketing-clarity-audit/v2-goals/questionnaire";
import { questionnaire } from "../../shared/marketing-clarity-audit/scoring";
import { isV2Report } from "../../shared/marketing-clarity-audit/v2/customer-report";
const context = {
  name: "Synthetic Reviewer",
  email: "review@example.com",
  companyName: "Synthetic Company",
  websiteUrl: "https://example.com",
  businessType: "professional_services",
};
test("preview6 multi-goal customer API persists all46, resumes, freezes, isolates retakes/notes and preserves v1 versions", async (t) => {
  const db = new PGlite();
  t.after(() => db.close());
  for (const n of [
    "0001_marketing_audit",
    "0002_marketing_audit_retake",
    "0003_marketing_audit_work_notes",
    "0004_marketing_audit_checklist",
    "0005_marketing_audit_company_logo",
    "0006_marketing_audit_v2_preview",
  ])
    await db.exec(readFileSync(`migrations/${n}.sql`, "utf8"));
  const query: AuditDatabase["query"] = async (s, p) => {
    const r = await db.query(s, p);
    return { rows: r.rows, rowCount: r.affectedRows ?? null };
  };
  const adapter: AuditDatabase = {
    query,
    connect: async () => ({ query, release() {} }),
  };
  const store = new VersionedAuditStore("", adapter, versions.questionnaire),
    payment = new TestAuditPayment();
  (
    payment as TestAuditPayment & {
      receipt: () => Promise<{ amount: number; currency: string }>;
    }
  ).receipt = async () => ({ amount: 1350, currency: "usd" });
  const app = express(),
    server = app.listen(0, "127.0.0.1");
  await new Promise<void>((r) => server.once("listening", r));
  t.after(() => new Promise<void>((r) => server.close(() => r())));
  const origin = `http://127.0.0.1:${(server.address() as any).port}`;
  app.use(
    "/api/audit",
    createAuditRouter({
      store,
      payment,
      origin,
      tokenSecret: "synthetic-test-secret-32-characters-long",
      discoverLogo: async () => null,
    }),
  );
  let cookie = "";
  const request = async (path: string, method = "GET", body?: unknown) =>
    fetch(`${origin}/api/audit${path}`, {
      method,
      headers: { origin, cookie, "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  const checkout = await request("/checkout", "POST", {});
  cookie = checkout.headers.get("set-cookie")!.split(";")[0];
  const checkoutId = new URL((await checkout.json()).url).searchParams.get(
    "session_id",
  );
  const exchange = () => request("/exchange", "POST", { checkoutId });
  const { token } = await (await exchange()).json();
  assert.equal((await (await exchange()).json()).token, token);
  const path = `/${token}`;
  assert.equal(
    (await (await request(path)).json()).version,
    versions.questionnaire,
  );
  assert.equal((await request(`${path}/context`, "PUT", context)).status, 200);
  await assert.rejects(
    query(
      "UPDATE marketing_audit_sessions SET content_version='1.0.0' WHERE token_hash=$1",
      [tokenHash(token)],
    ),
  );
  assert.equal(
    (
      await request(`${path}/events`, "POST", {
        event: "question_answered",
        questionId: "private-answer-text",
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await request(`${path}/events`, "POST", {
        event: "resume",
        answers: { C3: "E" },
      })
    ).status,
    400,
  );
  const draft = sample("deliberate", [
    "purchases",
    "leads",
    "qualified_opportunities",
    "demos",
    "trials",
    "booked_calls",
    "registrations",
    "store_visits",
    "subscribers",
    "other",
  ]);
  assert.equal(
    (
      await request(`${path}/setup`, "PUT", {
        field: "outcome",
        value: draft.setup.outcome,
      })
    ).status,
    200,
  );
  assert.deepEqual(
    (await (await request(path)).json()).setup.outcome,
    draft.setup.outcome,
  );
  assert.equal(
    (await request(`${path}/setup`, "PUT", { field: "outcome", value: [] }))
      .status,
    200,
  );
  assert.deepEqual((await (await request(path)).json()).setup.outcome, []);
  assert.equal((await request(`${path}/complete`, "POST")).status, 400);
  for (const field of requiredSetupFields)
    assert.equal(
      (
        await request(`${path}/setup`, "PUT", {
          field,
          value: draft.setup[field],
        })
      ).status,
      200,
    );
  assert.equal((await request(`${path}/complete`, "POST")).status, 400);
  assert.equal(await store.saveAnswer(tokenHash(token), "T6", "A"), true);
  await store.saveSetup(tokenHash(token), "outcome", ["leads"]);
  assert.equal(
    (await store.read(tokenHash(token)))!.answers.T6,
    undefined,
    "Changing outcome wording requires a fresh economics answer",
  );
  await store.saveSetup(tokenHash(token), "outcome", draft.setup.outcome);
  assert.equal(await store.saveAnswer(tokenHash(token), "T10", "A"), true);
  await store.saveSetup(tokenHash(token), "paidStatus", "running");
  const changed = await store.read(tokenHash(token));
  assert.equal(changed!.answers.T10, undefined);
  assert.equal(changed!.setup.trend, undefined);
  for (const field of requiredSetupFields)
    await store.saveSetup(tokenHash(token), field, draft.setup[field]);
  const questions = assessmentQuestions(draft.setup);
  for (const q of questions.slice(0, 20))
    assert.equal(
      (
        await request(`${path}/answer`, "PUT", {
          questionId: q.id,
          answer: draft.answers[q.id],
        })
      ).status,
      200,
    );
  const resumed = await (await request(path)).json();
  assert.equal(Object.keys(resumed.answers).length, 20);
  assert.deepEqual(resumed.setup, draft.setup);
  for (const q of questions.slice(20))
    assert.equal(
      (
        await request(`${path}/answer`, "PUT", {
          questionId: q.id,
          answer: draft.answers[q.id],
        })
      ).status,
      200,
    );
  const completed = await request(`${path}/complete`, "POST");
  assert.equal(completed.status, 200);
  const { report } = await completed.json();
  assert.ok(isV2Report(report));
  assert.deepEqual(report.context.marketingGoals, draft.setup.outcome);
  assert.equal(report.context.primaryMarketingGoal, undefined);
  assert.equal(report.recommendations.length, 3);
  assert.equal(report.thirtyDayPlan.length, 4);
  assert.deepEqual(
    (await (await request(`${path}/complete`, "POST")).json()).report,
    report,
  );
  assert.equal(
    (
      await request(`${path}/setup`, "PUT", {
        field: "owner",
        value: "No clear owner",
      })
    ).status,
    409,
  );
  assert.equal(
    (await request(`${path}/answer`, "PUT", { questionId: "C3", answer: "E" }))
      .status,
    409,
  );
  assert.equal(
    (
      await request(`${path}/work-session/work-1?run=1`, "PUT", {
        value: "Synthetic notes",
      })
    ).status,
    200,
  );
  assert.equal(
    (await request(`${path}/download/report`)).headers.get("content-type"),
    "application/pdf",
  );
  for (const event of ["purchase_success", "diagnostic_complete"]) {
    await request(`${path}/events`, "POST", { event });
    await request(`${path}/events`, "POST", { event });
  }
  assert.equal(
    (await query("SELECT * FROM marketing_audit_event_receipts")).rows.length,
    2,
  );
  assert.equal(
    (
      await query(
        "SELECT * FROM marketing_audit_event_receipts WHERE event='purchase_success'",
      )
    ).rows[0].amount_total,
    1350,
  );
  const entitlement = await store.read(tokenHash(token));
  await assert.rejects(
    query(
      "INSERT INTO marketing_audit_retakes(id,session_id,context,content_version) VALUES($1,$2,$3::jsonb,'1.0.0')",
      [crypto.randomUUID(), entitlement!.id, JSON.stringify(context)],
    ),
  );
  assert.equal((await request(`${path}/retake`, "POST")).status, 200);
  assert.equal(
    (await (await request(path)).json()).version,
    versions.questionnaire,
  );
  assert.deepEqual(
    (await (await request(`${path}/report?run=1`)).json()).report,
    report,
  );
  assert.equal(
    (await (await request(`${path}/work-session?run=1`)).json()).entries[
      "work-1"
    ],
    "Synthetic notes",
  );
  assert.equal((await request(`${path}/work-session?run=2`)).status, 409);
  assert.equal(
    (await request(`${path}/retake`, "POST")).status,
    200,
    "Retry resumes the same unfinished included retake",
  );
  for (const field of requiredSetupFields)
    assert.equal(
      await store.saveSetup(tokenHash(token), field, draft.setup[field]),
      true,
    );
  for (const q of questions)
    assert.equal(
      await store.saveAnswer(tokenHash(token), q.id, draft.answers[q.id]),
      true,
    );
  const second = await request(`${path}/complete`, "POST");
  assert.equal(second.status, 200);
  assert.ok(isV2Report((await second.json()).report));
  assert.equal(
    (await request(`${path}/retake`, "POST")).status,
    409,
    "Only two completed reports are included",
  );
  assert.deepEqual(
    (await (await request(`${path}/work-session?run=2`)).json()).entries,
    {},
  );
  assert.deepEqual(
    (await (await request(`${path}/report?run=1`)).json()).report,
    report,
  );
  assert.deepEqual(
    (
      await query(
        "SELECT run_number FROM marketing_audit_event_receipts WHERE event='diagnostic_complete' ORDER BY run_number",
      )
    ).rows.map((r) => r.run_number),
    [1, 2],
  );
  const rollbackStore = new VersionedAuditStore("", adapter, "1.0.0");
  assert.equal(
    (await rollbackStore.read(tokenHash(token)))!.content_version,
    versions.questionnaire,
    "Stopping new v2 enrollment does not reinterpret existing runs",
  );
  await rollbackStore.initiate(
    "cs_test_rollback_enrollment",
    "claim",
    tokenHash("rollback_token"),
  );
  assert.equal(
    (
      await query(
        "SELECT content_version FROM marketing_audit_sessions WHERE checkout_id='cs_test_rollback_enrollment'",
      )
    ).rows[0].content_version,
    "1.0.0",
  );
  // A purchased legacy run remains v1, including its included retake, under the same version-aware store.
  const legacyHash = tokenHash(opaqueToken());
  await query(
    "INSERT INTO marketing_audit_sessions(id,checkout_id,claim_hash,token_hash,payment_verified) VALUES($1,$2,$3,$4,true)",
    [crypto.randomUUID(), "cs_test_legacy", "claim", legacyHash],
  );
  await store.saveContext(legacyHash, {
    ...context,
    primaryMarketingGoal: "leads",
  } as any);
  for (const q of questionnaire.questions)
    await store.saveAnswer(legacyHash, q.id, "A");
  const old = await store.complete(legacyHash);
  assert.equal(isV2Report(old), false);
  assert.equal(await store.startRetake(legacyHash), true);
  assert.equal((await store.read(legacyHash))!.content_version, "1.0.0");
  assert.deepEqual((await store.read(legacyHash))!.reports[0].report, old);
});
