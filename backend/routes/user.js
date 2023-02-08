const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Controller
const {
  signupUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/signup", signupUser);

// Require auth for routes after this line
router.use(requireAuth);

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
