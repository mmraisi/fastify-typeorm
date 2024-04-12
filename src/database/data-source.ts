import { DataSourceOptions } from "typeorm";

const dataSourceDefaultOpts: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST ?? "localhost",
  port: (process.env.POSTGRES_PORT ?? 5432) as number,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [__dirname + "/entities/**/*.entity{.ts,.js}"],
};

export const dataSourceOptions: DataSourceOptions = {
  ...dataSourceDefaultOpts,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
  subscribers: [],
  migrationsTableName: "migration_table",
};

export const testDataSourceOptions: DataSourceOptions = {
  ...dataSourceDefaultOpts,
  database: "test",
  synchronize: true,
  logging: true,
  dropSchema: true,
};
