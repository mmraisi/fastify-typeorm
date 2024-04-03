import { FastifyRequest, FastifyReply } from "fastify";
import { IFastify } from "../../@types/fastify-input";
import { Users } from "../database/entities/Users.entity";

export const register = (
  request: FastifyRequest,
  reply: FastifyReply,
  fastify: IFastify
) => {
  const { log, jwt } = fastify;

  console.log(jwt);

  log.info("Attempting to register a new user");

  const body = request.body as Users;

  console.log(body);

  // const usersRepository = db.getRepository("users");

  // const newUser = usersRepository.create({
  //   user_email: body.user_email,
  //   user_password: body.user_password,
  //   user_first_name: body.user_first_name,
  //   user_last_name: body.user_last_name,
  // });

  const token = jwt.sign(
    { user_id: 1 },
    {
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
    }
  );

  return reply.code(201).header("Content-Type", "application/json").send({
    token,
  });
};
