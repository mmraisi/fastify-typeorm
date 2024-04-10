import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      exclude: ["**/*/index.ts"],
      include: ["src/lib", "src/routes"],
    },
    setupFiles: [
      "dotenv/config",
      "./test/integration/lib/setup.integration.ts",
    ],
  },
});
