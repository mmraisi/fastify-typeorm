import { beforeEach, describe, expect, it } from "vitest";
import { buildMockFastify, buildMockReply } from "../../../lib/mocks";
import { Users } from "../../../../src/database/entities/Users.entity";
import sinon from "sinon";
import { updateUser } from "../../../../src/routes/users/update";
import {
  buildApiErrorCode,
  CustomApiErrors,
} from "../../../../src/lib/error-handler";

describe("getUser API", () => {
  let fastify: any;
  let request: any;
  let reply: any;
  const user_id = "bf7a7668-7c11-4b3f-8719-739659097e05";

  beforeEach(() => {
    fastify = buildMockFastify();
    request = {
      user: {
        user_id,
      },
      body: {
        user_first_name: "John",
        user_last_name: "Smith",
      },
    };
    reply = buildMockReply();
  });

  it("should update user by user_id and return it if found", async () => {
    const mockUser = {
      user_id,
      user_email: "john@example.com",
      user_first_name: "John",
      user_last_name: "Doe",
      date_created: "2024-04-08T06:33:55.426Z",
      date_updated: "2024-04-08T06:33:55.426Z",
    };
    fastify.db.getRepository.withArgs(Users).returns({
      findOne: sinon.stub().resolves({ ...mockUser, ...request.body }),
      update: sinon.stub().resolves(),
    });

    await updateUser(request, reply, fastify);
    console.log(`Attempting to update user_id - ${user_id}`);

    sinon.assert.calledWith(
      fastify.log.info,
      `Attempting to update user_id - ${user_id}`
    );
    sinon.assert.calledWith(reply.code, 200);
    sinon.assert.calledWith(reply.header, "Content-Type", "application/json");
    expect(reply.send.firstCall.args[0].user_last_name).to.equal("Smith");
    sinon.assert.calledWith(reply.send, { ...mockUser, ...request.body });
  });

  it("should throw 404 error if user is not found", async () => {
    fastify.db.getRepository.withArgs(Users).returns({
      findOne: sinon.stub().resolves(undefined),
    });

    try {
      await updateUser(request as any, reply as any, fastify as any);
    } catch (error: any) {
      sinon.assert.calledWith(
        fastify.log.info,
        `Attempting to update user_id - ${user_id}`
      );

      expect(error.status).to.equal(404);
      expect(error.code).to.include(
        buildApiErrorCode("user", CustomApiErrors.ERR_NOT_FOUND)
      );
      expect(error.context).to.deep.equal({
        user_id,
      });
    }
  });
});
