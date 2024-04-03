import { JWT } from "@fastify/jwt";
import { FastifyInstance } from "fastify";
import { DataSource } from "typeorm";

export interface IFastify extends FastifyInstance {
  db: DataSource;
  jwt: JWT;
}
