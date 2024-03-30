import { db, start } from "./app";

(async () => {
	try {
		await start();
	} catch (error) {
		console.error(error);
		if (db) {
			await db.disconnect();
		}
		process.exit(1);
	}
})();
