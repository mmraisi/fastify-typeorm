import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { initializeDB } from "./utils/orm/data-source";

const start = async () => {
	await initializeDB();
};

export { start };
