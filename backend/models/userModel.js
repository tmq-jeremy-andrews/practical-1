const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Static signup method
userSchema.statics.signup = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw Error("All fields are required.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid.");
  }

  /**
   * Defaults to the following parameters:
   * - Minimum length of 8 characters
   * - Must have at least:
   *   - 1 lowercase letter
   *   - 1 uppercase letter
   *   - 1 number
   *   - 1 symbol
   *
   * See documentation on https://www.npmjs.com/package/validator
   * for more details
   */
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is too weak.");
  }

  // Check if the email is already in use
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use.");
  }

  // Generate and hash the password with salt
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
  });

  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw Error("All fields are required.");
  }

  // Fetch a user with a matching email
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid username/password");
  }

  // Check if hashed password matches
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid username/password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
