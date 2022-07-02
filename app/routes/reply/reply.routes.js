const express = require("express");
const router = express.Router();
const replyController = require("../../controllers/reply.controller");
const { verifyToken } = require("../../middleware/auth");

router.use(verifyToken);
router.post("/:messageId", replyController.add);

module.exports = router;
