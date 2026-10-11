import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
const displayQuestions: Record<string, string> = JSON.parse(
  readFileSync(
    new URL(
      "../shared/marketing-clarity-audit/question-display.json",
      import.meta.url,
    ),
    "utf8",
  ),
);
const canonical = JSON.parse(
  readFileSync(
    new URL(
      "../shared/marketing-clarity-audit/questionnaire.json",
      import.meta.url,
    ),
    "utf8",
  ),
) as {
  questions: {
    id: string;
    sectionId: number;
    prompt: string;
    options: { text: string }[];
  }[];
};

canonical.questions.forEach((q) => {
  q.prompt = displayQuestions[q.id as keyof typeof displayQuestions];
});

test("paid audit, validation, teaching insight, save retry, Back/edit, resume, frozen result and downloads", async ({
  page,
}, testInfo) => {
  await page.goto("/marketing-clarity-assesment");
  await expect(
    page.getByRole("heading", { name: "Know what to focus on next." }),
  ).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath("sales.png"),
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Get My Clarity Assessment — $27" }).first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Tell us about your business" }),
  ).toBeVisible();
  const resumeUrl = page.url();
  await page.getByLabel("Name", { exact: true }).fill("Fictional Customer");
  await page.getByLabel("Email", { exact: true }).fill("fictional@example.com");
  await page
    .getByLabel("Company name", { exact: true })
    .fill("Fictional Company");
  await page
    .getByLabel("Website URL", { exact: true })
    .fill("ftp://example.com");
  await page
    .getByRole("combobox", { name: "Business type", exact: true })
    .selectOption("professional_services");
  await page
    .getByRole("combobox", { name: "Primary marketing goal", exact: true })
    .selectOption("leads");
  await page.getByRole("button", { name: "Start Get Clarity Assessment" }).click();
  await expect(page.getByRole("alert")).toContainText("http:// or https://");
  await page.getByLabel("Website URL", { exact: true }).fill("www.example.com");
  await expect(page.getByLabel("Website URL", { exact: true })).toHaveAttribute(
    "placeholder",
    "https://www.example.com",
  );
  await page.getByRole("button", { name: "Start Get Clarity Assessment" }).click();
  await expect(
    page.getByRole("heading", { name: canonical.questions[0].prompt }),
  ).toBeVisible();
  await expect(
    page.getByText("Get Clarity Assessment for Fictional Company", { exact: true }),
  ).toBeVisible();
  const savedContext = await (
    await page.request.get(`/api/audit/${resumeUrl.split("/").at(-1)}`)
  ).json();
  expect(savedContext.context.websiteUrl).toBe("https://www.example.com");
  await expect(
    page.getByRole("button", { name: "Back", exact: true }),
  ).toBeDisabled();
  let failed = false;
  await page.route("**/api/audit/*/answer", async (route) => {
    if (!failed) {
      failed = true;
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ error: "Save failed. Please retry." }),
      });
    } else await route.continue();
  });
  await page
    .getByRole("radio", {
      name: canonical.questions[0].options[3].text,
      exact: true,
    })
    .check();
  await expect(page.getByText("Not saved", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Retry save" }).click();
  await expect(
    page.getByRole("heading", { name: "Clarity Insight" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: canonical.questions[1].prompt }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await page
    .getByRole("radio", {
      name: canonical.questions[0].options[0].text,
      exact: true,
    })
    .check();
  await expect(
    page.getByRole("heading", { name: canonical.questions[1].prompt }),
  ).toBeVisible();
  await page.goto("/services");
  await page.goto(resumeUrl);
  await expect(
    page.getByRole("heading", { name: canonical.questions[1].prompt }),
  ).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath("assessment.png"),
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const layers = page.getByRole("list", {
    name: "Marketing system Clarity Stack",
  });
  await expect(layers.locator('[data-layer-id="1"]')).toHaveAttribute(
    "data-state",
    "current",
  );
  for (let i = 1; i < canonical.questions.length; i++) {
    const q = canonical.questions[i];
    await expect(
      layers.locator(`[data-layer-id="${q.sectionId}"]`),
    ).toHaveAttribute("data-state", "current");
    if (q.sectionId > 1)
      await expect(
        layers.locator(`[data-layer-id="${q.sectionId - 1}"]`),
      ).toHaveAttribute("data-state", "complete");
    await expect(
      page.getByRole("heading", { name: q.prompt, exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("progressbar")).toHaveAttribute(
      "value",
      String(i),
    );
    await page
      .getByRole("radio", {
        name: q.options[q.id === "C6" ? 3 : 0].text,
        exact: true,
      })
      .check();
    if (i < 34 && canonical.questions[i + 1].sectionId !== q.sectionId) {
      await expect(
        page.getByRole("button", { name: "Continue to next section" }),
      ).toBeVisible();
      await expect(
        layers.locator(`[data-layer-id="${q.sectionId}"]`),
      ).toHaveAttribute("data-state", "complete");
      if (q.sectionId === 1)
        await expect(
          page.getByText(
            "You’re building a clearer picture of what deserves attention next at Fictional Company.",
            { exact: true },
          ),
        ).toBeVisible();
      if (q.sectionId === 3)
        await expect(
          page.getByText(
            "Halfway there. You’re narrowing down the highest-leverage next moves for Fictional Company.",
            { exact: true },
          ),
        ).toBeVisible();
      await expect(
        page.getByText("Overall score:", { exact: false }),
      ).toHaveCount(0);
      await page
        .getByRole("button", { name: "Continue to next section" })
        .click();
    }
  }
  await expect(layers.locator('[data-state="complete"]')).toHaveCount(6);
  await expect(page.getByText("100% complete", { exact: false })).toBeVisible();
  await expect(
    page.getByText("Prepared specifically for Fictional Company", {
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Generate My Get Clarity Assessment Report" })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Get Clarity Assessment Report",
      exact: true,
      level: 1,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Your Clarity Work Session" }),
  ).toBeVisible();
  await expect(page.locator(".constraint-grid")).toContainText(
    "The commitment you're asking from the visitor and the experience surrounding that decision appear to be out of alignment.",
  );
  await expect(page.locator(".clarity-snapshot")).toContainText(
    "does not establish which direction the mismatch takes",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("report.png"),
    fullPage: true,
  });
  await page.goto(resumeUrl);
  await expect(page).toHaveURL(/\/audit\/results\//);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
  await page.route("**/api/audit/*/download/report*", (route) =>
    route.fulfill({ status: 503, body: "Temporary failure" }),
  );
  await page
    .getByRole("button", { name: "Download Get Clarity Assessment Report PDF" })
    .click();
  await expect(page.getByRole("alert")).toContainText(
    "web report is still available",
  );
  await page.unroute("**/api/audit/*/download/report*");
  for (const name of [
    "Download Get Clarity Assessment Report PDF",
    "Download Blank Work Session PDF",
  ]) {
    const pending = page.waitForEvent("download");
    await page.getByRole("button", { name, exact: true }).click();
    const download = await pending;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    const path = testInfo.outputPath(download.suggestedFilename());
    await download.saveAs(path);
    expect(readFileSync(path).subarray(0, 5).toString()).toBe("%PDF-");
  }
});

test("private-link error, keyboard focus, and existing checkout regression", async ({
  page,
}, testInfo) => {
  await page.goto("/audit/resume/invalid");
  await expect(page.getByRole("alert")).toContainText("invalid");
  await page.goto("/marketing-clarity-assesment");
  await page
    .getByRole("button", { name: "Get My Clarity Assessment — $27" }).first()
    .focus();
  await expect(
    page.getByRole("button", { name: "Get My Clarity Assessment — $27" }).first(),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Tell us about your business" }),
  ).toBeVisible();
  await page.goto("/checkout/strategy-sprint");
  await expect(
    page.getByRole("link", { name: "Proceed to Checkout" }),
  ).toHaveAttribute("href", "https://buy.stripe.com/dRmcN5eeygbFfkh8Sj8IU01");
  await page.screenshot({
    path: testInfo.outputPath("existing-checkout.png"),
    fullPage: true,
  });
});

test("purchase initialization, report generation and report retrieval recover without losing saved data", async ({
  page,
}) => {
  await page.goto("/marketing-clarity-assesment");
  let initializationFailed = false;
  await page.route("**/api/audit/exchange", async (route) => {
    if (!initializationFailed) {
      initializationFailed = true;
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: '{"error":"Purchase confirmed; audit initialization temporarily unavailable. Retry."}',
      });
    } else await route.continue();
  });
  await page
    .getByRole("button", { name: "Get My Clarity Assessment — $27" }).first()
    .click();
  await expect(page.getByRole("alert")).toContainText("initialization");
  await page.getByRole("button", { name: "Retry", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Tell us about your business" }),
  ).toBeVisible();
  const resume = page.url();
  const token = resume.split("/").at(-1)!;
  const headers = { origin: "http://127.0.0.1:4307" };
  const context = {
    name: "Recovery Test",
    email: "recovery@example.com",
    companyName: "Recovery Company",
    websiteUrl: "https://example.com",
    businessType: "professional_services",
    primaryMarketingGoal: "leads",
  };
  expect(
    (
      await page.request.put(`/api/audit/${token}/context`, {
        headers,
        data: context,
      })
    ).status(),
  ).toBe(200);
  for (const q of canonical.questions)
    expect(
      (
        await page.request.put(`/api/audit/${token}/answer`, {
          headers,
          data: { questionId: q.id, answer: q.id === "C6" ? "D" : "A" },
        })
      ).status(),
    ).toBe(200);
  await page.reload();
  await expect(
    page.getByRole("heading", {
      name: "You’ve completed the climb. Now let’s find the clearest path forward.",
    }),
  ).toBeVisible();
  let completionFailed = false;
  await page.route("**/api/audit/*/complete", async (route) => {
    if (!completionFailed) {
      completionFailed = true;
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: '{"error":"Report generation temporarily unavailable. Retry."}',
      });
    } else await route.continue();
  });
  await page
    .getByRole("button", { name: "Generate My Get Clarity Assessment Report" })
    .click();
  await expect(page.getByRole("alert")).toContainText("Report generation");
  await expect(page.getByText("100% complete", { exact: false })).toBeVisible();
  let retrievalFailed = false;
  await page.route("**/api/audit/*/report", async (route) => {
    if (!retrievalFailed) {
      retrievalFailed = true;
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: '{"error":"Report retrieval temporarily unavailable. Retry."}',
      });
    } else await route.continue();
  });
  await page
    .getByRole("button", { name: "Generate My Get Clarity Assessment Report" })
    .click();
  await expect(page.getByRole("alert")).toContainText("Report retrieval");
  await page.getByRole("button", { name: "Retry", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Get Clarity Assessment Report",
      exact: true,
      level: 1,
    }),
  ).toBeVisible();
  await expect(
    page
      .locator("#marketing-clarity-report")
      .getByText("Recovery Company", { exact: true }),
  ).toBeVisible();
});

