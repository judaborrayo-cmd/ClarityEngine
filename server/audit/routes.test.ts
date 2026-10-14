import { normalizeCompanyLogo, discoverCompanyLogo } from "./company-logo";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import express from "express";
import { createAuditRouter } from "./routes";
import { TestAuditStore, TestAuditPayment } from "./test-fixtures";
import { opaqueToken, tokenHash, validToken } from "./security";
import { questionnaire } from "../../shared/marketing-clarity-audit/scoring";

test("paid ownership, autosave/resume, two frozen reports, retake enforcement, notifications and downloads", async (t) => {
  const store = new TestAuditStore();
  const payment = new TestAuditPayment();
  const app = express();
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  t.after(() => new Promise<void>((resolve) => server.close(() => resolve())));
  const origin = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
  app.use(
    "/api/audit",
    createAuditRouter({
      store,
      payment,
      origin,
      tokenSecret: "isolated-test-secret-that-is-long-enough",
      discoverLogo: async () => null,
    }),
  );
  let cookie = "";
  const request = async (
    path: string,
    method = "GET",
    body?: unknown,
    cookieValue = cookie,
  ) =>
    fetch(`${origin}/api/audit${path}`, {
      method,
      headers: {
        origin,
        cookie: cookieValue,
        "Content-Type": "application/json",
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  assert.equal(
    (
      await fetch(`${origin}/api/audit/checkout`, {
        method: "POST",
        headers: { origin: "https://untrusted.example" },
      })
    ).status,
    403,
  );
  payment.autoPaid = false;
  const checkout = await request("/checkout", "POST", {});
  cookie = checkout.headers.get("set-cookie")!.split(";")[0];
  const checkoutId = new URL((await checkout.json()).url).searchParams.get(
    "session_id",
  );
  assert.equal(
    (await request("/exchange", "POST", { checkoutId })).status,
    403,
  );
  payment.purchases.get(checkoutId!)!.paid = true;
  assert.equal(
    (await request("/exchange", "POST", { checkoutId }, "")).status,
    403,
  );
  const exchange = await request("/exchange", "POST", { checkoutId });
  const { token } = await exchange.json();
  assert.ok(validToken(token));
  assert.equal(
    (await (await request("/exchange", "POST", { checkoutId })).json()).token,
    token,
  );
  assert.equal(store.records.size, 1);
  assert.equal((await request(`/${opaqueToken()}`)).status, 404);
  const context = {
    name: "Customer",
    email: "customer@example.com",
    companyName: "<script>Example</script>",
    websiteUrl: "https://example.com",
    businessType: "ecommerce",
    primaryMarketingGoal: "purchases",
  };
  assert.equal(
    (await request(`/${token}/context`, "PUT", { ...context, websiteUrl: "" }))
      .status,
    400,
  );
  assert.equal(
    (await request(`/${token}/context`, "PUT", context)).status,
    200,
  );
  assert.equal(
    (
      await request(`/${token}/events`, "POST", {
        event: "question_answered",
        questionId: "O1",
        answer: "A",
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await request(`/${token}/events`, "POST", {
        event: "question_answered",
        questionId: "O1",
      })
    ).status,
    200,
  );
  assert.equal(
    (
      await request(`/${token}/answer`, "PUT", {
        questionId: "unknown",
        answer: "A",
      })
    ).status,
    400,
  );
  await request(`/${token}/answer`, "PUT", { questionId: "O1", answer: "D" });
  store.failSave = true;
  assert.equal(
    (
      await request(`/${token}/answer`, "PUT", {
        questionId: "O2",
        answer: "A",
      })
    ).status,
    503,
  );
  assert.equal((await (await request(`/${token}`)).json()).answers.O1, "D");
  store.failSave = false;
  await request(`/${token}/answer`, "PUT", { questionId: "O1", answer: "B" });
  const resumed = await (await request(`/${token}`)).json();
  assert.equal(resumed.answers.O1, "B");
  assert.equal(resumed.progress.nextQuestionId, "O2");
  assert.equal(resumed.report, undefined);
  assert.equal(resumed.sectionScores, undefined);
  assert.equal((await request(`/${token}/complete`, "POST", {})).status, 400);
  assert.equal((await request(`/${token}/retake`, "POST", {})).status, 409);
  for (const q of questionnaire.questions)
    assert.equal(
      (
        await request(`/${token}/answer`, "PUT", {
          questionId: q.id,
          answer: q.id === "C6" ? "D" : "A",
        })
      ).status,
      200,
    );
  const complete = await request(`/${token}/complete`, "POST", {});
  assert.equal(complete.status, 200);
  const frozen = await complete.json();
  const again = await (await request(`/${token}/complete`, "POST", {})).json();
  assert.deepEqual(again, frozen);
  assert.equal(store.notifications.size, 1);
  assert.equal(
    (
      await request(`/${token}/answer`, "PUT", {
        questionId: "O1",
        answer: "E",
      })
    ).status,
    409,
  );
  assert.equal((await (await request(`/${token}`)).json()).completed, true);
  for (const kind of ["report", "work-session", "work-session-completed"]) {
    const download = await request(`/${token}/download/${kind}`);
    assert.equal(download.status, 200);
    assert.match(download.headers.get("content-disposition")!, /attachment/);
    assert.equal(download.headers.get("content-type"), "application/pdf");
    assert.equal(
      Buffer.from(await download.arrayBuffer())
        .subarray(0, 5)
        .toString(),
      "%PDF-",
    );
  }
  assert.equal((await request(`/${token}/download/unknown`)).status, 404);
  assert.equal(
    (await request("/webhook", "POST", { id: "evt", checkoutId })).status,
    400,
  );
  const webhook = () =>
    fetch(`${origin}/api/audit/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": "test-signature",
      },
      body: JSON.stringify({ id: "evt_test", checkoutId }),
    });
  assert.equal((await webhook()).status, 200);
  assert.equal((await webhook()).status, 200);
  assert.equal(store.events.size, 1);
  assert.equal(
    store.records.get(tokenHash(token))!.report!.summary,
    frozen.report.summary,
  );
  const starts = await Promise.all([
    request(`/${token}/retake`, "POST", {}),
    request(`/${token}/retake`, "POST", {}),
  ]);
  assert.deepEqual(
    starts.map((r) => r.status),
    [200, 200],
  );
  assert.equal(store.retakes.size, 1);
  const retaking = await (await request(`/${token}`)).json();
  assert.equal(retaking.runNumber, 2);
  assert.equal(retaking.completed, false);
  assert.deepEqual(retaking.answers, {});
  assert.deepEqual(
    (await (await request(`/${token}/report?run=1`)).json()).report,
    frozen.report,
  );
  assert.equal((await request(`/${token}/report?run=2`)).status, 409);
  for (const key of ["email", "companyName", "websiteUrl"]) {
    const value =
      key === "email"
        ? "other@example.com"
        : key === "websiteUrl"
          ? "https://other.example.com"
          : "Other Company";
    assert.equal(
      (await request(`/${token}/context`, "PUT", { ...context, [key]: value }))
        .status,
      409,
    );
  }
  assert.equal(
    (
      await request(`/${token}/context`, "PUT", {
        ...context,
        primaryMarketingGoal: "booked_calls",
      })
    ).status,
    200,
  );
  await request(`/${token}/answer`, "PUT", { questionId: "O1", answer: "B" });
  await request(`/${token}/retake`, "POST", {});
  assert.equal((await (await request(`/${token}`)).json()).answers.O1, "B");
  for (const q of questionnaire.questions)
    await request(`/${token}/answer`, "PUT", { questionId: q.id, answer: "B" });
  assert.equal((await request(`/${token}/complete`, "POST", {})).status, 200);
  assert.equal(store.notifications.size, 2);
  assert.deepEqual(
    (await (await request(`/${token}/report?run=1`)).json()).report,
    frozen.report,
  );
  const reportTwo = await (await request(`/${token}/report?run=2`)).json();
  assert.equal(reportTwo.runNumber, 2);
  assert.deepEqual(
    reportTwo.frozenAnswers,
    Object.fromEntries(questionnaire.questions.map((q) => [q.id, "B"])),
  );
  assert.deepEqual(
    (await (await request(`/${token}/report?run=1`)).json()).frozenAnswers,
    Object.fromEntries(
      questionnaire.questions.map((q) => [q.id, q.id === "C6" ? "D" : "A"]),
    ),
  );
  assert.deepEqual(reportTwo.completedReports, [1, 2]);
  assert.equal(reportTwo.retakeAvailable, false);
  assert.equal((await request(`/${token}/retake`, "POST", {})).status, 409);
  assert.equal(
    (
      await request(`/${token}/answer`, "PUT", {
        questionId: "O1",
        answer: "E",
      })
    ).status,
    409,
  );
  for (const run of [1, 2]) {
    const download = await request(`/${token}/download/report?run=${run}`);
    assert.equal(download.status, 200);
    assert.ok(
      download.headers
        .get("content-disposition")!
        .includes(`marketing-clarity-report-${run}.pdf`),
    );
  }
  const notes = `/${token}/work-session/primary-0?run=1`;
  assert.equal(
    (
      await request(notes, "PUT", {
        value: "Evidence from five customer conversations",
      })
    ).status,
    200,
  );
  assert.equal(
    (
      await request(`/${token}/work-session/decision-1?run=1`, "PUT", {
        value: "Focus the primary offer",
      })
    ).status,
    200,
  );
  const working = await (await request(`/${token}/work-session?run=1`)).json();
  assert.equal(
    working.entries["primary-0"],
    "Evidence from five customer conversations",
  );
  assert.deepEqual(
    (await (await request(`/${token}/work-session?run=2`)).json()).entries,
    {},
  );
  assert.equal(
    (
      await request(`/${token}/work-session/decision-0?run=2`, "PUT", {
        value: "Separate Report 2 note",
      })
    ).status,
    200,
  );
  assert.equal(
    (
      await (
        await request(`/${token}/work-session?run=2`, "GET", undefined, "")
      ).json()
    ).entries["decision-0"],
    "Separate Report 2 note",
  );
  store.failSave = true;
  assert.equal(
    (
      await request(notes, "PUT", {
        value: "Save failure must not replace stored notes",
      })
    ).status,
    503,
  );
  store.failSave = false;
  assert.equal(
    (await (await request(`/${token}/work-session?run=1`)).json()).entries[
      "primary-0"
    ],
    "Evidence from five customer conversations",
  );
  for (const run of [1, 2]) {
    const filled = await request(
      `/${token}/download/work-session-completed?run=${run}`,
      "GET",
      undefined,
      "",
    );
    assert.equal(filled.status, 200);
    assert.equal(filled.headers.get("content-type"), "application/pdf");
    assert.match(
      filled.headers.get("content-disposition")!,
      new RegExp(`work-session-completed-${run}\\.pdf`),
    );
    assert.equal(
      Buffer.from(await filled.arrayBuffer())
        .subarray(0, 5)
        .toString(),
      "%PDF-",
    );
  }
  assert.equal(
    (await request(`/${opaqueToken()}/download/work-session-completed?run=1`))
      .status,
    404,
  );
  assert.equal(
    (
      await request(`/${token}/work-session/not-a-prompt?run=1`, "PUT", {
        value: "invalid",
      })
    ).status,
    400,
  );
  assert.equal(
    (await request(notes, "PUT", { value: "x".repeat(4001) })).status,
    400,
  );
  assert.equal(
    (await request(notes, "PUT", { value: "value", answer: "D" })).status,
    400,
  );
  assert.equal(
    (await request(`/${opaqueToken()}/work-session?run=1`)).status,
    404,
  );
  assert.deepEqual(
    (await (await request(`/${token}/report?run=1`)).json()).report,
    frozen.report,
  );
  const rec = frozen.report.recommendations[0].id;
  const check = `/${token}/checklist/${rec}?run=1`;
  assert.equal((await request(check, "PUT", { value: true }, "")).status, 200);
  assert.equal(
    (
      await (
        await request(`/${token}/checklist?run=1`, "GET", undefined, "")
      ).json()
    ).entries[rec],
    true,
  );
  assert.deepEqual(
    (await (await request(`/${token}/checklist?run=2`)).json()).entries,
    {},
  );
  assert.equal((await request(check, "PUT", { value: false })).status, 200);
  assert.equal(
    (await (await request(`/${token}/checklist?run=1`)).json()).entries[rec],
    false,
  );
  assert.equal((await request(check, "PUT", { value: "yes" })).status, 400);
  assert.equal(
    (await request(`/${token}/checklist/unknown?run=1`, "PUT", { value: true }))
      .status,
    400,
  );
  assert.equal(
    (await request(`/${opaqueToken()}/checklist?run=1`)).status,
    404,
  );
  assert.deepEqual(
    (await (await request(`/${token}/report?run=1`)).json()).report,
    frozen.report,
  );
  assert.equal((await request(`/${token}/company-logo`)).status, 204);
  assert.equal((await request(`/${opaqueToken()}/company-logo`)).status, 404);
  const cachedLogo = (await discoverCompanyLogo("https://example.com", async (url) =>
    url === "https://example.com/"
      ? { body: Buffer.from('<meta property="og:logo" content="/brand.png">'), mime: "text/html", url }
      : { body: readFileSync(new URL("./pdf-assets/logo.png", import.meta.url)), mime: "image/png", url }
  ))!;
  store.companyLogo = async () => ({ png: cachedLogo, checkedAt: new Date() });
  store.saveCompanyLogo = async () => {
    throw Error("Should use cache");
  };
  const branded = await request(`/${token}/company-logo`);
  assert.equal(branded.status, 200);
  assert.equal(branded.headers.get("content-type"), "image/png");
  assert.match(branded.headers.get("cache-control")!, /no-store/);
  assert.deepEqual(Buffer.from(await branded.arrayBuffer()), cachedLogo);
  // A legacy cached image is never trusted simply because it decodes as PNG.
  let refreshes = 0;
  let cache: Buffer | null = await normalizeCompanyLogo(cachedLogo, "image/png");
  store.companyLogo = async () => ({ png: cache, checkedAt: new Date() });
  store.saveCompanyLogo = async (_hash, _website, value) => { cache = value; refreshes++; };
  assert.equal((await request(`/${token}/company-logo`)).status, 204);
  assert.equal(refreshes, 1);
  assert.equal(cache, null);
  assert.equal((await request(`/${token}/company-logo`)).status, 204);
  assert.equal(refreshes, 1); // negative cache is reused
  const noLogoPdf = await request(`/${token}/download/report`);
  assert.equal(noLogoPdf.status, 200);
  assert.equal(noLogoPdf.headers.get("content-type"), "application/pdf");
  assert.equal(refreshes, 1); // same validated cache path in web and PDF

});
