const db = require("../models");
const Message = db.message;
const Reply = db.reply;
const { messageAddSchema } = require("../schemas/message.schema");

exports.getAll = async (req, res) => {
  const messages = await Message.find()
    .select(["author", "content", "date", "replies"])
    .populate("author", ["name", "email"])
    .populate({
      path: "replies",
      select: ["content", "author"],
      populate: { path: "author", select: ["name", "email"] },
    });

  res.status(200).send({ error: false, data: { messages } });
};

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
    author: req.user.id,
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

exports.edit = async (req, res) => {
  //validate message
  const validation = messageAddSchema.validate(req.body);
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

  // check if current user is the author
  if (message.author.toString() !== req.user.id) {
    return res.status(401).send({
      error: true,
      message: "You are not authorized to edit this message!",
    });
  }

  // edit message
  const newMessage = await Message.findByIdAndUpdate(
    messageId,
    {
      $set: {
        content,
      },
    },
    { new: true }
  );

  res.status(200).send({
    error: false,
    message: "Message edited successfully!",
    data: { id: newMessage._id, date: newMessage.date, content },
  });
};

exports.delete = async (req, res) => {
  const { messageId } = req.params;

  const message = await Message.findById(messageId);
  if (!message) {
    return res.status(400).send({
      error: true,
      message: "Message doesn't exist!",
    });
  }

  if (message.author.toString() !== req.user.id) {
    return res.status(401).send({
      error: true,
      message: "You are not authorized to delete this message!",
    });
  }

  const deletedMessage = await Message.findByIdAndDelete(messageId);

  for (let idx = 0; idx < deletedMessage.replies.length; idx++) {
    const replyId = deletedMessage.replies[idx];
    await Reply.findByIdAndDelete(replyId);
  }
  res.status(200).send({
    error: false,
    message: "Message deleted successfully!",
  });
};