test("assessment gracefully handles missing and blank stored company names", async ({
  page,
}) => {
  for (const companyName of [undefined, "   "]) {
    let answers = Object.fromEntries(
      canonical.questions.slice(0, 5).map((q) => [q.id, "A"]),
    );
    await page.route("**/api/audit/**", async (route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({
          json: {
            context: {
              name: "Customer",
              email: "customer@example.com",
              companyName,
              websiteUrl: "https://example.com",
              businessType: "professional_services",
              primaryMarketingGoal: "leads",
            },
            answers,
            completed: false,
            savedAt: new Date().toISOString(),
          },
        });
      } else await route.fulfill({ json: {} });
    });
    await page.goto(`/audit/resume/${"a".repeat(43)}`);
    await expect(
      page.getByRole("heading", {
        name: canonical.questions[5].prompt,
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByText(/^Get Clarity Assessment for /)).toHaveCount(0);
    await page
      .getByRole("radio", {
        name: canonical.questions[5].options[0].text,
        exact: true,
      })
      .check();
    await expect(
      page.getByText(
        "You’re building a clearer picture of what deserves attention next in your business.",
        { exact: true },
      ),
    ).toBeVisible();
    answers = Object.fromEntries(
      canonical.questions.slice(0, 16).map((q) => [q.id, "A"]),
    );
    await page.reload();
    await page
      .getByRole("radio", {
        name: canonical.questions[16].options[0].text,
        exact: true,
      })
      .check();
    await expect(
      page.getByText(
        "Halfway there. You’re narrowing down the highest-leverage next moves for your business.",
        { exact: true },
      ),
    ).toBeVisible();
    answers = Object.fromEntries(canonical.questions.map((q) => [q.id, "A"]));
    await page.reload();
    await expect(
      page.getByText("Prepared specifically for your business", {
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByText(/undefined|null/)).toHaveCount(0);
    await page.unroute("**/api/audit/**");
  }
});

test("website field is required, gray, and accepts all supported address formats", async ({
  page,
}) => {
  for (const [website, normalized] of [
    ["example.com", "https://example.com"],
    ["www.example.com", "https://www.example.com"],
    ["http://example.com", "http://example.com"],
    ["https://example.com", "https://example.com"],
  ]) {
    await page.goto("/marketing-clarity-assesment");
    await page
      .getByRole("button", { name: "Get My Clarity Assessment — $27" }).first()
      .click();
    await expect(
      page.getByRole("heading", { name: "Tell us about your business" }),
    ).toBeVisible();
    const token = page.url().split("/").at(-1)!;
    await page.getByLabel("Name", { exact: true }).fill("Website Test");
    await page.getByLabel("Email", { exact: true }).fill("website@example.com");
    await page
      .getByLabel("Company name", { exact: true })
      .fill("Website Company");
    await page
      .getByRole("combobox", { name: "Business type", exact: true })
      .selectOption("professional_services");
    await page
      .getByRole("combobox", { name: "Primary marketing goal", exact: true })
      .selectOption("leads");
    const input = page.getByLabel("Website URL", { exact: true });
    await expect(input).toHaveAttribute(
      "placeholder",
      "https://www.example.com",
    );
    expect(
      await input.evaluate((el) => getComputedStyle(el, "::placeholder").color),
    ).toBe("rgb(156, 163, 175)");
    await page.getByRole("button", { name: "Start Get Clarity Assessment" }).click();
    expect(
      await input.evaluate(
        (el) => (el as HTMLInputElement).validity.valueMissing,
      ),
    ).toBe(true);
    await expect(
      page.getByRole("heading", { name: "Tell us about your business" }),
    ).toBeVisible();
    await input.fill(website);
    await page.getByRole("button", { name: "Start Get Clarity Assessment" }).click();
    await expect(
      page.getByRole("heading", {
        name: canonical.questions[0].prompt,
        exact: true,
      }),
    ).toBeVisible();
    const session = await (
      await page.request.get(`/api/audit/${token}`)
    ).json();
    expect(session.context.websiteUrl).toBe(normalized);
  }
});

test("included retake preserves Report 1, resumes Run 2, locks identity and stops at two reports", async ({
  page,
}, testInfo) => {
  await page.goto("/marketing-clarity-assesment");
  await page
    .getByRole("button", { name: "Get My Clarity Assessment — $27" }).first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Tell us about your business" }),
  ).toBeVisible();
  const resume = page.url();
  const token = resume.split("/").at(-1)!;
  const headers = { origin: "http://127.0.0.1:4307" };
  const context = {
    name: "Retake Customer",
    email: "retake@example.com",
    companyName: "Apex & Co.",
    websiteUrl: "https://example.com",
    businessType: "professional_services",
    primaryMarketingGoal: "leads",
  };
  expect(
    (
      await page.request.put(`/api/audit/${token}/context`, {
        headers,
        data: context,
      })
    ).status(),
  ).toBe(200);
  for (const q of canonical.questions)
    expect(
      (
        await page.request.put(`/api/audit/${token}/answer`, {
          headers,
          data: { questionId: q.id, answer: q.id === "C6" ? "D" : "A" },
        })
      ).status(),
    ).toBe(200);
  await page.reload();
  await expect(
    page.getByRole("heading", {
      name: "You’ve completed the climb. Now let’s find the clearest path forward.",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Prepared specifically for Apex & Co.", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Review before generating your report" }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "You can still edit any answer before continuing. Your purchase also includes one complete retake in case you want to reassess your business after reviewing your first results.",
      { exact: true },
    ),
  ).toBeVisible();
  for (const title of [
    "Your Primary Constraint",
    "Your 3 Highest-Leverage Next Moves",
    "What Not to Prioritize Yet",
    "Your 30-Day Clarity Plan",
  ])
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("completion.png"),
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Generate My Get Clarity Assessment Report" })
    .click();
  await expect(
    page.getByRole("heading", { name: "1 Included Retake" }),
  ).toBeVisible();
  const original = (
    await (await page.request.get(`/api/audit/${token}/report?run=1`)).json()
  ).report;
  await page.getByRole("button", { name: "Start My Included Retake" }).click();
  await expect(
    page.getByRole("heading", {
      name: canonical.questions[0].prompt,
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Get Clarity Assessment for Apex & Co.", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("progressbar")).toHaveAttribute("value", "0");
  await page.getByText("Update your business focus", { exact: true }).click();
  await page
    .getByRole("combobox", { name: "Retake marketing goal" })
    .selectOption("booked_calls");
  await page.getByRole("button", { name: "Save Business Focus" }).click();
  await expect(
    page.getByRole("button", { name: "Save Business Focus" }),
  ).toBeEnabled();
  expect(
    (await (await page.request.get(`/api/audit/${token}`)).json()).context
      .primaryMarketingGoal,
  ).toBe("booked_calls");

  await page
    .getByRole("radio", {
      name: canonical.questions[0].options[1].text,
      exact: true,
    })
    .check();
  await expect(
    page.getByRole("heading", {
      name: canonical.questions[1].prompt,
      exact: true,
    }),
  ).toBeVisible();
  await page.goto("/services");
  await page.goto(resume);
  await expect(
    page.getByRole("heading", {
      name: canonical.questions[1].prompt,
      exact: true,
    }),
  ).toBeVisible();
  expect(
    (
      await page.request.put(`/api/audit/${token}/context`, {
        headers,
        data: { ...context, companyName: "Other business" },
      })
    ).status(),
  ).toBe(409);
  await page.getByRole("link", { name: "View your original report" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Your Get Clarity Assessment results · Report 1",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Continue your retake" }).click();
  await expect(
    page.getByRole("heading", {
      name: canonical.questions[1].prompt,
      exact: true,
    }),
  ).toBeVisible();
  for (const q of canonical.questions)
    expect(
      (
        await page.request.put(`/api/audit/${token}/answer`, {
          headers,
          data: { questionId: q.id, answer: "B" },
        })
      ).status(),
    ).toBe(200);
  await page.reload();
  await expect(
    page.getByText(
      "You can still edit any answer before continuing. This is your included retake. Generating your report freezes Report 2; your original report will remain available.",
      { exact: true },
    ),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Generate My Get Clarity Assessment Report" })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Your Get Clarity Assessment results · Report 2",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Both reports are complete" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Start My Included Retake" }),
  ).toHaveCount(0);
  expect(
    (
      await page.request.post(`/api/audit/${token}/retake`, {
        headers,
        data: {},
      })
    ).status(),
  ).toBe(409);
  expect(
    (await (await page.request.get(`/api/audit/${token}/report?run=1`)).json())
      .report,
  ).toEqual(original);
  await page.getByRole("button", { name: "Report 1", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Your Get Clarity Assessment results · Report 1",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Report 2", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Your Get Clarity Assessment results · Report 2",
      exact: true,
    }),
  ).toBeVisible();
  await page.goto(resume);
  await expect(
    page.getByRole("heading", {
      name: "Your Get Clarity Assessment results · Report 2",
      exact: true,
    }),
  ).toBeVisible();
});

test("personalized report presentation and focused Work Session autosave, retry and secure return", async ({
  page,
}, testInfo) => {
  await page.goto("/marketing-clarity-assesment");
  await page
    .getByRole("button", { name: "Get My Clarity Assessment — $27" }).first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Tell us about your business" }),
  ).toBeVisible();
  const token = page.url().split("/").at(-1)!;
  const headers = { origin: "http://127.0.0.1:4307" };
  await page.request.put(`/api/audit/${token}/context`, {
    headers,
    data: {
      name: "Workbook Customer",
      email: "workbook@example.com",
      companyName: "Apex & Co.",
      websiteUrl: "https://example.com",
      businessType: "professional_services",
      primaryMarketingGoal: "leads",
    },
  });
  for (const q of canonical.questions)
    await page.request.put(`/api/audit/${token}/answer`, {
      headers,
      data: {
        questionId: q.id,
        answer: q.sectionId === 1 ? (q.id === "O5" ? "B" : "D") : "A",
      },
    });
  expect(
    (
      await page.request.post(`/api/audit/${token}/complete`, {
        headers,
        data: {},
      })
    ).status(),
  ).toBe(200);
  await page.goto(`/audit/results/${token}`);
  const frozen = (
    await (await page.request.get(`/api/audit/${token}/report`)).json()
  ).report;
  await expect(
    page.getByText(/Multiple Offer responses consistently point/),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Your Clarity Toolkit" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open Report", exact: true }),
  ).toHaveAttribute("href", "#marketing-clarity-report");
  await expect(page.getByText("Objective", { exact: true })).toHaveCount(4);
  await expect(
    page.getByText("Done When / Deliverable", { exact: true }),
  ).toHaveCount(4);
  if (testInfo.project.name === "desktop")
    expect(
      await page
        .locator("main")
        .evaluate((el) => el.getBoundingClientRect().width),
    ).toBeGreaterThan(1000);
  const worksheet = page.locator("#clarity-work-session");
  await expect(worksheet.locator(".work-session-time-cue")).toContainText(
    "20 min",
  );
  await expect(worksheet).toContainText(
    "Set a 20-minute timer and work through one question at a time.",
  );
  await worksheet
    .locator(".work-session-heading")
    .screenshot({ path: testInfo.outputPath("work-session-time-cue.png") });

  await page.getByRole("link", { name: "Work Online", exact: true }).click();
  await expect
    .poll(() => worksheet.evaluate((el) => el.getBoundingClientRect().top))
    .toBeGreaterThanOrEqual(130);
  await page.screenshot({
    path: testInfo.outputPath("work-online-anchor.png"),
  });
  await expect(worksheet.getByRole("tab")).toHaveCount(0);
  await expect(
    worksheet.getByRole("heading", { name: "Your decision", exact: true }),
  ).toBeVisible();
  const first = worksheet.getByRole("textbox").first();
  await expect(first).toBeEnabled();
  await first.fill("First evidence from customer conversations.");
  await expect(worksheet.getByRole("status")).toHaveText("Saved");
  await worksheet
    .getByLabel("What will you do next?", { exact: true })
    .fill("Choose one offer and validate it with five customers.");
  await expect(worksheet.getByRole("status")).toHaveText("Saved");
  await page.goto("/services");
  await page.goto(`/audit/resume/${token}`);
  await expect(page).toHaveURL(/\/audit\/results\//);
  await expect(worksheet.getByRole("textbox").first()).toHaveValue(
    "First evidence from customer conversations.",
  );
  await expect(
    worksheet.getByLabel("What will you do next?", { exact: true }),
  ).toHaveValue("Choose one offer and validate it with five customers.");
  let failed = false;
  await page.route(
    "**/api/audit/*/work-session/final-next-action*",
    async (route) => {
      if (!failed) {
        failed = true;
        await route.fulfill({
          status: 503,
          contentType: "application/json",
          body: JSON.stringify({
            error: "Temporary save failure. Please retry.",
          }),
        });
      } else await route.continue();
    },
  );
  await worksheet
    .getByLabel("What will you do next?", { exact: true })
    .fill("Revised decision after reviewing evidence.");
  await expect(worksheet.getByRole("status")).toHaveText("Not saved");
  await expect(worksheet.getByRole("alert")).toContainText(
    "Your text is still here",
  );
  await expect(
    worksheet.getByLabel("What will you do next?", { exact: true }),
  ).toHaveValue("Revised decision after reviewing evidence.");
  await worksheet.getByRole("button", { name: "Retry Work Session" }).click();
  await expect(worksheet.getByRole("status")).toHaveText("Saved");
  await page.unroute("**/api/audit/*/work-session/final-next-action*");
  const notes = (
    await (
      await page.request.get(`/api/audit/${token}/work-session?run=1`)
    ).json()
  ).entries;
  expect(notes["final-next-action"]).toBe(
    "Revised decision after reviewing evidence.",
  );
  expect(
    (await (await page.request.get(`/api/audit/${token}/report`)).json())
      .report,
  ).toEqual(frozen);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await worksheet.screenshot({
    path: testInfo.outputPath("work-session-decision.png"),
  });
  await worksheet.screenshot({
    path: testInfo.outputPath("work-session-primary.png"),
  });
  await page
    .locator(".case-module")
    .screenshot({ path: testInfo.outputPath("case-module.png") });
});

