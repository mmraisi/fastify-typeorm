import { test, describe, assert, afterEach } from "vitest";
import Problem from "api-problem";
import sinon from "sinon";
import { buildMockReply } from "../../lib/mocks";
import {
  buildApiErrorCode,
  errorHandler,
} from "../../../src/lib/error-handler";

afterEach(() => {
  sinon.reset();
});

describe("Error Handler Tests", () => {
  test("Handles Problem instance", async () => {
    const error = new Problem(404, "Not Found");
    const mockRequest = {
      log: {
        fatal(err: any, msg: string) {
          assert.deepStrictEqual(err, error);
          assert.equal(msg, error.message);
        },
        warn(err: any, msg: string) {
          assert.deepStrictEqual(err, error);
          assert.equal(msg, error.message);
        },
      },
    };

    // const mockFastify = buildMockFastify();
    const mockReply = buildMockReply();

    errorHandler(error, mockRequest as any, mockReply as any);

    sinon.assert.calledWith(mockReply.code, 404);
    sinon.assert.calledWith(mockReply.type, "application/json");
    sinon.assert.calledWith(mockReply.send, JSON.stringify(error));
  });

  test("Handles FastifyError instance", async () => {
    const error = {
      constructor: {
        name: "FastifyError",
      },
      message: "Error message",
    };

    const mockRequest = {
      log: {
        fatal(err: any, msg: string) {
          assert.deepStrictEqual(err, error);
          assert.equal(msg, error.message);
        },
        warn(err: any, msg: string) {
          assert.deepStrictEqual(err, error);
          assert.equal(msg, error.message);
        },
      },
    };
    const mockReply = buildMockReply();

    errorHandler(error, mockRequest as any, mockReply as any);

    sinon.assert.calledWith(mockReply.code, 500);
    sinon.assert.calledWith(mockReply.type, "application/json");
  });

  test("Handles SyntaxError instance", async () => {
    const error = new SyntaxError("Invalid JSON");

    const mockRequest = {
      log: {
        fatal(err: any, msg: string) {
          assert.deepStrictEqual(err, error);
          assert.equal(msg, error.message);
        },
        warn(err: any, msg: string) {
          assert.deepStrictEqual(err, error);
          assert.equal(msg, error.message);
        },
      },
    };
    const mockReply = buildMockReply();

    errorHandler(error, mockRequest as any, mockReply as any);

    sinon.assert.calledWith(mockReply.code, 400);
    sinon.assert.calledWith(mockReply.type, "application/json");
  });

  test("Handles openAPI schema error", async () => {
    const error = {
      message: "Schema validation failed",
      validation: "Validation details",
      validationContext: "Validation context",
    };

    const mockRequest = {
      log: {
        fatal(err: any, msg: string) {
          assert.deepStrictEqual(err, error);
          assert.equal(msg, error.message);
        },
        warn(err: any, msg: string) {
          assert.deepStrictEqual(err, error);
          assert.equal(msg, error.message);
        },
      },
    };
    const mockReply = buildMockReply();

    errorHandler(error, mockRequest as any, mockReply as any);

    sinon.assert.calledWith(mockReply.code, 400);
    sinon.assert.calledWith(mockReply.type, "application/json");
  });

  test("Handles Uncaught Error instance", async () => {
    const error = new Error("uncaught error");

    const mockRequest = {
      log: {
        fatal(err: any, msg: string) {
          assert.deepStrictEqual(err, error);
          assert.equal(msg, error.message);
        },
        warn(err: any, msg: string) {
          assert.deepStrictEqual(err, error);
          assert.equal(msg, error.message);
        },
        error(err: any, msg: string) {
          assert.deepStrictEqual(err, error);
          assert.equal(msg, error.message);
        },
      },
    };
    const mockReply = buildMockReply();

    errorHandler(error, mockRequest as any, mockReply as any);

    sinon.assert.calledWith(mockReply.code, 500);
    sinon.assert.calledWith(mockReply.type, "application/json");
  });

  test("Builds API error code correctly", async () => {
    const context = "USER";
    const error = "NOT_FOUND";

    const result = buildApiErrorCode(context, error);

    assert.equal(result, "USER.NOT_FOUND");
  });
});
