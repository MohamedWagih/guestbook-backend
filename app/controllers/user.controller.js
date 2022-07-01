const db = require("../models");
const User = db.user;
const { userSignUpSchema } = require("../schemas/user.schema");

exports.signup = async (req, res) => {
  // Validate input
  const validation = userSignUpSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .send({ error: true, message: validation.error.message });
  }

  // Check if user exist
  const { name, email, password } = req.body;
  const userExist = Boolean(await User.findOne({ email }));
  if (userExist) {
    return res.status(409).send({
      error: true,
      message: "This email already exist!",
    });
  }

  // create user
  const user = new User({ name, email, password });
  user.save((error, user) => {
    if (error) {
      return res.status(500).send({ error: false, message: error });
    }
    res.status(200).send({
      error: false,
      message: "User created successfully",
      data: { name, email },
    });
  });
};
