import { beforeEach, describe, expect, it, afterEach } from "vitest";
import sinon from "sinon";
import { FastifyRequest, FastifyReply } from "fastify";
import { register } from "../../../src/routes/register";
import { Users } from "../../../src/database/entities/Users.entity";
import { buildMockFastify, buildMockReply } from "../../lib/mocks";
import {
  buildApiErrorCode,
  CustomApiErrors,
} from "../../../src/lib/error-handler";

describe("register function", () => {
  let request: FastifyRequest;
  let reply: any;
  let fastify: any;
  let logInfoStub: sinon.SinonStub;

  beforeEach(() => {
    request = {} as FastifyRequest;
    reply = buildMockReply();
    fastify = buildMockFastify();
    logInfoStub = fastify.log.info as sinon.SinonStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should successfully register a new user", async () => {
    const newUser: Partial<Users> = {
      user_email: "test@example.com",
      user_password: "hashedPassword",
      user_first_name: "John",
      user_last_name: "Doe",
    };

    request.body = newUser;

    const usersRepositoryInsertStub = sinon.stub().resolves({});

    fastify.db.getRepository = sinon.stub().returns({
      findOne: sinon.stub().resolves(null),
      create: sinon.stub().returns(newUser),
      insert: usersRepositoryInsertStub,
    });

    await register(request, reply as FastifyReply, fastify);

    expect(logInfoStub.calledOnce).to.be.true;
    expect(reply.code.calledOnceWith(201)).to.be.true;
    expect(reply.header.calledOnceWith("Content-Type", "application/json")).to
      .be.true;
    expect(reply.send.calledOnce).to.be.true;
    expect(usersRepositoryInsertStub.calledOnceWith(newUser)).to.be.true;
  });

  it("should return 409 Conflict if user already exists", async () => {
    const existingUser: Partial<Users> = {
      user_email: "test@example.com",
      user_password: "hashedPassword",
      user_first_name: "John",
      user_last_name: "Doe",
    };

    request.body = existingUser;
    fastify.db.getRepository = sinon.stub().returns({
      findOne: sinon.stub().resolves(existingUser),
    });

    try {
      await register(request, reply as FastifyReply, fastify);
    } catch (error: any) {
      expect(error.status).to.equal(409);
      expect(error.code).to.include(
        buildApiErrorCode("email", CustomApiErrors.ERR_ALREADY_EXISTS)
      );
      expect(error.context).to.deep.equal({ email: existingUser.user_email });
    }
  });
});
