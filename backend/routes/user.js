const express = require("express");
const router = express.Router();

// Controller
const { signupUser, loginUser } = require("../controllers/userController");

// Login
router.post("/login", loginUser);

// Signup
router.post("/signup", signupUser);

module.exports = router;
