const bcrypt = require("bcryptjs");
const request = require("supertest");
const app = require("../index");
const db = require("../models");
const User = db.user;

describe("Test post /users/signup route", () => {
  beforeAll(async () => {
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

  afterAll(async () => {
    await User.deleteMany({});
  });
});

describe("Test post /users/signin route", () => {
  beforeAll(async () => {
    await User.deleteMany({});
    const user = User({
      name: "wagih",
      email: "wagih@test.com",
      password: bcrypt.hashSync("Wagih@test", 8),
    });
    await user.save();
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
  afterAll(async () => {
    await User.deleteMany({});
  });
});
