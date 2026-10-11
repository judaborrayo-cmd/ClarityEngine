import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { pageMetadataHtml, publicPagePaths, pageHtmlFile } from "./shared/page-metadata";
import { privateAuditHtml } from './shared/marketing-clarity-audit/private-html';

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    {
      name: "strategy-sprint-metadata",
      enforce: "post",
      transformIndexHtml(html, context) {
        const result = pageMetadataHtml(html, context.path.split('?')[0]);
        return context.path.startsWith('/audit/') ? privateAuditHtml(result) : result;
      },
      generateBundle(_options, bundle) {
        const index = bundle["index.html"];
        if (!index || index.type !== "asset") {
          this.error("Strategy Sprint metadata requires the built index.html asset.");
        }
        this.emitFile({ type:'asset', fileName:'not-found.html',source:pageMetadataHtml(String(index.source),'/not-found') });
        this.emitFile({ type: 'asset', fileName: 'audit-private.html', source: privateAuditHtml(pageMetadataHtml(String(index.source), '/audit/start')) });
        for (const pathname of publicPagePaths.filter(p => p !== '/')) {
          this.emitFile({type:'asset',fileName:pageHtmlFile(pathname),source:pageMetadataHtml(String(index.source),pathname)});
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
