const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const {
  userSignUpSchema,
  userSignInSchema,
} = require("../schemas/user.schema");
const generateJwtToken = require("../utils/generateJwtToken");
const hashPassword = require("../utils/hashPassword");

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
  const hashedPassword = hashPassword(password);
  const user = new User({ name, email, password: hashedPassword });
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

exports.signin = async (req, res) => {
  // validate input
  const validation = userSignInSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .send({ error: true, message: validation.error.message });
  }

  // Check if user doesn't exist
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({
      error: true,
      message: "User Not Found!",
    });
  }

  // validate password
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({
      error: true,
      message: "Invalid Password!",
    });
  }

  // generate token
  const token = generateJwtToken({ id: user._id });

  res
    .set({ "x-auth-token": token })
    .status(200)
    .send({
      error: false,
      message: "User login successful",
      data: {
        id: user._id,
        name: user.name,
        email,
      },
    });
};
