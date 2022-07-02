const jwt = require("jsonwebtoken");

const generateJwtToken = (payload) => jwt.sign(payload, authConfig.secret);

module.exports = generateJwtToken;