test("private workspace restores notes without cookies, reviews frozen answers and keeps each report separate", async ({
  page,
  browser,
}, testInfo) => {
  await page.goto("/marketing-clarity-assesment");
  await page
    .getByRole("button", { name: "Get My Clarity Assessment — $27" }).first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Tell us about your business" }),
  ).toBeVisible();
  const token = page.url().split("/").at(-1)!;
  const headers = { origin: "http://127.0.0.1:4307" };
  await page.request.put(`/api/audit/${token}/context`, {
    headers,
    data: {
      name: "Private Workspace Customer",
      email: "workspace@example.com",
      companyName: "Apex & Co.",
      websiteUrl: "https://example.com",
      businessType: "professional_services",
      primaryMarketingGoal: "leads",
    },
  });
  for (const q of canonical.questions)
    await page.request.put(`/api/audit/${token}/answer`, {
      headers,
      data: {
        questionId: q.id,
        answer: q.sectionId === 1 ? (q.id === "O5" ? "B" : "D") : "A",
      },
    });
  await page.request.post(`/api/audit/${token}/complete`, {
    headers,
    data: {},
  });
  const privateUrl = `http://127.0.0.1:4307/audit/results/${token}`;
  await page.goto(privateUrl);
  await expect(
    page.getByRole("heading", { name: "Save your private results link" }),
  ).toBeVisible();
  await expect(
    page.getByText("1 retake remaining", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(/You don’t have to use your retake now/),
  ).toBeVisible();
  const completedDownload = page.getByRole("button", {
    name: "Download My Completed Work Session PDF",
  });
  await expect(completedDownload).toBeDisabled();
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy private link" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Private link copied" }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    privateUrl,
  );
  await page.screenshot({
    path: testInfo.outputPath("results-private-link.png"),
  });
  await page
    .getByRole("link", { name: "Review My Assessment Answers", exact: true })
    .click();
  const review = page.locator("#audit-answer-review");
  await expect
    .poll(() => review.evaluate((el) => el.getBoundingClientRect().top))
    .toBeGreaterThanOrEqual(130);
  await expect
    .poll(() => review.evaluate((el) => el.getBoundingClientRect().top))
    .toBeLessThan(220);
  await expect(review.locator("details")).toHaveCount(6);
  await expect(review.locator("[data-question]")).toHaveCount(35);
  await expect(review.locator('[data-selected="true"]')).toHaveCount(35);
  await review.locator("summary").first().click();
  await expect(
    review.locator('[data-question="O1"] [data-selected="true"]'),
  ).toContainText(canonical.questions[0].options[3].text);
  await expect(review.getByRole("radio")).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath("answer-review.png") });
  const worksheet = page.locator("#clarity-work-session");
  const first = worksheet.getByRole("textbox").first();
  await expect(first).toBeEnabled();
  await first.fill(
    "Report 1 saved evidence: focus the complete customer outcome.",
  );
  await expect(worksheet.getByRole("status")).toHaveText("Saved");
  await expect(completedDownload).toBeEnabled();
  await page.reload();
  await expect(first).toHaveValue(
    "Report 1 saved evidence: focus the complete customer outcome.",
  );
  const download1 = page.waitForEvent("download");
  await completedDownload.click();
  const pdf1 = await download1;
  expect(pdf1.suggestedFilename()).toBe(
    "marketing-clarity-work-session-completed-1.pdf",
  );
  await pdf1.saveAs(testInfo.outputPath(pdf1.suggestedFilename()));
  const original = await (
    await page.request.get(`/api/audit/${token}/report?run=1`)
  ).json();
  await page.getByRole("button", { name: "Start My Included Retake" }).click();
  await expect(
    page.getByRole("heading", { name: canonical.questions[0].prompt }),
  ).toBeVisible();
  for (const q of canonical.questions)
    await page.request.put(`/api/audit/${token}/answer`, {
      headers,
      data: { questionId: q.id, answer: q.sectionId === 1 ? "C" : "A" },
    });
  await page.request.post(`/api/audit/${token}/complete`, {
    headers,
    data: {},
  });
  await page.goto(privateUrl);
  await expect(
    page.getByRole("button", { name: "Report 2", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByText("Retake used · Report 1 and Report 2 remain available", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(first).toHaveValue("");
  await expect(completedDownload).toBeDisabled();
  await first.fill("Report 2 saved evidence: refine the revised offer.");
  await expect(worksheet.getByRole("status")).toHaveText("Saved");
  const download2 = page.waitForEvent("download");
  await completedDownload.click();
  const pdf2 = await download2;
  expect(pdf2.suggestedFilename()).toBe(
    "marketing-clarity-work-session-completed-2.pdf",
  );
  await pdf2.saveAs(testInfo.outputPath(pdf2.suggestedFilename()));
  await review.locator("summary").first().click();
  await expect(
    review.locator('[data-question="O1"] [data-selected="true"]'),
  ).toContainText(canonical.questions[0].options[2].text);
  await page.getByRole("button", { name: "Report 1", exact: true }).click();
  await expect(first).toHaveValue(
    "Report 1 saved evidence: focus the complete customer outcome.",
  );
  await review.locator("summary").first().click();
  await expect(
    review.locator('[data-question="O1"] [data-selected="true"]'),
  ).toContainText(canonical.questions[0].options[3].text);
  expect(
    (await (await page.request.get(`/api/audit/${token}/report?run=1`)).json())
      .report,
  ).toEqual(original.report);
  expect(
    (await (await page.request.get(`/api/audit/${token}/report?run=1`)).json())
      .frozenAnswers,
  ).toEqual(original.frozenAnswers);
  // A fresh browser context has no purchase cookie, local state, or prior note values.
  const fresh = await browser.newContext({ viewport: page.viewportSize()! });
  try {
    const returned = await fresh.newPage();
    await returned.goto(privateUrl);
    await expect(
      returned.getByRole("heading", {
        name: "Your Get Clarity Assessment results · Report 2",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      returned.locator("#clarity-work-session").getByRole("textbox").first(),
    ).toHaveValue("Report 2 saved evidence: refine the revised offer.");
    await returned
      .getByRole("button", { name: "Report 1", exact: true })
      .click();
    await expect(
      returned.locator("#clarity-work-session").getByRole("textbox").first(),
    ).toHaveValue(
      "Report 1 saved evidence: focus the complete customer outcome.",
    );
    await returned.screenshot({
      path: testInfo.outputPath("private-workspace-return.png"),
      fullPage: true,
    });
    await returned
      .locator("#clarity-work-session")
      .getByRole("textbox")
      .first()
      .fill("Report 1 continued in a fresh browser.");
    await expect(
      returned.locator("#clarity-work-session").getByRole("status"),
    ).toHaveText("Saved");
    expect(
      (
        await (
          await page.request.get(`/api/audit/${token}/work-session?run=1`)
        ).json()
      ).entries["primary-0"],
    ).toBe("Report 1 continued in a fresh browser.");
    expect(
      (
        await (
          await page.request.get(`/api/audit/${token}/work-session?run=2`)
        ).json()
      ).entries["primary-0"],
    ).toBe("Report 2 saved evidence: refine the revised offer.");
  } finally {
    await fresh.close();
  }
});

test("action checklist persists per frozen report, clear teaching content and responsive KPI journey", async ({
  page,
  browser,
}, testInfo) => {
  await page.goto("/marketing-clarity-assesment");
  await page
    .getByRole("button", { name: "Get My Clarity Assessment — $27" }).first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Tell us about your business" }),
  ).toBeVisible();
  const token = page.url().split("/").at(-1)!;
  const headers = { origin: "http://127.0.0.1:4307" };
  await page.request.put(`/api/audit/${token}/context`, {
    headers,
    data: {
      name: "Checklist Customer",
      email: "check@example.com",
      companyName: "Apex & Co.",
      websiteUrl: "https://example.com",
      businessType: "professional_services",
      primaryMarketingGoal: "leads",
    },
  });
  const complete = async () => {
    for (const q of canonical.questions)
      await page.request.put(`/api/audit/${token}/answer`, {
        headers,
        data: {
          questionId: q.id,
          answer: q.id.startsWith("O") ? (q.id === "O5" ? "B" : "D") : "A",
        },
      });
    expect(
      (
        await page.request.post(`/api/audit/${token}/complete`, { headers })
      ).status(),
    ).toBe(200);
  };
  await complete();
  const url = `/audit/results/${token}?run=1`;
  await page.goto(url);
  await expect(
    page.locator(".case-problem .case-semantic-icon"),
  ).toHaveAttribute("data-asset-id", "case_offer_icon_problem");
  await expect(
    page.locator(".case-customer-value .case-semantic-icon"),
  ).toHaveAttribute("data-asset-id", "case_offer_icon_customer_value");
  await page
    .locator(".case-module")
    .screenshot({ path: testInfo.outputPath("case-semantic-cards.png") });
  await expect(
    page.getByRole("heading", {
      name: "Your Get Clarity Assessment Snapshot",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Executive summary", exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".score-band-guide")).toContainText("80-100");
  await expect(page.locator(".company-logo-asset")).toBeHidden();
  await page
    .locator(".clarity-snapshot")
    .screenshot({ path: testInfo.outputPath("marketing-snapshot.png") });
  await expect(page.locator(".snapshot-clarity-stack li")).toHaveCount(6);
  await expect(
    page.locator('.snapshot-clarity-stack [data-state="primary"]'),
  ).toContainText("Offer");
  await expect(page.locator(".clarity-snapshot")).not.toContainText(
    "Your self-reported strengths include",
  );
  await page.locator(".snapshot-clarity-stack").screenshot({
    path: testInfo.outputPath("snapshot-mini-stack.png"),
    style: "nav, header:not(.report-cover) { visibility:hidden !important; }",
  });
  await expect(page.locator(".precedence-explanation")).toHaveCount(0);
  const heroBox = await page.locator(".report-cover").boundingBox();
  const utilitiesBox = await page.locator(".report-utilities").boundingBox();
  expect(heroBox!.y + heroBox!.height).toBeLessThanOrEqual(utilitiesBox!.y);
  await page
    .locator(".report-cover")
    .screenshot({ path: testInfo.outputPath("report-first-hero.png") });
  await page
    .locator(".report-utilities")
    .screenshot({ path: testInfo.outputPath("compact-report-utilities.png") });
  await expect(page.locator(".case-visual-placeholder")).toContainText(
    "Visual before/after example coming soon",
  );
  expect(await page.locator(".case-module img").count()).toBe(0);
  await expect(
    page.getByRole("heading", { name: "Put your plan where you can see it" }),
  ).toBeVisible();
  await page
    .locator(".checklist-move details")
    .first()
    .locator("summary")
    .click();
  await expect(page.locator(".checklist-move").first()).toContainText(
    "every ad, landing page, sales conversation",
  );
  const first = page.getByRole("checkbox").first();
  await expect(first).toBeEnabled();
  await first.check();
  await expect(
    page.getByText("Checklist saved automatically", { exact: true }),
  ).toBeVisible();
  await page.route("**/api/audit/*/company-logo", (route) =>
    route.fulfill({
      status: 200,
      contentType: "image/png",
      body: readFileSync(
        new URL("../server/audit/pdf-assets/logo.png", import.meta.url),
      ),
    }),
  );
  await page.reload();
  await expect(page.locator(".company-logo-asset")).toBeVisible();
  await page.unroute("**/api/audit/*/company-logo");
  await expect(first).toBeChecked();
  let fail = true;
  await page.route("**/api/audit/*/checklist/*?run=1", async (route) => {
    if (fail) {
      fail = false;
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ error: "Temporary save failure" }),
      });
    } else await route.continue();
  });
  await first.uncheck();
  await expect(
    page.getByText(
      "Your latest checklist changes haven’t saved. Please retry before leaving.",
    ),
  ).toBeVisible();
  await expect(first).not.toBeChecked();
  await page.getByRole("button", { name: "Retry checklist" }).click();
  await expect(
    page.getByText("Checklist saved automatically", { exact: true }),
  ).toBeVisible();
  await first.check();
  await expect(
    page.getByText("Checklist saved automatically", { exact: true }),
  ).toBeVisible();
  await page.unroute("**/api/audit/*/checklist/*?run=1");

  await expect(
    page.getByRole("heading", {
      name: "Help customers see the business outcome, not just a website",
    }),
  ).toBeVisible();
  for (const name of [
    "Gather Fuel for Your AI Tools",
    "Co-Create With AI",
    "Validate Ideas & Accelerate Execution",
  ])
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "How You’ll Know This Is Improving",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Metrics Worth Watching", exact: true }),
  ).toHaveCount(0);
  const columns = await page
    .locator(".constraint-comparison")
    .evaluate(
      (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
    );
  expect(columns).toBe((page.viewportSize()?.width ?? 0) < 768 ? 1 : 2);
  await page
    .locator(".constraint-lesson")
    .screenshot({ path: testInfo.outputPath("constraint-teaching.png") });
  await page
    .locator(".improvement-evidence")
    .screenshot({ path: testInfo.outputPath("improvement-evidence.png") });
  await page
    .locator(".moves-grid")
    .screenshot({ path: testInfo.outputPath("action-checklist.png") });
  await page.request.post(`/api/audit/${token}/retake`, { headers });
  await complete();
  await page.goto(`/audit/results/${token}?run=2`);
  await expect(first).toBeEnabled();
  await expect(first).not.toBeChecked();
  await first.check();
  await expect(
    page.getByText("Checklist saved automatically", { exact: true }),
  ).toBeVisible();
  await page.goto(url);
  await expect(first).toBeChecked();
  await first.uncheck();
  await expect(
    page.getByText("Checklist saved automatically", { exact: true }),
  ).toBeVisible();
  const privateContext = await browser.newContext();
  const returned = await privateContext.newPage();
  await returned.goto(`http://127.0.0.1:4307${url}`);
  await expect(returned.getByRole("checkbox").first()).not.toBeChecked();
  await returned.goto(`http://127.0.0.1:4307/audit/results/${token}?run=2`);
  await expect(returned.getByRole("checkbox").first()).toBeChecked();
  await privateContext.close();
});

test("Message snapshot orients a strong upstream profile without changing the frozen diagnosis", async ({
  page,
}, testInfo) => {
  await page.goto("/marketing-clarity-assesment");
  await page
    .getByRole("button", { name: "Get My Clarity Assessment — $27" }).first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Tell us about your business" }),
  ).toBeVisible();
  const token = page.url().split("/").at(-1)!;
  const headers = { origin: "http://127.0.0.1:4307" };
  await page.request.put(`/api/audit/${token}/context`, {
    headers,
    data: {
      name: "Snapshot Customer",
      email: "snapshot@example.com",
      companyName: "Snapshot Co.",
      websiteUrl: "https://example.com",
      businessType: "professional_services",
      primaryMarketingGoal: "leads",
    },
  });
  for (const q of canonical.questions)
    await page.request.put(`/api/audit/${token}/answer`, {
      headers,
      data: { questionId: q.id, answer: q.sectionId === 3 ? "D" : "A" },
    });
  const frozen = (
    await (
      await page.request.post(`/api/audit/${token}/complete`, { headers })
    ).json()
  ).report;
  await page.goto(`/audit/results/${token}`);
  const snapshot = page.locator(".clarity-snapshot");
  await expect(snapshot).toContainText(
    "Your marketing system is stronger than your Message score makes it feel.",
  );
  await expect(snapshot).toContainText("Offer and Audience");
  await expect(snapshot).toContainText("Conversion Experience");
  await expect(snapshot).toContainText(
    "weak messaging can make a good offer look average",
    { ignoreCase: true },
  );
  await snapshot.screenshot({
    path: testInfo.outputPath("message-snapshot.png"),
  });
  expect(
    (await (await page.request.get(`/api/audit/${token}/report`)).json())
      .report,
  ).toEqual(frozen);
});

test("Traffic P13 actions and decision prompts save separately from legacy notes without forcing a supporting constraint", async ({
  page,
}, testInfo) => {
  await page.goto("/marketing-clarity-assesment");
  await page
    .getByRole("button", { name: "Get My Clarity Assessment — $27" }).first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Tell us about your business" }),
  ).toBeVisible();
  const token = page.url().split("/").at(-1)!,
    headers = { origin: "http://127.0.0.1:4307" };
  await page.request.put(`/api/audit/${token}/context`, {
    headers,
    data: {
      name: "Traffic Customer",
      email: "traffic@example.com",
      companyName: "Traffic Co.",
      websiteUrl: "https://example.com",
      businessType: "professional_services",
      primaryMarketingGoal: "leads",
    },
  });
  const overrides: Record<string, string> = {
    T1: "C",
    T2: "C",
    T3: "D",
    T4: "C",
    T5: "D",
    T6: "D",
    ML1: "B",
    ML2: "B",
    ML3: "C",
    ML4: "C",
    ML5: "C",
    ML6: "C",
  };
  for (const q of canonical.questions)
    await page.request.put(`/api/audit/${token}/answer`, {
      headers,
      data: { questionId: q.id, answer: overrides[q.id] ?? "A" },
    });
  await page.request.post(`/api/audit/${token}/complete`, { headers });
  const frozen = (
    await (await page.request.get(`/api/audit/${token}/report`)).json()
  ).report;
  expect(frozen.diagnosis.primary.pattern.id).toBe("P13");
  expect(frozen.diagnosis.secondary).toBeUndefined();
  await page.request.put(`/api/audit/${token}/work-session/decision-1?run=1`, {
    headers,
    data: { value: "Original generic decision — keep this saved note." },
  });
  await page.goto(`/audit/results/${token}`);
  await expect(
    page.getByRole("heading", {
      name: "Keep your proven traffic baseline intact",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Run fewer tests with enough budget to learn",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Keep a simple marketing change log",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "What comes next", exact: true }),
  ).toHaveCount(0);
  const work = page.locator("#clarity-work-session");
  await work.getByText("Previously saved responses", { exact: true }).click();
  await expect(work.getByRole("tab")).toHaveCount(0);
  await expect(work.getByLabel("Decision", { exact: true })).toHaveValue(
    "Original generic decision — keep this saved note.",
  );
  const input = work.getByLabel("What will you do next?", {
    exact: true,
  });
  await input.fill(
    "Test one audience at $300 while keeping the control stable.",
  );
  await expect(work.getByRole("status")).toHaveText("Saved");
  await work
    .getByLabel("What will you intentionally not change yet?", { exact: true })
    .fill("Keep the current control campaign unchanged.");
  await work
    .getByLabel("What metric will tell you whether this worked?", {
      exact: true,
    })
    .fill("Qualified lead cost from the CRM after two weeks.");
  await expect(work.getByRole("status")).toHaveText("Saved");
  await page.reload();
  await expect(
    work.getByLabel("What will you intentionally not change yet?", {
      exact: true,
    }),
  ).toHaveValue("Keep the current control campaign unchanged.");
  await expect(
    work.getByLabel("What metric will tell you whether this worked?", {
      exact: true,
    }),
  ).toHaveValue("Qualified lead cost from the CRM after two weeks.");
  await expect(input).toHaveValue(
    "Test one audience at $300 while keeping the control stable.",
  );
  await work.screenshot({
    path: testInfo.outputPath("traffic-decision-prompts.png"),
  });
  const entries = (
    await (
      await page.request.get(`/api/audit/${token}/work-session?run=1`)
    ).json()
  ).entries;
  expect(entries["final-next-action"]).toContain("$300");
  expect(entries["decision-1"]).toContain("Original generic");
  expect(
    (await (await page.request.get(`/api/audit/${token}/report`)).json())
      .report,
  ).toEqual(frozen);
  await page.request.post(`/api/audit/${token}/retake`, { headers });
  const closeScores = {
    ...overrides,
    ML1: "C",
    ML2: "D",
    ML3: "D",
    ML4: "C",
    ML5: "D",
    ML6: "C",
  };
  for (const q of canonical.questions)
    await page.request.put(`/api/audit/${token}/answer`, {
      headers,
      data: { questionId: q.id, answer: closeScores[q.id] ?? "A" },
    });
  await page.request.post(`/api/audit/${token}/complete`, { headers });
  await page.goto(`/audit/results/${token}?run=2`);
  await expect(
    page.getByRole("heading", { name: "What comes next", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".constraint-grid")).toContainText(
    "Focus first on Traffic. Measurement & Learning is also limiting performance",
  );
  await expect(input).toHaveValue("");
  const originalNotes = (
    await (
      await page.request.get(`/api/audit/${token}/work-session?run=1`)
    ).json()
  ).entries;
  expect(originalNotes["final-next-action"]).toContain("$300");
});

test("Measurement report teaches the category and observable progress with explained KPI hierarchy", async ({
  page,
}, testInfo) => {
  await page.goto("/marketing-clarity-assesment");
  await page
    .getByRole("button", { name: "Get My Clarity Assessment — $27" }).first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Tell us about your business" }),
  ).toBeVisible();
  const token = page.url().split("/").at(-1)!,
    headers = { origin: "http://127.0.0.1:4307" };
  await page.request.put(`/api/audit/${token}/context`, {
    headers,
    data: {
      name: "Measurement Customer",
      email: "measurement@example.com",
      companyName: "Measurement Co.",
      websiteUrl: "https://example.com",
      businessType: "professional_services",
      primaryMarketingGoal: "leads",
    },
  });
  for (const q of canonical.questions)
    await page.request.put(`/api/audit/${token}/answer`, {
      headers,
      data: {
        questionId: q.id,
        answer: q.sectionId === 6 ? (q.id === "ML4" ? "E" : "D") : "A",
      },
    });
  const trafficForOverride = {
    T1: "D",
    T2: "D",
    T3: "C",
    T4: "D",
    T5: "C",
    T6: "C",
    ML1: "B",
    ML2: "C",
    ML3: "C",
    ML4: "D",
    ML5: "C",
    ML6: "B",
  };
  for (const [questionId, answer] of Object.entries(trafficForOverride))
    await page.request.put(`/api/audit/${token}/answer`, {
      headers,
      data: { questionId, answer },
    });
  const frozen = (
    await (
      await page.request.post(`/api/audit/${token}/complete`, { headers })
    ).json()
  ).report;
  expect(frozen.diagnosis.primary.sectionId).toBe(6);
  await page.goto(`/audit/results/${token}`);
  await expect(page.locator(".precedence-explanation")).toContainText(
    "Traffic scored lower numerically",
  );
  await expect(
    page.getByRole("heading", {
      name: "Why this comes first even though another section scored lower",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator(".constraint-lesson")).toContainText(
    "It is not simply having analytics",
  );
  await expect(page.locator(".constraint-strong li")).toHaveCount(6);
  await expect(page.locator(".constraint-limited li")).toHaveCount(6);
  await expect(page.locator(".improvement-signals > div")).toHaveCount(5);
  await expect(page.locator(".progress-icon")).toHaveCount(5);
  await expect(page.locator('[data-progress-icon="source"]')).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await expect(
    page.getByRole("heading", {
      name: "Why this matters for your business",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Example measurement hierarchy", { exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".improvement-evidence")).toContainText(
    "Every important KPI has a source of truth",
  );
  await page.getByText("How to Measure Your Progress", { exact: true }).click();
  await expect(page.locator(".improvement-hierarchy")).toContainText(
    "Reconcile definitions and sources",
  );
  await expect(page.locator(".improvement-hierarchy")).toContainText(
    "Check whether a later decision can point to earlier evidence",
  );
  await page
    .locator(".constraint-lesson")
    .screenshot({ path: testInfo.outputPath("measurement-teaching.png") });
  await page
    .locator(".improvement-evidence")
    .screenshot({ path: testInfo.outputPath("measurement-improvement.png") });
  expect(
    (await (await page.request.get(`/api/audit/${token}/report`)).json())
      .report,
  ).toEqual(frozen);
});
