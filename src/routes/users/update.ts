import { FastifyReply } from "fastify";
import { IFastify, TFastifyRequest } from "../../../@types/fastify";
import { Users } from "../../database/entities/Users.entity";
import Problem from "api-problem";
import { buildApiErrorCode, CustomApiErrors } from "../../lib/error-handler";

export const updateUser = async (
  request: TFastifyRequest,
  reply: FastifyReply,
  fastify: IFastify
) => {
  const { log, db } = fastify;

  const { user_id } = request.user;

  const { body } = request as { body: Users };

  log.info(`Attempting to update user_id - ${user_id}`);

  const usersRepository = db.getRepository(Users);

  // check if the user does not exists
  const user = await usersRepository.findOne({
    where: {
      user_id,
    },
  });

  if (!user) {
    throw new Problem(404, {
      code: buildApiErrorCode("user", CustomApiErrors.ERR_NOT_FOUND),
      context: {
        user_id,
      },
    });
  }

  await usersRepository.update(user_id, {
    ...body,
  });

  const res = await usersRepository.findOne({
    where: { user_id },
  });

  return reply.code(200).header("Content-Type", "application/json").send(res);
};
