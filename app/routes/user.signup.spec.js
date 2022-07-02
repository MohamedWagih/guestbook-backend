const request = require("supertest");
const app = require("../index");
const db = require("../models");
const hashPassword = require("../utils/hashPassword");
const User = db.user;

describe("Test post /users/signup route", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });
  afterAll(async () => {
    await User.deleteMany({});
  });
  test("It should return 400 for invalid email", () => {
    request(app)
      .post("/users/signup")
      .send({
        name: "Mohamed Wagih",
        email: "wagih@test",
        password: "ABCD@abc",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("It should return 400 for weak password", () => {
    request(app)
      .post("/users/signup")
      .send({
        name: "Mohamed Wagih",
        email: "wagih@test.com",
        password: "abc",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("It should return 400 for very long name", () => {
    request(app)
      .post("/users/signup")
      .send({
        name: "Mooooooooooooooooooooooooo Waaaaaaaaaaaaaaaaaaaaaag",
        email: "wagih@test.com",
        password: "ABCD@abc",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("It should return 200 for add correct user", () => {
    request(app)
      .post("/users/signup")
      .send({
        name: "Mohamed Wagih",
        email: "wagih@test.com",
        password: "ABCD@abc",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("It should return 409 for already existing user", () => {
    request(app)
      .post("/users/signup")
      .send({
        name: "Mohamed Wagih",
        email: "wagih@test.com",
        password: "ABCD@abc",
      })
      .then((response) => {
        expect(response.statusCode).toBe(409);
      });
  });
});
