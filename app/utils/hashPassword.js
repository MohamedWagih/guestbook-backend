const bcrypt = require("bcryptjs");

const hashPassword = (plainPassword) => bcrypt.hashSync(plainPassword, 8);

module.exports = hashPassword;
