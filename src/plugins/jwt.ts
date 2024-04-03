import jwt from "@fastify/jwt";

export default async function plugin(fastify: any, opts: any) {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET,
  });
}
