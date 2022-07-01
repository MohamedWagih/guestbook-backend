const express = require("express");
const router = express.Router();

const signupRoute = require("./signup");

router.use("/signup", signupRoute);

module.exports = router;
