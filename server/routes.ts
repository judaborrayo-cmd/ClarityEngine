import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/waitlist", async (req, res) => {
    try {
      const data = insertWaitlistSchema.parse(req.body);
      const entry = await storage.addToWaitlist(data);
      res.json({ success: true, id: entry.id });
    } catch (error) {
      res.status(400).json({ success: false, error: "Invalid data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
