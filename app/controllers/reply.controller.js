const db = require("../models");
const Reply = db.reply;
const Message = db.message;
const { replyAddSchema } = require("../schemas/reply.schema");

exports.add = async (req, res) => {
  // validate input
  const validation = replyAddSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .send({ error: true, message: validation.error.message });
  }

  // check if message exist
  const { messageId } = req.params;
  const { content } = req.body;
  const message = await Message.findById(messageId);
  if (!message) {
    return res.status(400).send({
      error: true,
      message: "Message doesn't exist!",
    });
  }

  // create reply
  const reply = new Reply({
    content,
    author: req.user.id,
  });
  const newReply = await reply.save();

  // add reply to message
  message.replies.push(newReply._id);
  await message.save();

  res.status(200).send({
    error: false,
    message: "Reply added successfully!",
    data: {
      id: newReply._id,
      content,
    },
  });
};
