import { discoverCompanyLogo, validatedCachedCompanyLogo } from "./company-logo";
import { isLocalQaCheckout, localQaEnabled } from "./local-qa";
import express, { type Request } from "express";
import { ZodError, z } from "zod";
import { customerContextSchema } from "../../shared/marketing-clarity-audit/context";
import {
  assessmentProgress,
  validateAnswers,
  questionnaire,
} from "../../shared/marketing-clarity-audit/scoring";
import { opaqueToken, tokenHash, validToken, resumeToken } from "./security";
import { PostgresAuditStore, type AuditStore } from "./store";
import { StripeAuditPayment, type AuditPayment } from "./payment";
import { renderAuditPdf } from "./pdf";
import { workPrompts } from "../../shared/marketing-clarity-audit/presentation";
import { auditEvents } from "../../shared/marketing-clarity-audit/events";
import { auditDiagnostic } from "./diagnostics";

export interface AuditDependencies {
  store: AuditStore;
  payment: AuditPayment;
  origin: string;
  tokenSecret: string;
  discoverLogo?: (website: string) => Promise<Buffer | null>;
}
const cookieName = "clarity_audit_purchase";
function claimCookie(req: Request) {
  const value = (req.headers.cookie ?? "")
    .split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith(`${cookieName}=`))
    ?.slice(cookieName.length + 1);
  return value && validToken(value) ? value : undefined;
}

