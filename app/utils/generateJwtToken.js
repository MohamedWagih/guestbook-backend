const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

const generateJwtToken = (payload) => jwt.sign(payload, authConfig.secret);

module.exports = generateJwtToken;
