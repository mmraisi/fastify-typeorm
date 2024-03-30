import dotenv from "dotenv";
dotenv.config();

import { DB } from "./database/db";
import { updateDB } from "./database/update";
import { populateDB } from "./database/populate";

let db: DB;

const start = async () => {
	db = new DB();

	await updateDB(); // update db with schemas
	await populateDB(); // populate db with data
};

export { start, db };
