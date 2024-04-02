import { start } from "./app";
import { db } from "./database/data-srouce";

(async () => {
	try {
		await start();
	} catch (error) {
		console.error(error);
		console.log(error instanceof Error);

		if (db?.isInitialized) {
			await db.destroy();
		}
		process.exit(1);
	}
})();
