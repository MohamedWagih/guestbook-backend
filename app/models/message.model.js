const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  content: String,
  date: {
    type: Date,
    default: Date.now(),
  },
  replies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Reply",
    },
  ],
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
