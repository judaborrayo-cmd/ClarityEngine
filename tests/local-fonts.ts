import { test as base, expect, type BrowserContext } from "@playwright/test";
import { readFileSync } from "node:fs";
// Use the project's installed Inter assets so visual QA doesn't wait on Google.
// This changes the test harness only; the application's font setup is untouched.
const css = [400, 500, 600, 700, 800].map(weight => {
  const bytes = readFileSync(new URL(`../node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff2`, import.meta.url));
  return `@font-face{font-family:Inter;font-style:normal;font-weight:${weight};font-display:swap;src:url(data:font/woff2;base64,${bytes.toString("base64")}) format('woff2');}`;
}).join("\n");
export async function useLocalFonts(context: BrowserContext) {
  await context.route("https://fonts.googleapis.com/**", route => route.fulfill({ contentType: "text/css", body: css }));
}
export const test = base.extend({
  context: async ({ context }, use) => { await useLocalFonts(context); await use(context); },
});
export { expect };
