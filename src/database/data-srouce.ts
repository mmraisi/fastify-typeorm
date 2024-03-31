import { DataSource } from "typeorm";

let db: DataSource;

const initializeDB = async () => {
	const method = "initializeDB";

	try {
		db = new DataSource({
			type: "postgres",
			host: process.env.DB_HOST ?? "localhost",
			port: (process.env.DB_PORT ?? 5432) as number,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			synchronize: false,
			logging: true,
			entities: [__dirname + "/entities/**/*.entity{.ts,.js}"],
			migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
			subscribers: [],
			migrationsTableName: "migration_table",
		});
		await db.initialize();
		console.log("connect to db successfully");

		// run migration files
		await db.runMigrations();
		console.log("migration completed successfully");
	} catch (error) {
		console.log(`error while executing method: ${method}`, (error as Error)?.message ?? error);
		throw error;
	}
};
export { db, initializeDB };
