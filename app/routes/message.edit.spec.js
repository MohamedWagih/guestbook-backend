const request = require("supertest");
const app = require("../index");
const db = require("../models");
const generateJwtToken = require("../utils/generateJwtToken");
const hashPassword = require("../utils/hashPassword");
const Message = db.message;
const User = db.user;

describe("Test patch /messages route", () => {
  let token;
  let savedMessage;
  beforeAll(async () => {
    await Message.deleteMany({});
    await User.deleteMany({});
    const user = new User({
      name: "Wagih",
      email: "wagih@test.com",
      password: hashPassword("Wagih@test"),
    });
    const savedUser = await user.save();
    token = generateJwtToken({ id: savedUser._id });
    const message = new Message({
      author: savedUser._id,
      content: "Congrats!",
    });
    savedMessage = await message.save();
  });
  afterAll(async () => {
    await Message.deleteMany({});
    await User.deleteMany({});
  });

  test("It should return 403 for no token", () => {
    request(app)
      .patch(`/messages/${savedMessage._id}`)
      .send({
        content: "Congrats!",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
      });
  });
  test("It should return 401 for invalid token", () => {
    request(app)
      .patch(`/messages/${savedMessage._id}`)
      .set("x-access-token", "token")
      .send({
        content: "Congrats!",
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });
  test("It should return 400 for empty message", () => {
    request(app)
      .patch(`/messages/${savedMessage._id}`)
      .set("x-access-token", token)
      .send({
        content: "",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
  test("It should return 200 for valid message update", () => {
    request(app)
      .patch(`/messages/${savedMessage._id}`)
      .set("x-access-token", token)
      .send({
        content: "edited congrats!",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
