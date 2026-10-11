import express from "express";
import path from "node:path";
import { createAuditRouter } from "../server/audit/routes";
import {
  TestAuditStore,
  TestAuditPayment,
} from "../server/audit/test-fixtures";

// Isolated fixtures only: this server cannot create Stripe sessions or access production data.
const port = Number(process.env.AUDIT_PREVIEW_PORT ?? 4307);
const app = express();
app.use(
  "/api/audit",
  createAuditRouter({
    store: new TestAuditStore(),
    payment: new TestAuditPayment(),
    origin: `http://127.0.0.1:${port}`,
    tokenSecret: "isolated-e2e-token-secret-at-least-32-characters",
  }),
);
app.use("/audit", (_req, res, next) => {
  res.set("X-Robots-Tag", "noindex, nofollow");
  next();
});
app.use(express.static(path.resolve("dist")));
app.get("/audit/*", (_req, res) =>
  res.sendFile(path.resolve("dist/audit-private.html")),
);
app.get("*", (_req, res) => res.sendFile(path.resolve("dist/index.html")));
app.listen(port, "127.0.0.1", () => console.log(`Isolated assessment preview: http://127.0.0.1:${port}/marketing-clarity-audit`));
