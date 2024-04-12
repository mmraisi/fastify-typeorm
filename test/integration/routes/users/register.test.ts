import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { faker } from "@faker-js/faker";
import { Users } from "../../../../src/database/entities/Users.entity";
import { start } from "../../../../src/app";

faker.seed(Math.floor(1_000_000_000 * Math.random()));

describe("register new user", () => {
  console.log(process.env.NODE_ENV);

  it("201: should successfully register a new user", async () => {
    console.log(process.env.NODE_ENV);

    const server = await start();
    const new_user: Partial<Users> = {
      user_email: `${faker.lorem.word(10)}@example.com`,
      user_first_name: faker.lorem.word(10),
      user_last_name: faker.lorem.word(10),
      user_password: faker.lorem.word(10),
    };
    const response = await server.inject({
      method: "PUT",
      url: "/tasks",
      headers: {
        authorization: "Bearer __token__",
      },
      body: new_user,
    });
    assert.deepStrictEqual(response.statusCode, 201);

    const body = await response.json();

    assert.deepStrictEqual(body.user_email, new_user?.user_email);
    assert.deepStrictEqual(body.user_first_name, new_user?.user_first_name);

    await server.close();

    // check if the user created in the db

    // const userRepo = db.getRepository(Users);
    // const record = await userRepo.findOne({
    //   where: {
    //     user_email: new_user.user_email,
    //   },
    // });

    // assert.deepStrictEqual(record?.user_id, body?.user_id);
  });
});
