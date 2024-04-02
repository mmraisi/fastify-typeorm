import { DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
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
};
