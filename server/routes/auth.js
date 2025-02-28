// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// POST /api/auth/register
router.post(
  "/register",
  [
    check("name").notEmpty().withMessage("Name is required."),
    check("email").isEmail().withMessage("Please provide a valid email."),
    check("mobile")
      .matches(/^\d{10}$/)
      .withMessage("Please provide a valid 10-digit mobile number."),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: errors.array() });
    }

    const { name, email, mobile, password } = req.body;

    try {
      // Check if a user with the same email already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ message: "User with this email already exists." });
      }

      // Create new user (password will be hashed via the pre-save hook)
      user = new User({ name, email, mobile, password });
      await user.save();

      // Create a JWT token for the new user (expires in 1 hour)
      const payload = { userId: user._id, email: user.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({
        message: "User registered successfully.",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// POST /api/auth/login
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Please provide a valid email."),
    check("password").notEmpty().withMessage("Password is required."),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials." });
      }

      // Compare the entered password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials." });
      }

      // Generate a JWT token for the authenticated user
      const payload = { userId: user._id, email: user.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Login successful.",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
