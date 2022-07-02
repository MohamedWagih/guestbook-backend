const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  content: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Message = mongoose.model("Reply", replySchema);

module.exports = Message;
