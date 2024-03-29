import { start } from "./app";

(async () => {
	try {
		await start();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();
