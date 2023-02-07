const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Controller
const { signupUser, loginUser } = require("../controllers/userController");

// Login
router.post("/login", loginUser);

// Signup
router.post("/signup", signupUser);

// Require auth for routes after this line
router.use(requireAuth);

module.exports = router;
