import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { strategySprintHtml } from "./shared/strategy-sprint-metadata";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    {
      name: "strategy-sprint-metadata",
      enforce: "post",
      transformIndexHtml(html, context) {
        return strategySprintHtml(html, context.path.split("?")[0]);
      },
      generateBundle(_options, bundle) {
        const index = bundle["index.html"];
        if (!index || index.type !== "asset") {
          this.error("Strategy Sprint metadata requires the built index.html asset.");
        }
        for (const [pathname, fileName] of [
          ["/checkout/strategy-sprint", "strategy-sprint.html"],
          ["/checkout/strategy-sprint/thank-you", "strategy-sprint-thank-you.html"],
        ]) {
          this.emitFile({
            type: "asset",
            fileName,
            source: strategySprintHtml(String(index.source), pathname),
          });
        }
      },
    },
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
