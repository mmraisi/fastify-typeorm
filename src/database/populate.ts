import path from "node:path";
import fs from "fs";
import { db } from "../app";

export async function populateDB(): Promise<void> {
	const schemaDir = path.join(__dirname, "data");
	const files = fs.readdirSync(schemaDir);

	for (const file of files) {
		const filePath = path.join(schemaDir, file);
		if (fs.statSync(filePath).isFile() && path.extname(filePath) === ".sql") {
			const sql = fs.readFileSync(filePath, "utf-8");
			await db.query(sql);
		}
	}
	console.log("Database populated successfully");
}
