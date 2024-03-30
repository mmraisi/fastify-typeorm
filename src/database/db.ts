import { Pool, QueryResult } from "pg";

export class DB {
	private pool: Pool;

	constructor() {
		const connectionString = this.createConnectionString();
		this.pool = new Pool({ connectionString });
	}

	private createConnectionString(): string {
		const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

		if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_NAME) {
			throw new Error("Missing environment variables for database connection.");
		}

		return `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`;
	}

	async disconnect(): Promise<void> {
		try {
			await this.pool.end();
			console.log("Disconnected from the database");
		} catch (error) {
			console.error("Error disconnecting from the database:", error);
			process.exit(1);
		}
	}

	async query(sql: string, params?: unknown[]): Promise<QueryResult> {
		const client = await this.pool.connect();
		try {
			const result = await client.query(sql, params);
			return result;
		} catch (error) {
			console.error("Error executing query:", error);
			throw error;
		} finally {
			client.release();
		}
	}
}
