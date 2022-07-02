const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./user.model");
db.message = require("./message.model");

db.mongoose = mongoose;

module.exports = db;
