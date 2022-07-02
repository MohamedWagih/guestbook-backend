const request = require("supertest");
const app = require("../index");
const db = require("../models");
const hashPassword = require("../utils/hashPassword");
const User = db.user;

describe("Test post /users/signin route", () => {
  beforeAll(async () => {
    await User.deleteMany({});
    const user = User({
      name: "wagih",
      email: "wagih@test.com",
      password: hashPassword("Wagih@test"),
    });
    await user.save();
  });
  afterAll(async () => {
    await User.deleteMany({});
  });

  test("It should return 404 for user not found", () => {
    request(app)
      .post("/users/signin")
      .send({
        email: "notExist@test.com",
        password: "abcd",
      })
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });
  test("It should return 401 for invalid password", () => {
    request(app)
      .post("/users/signin")
      .send({
        email: "wagih@test.com",
        password: "abcd",
      })
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });
  test("It should return 200 for correct email and password", () => {
    request(app)
      .post("/users/signin")
      .send({
        email: "wagih@test.com",
        password: "Wagih@test",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
