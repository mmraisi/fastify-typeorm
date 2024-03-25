import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { assert, describe, it } from "vitest";
import { start } from "../src";

describe("Start Function", () => {
	it("should start the application without errors", async () => {
		await start();
		assert(true, "Application started successfully");
	});
});
