import sinon, { SinonStub } from "sinon";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import bcrypt from "bcryptjs";
import { hashPassword } from "../../../src/lib/auth";

describe("hashPassword function", () => {
  let genSaltStub: SinonStub;
  let hashStub: SinonStub;

  beforeEach(() => {
    // Create Sinon stubs for bcrypt functions
    genSaltStub = sinon.stub(bcrypt, "genSalt");
    hashStub = sinon.stub(bcrypt, "hash");
  });

  afterEach(() => {
    // Restore the original implementations after each test
    genSaltStub.restore();
    hashStub.restore();
  });

  it("should hash the password using bcrypt", async () => {
    const password = "testPassword";

    // Configure Sinon stubs to return expected values
    genSaltStub.resolves("mockedSalt");
    hashStub.resolves("mockedHash");

    const hashedPassword = await hashPassword(password);

    // Ensure bcrypt functions are called with correct arguments

    expect(genSaltStub.calledOnceWith(10)).to.be.true;
    expect(hashStub.calledOnceWith(password, "mockedSalt")).to.be.true;

    // Ensure the correct hashed password is returned
    expect(hashedPassword).to.equal("mockedHash");
  });

  it("should handle errors from bcrypt functions", async () => {
    const password = "testPassword";
    const expectedError = new Error("bcrypt error");

    // Configure genSalt to reject with an error
    genSaltStub.rejects(expectedError);

    // Ensure the function throws the expected error
    try {
      await hashPassword(password);
    } catch (error) {
      // Ensure the error matches the expected error
      expect(error).to.equal(expectedError);

      // Ensure hash function is not called when genSalt fails
      expect(hashStub.notCalled).to.be.true;
    }
  });
});
