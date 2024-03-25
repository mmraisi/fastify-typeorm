import { defineConfig } from "vitest/config";

export default defineConfig({
	root: ".",
	test: {
		coverage: {
			provider: "v8",
			exclude: ["src/database"],
			include: ["src"],
		},
		setupFiles: ["dotenv/config"],
	},
});
