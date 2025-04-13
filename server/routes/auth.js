// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET;
const OTP_VALIDITY = 5 * 60 * 1000; // 5 minutes

// In-memory token blacklist for demonstration (not production-ready).
const tokenBlacklist = [];

// Configure nodemailer transporter (example uses Gmail; secure credentials in .env)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Utility: Generate an OTP using speakeasy.
function generateOTP() {
  return speakeasy.totp({
    secret: crypto.randomBytes(20).toString("hex"),
    encoding: "hex",
    step: 300, // OTP expires in 5 minutes
  });
}

// Common function to handle signup logic.
async function handleSignup(req, res, role) {
  try {
    const { name, email, password, mobile } = req.body;
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if a user with the given email exists.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    // Hash the password.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP and set its expiration.
    const otp = generateOTP();
    const otpExpires = Date.now() + OTP_VALIDITY;

    // Create the new user.
    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      role, // 'student' or 'teacher'
      otp,
      otpExpires,
    });

    await newUser.save();

    // Send OTP via email.
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Verification Code",
      text: `Hello ${name},\n\nYour OTP code is ${otp}. It expires in 5 minutes.\n\nThank you!`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({
      message: `Registered as ${role}. An OTP has been sent to your email.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error during signup." });
  }
}

// STUDENT signup endpoint.
router.post("/signup/student", async (req, res) => {
  await handleSignup(req, res, "student");
});

// TEACHER signup endpoint.
router.post("/signup/teacher", async (req, res) => {
  await handleSignup(req, res, "teacher");
});

// OTP verification endpoint.
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email." });

    // Validate OTP and check expiry.
    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    // Invalidate OTP after successful verification.
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: "OTP verified successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during OTP verification." });
  }
});

// Login endpoint.
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ error: "Email and password are required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials." });

    // Enforce OTP verification if OTP still exists.
    if (user.otp)
      return res
        .status(400)
        .json({ error: "Please verify your OTP before logging in." });

    // Validate password.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials." });

    // Create a JWT token valid for 1 hour.
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during login." });
  }
});

// Logout endpoint.
router.post("/logout", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(400).json({ error: "No token provided." });
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(400).json({ error: "Invalid token format." });

    // Add token to blacklist.
    tokenBlacklist.push(token);
    res.json({ message: "Logged out successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during logout." });
  }
});

// Middleware to verify token and check against blacklist for protected routes.
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided." });
  const token = authHeader.split(" ")[1];
  if (tokenBlacklist.includes(token)) {
    return res.status(401).json({ error: "This token has been logged out." });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token." });
    req.user = decoded;
    next();
  });
}

// GET endpoint to fetch user details after login.
router.get("/me", verifyToken, async (req, res) => {
  try {
    // Fetch the user by id and exclude sensitive fields.
    const user = await User.findById(req.user.id).select(
      "-password -otp -resetToken -resetTokenExpires"
    );
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error retrieving user details." });
  }
});

// Password reset request endpoint.
router.post("/password-reset-request", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found." });

    // Generate a secure reset token.
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    // Construct the reset URL (CLIENT_URL should point to your frontend reset page).
    const resetUrl = `${process.env.CLIENT_URL}/password-reset/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Hi ${user.name},\n\nTo reset your password, please click the link below:\n${resetUrl}\n\nThis link is valid for 15 minutes.\n\nThank you!`,
    });

    res.json({ message: "Password reset email sent." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing password reset request." });
  }
});

// Password reset endpoint.
router.post("/password-reset", async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const user = await User.findOne({
      resetToken,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ error: "Invalid or expired reset token." });

    // Hash the new password and update the user record.
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error resetting password." });
  }
});

module.exports = router;
