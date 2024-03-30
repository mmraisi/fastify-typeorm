import { defineConfig } from "vitest/config";

export default defineConfig({
	root: ".",
	test: {
		coverage: {
			provider: "v8",
			exclude: ["**/*/data", "**/*/schema"],
			include: ["src"],
		},
		setupFiles: ["dotenv/config"],
	},
});
