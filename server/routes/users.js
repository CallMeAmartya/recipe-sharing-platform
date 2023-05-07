const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// @route POST api/users/register
// @desc Register a new user
// @access Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: [{ message: "User already exists!" }] });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    res.status(201).json({ message: "User registered succesfully" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal Server Error");
  }
});

// @route POST /api/users/login
// @desc login a user
// @access Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if credentials correct
    const user = await User.findOne({ email });
    if (!user) {
      console.error("Came when trying to find user with email");
      return res
        .status(401)
        .json({ error: [{ message: "Invalid credentials" }] });
    }

    // Hash password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Came when trying to match password");
      return res
        .status(401)
        .json({ error: [{ message: "Invalid credentials" }] });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
