const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");

router.post("/", messageController.add);

module.exports = router;
