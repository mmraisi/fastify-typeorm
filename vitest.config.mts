import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  test: {
    coverage: {
      provider: "v8",
      exclude: ["**/*/index.ts"],
      include: ["src/lib", "src/routes"],
    },
    setupFiles: ["dotenv/config"],
  },
});
