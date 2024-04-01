import { start } from "./app";
import { db } from "./database/data-srouce";

(async () => {
	try {
		await start();
	} catch (error) {
		console.error(error);
		if (db) {
			await db.destroy();
		}
		process.exit(1);
	}
})();
