const request = require("supertest");
const app = require("../index");
const db = require("../models");
const Message = db.message;

describe("Test post /messages route", () => {
  beforeAll(async () => {
    await Message.deleteMany({});
  });
  test("It should return 200 for valid message", () => {
    request(app)
      .post("/messages")
      .send({
        content: "Congrats!",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
  afterAll(async () => {
    await Message.deleteMany({});
  });
});
