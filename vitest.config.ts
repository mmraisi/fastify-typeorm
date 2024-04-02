import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  test: {
    coverage: {
      provider: "v8",
      exclude: ["**/*/data", "**/*/schema", "**/*/index.ts"],
      include: ["src/routes"],
    },
    setupFiles: ["dotenv/config"],
  },
});
