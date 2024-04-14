import { FastifyInstance } from "fastify";
import { DataSource } from "typeorm";
import { generateDataSource } from "../database/data-source";

export let db: DataSource;

export default async function plugin(fastify: FastifyInstance, opts: any) {
  try {
    const dataSoruce = generateDataSource(opts);
    db = new DataSource(dataSoruce);

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
}
