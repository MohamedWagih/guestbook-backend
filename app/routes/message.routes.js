const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const { verifyToken } = require("../middleware/auth");

router.use(verifyToken);
router.post("/", messageController.add);
router.delete("/:messageId", messageController.delete);

module.exports = router;
