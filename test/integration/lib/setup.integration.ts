import { beforeAll } from "vitest";
import { db } from "../../../src/plugins/typeorm";
import * as app from "../../../src/app";

beforeAll(async (ctx: any) => {
  ctx.db = db;
  ctx.app = app;
});
