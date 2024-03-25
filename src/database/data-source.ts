import { DataSource } from "typeorm";
import { User } from "./entity/User";

let db: DataSource;

const initializeDB = async () => {
	const method = "initializeDB";
	try {
		db = new DataSource({
			type: "postgres",
			host: process.env.DATABASE_HOST,
			port: (process.env.DATABASE_PORT ?? 5432) as number,
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
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
