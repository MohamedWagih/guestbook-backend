const request = require("supertest");
const app = require("../index");
const db = require("../models");
const generateJwtToken = require("../utils/generateJwtToken");
const hashPassword = require("../utils/hashPassword");
const Message = db.message;
const User = db.user;

describe("Test delete /messages route", () => {
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
      .delete(`/messages/${savedMessage._id}`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
      });
  });
  test("It should return 401 for invalid token", () => {
    request(app)
      .delete(`/messages/${savedMessage._id}`)
      .set("x-access-token", "token")
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });
  test("It should return 404 for not exist message", () => {
    request(app)
      .delete("/messages/62c06db2d01b603ea10f05b5")
      .set("x-access-token", token)
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });
  test("It should return 200 for successfully delete message", () => {
    request(app)
      .delete(`/messages/${savedMessage._id}`)
      .set("x-access-token", token)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
