import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "newt239",
    compatibilityDate: "2026-09-01",
    workersDev: true,
    previewUrls: true,
    assets: {
      htmlHandling: "auto-trailing-slash",
      notFoundHandling: "404-page",
    },
    domains: ["newt239.dev"],
  },
});
