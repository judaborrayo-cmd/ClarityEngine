import {integrationStaging} from "./integration-staging";
import { cleanPurchaseAttribution } from './purchase-attribution';
import { HubSpotPurchases } from './hubspot-purchases';
import { signMetaCompletion, verifyMetaCompletion, sendMetaCompletion, signMetaPurchase, verifyMetaPurchase, sendMetaPurchase } from './meta-conversions';
import {assessmentModel,isV2Version,currentAssessmentVersion} from "../../shared/marketing-clarity-audit/versioning";
import {isSetupAnswered} from "../../shared/marketing-clarity-audit/v2-next/customer-sequence";
import { Pool } from "@neondatabase/serverless";
import { VersionedAuditStore } from "./versioned-store";
import {
  versions as v2Versions,
  assessmentQuestions as v2Questions,
  requiredSetupFields,
} from "../../shared/marketing-clarity-audit/v2/questionnaire";
import {
  validateAnswers as validateV2Answers,
  draftSchema as v2Draft,
} from "../../shared/marketing-clarity-audit/v2/engine";
import { isV2Report } from "../../shared/marketing-clarity-audit/v2/customer-report";
import { renderPreviewPdf } from "./v2-pdf";
import {
  discoverCompanyLogo,
  validatedCachedCompanyLogo,
} from "./company-logo";
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
  crm?: Pick<HubSpotPurchases, "sync">;
  discoverLogo?: (website: string) => Promise<Buffer | null>;
}
function customerReport(report: unknown) {
  if (!isV2Report(report)) return report;
  return {
    ...report,
    recommendations: report.recommendations.map(
      ({ selectionReason, evidenceIds, preserveQuestionIds, ...move }) => move,
    ),
  };
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
    if (process.env.HUBSPOT_PURCHASE_SYNC_ENABLED === "true" && !process.env.HUBSPOT_SERVICE_KEY) throw new Error("HubSpot configuration unavailable");
    configured = {
      store:
        process.env.AUDIT_V2_PREVIEW === "true"
          ? (() => {
              if (
                process.env.VERCEL_ENV !== "preview" &&
                process.env.NODE_ENV !== "development"
              )
                throw new Error("V2 is preview only");
              if (
                !STRIPE_SECRET_KEY.startsWith("sk_test_") &&
                !STRIPE_SECRET_KEY.startsWith("rk_test_")
              )
                throw new Error("Preview requires Stripe test mode");
              if (
                !new URL(DATABASE_URL).searchParams
                  .get("options")
                  ?.includes("search_path=clarity_audit_v2_staging")
              )
                throw new Error("Preview requires isolated staging schema");
              return new VersionedAuditStore(
                DATABASE_URL,
                new Pool({ connectionString: DATABASE_URL }),
                process.env.AUDIT_V2_NEW_PURCHASES === "true"
                  ? currentAssessmentVersion
                  : "1.0.0",
              );
            })()
          : process.env.AUDIT_VERSIONED_ENABLED === "true"
            ? new VersionedAuditStore(
                DATABASE_URL,
                new Pool({ connectionString: DATABASE_URL }),
                process.env.AUDIT_V2_NEW_PURCHASES === "true"
                  ? currentAssessmentVersion
                  : "1.0.0",
              )
            : new PostgresAuditStore(DATABASE_URL),
      payment: new StripeAuditPayment(
        STRIPE_SECRET_KEY,
        MARKETING_AUDIT_STRIPE_PRICE_ID,
        STRIPE_WEBHOOK_SECRET,
      ),
      origin: new URL(AUDIT_APP_ORIGIN).origin,
      tokenSecret: AUDIT_TOKEN_SECRET,
      ...(process.env.HUBSPOT_PURCHASE_SYNC_ENABLED === "true" && process.env.HUBSPOT_SERVICE_KEY ? { crm: new HubSpotPurchases(process.env.HUBSPOT_SERVICE_KEY) } : {}),
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
        const { payment, store, crm } = getDependencies();
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
        if (event.checkoutId && ((await payment.isPaid(event.checkoutId)) || (await payment.deepDiveReceipt?.(event.checkoutId)))) {
          await store.paymentEvent(event.id, event.checkoutId);
          if (store instanceof VersionedAuditStore && payment.receipt) {
            const row = await store.verify(event.checkoutId),
              receipt = await payment.receipt(event.checkoutId);
            if (row && receipt)
              await store.purchaseReceipt(
                row.id,
                receipt.amount,
                receipt.currency,
              );
          }
        }
        if (crm && event.checkoutId && event.paidAt) {
          if (!payment.crmPurchase || !store.crmPurchaseOnce) throw new Error('CRM sync is not configured');
          const purchase = await payment.crmPurchase(event.checkoutId, event.paidAt);
          if (purchase?.attributionReference && /^ce_attr_[A-Za-z0-9_-]{20,100}$/.test(purchase.attributionReference)) {
            if (!store.readAttribution) throw new Error('Attribution store unavailable');
            purchase.attribution=await store.readAttribution(purchase.attributionReference);
          }
          if (purchase) await store.crmPurchaseOnce(purchase.checkoutId, tokenHash(purchase.email), async () => { await crm.sync(purchase); });
        }
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
  router.post('/purchase-attribution', handle(async(req,res,{store})=>{
    const fields=cleanPurchaseAttribution(req.body);
    if(!fields) {res.json({reference:null});return;}
    if(!store.saveAttribution) throw new Error('Attribution store unavailable');
    const reference='ce_attr_'+opaqueToken();
    await store.saveAttribution(reference,fields);
    res.json({reference});
  }));
  router.get(
    "/preview-status",
    handle(async (_req, res, { store }) => {
      res.json({
        enabled:
          store instanceof VersionedAuditStore &&
          isV2Version(store.newVersion),
        testMode: process.env.AUDIT_V2_PREVIEW === "true",
      });
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
      const fields=cleanPurchaseAttribution(req.body?.attribution);
      let reference:string|undefined;
      if(fields) {
        if(!store.saveAttribution) throw new Error('Attribution store unavailable');
        reference='ce_attr_'+opaqueToken(); await store.saveAttribution(reference,fields);
      }
      const checkout = await payment.checkout(origin, tokenHash(claim), reference, store instanceof VersionedAuditStore ? store.newVersion : "1.0.0");
      res.locals.auditStage = "pending_audit_save";
      await store.initiate(
        checkout.id,
        tokenHash(claim),
        tokenHash(resumeToken(claim, checkout.id, tokenSecret)),
      );
      if (store instanceof VersionedAuditStore && req.body?.attribution?.consent === true) {
        const attribution = z
          .object({
            consent: z.literal(true),
            utm_source: z.string().max(100).optional(),
            utm_medium: z.string().max(100).optional(),
            utm_campaign: z.string().max(100).optional(),
          })
          .strict()
          .optional()
          .parse(req.body?.attribution);
        if (attribution)
          await store.saveCheckoutAttribution(
            checkout.id,
            Object.fromEntries(
              Object.entries(attribution).filter(([k]) => k !== "consent"),
            ) as Record<string, string>,
          );
      }
      res.locals.auditStage = "checkout_ready";
      res.json({ url: checkout.url });
    }),
  );
  router.post('/meta-purchase', handle(async (req,res,{store,tokenSecret}) => {
    const input = z.object({proof:z.string().max(2000),consent:z.literal(true),fbp:z.string().regex(/^fb\.[012]\.\d{10,16}\.[A-Za-z0-9_-]{1,200}$/),fbc:z.string().regex(/^fb\.[012]\.\d{10,16}\.[A-Za-z0-9_-]{1,500}$/).optional()}).strict().parse(req.body);
    const proof = verifyMetaPurchase(input.proof, tokenSecret);
    if (!proof) { res.status(403).json({error:'Verified purchase required'}); return; }
    const token = process.env.META_CONVERSIONS_API_TOKEN;
    if (!token || !store.metaPurchaseOnce) { res.status(503).json({error:'Conversion delivery unavailable'}); return; }
    const agent = req.get('user-agent')?.slice(0,1000);
    if (!agent) { res.status(400).json({error:'Browser information required'}); return; }
    await store.metaPurchaseOnce(proof.id, () => sendMetaPurchase(proof,{fbp:input.fbp,fbc:input.fbc,agent},token));
    res.json({received:true});
  }));  router.post('/meta-completion', handle(async (req,res,{store,tokenSecret}) => {
    const input = z.object({proof:z.string().max(2000),consent:z.literal(true),fbp:z.string().regex(/^fb\.[012]\.\d{10,16}\.[A-Za-z0-9_-]{1,200}$/),fbc:z.string().regex(/^fb\.[012]\.\d{10,16}\.[A-Za-z0-9_-]{1,500}$/).optional()}).strict().parse(req.body);
    const proof = verifyMetaCompletion(input.proof, tokenSecret);
    if (!proof) { res.status(403).json({error:'Verified completion required'}); return; }
    const token = process.env.META_CONVERSIONS_API_TOKEN;
    if (!token || !store.metaPurchaseOnce) { res.status(503).json({error:'Conversion delivery unavailable'}); return; }
    const agent = req.get('user-agent')?.slice(0,1000);
    if (!agent) { res.status(400).json({error:'Browser information required'}); return; }
    await store.metaPurchaseOnce(proof.id, () => sendMetaCompletion(proof,{fbp:input.fbp,fbc:input.fbc,agent},token));
    res.json({received:true});
  }));
  router.post(
    "/deep-dive-receipt",
    handle(async (req, res, { payment, tokenSecret }) => {
      const { checkoutId } = z.object({ checkoutId: z.string().regex(/^cs_live_[A-Za-z0-9_]+$/).max(200) }).strict().parse(req.body);
      const receipt = await payment.deepDiveReceipt?.(checkoutId);
      if (!receipt) { res.status(403).json({ error: "Payment not verified" }); return; }
      const verified = { transaction_id: `ce_${tokenHash(checkoutId)}`, currency: "USD", value: receipt.value, items: [{ item_id: "deep-dive-growth-audit", item_name: "Deep Dive Growth Audit", price: receipt.value, quantity: 1 }] };
      res.json({ ...verified, meta_proof: signMetaPurchase(verified, tokenSecret) });
    }),
  );
  router.post(
    "/sprint-receipt",
    handle(async (req, res, { payment, tokenSecret }) => {
      const { checkoutId } = z.object({ checkoutId: z.string().regex(/^cs_live_[A-Za-z0-9_]+$/).max(200) }).strict().parse(req.body);
      const receipt = await payment.sprintReceipt?.(checkoutId);
      if (!receipt) { res.status(403).json({ error: "Payment not verified" }); return; }
      const verified = { transaction_id: `ce_${tokenHash(checkoutId)}`, currency: "USD", value: receipt.value, items: [{ item_id: "strategy-sprint", item_name: "30-Day Growth Strategy Sprint", price: receipt.value, quantity: 1 }] };
      res.json({ ...verified, meta_proof: signMetaPurchase(verified, tokenSecret) });
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
      const paidReceipt = claim && payment.assessmentReceipt ? await payment.assessmentReceipt(checkoutId, tokenHash(claim)) : null;
      if (!claim || (payment.assessmentReceipt ? !paidReceipt : !(await payment.isPaid(checkoutId, tokenHash(claim))))) {
        res.status(403).json({
          error:
            "Purchase is not yet verified in this browser. Retry after payment confirmation.",
        });
        return;
      }
      const token = resumeToken(claim, checkoutId, tokenSecret);
      // Recover after a paid checkout whose initial database creation failed.
      await store.initiate(
        checkoutId,
        tokenHash(claim),
        tokenHash(token),
        payment.receipt
          ? ((await payment.receipt(checkoutId, tokenHash(claim)))?.version ??
              "1.0.0")
          : undefined,
      );
      const row = await store.verify(checkoutId, tokenHash(claim));
      if (!row || (isLocalQaCheckout(row.checkout_id) && !localQaEnabled())) {
        res
          .status(403)
          .json({ error: "Purchase ownership could not be verified" });
        return;
      }
      if (store instanceof VersionedAuditStore && payment.receipt) {
        const receipt = await payment.receipt(checkoutId, tokenHash(claim));
        if (receipt)
          await store.purchaseReceipt(row.id, receipt.amount, receipt.currency);
      }
      const receipt = (checkoutId.startsWith("cs_live_") || (integrationStaging() && checkoutId.startsWith("cs_test_"))) ? { transaction_id: `ce_${tokenHash(checkoutId)}`, currency: "USD", value: paidReceipt?.value ?? 27, items: [{ item_id: "clarity-assessment", item_name: "Get Clarity Assessment", price: paidReceipt?.value ?? 27, quantity: 1 }] } : null;
      res.json({ token, receipt: receipt ? { ...receipt, meta_proof: signMetaPurchase(receipt, tokenSecret) } : null });

    }),
  );
  router.use("/:token", async (req, res, next) => {
    try {
      const token = req.params.token;
      if (integrationStaging() && process.env.AUDIT_REVOKED_TEST_TOKEN_HASH === tokenHash(token)) {res.status(404).json({error:"Test assessment retired"});return;}
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
    "/:token/purchase-delivery",
    handle(async (_req, res) => {
      const row = res.locals.audit;
      const { store } = getDependencies();
      if (!store.metaPurchaseDelivered) { res.status(503).json({error: "Delivery status unavailable"}); return; }
      res.setHeader("Cache-Control", "no-store");
      res.json({metaAccepted: await store.metaPurchaseDelivered(`ce_${tokenHash(row.checkout_id)}`)});
    }),
  );
  router.get(
    "/:token",
    handle(async (_req, res) => {
      const row = res.locals.audit;
      res.json({
        localQa: isLocalQaCheckout(row.checkout_id),
        version: row.content_version ?? "1.0.0",
        setup: row.setup ?? {},
        context: row.context,
        answers: row.answers,
        completed: Boolean(row.report),
        runNumber: row.run_number,
        completedReports: row.reports.map((r: { number: number }) => r.number),
        savedAt: row.saved_at,
        progress:
          isV2Version(row.content_version)
            ? {
                answered:
                  Object.keys(row.answers).length +
                  requiredSetupFields.filter((f) => isSetupAnswered(row.setup[f])).length,
                total: 46,
              }
            : assessmentProgress(row.answers),
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
      if (["purchase_success", "diagnostic_complete"].includes(event)) {
        res.json({ recorded: false, serverOwned: true });
        return;
      }
      if (questionId) {
        try {
          if (isV2Version(res.locals.audit.content_version)) {
            if (
              !(assessmentModel(res.locals.audit.content_version).questions as (s:any)=>ReturnType<typeof v2Questions>)(res.locals.audit.setup).some(
                (q) => q.id === questionId,
              )
            )
              throw new Error("Invalid event question");
          } else validateAnswers({ [questionId]: "A" });
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
      const context = (isV2Version(res.locals.audit.content_version)?assessmentModel(res.locals.audit.content_version).contextSchema:customerContextSchema).parse(req.body);
      if (!(await store.saveContext(res.locals.auditHash, context as any))) {
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
    "/:token/setup",
    handle(async (req, res, { store }) => {
      const input = z
        .object({
          field: z.enum([...requiredSetupFields, "trendContext"]),
          value: z.union([z.string().max(1200),z.array(z.string().max(80)).max(10)]),
        })
        .strict()
        .parse(req.body);
      if (
        !(store instanceof VersionedAuditStore) ||
        !(await store.saveSetup(res.locals.auditHash, input.field, input.value))
      ) {
        res.status(409).json({ error: "This context cannot be changed." });
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
          answer: z.enum(["A", "B", "C", "D", "E", "F"]),
        })
        .strict()
        .parse(req.body);
      try {
        if (isV2Version(res.locals.audit.content_version)) {
          const q = (assessmentModel(res.locals.audit.content_version).questions as (s:any)=>ReturnType<typeof v2Questions>)(res.locals.audit.setup).find(
            (q) => q.id === input.questionId,
          );
          if (!q?.options.some((o) => o.value === input.answer))
            throw new Error("Invalid answer");
        } else validateAnswers({ [input.questionId]: input.answer });
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
      if (isV2Version(res.locals.audit.content_version)) {
        res.json({ saved: true });
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
    handle(async (_req, res, { store, tokenSecret }) => {
      try {
        if (isV2Version(res.locals.audit.content_version))
          (assessmentModel(res.locals.audit.content_version).validate as (s:any,a:any,c:boolean)=>unknown)(
            res.locals.audit.setup,
            res.locals.audit.answers,
            true,
          );
        else validateAnswers(res.locals.audit.answers, true);
        (isV2Version(res.locals.audit.content_version)?assessmentModel(res.locals.audit.content_version).contextSchema:customerContextSchema).parse(res.locals.audit.context);
      } catch {
        res.status(400).json({
          error:
            "Complete all questions and required details before generating your report.",
        });
        return;
      }
      const report = await store.complete(res.locals.auditHash);
      const completionId = `ce_${tokenHash(`${res.locals.audit.id}:${res.locals.audit.run_number}:assessment_complete`)}`;
      res.json({ report: customerReport(report), completionId, completionProof: signMetaCompletion(completionId,tokenSecret) });
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
        !(
          isV2Report(selected.report)
            ? selected.report.workSession.map((_: string, i: number) => ({
                id: `work-${i + 1}`,
              }))
            : workPrompts(selected.report)
        ).some((p: { id: string }) => p.id === req.params.entryId)
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
  async function currentCompanyLogo(
    store: AuditStore,
    hash: string,
    website: string,
  ) {
    if (!store.companyLogo || !store.saveCompanyLogo) return null;
    const cached = await store.companyLogo(hash);
    const verified = cached?.png
      ? await validatedCachedCompanyLogo(cached.png, website)
      : null;
    if (
      cached &&
      Date.now() - cached.checkedAt.getTime() <= 86400000 &&
      (!cached.png || verified)
    )
      return verified;
    const jobKey = `${hash}:${website}`;
    let job = logoJobs.get(jobKey);
    if (!job && logoJobs.size < 4) {
      job = (dependencies?.discoverLogo ?? discoverCompanyLogo)(website)
        .then(async (logo) => {
          await store.saveCompanyLogo!(hash, website, logo);
          return logo;
        })
        .finally(() => logoJobs.delete(jobKey));
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
        report: customerReport(selected.report),
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
          (await currentCompanyLogo(
            store,
            res.locals.auditHash,
            res.locals.audit.context.websiteUrl,
          )) ?? undefined;
      } catch {}
      const pdf = isV2Report(selected.report)
        ? await renderPreviewPdf(selected.report, notes)
        : await renderAuditPdf(
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
