import { DataSource } from "typeorm";
import { User } from "./entity/User";

let db: DataSource;

const initializeDB = async () => {
	const method = "initializeDB";
	try {
		db = new DataSource({
			type: "postgres",
			host: process.env.POSTGRES_HOST ?? "localhost",
			port: (process.env.POSTGRES_PORT ?? 5432) as number,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_HOST,
			synchronize: true,
			logging: false,
			entities: [User],
			migrations: [],
			subscribers: [],
		});
		await db.initialize();

		console.log("connect to db successfully");
	} catch (error) {
		console.log(`error while executing method: ${method}`, (error as Error)?.message ?? error);
	}
};
export { db, initializeDB };
