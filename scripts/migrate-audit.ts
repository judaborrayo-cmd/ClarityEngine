import { readFile } from "node:fs/promises";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

if (!process.env.DATABASE_URL)
  throw new Error("Set DATABASE_URL before running the audit migration.");
neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const connection = await pool.connect();
try {
  await connection.query("BEGIN");
  try {
    for (const filename of [
      "0001_marketing_audit.sql",
      "0002_marketing_audit_retake.sql",
      "0003_marketing_audit_work_notes.sql",
      "0004_marketing_audit_checklist.sql",
      "0005_marketing_audit_company_logo.sql",
    ]) {
      await connection.query(
        await readFile(
          new URL(`../migrations/${filename}`, import.meta.url),
          "utf8",
        ),
      );
    }
    await connection.query("COMMIT");
  } catch (error) {
    await connection.query("ROLLBACK");
    throw error;
  }
  console.log("Marketing audit migration applied.");
} finally {
  connection.release();
  await pool.end();
}
