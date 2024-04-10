import { FastifyInstance } from "fastify";
import { DataSource } from "typeorm";
import {
  dataSourceOptions,
  testDataSourceOptions,
} from "../database/data-source";

export let db: DataSource;

export default async function plugin(fastify: FastifyInstance, opts: any) {
  try {
    db = new DataSource(
      process.env.NODE_ENV === "test" // for integration tests
        ? testDataSourceOptions
        : dataSourceOptions
    );

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