export function createAuditRouter(dependencies?: AuditDependencies) {
  const router = express.Router();
  router.use((req, res, next) => {
    res.locals.auditStage = "request";
    if (req.path === "/checkout") {
      console.info("[audit]", auditDiagnostic(req.path, "request_received"));
      res.on("finish", () =>
        console.info("[audit]", {
          ...auditDiagnostic(req.path, res.locals.auditStage),
          status: res.statusCode,
        }),
      );
    }
    next();
  });
  let configured = dependencies;
  const getDependencies = () => {
    if (configured) return configured;
    const {
      DATABASE_URL,
      STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET,
      MARKETING_AUDIT_STRIPE_PRICE_ID,
      AUDIT_TOKEN_SECRET,
      AUDIT_APP_ORIGIN,
    } = process.env;
    if (
      !DATABASE_URL ||
      !STRIPE_SECRET_KEY ||
      !STRIPE_WEBHOOK_SECRET ||
      !MARKETING_AUDIT_STRIPE_PRICE_ID ||
      !AUDIT_TOKEN_SECRET ||
      AUDIT_TOKEN_SECRET.length < 32 ||
      !AUDIT_APP_ORIGIN
    )
      throw new Error("Audit configuration unavailable");
    configured = {
      store: new PostgresAuditStore(DATABASE_URL),
      payment: new StripeAuditPayment(
        STRIPE_SECRET_KEY,
        MARKETING_AUDIT_STRIPE_PRICE_ID,
        STRIPE_WEBHOOK_SECRET,
      ),
      origin: new URL(AUDIT_APP_ORIGIN).origin,
      tokenSecret: AUDIT_TOKEN_SECRET,
    };
    return configured;
  };
  router.use((_req, res, next) => {
    res.set({
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "Referrer-Policy": "no-referrer",
    });
    next();
  });
  router.post(
    "/webhook",
    express.raw({ type: "application/json", limit: "100kb" }),
    async (req, res) => {
      try {
        const { payment, store } = getDependencies();
        let event;
        try {
          event = payment.webhook(
            req.body,
            req.header("stripe-signature") ?? "",
          );
        } catch {
          res.status(400).json({ error: "Invalid webhook signature" });
          return;
        }
        if (event.checkoutId && (await payment.isPaid(event.checkoutId)))
          await store.paymentEvent(event.id, event.checkoutId);
        res.json({ received: true });
      } catch {
        res.status(503).json({
          error:
            "Payment confirmation temporarily unavailable. Retry delivery.",
        });
      }
    },
  );
  router.use(express.json({ limit: "32kb" }));
  router.use(async (req, res, next) => {
    try {
      const { store, origin } = getDependencies();
      if (req.method !== "GET" && req.header("origin") !== origin) {
        res.status(403).json({ error: "Invalid request origin" });
        return;
      }
      if (!(await store.rateLimit(tokenHash(req.ip ?? "unknown")))) {
        res.status(429).json({
          error: "Too many requests. Please wait a minute and retry.",
        });
        return;
      }
      next();
    } catch (error) {
      console.error(
        "[audit]",
        auditDiagnostic(req.path, "configuration_or_rate_limit", error),
      );
      res.status(503).json({
        error: "The audit is temporarily unavailable. Please retry shortly.",
      });
    }
  });
  const handle =
    (
      fn: (
        req: express.Request,
        res: express.Response,
        deps: AuditDependencies,
      ) => Promise<void>,
    ) =>
    async (req: express.Request, res: express.Response) => {
      try {
        await fn(req, res, getDependencies());
      } catch (error) {
        console.error(
          "[audit]",
          auditDiagnostic(req.path, res.locals.auditStage, error),
        );
        res.status(error instanceof ZodError ? 400 : 503).json({
          error:
            error instanceof ZodError
              ? "Please check the required details."
              : "Unable to save or load your audit. Your saved answers are safe. Please retry.",
        });
      }
    };
  router.post(
    "/events",
    handle(async (req, res, { store }) => {
      const { event } = z
        .object({ event: z.enum(["sales_page_view", "checkout_start"]) })
        .strict()
        .parse(req.body);
      await store.event(event);
      res.json({ recorded: true });
    }),
  );
  router.post(
    "/checkout",
    handle(async (req, res, { payment, store, origin, tokenSecret }) => {
      const claim = claimCookie(req) ?? opaqueToken();
      res.cookie(cookieName, claim, {
        httpOnly: true,
        secure: origin.startsWith("https:"),
        sameSite: "lax",
        path: "/api/audit",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.locals.auditStage = "stripe_checkout";
      const checkout = await payment.checkout(origin, tokenHash(claim));
      res.locals.auditStage = "pending_audit_save";
      await store.initiate(
        checkout.id,
        tokenHash(claim),
        tokenHash(resumeToken(claim, checkout.id, tokenSecret)),
      );
      res.locals.auditStage = "checkout_ready";
      res.json({ url: checkout.url });
    }),
  );
  router.post(
    "/exchange",
    handle(async (req, res, { payment, store, tokenSecret }) => {
      const { checkoutId } = z
        .object({
          checkoutId: z
            .string()
            .regex(/^cs_[A-Za-z0-9_]+$/)
            .max(200),
        })
        .strict()
        .parse(req.body);
      const claim = claimCookie(req);
      if (!claim || !(await payment.isPaid(checkoutId, tokenHash(claim)))) {
        res.status(403).json({
          error:
            "Purchase is not yet verified in this browser. Retry after payment confirmation.",
        });
        return;
      }
      const token = resumeToken(claim, checkoutId, tokenSecret);
      // Recover after a paid checkout whose initial database creation failed.
      await store.initiate(checkoutId, tokenHash(claim), tokenHash(token));
      const row = await store.verify(checkoutId, tokenHash(claim));
      if (!row || (isLocalQaCheckout(row.checkout_id) && !localQaEnabled())) {
        res
          .status(403)
          .json({ error: "Purchase ownership could not be verified" });
        return;
      }
      res.json({ token });
    }),
  );
  router.use("/:token", async (req, res, next) => {
    try {
      const token = req.params.token;
      if (!validToken(token)) {
        res.status(404).json({
          error:
            "This resume link is invalid. Check the complete link and try again.",
        });
        return;
      }
      const row = await getDependencies().store.read(tokenHash(token));
      if (!row || (isLocalQaCheckout(row.checkout_id) && !localQaEnabled())) {
        res
          .status(404)
          .json({ error: "This resume link is invalid or unavailable." });
        return;
      }
      res.locals.audit = row;
      res.locals.auditHash = tokenHash(token);
      next();
    } catch {
      res
        .status(503)
        .json({ error: "Unable to load the audit. Please retry." });
    }
  });
  router.get(
    "/:token",
    handle(async (_req, res) => {
      const row = res.locals.audit;
      res.json({
        localQa: isLocalQaCheckout(row.checkout_id),
        context: row.context,
        answers: row.answers,
        completed: Boolean(row.report),
        runNumber: row.run_number,
        completedReports: row.reports.map((r: { number: number }) => r.number),
        savedAt: row.saved_at,
        progress: assessmentProgress(row.answers),
      });
    }),
  );
  router.post(
    "/:token/events",
    handle(async (req, res, { store }) => {
      const { event, questionId } = z
        .object({
          event: z.enum(auditEvents),
          questionId: z.string().optional(),
        })
        .strict()
        .parse(req.body);
      if (questionId) {
        try {
          validateAnswers({ [questionId]: "A" });
        } catch {
          res.status(400).json({ error: "Invalid event question" });
          return;
        }
      }
      await store.event(event, res.locals.audit.id, questionId);
      res.json({ recorded: true });
    }),
  );
  router.put(
    "/:token/context",
    handle(async (req, res, { store }) => {
      const context = customerContextSchema.parse(req.body);
      if (!(await store.saveContext(res.locals.auditHash, context))) {
        res.status(409).json({
          error:
            "Completed reports and purchaser/business identity cannot be changed.",
        });
        return;
      }
      res.json({ saved: true });
    }),
  );
  router.put(
    "/:token/answer",
    handle(async (req, res, { store }) => {
      const input = z
        .object({
          questionId: z.string(),
          answer: z.enum(["A", "B", "C", "D", "E"]),
        })
        .strict()
        .parse(req.body);
      try {
        validateAnswers({ [input.questionId]: input.answer });
      } catch {
        res.status(400).json({ error: "Invalid question" });
        return;
      }
      const previouslyShown = res.locals.audit.teaching_notes.includes(
        input.questionId,
      );
      if (
        !(await store.saveAnswer(
          res.locals.auditHash,
          input.questionId,
          input.answer,
        ))
      ) {
        res.status(409).json({
          error: "Add your details first, or open your completed report.",
        });
        return;
      }
      const saved = await store.read(res.locals.auditHash);
      const question = questionnaire.questions.find(
        (q) => q.id === input.questionId,
      )!;
      res.json({
        saved: true,
        teachingNote:
          !previouslyShown &&
          saved?.teaching_notes.includes(input.questionId) &&
          "teachingNote" in question
            ? question.teachingNote
            : undefined,
      });
    }),
  );
  router.post(
    "/:token/retake",
    handle(async (_req, res, { store }) => {
      if (!(await store.startRetake(res.locals.auditHash))) {
        res.status(409).json({
          error:
            "Your purchase includes two completed reports. A retake requires Report 1 and cannot be started after Report 2.",
        });
        return;
      }
      res.json({ started: true, runNumber: 2 });
    }),
  );
  const selectedReport = (req: express.Request, res: express.Response) => {
    const reports = res.locals.audit.reports;
    if (req.query.run !== undefined) {
      if (!["1", "2"].includes(String(req.query.run))) return undefined;
      return reports.find(
        (r: { number: number }) => r.number === Number(req.query.run),
      );
    }
    return reports.at(-1);
  };
  router.post(
    "/:token/complete",
    handle(async (_req, res, { store }) => {
      try {
        validateAnswers(res.locals.audit.answers, true);
        customerContextSchema.parse(res.locals.audit.context);
      } catch {
        res.status(400).json({
          error:
            "Complete all questions and required details before generating your report.",
        });
        return;
      }
      const report = await store.complete(res.locals.auditHash);
      res.json({ report });
    }),
  );
  router.get(
    "/:token/checklist",
    handle(async (req, res, { store }) => {
      const selected = selectedReport(req, res);
      if (!selected) {
        res.status(409).json({
          error: "Generate this report before starting its checklist.",
        });
        return;
      }
      res.json({
        entries: await store.checklist(res.locals.auditHash, selected.number),
      });
    }),
  );
  router.put(
    "/:token/checklist/:entryId",
    handle(async (req, res, { store }) => {
      const selected = selectedReport(req, res);
      if (!selected) {
        res.status(409).json({
          error: "Generate this report before starting its checklist.",
        });
        return;
      }
      const { value } = z
        .object({ value: z.boolean() })
        .strict()
        .parse(req.body);
      if (
        !selected.report.recommendations.some(
          (p: { id: string }) => p.id === req.params.entryId,
        )
      ) {
        res.status(400).json({ error: "Unknown checklist prompt." });
        return;
      }
      if (
        !(await store.saveChecklist(
          res.locals.auditHash,
          selected.number,
          req.params.entryId,
          value,
        ))
      ) {
        res.status(409).json({ error: "This report is unavailable." });
        return;
      }
      res.json({ saved: true });
    }),
  );
  router.get(
    "/:token/work-session",
    handle(async (req, res, { store }) => {
      const selected = selectedReport(req, res);
      if (!selected) {
        res.status(409).json({
          error: "Generate this report before starting its Work Session.",
        });
        return;
      }
      res.json({
        entries: await store.workNotes(res.locals.auditHash, selected.number),
      });
    }),
  );
  router.put(
    "/:token/work-session/:entryId",
    handle(async (req, res, { store }) => {
      const selected = selectedReport(req, res);
      if (!selected) {
        res.status(409).json({
          error: "Generate this report before starting its Work Session.",
        });
        return;
      }
      const { value } = z
        .object({ value: z.string().max(4000) })
        .strict()
        .parse(req.body);
      if (
        !workPrompts(selected.report).some((p) => p.id === req.params.entryId)
      ) {
        res.status(400).json({ error: "Unknown Work Session prompt." });
        return;
      }
      if (
        !(await store.saveWorkNote(
          res.locals.auditHash,
          selected.number,
          req.params.entryId,
          value,
        ))
      ) {
        res.status(409).json({ error: "This report is unavailable." });
        return;
      }
      res.json({ saved: true });
    }),
  );
  const logoJobs = new Map<string, Promise<Buffer | null>>();
  async function currentCompanyLogo(store: AuditStore, hash: string, website: string) {
    if (!store.companyLogo || !store.saveCompanyLogo) return null;
    const cached = await store.companyLogo(hash);
    const verified = cached?.png ? await validatedCachedCompanyLogo(cached.png, website) : null;
    if (cached && Date.now() - cached.checkedAt.getTime() <= 86400000 && (!cached.png || verified)) return verified;
    const jobKey = `${hash}:${website}`;
    let job = logoJobs.get(jobKey);
    if (!job && logoJobs.size < 4) {
      job = (dependencies?.discoverLogo ?? discoverCompanyLogo)(website).then(async (logo) => {
        await store.saveCompanyLogo!(hash, website, logo);
        return logo;
      }).finally(() => logoJobs.delete(jobKey));
      logoJobs.set(jobKey, job);
    }
    return job ? await job : null;
  }
  router.get(
    "/:token/company-logo",
    handle(async (_req, res, { store }) => {
      try {
        if (
          !store.companyLogo ||
          !store.saveCompanyLogo ||
          !res.locals.audit.context
        ) {
          res.status(204).end();
          return;
        }
        const hash = res.locals.auditHash,
          website = res.locals.audit.context.websiteUrl;
        const png = await currentCompanyLogo(store, hash, website);
        if (!png) {
          res.status(204).end();
          return;
        }
        res.set({
          "Content-Type": "image/png",
          "X-Content-Type-Options": "nosniff",
          "Content-Security-Policy": "default-src 'none'; sandbox",
        });
        res.send(png);
      } catch {
        res.status(204).end();
      }
    }),
  );
  router.get(
    "/:token/report",
    handle(async (req, res) => {
      const selected = selectedReport(req, res);
      if (!selected) {
        res
          .status(409)
          .json({ error: "Complete the assessment to view your report." });
        return;
      }
      res.json({
        localQa: isLocalQaCheckout(res.locals.audit.checkout_id),
        report: selected.report,
        frozenAnswers: selected.answers,
        runNumber: selected.number,
        activeRun: res.locals.audit.run_number,
        completedReports: res.locals.audit.reports.map(
          (r: { number: number }) => r.number,
        ),
        retakeAvailable: res.locals.audit.run_number === 1,
      });
    }),
  );
  router.get(
    "/:token/download/:kind",
    handle(async (req, res, { origin, store }) => {
      const selected = selectedReport(req, res);
      if (!selected) {
        res.status(409).json({ error: "Your report is not yet available." });
        return;
      }
      if (
        !["report", "work-session", "work-session-completed"].includes(
          req.params.kind,
        )
      ) {
        res.status(404).end();
        return;
      }
      const notes =
        req.params.kind === "work-session-completed"
          ? await store.workNotes(res.locals.auditHash, selected.number)
          : undefined;
      let companyLogo: Buffer | undefined;
      try {
        companyLogo =
          (await currentCompanyLogo(store, res.locals.auditHash, res.locals.audit.context.websiteUrl)) ?? undefined;
      } catch {}
      const pdf = await renderAuditPdf(
        selected.report,
        req.params.kind !== "report",
        origin,
        "LETTER",
        notes,
        companyLogo,
      );
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="marketing-clarity-${req.params.kind}-${selected.number}.pdf"`,
        "Content-Security-Policy":
          "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'",
      });
      res.send(pdf);
    }),
  );
  const errorHandler: express.ErrorRequestHandler = (
    _error,
    _req,
    res,
    _next,
  ) => {
    res.status(400).json({
      error: "Invalid audit request. Please check your input and retry.",
    });
  };
  router.use(errorHandler);
  return router;
}
