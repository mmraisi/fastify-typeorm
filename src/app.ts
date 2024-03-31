import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import { initializeDB } from "./database/data-srouce";

const start = async () => {
	await initializeDB();
};

export { start };
