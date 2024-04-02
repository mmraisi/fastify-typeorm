import { FastifyInstance } from "fastify";
import { DataSource } from "typeorm";
import { dataSourceOptions } from "../database/data-source";

const typeormPlugin = async (fastify: FastifyInstance, opts: any) => {
	try {
		const db = new DataSource(dataSourceOptions);

		await db.initialize();
		console.log("Connected to the database successfully");

		await db.runMigrations();
		console.log("Migrations completed successfully");

		// Decorate fastify with the TypeORM DataSource instance
		fastify.decorate("db", db);
	} catch (error) {
		console.error("Error connecting to the database:", error);
		throw error;
	}
};

export default async function plugin(fastify: FastifyInstance, opts: any) {
	fastify.register(typeormPlugin);
}
