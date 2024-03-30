import fs from "fs";
import path from "node:path";
import { db } from "../app";

export async function updateDB(): Promise<void> {
	const schemaDir = path.join(__dirname, "schema");
	const files = fs.readdirSync(schemaDir);

	for (const file of files) {
		const filePath = path.join(schemaDir, file);
		if (fs.statSync(filePath).isFile() && path.extname(filePath) === ".sql") {
			const sql = fs.readFileSync(filePath, "utf-8");
			await db.query(sql);
		}
	}
	console.log("Database updated successfully");
}
