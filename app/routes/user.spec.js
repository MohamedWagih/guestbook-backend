const request = require("supertest");
const app = require("../index");
const db = require("../models");
const User = db.user;

describe("Test post /users route", () => {
  test("It should return 400 for invalid email", async () => {
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

  test("It should return 400 for weak password", async () => {
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

  test("It should return 400 for very long name", async () => {
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

  test("It should return 200 for add correct user", async () => {
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

  test("It should return 409 for already existing user", async () => {
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

  //   afterAll(async () => {
  //     await User.deleteMany({});
  //   });
});
