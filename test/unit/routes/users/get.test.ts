import { beforeEach, describe, expect, it } from "vitest";
import { buildMockFastify, buildMockReply } from "../../../lib/mocks";
import { Users } from "../../../../src/database/entities/Users.entity";
import sinon from "sinon";
import { getUser } from "../../../../src/routes/get";
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
    };
    reply = buildMockReply();
  });

  it("should fetch user by user_id and return it if found", async () => {
    const mockUser = {
      user_id,
      user_email: "john@example.com",
      user_first_name: "John",
      user_last_name: "Doe",
      date_created: "2024-04-08T06:33:55.426Z",
      date_updated: "2024-04-08T06:33:55.426Z",
    };
    fastify.db.getRepository.withArgs(Users).returns({
      findOne: sinon.stub().resolves(mockUser),
    });

    await getUser(request, reply, fastify);
    console.log(`Attempting to fetch user_id - ${user_id}`);

    sinon.assert.calledWith(
      fastify.log.info,
      `Attempting to fetch user_id - ${user_id}`
    );
    sinon.assert.calledWith(reply.code, 200);
    sinon.assert.calledWith(reply.header, "Content-Type", "application/json");
    sinon.assert.calledWith(reply.send, mockUser);
  });

  it("should throw 404 error if user is not found", async () => {
    fastify.db.getRepository.withArgs(Users).returns({
      findOne: sinon.stub().resolves(undefined),
    });

    try {
      await getUser(request as any, reply as any, fastify as any);
    } catch (error: any) {
      sinon.assert.calledWith(
        fastify.log.info,
        `Attempting to fetch user_id - ${user_id}`
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
