import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import { db, initializeDB } from "./database/data-srouce";
import fastify, { FastifyInstance } from "fastify";
import { join } from "node:path";
import oas from "oas-fastify";
import autoload from "@fastify/autoload";
import { handler } from "./routes/index";
import { errorHandler } from "./lib/error-handler";

/*
	The openapi.json will be generated using make schema or & run commands
*/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import spec from "./openapi.json";

//workaround for fastify issue (https://github.com/ahmadnassri/node-oas-fastify/issues/17)
(spec as { $id?: string }).$id = "$";

const PORT = process.env.PORT ?? 4000;

export let server: FastifyInstance;

const start = async () => {
	// initialize db
	await initializeDB();

	// fastify default options
	const opts = {
		logger: true,
		server: {
			keepAliveTimeout: 5000,
			ignoreTrailingSlash: false,
		},
		// oas does not accept the oas "example" property without the following option
		ajv: {
			customOptions: {
				strict: false,
			},
		},
	};

	server = fastify({
		...opts,
	}).decorate("db", db);

	// add plugins
	server.register(autoload, {
		dir: join(__dirname, "plugins"),
		encapsulate: false,
		options: opts,
	});

	server.setErrorHandler(errorHandler);

	// Integrate oas-fastify
	server.register(oas, {
		spec,
		handler,
	});

	await server.listen({ port: PORT as number, host: "0.0.0.0" });
	console.log("app is listening on port:", PORT);

	return server;
};

export { start };
