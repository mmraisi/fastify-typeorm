import fastify from "fastify";
import { JWT } from "@fastify/jwt";
import { FastifyInstance } from "fastify";
import { DataSource } from "typeorm";

export interface IFastify extends FastifyInstance {
  db: DataSource;
  jwt: JWT;
}

export interface TFastifyRequest extends FastifyRequest {
  user: {
    user_id: string;
    user_email: string;
    aud: string;
    exp: string;
    iat: string;
  };
}
