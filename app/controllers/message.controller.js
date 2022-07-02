const db = require("../models");
const Message = db.message;
const { messageAddSchema } = require("../schemas/message.schema");

exports.add = async (req, res) => {
  //validate message
  const validation = messageAddSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .send({ error: true, message: validation.error.message });
  }

  // add new message
  const { content } = req.body;
  const message = new Message({
    content,
    replies: [],
  });
  const newMessage = await message.save();

  res.status(200).send({
    error: false,
    message: "Message added successfully!",
    data: {
      id: newMessage._id,
      date: newMessage.date,
      content,
    },
  });
};
