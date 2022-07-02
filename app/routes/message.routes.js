const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const { verifyToken } = require("../middleware/auth");

router.use(verifyToken);
router.post("/", messageController.add);

module.exports = router;
