const User = require("../models/userModel");

// Login user
const loginUser = async (req, res) => {
  res.json({ message: "Login user" });
};

// Signup user
const signupUser = async (req, res) => {
  res.json({ message: "Signup user" });
};

module.exports = {
  signupUser,
  loginUser,
};
