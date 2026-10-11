import express from "express";
import { createAuditRouter } from "../server/audit/routes";

const app = express();
app.use("/api/audit", createAuditRouter());
export default app;
