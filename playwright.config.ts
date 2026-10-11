import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 90000,
  fullyParallel: false,
  workers: 1,
  use: { baseURL: "http://127.0.0.1:4307", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
  ],
  webServer: {
    command: "npx tsx tests/audit-server.ts",
    port: 4307,
    reuseExistingServer: false,
  },
});
