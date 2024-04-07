import { describe, it, afterEach, expect } from "vitest";
import sinon from "sinon";
import { FastifyRequest } from "fastify";
import { Users } from "../../../src/database/entities/Users.entity";
import { buildMockFastify, buildMockReply } from "../../lib/mocks";
import { hashPassword } from "../../../src/lib/auth";
import { login } from "../../../src/routes/login";
import {
  buildApiErrorCode,
  CustomApiErrors,
} from "../../../src/lib/error-handler";

describe("Login Route Tests", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Login with valid credentials", async () => {
    const request = {} as FastifyRequest;
    const reply = buildMockReply();
    const fastify = buildMockFastify();
    const logInfoStub = fastify.log.info as sinon.SinonStub;

    const userPayload = {
      user_email: "test@example.com",
      user_password: "password123",
    };
    request.body = userPayload;

    const hashedPassword = await hashPassword(userPayload.user_password ?? "");

    const mockUser = {
      user_id: 1,
      user_email: "test@example.com",
      user_password: hashedPassword,
    };

    fastify.db.getRepository.withArgs(Users).returns({
      findOne: sinon.stub().resolves(mockUser),
    });

    await login(request as any, reply as any, fastify as any);

    sinon.assert.calledWith(logInfoStub, "Attempting to log in");
    sinon.assert.calledWith(reply.code, 200);
    sinon.assert.calledWith(reply.header, "Content-Type", "application/json");
    sinon.assert.calledWith(reply.send, {
      user_id: 1,
      access_token: "access_token",
    });
  });

  it("Login with invalid credentials", async () => {
    const request = {} as FastifyRequest;
    const reply = buildMockReply();
    const fastify = buildMockFastify();
    const logInfoStub = fastify.log.info as sinon.SinonStub;

    const userPayload = {
      user_email: "test@example.com",
      user_password: "invalidPassword",
    };
    request.body = userPayload;

    const mockUser = {
      user_id: 1,
      user_email: "test@example.com",
      user_password:
        "$2b$10$0NpTNRV0JGgXtE0c7BqR1uWp4v0Kf7T4V3HY47dsgZvGtgf8eq9Ua",
    };

    fastify.db.getRepository.withArgs(Users).returns({
      findOne: sinon.stub().resolves(mockUser),
    });

    try {
      await login(request as any, reply as any, fastify as any);
    } catch (error: any) {
      expect(logInfoStub.calledOnceWith("Attempting to log in")).to.be.true;
      expect(error.status).to.equal(401);
      expect(error.code).to.include(
        buildApiErrorCode("user", CustomApiErrors.ERR_UNAUTHORIZED)
      );
      expect(error.context).to.deep.equal({
        user_email: userPayload.user_email,
      });
    }
  });

  it("Should throw an error for user not found", async () => {
    const request = {} as FastifyRequest;
    const reply = buildMockReply();
    const fastify = buildMockFastify();
    const logInfoStub = fastify.log.info as sinon.SinonStub;

    const userPayload = {
      user_email: "test@example.com",
      user_password: "invalidPassword",
    };
    request.body = userPayload;

    fastify.db.getRepository.withArgs(Users).returns({
      findOne: sinon.stub().resolves(undefined),
    });

    try {
      await login(request as any, reply as any, fastify as any);
    } catch (error: any) {
      expect(logInfoStub.calledOnceWith("Attempting to log in")).to.be.true;
      expect(error.status).to.equal(401);
      expect(error.code).to.include(
        buildApiErrorCode("user", CustomApiErrors.ERR_UNAUTHORIZED)
      );
      expect(error.context).to.deep.equal({
        user_email: userPayload.user_email,
      });
    }
  });
});
