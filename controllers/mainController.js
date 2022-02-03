const User = require("../models/user");
const jwt = require("jsonwebtoken");

const tokenAge = 60 * 5;
const generateToken = (id) => {
  return jwt.sign({ id }, "super secret phrase", { expiresIn: tokenAge });
};

exports.postRegister = async (req, res) => {
  const { email, password } = req.body; // destruction?

  try {
    const user = await User.create({ email, password });
    const token = generateToken(user._id);
    res.cookie("userToken", token, { httpOnly: true });
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }

  res.send("registration");
};
