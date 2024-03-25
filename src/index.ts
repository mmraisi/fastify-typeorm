import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { initializeDB } from "./database/data-source";

const start = async () => {
	await initializeDB();
};
start();

export { start };
