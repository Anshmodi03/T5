// server/routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const { authenticator } = require("otplib");
const crypto = require("crypto");

// Automatically detect SMTP configuration based on the email domain
function getSMTPConfig(email) {
  const domain = email.split("@")[1].toLowerCase();
  switch (domain) {
    case "gmail.com":
      return { host: "smtp.gmail.com", port: 587, secure: false };
    case "outlook.com":
    case "hotmail.com":
    case "live.com":
      return { host: "smtp.office365.com", port: 587, secure: false };
    case "yahoo.com":
      return { host: "smtp.mail.yahoo.com", port: 587, secure: false };
    case "icloud.com":
    case "me.com":
      return { host: "smtp.mail.me.com", port: 587, secure: false };
    default:
      throw new Error(`Unsupported email provider for domain: ${domain}`);
  }
}

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const smtpOptions = getSMTPConfig(emailUser);

const transporter = nodemailer.createTransport({
  ...smtpOptions,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

// Configure authenticator options: OTP valid for 10 minutes (600 seconds)
// The 'window' option allows for a 1-step clock drift.
authenticator.options = { step: 600, window: 1 };

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

      // Generate OTP using authenticator and a unique secret
      const otpSecret = authenticator.generateSecret();
      const otp = authenticator.generate(otpSecret);

      // Save OTP details to user (OTP expires in 10 minutes)
      user.otpSecret = otpSecret;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      // Send OTP email
      const mailOptions = {
        from: emailUser,
        to: user.email,
        subject: "Your OTP Verification Code",
        text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending OTP email:", error);
        } else {
          console.log("OTP email sent:", info.response);
        }
      });

      // Respond without generating a JWT token yet – require OTP verification
      res.status(201).json({
        message:
          "User registered successfully. An OTP has been sent to your email. Please verify your account.",
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

// POST /api/auth/verify-otp
router.post(
  "/verify-otp",
  [
    check("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email."),
    check("otp").trim().notEmpty().withMessage("OTP is required."),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: errors.array() });
    }

    // Destructure and trim the inputs
    const { email, otp } = req.body;
    const trimmedEmail = email.trim();
    const trimmedOtp = otp.trim();

    try {
      const user = await User.findOne({ email: trimmedEmail });
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }

      if (user.isVerified) {
        return res.status(400).json({ message: "User is already verified." });
      }

      if (!user.otpSecret || !user.otpExpires) {
        return res
          .status(400)
          .json({ message: "OTP not generated. Please request a new OTP." });
      }

      if (new Date() > user.otpExpires) {
        return res
          .status(400)
          .json({ message: "OTP has expired. Please request a new OTP." });
      }

      // Verify OTP using authenticator
      const isValid = authenticator.check(trimmedOtp, user.otpSecret);
      if (!isValid) {
        return res.status(400).json({ message: "Invalid OTP." });
      }

      // Mark user as verified and clear OTP fields
      user.isVerified = true;
      user.otpSecret = undefined;
      user.otpExpires = undefined;
      await user.save();

      // Generate a JWT token upon successful OTP verification
      const payload = { userId: user._id, email: user.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "OTP verified successfully. Your account is now verified.",
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

      // Check if the user is verified
      if (!user.isVerified) {
        return res
          .status(400)
          .json({ message: "Email not verified. Please verify your account." });
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

// POST /api/auth/request-password-reset
router.post(
  "/request-password-reset",
  [check("email").isEmail().withMessage("Please provide a valid email.")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: errors.array() });
    }
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "No account with that email address exists." });
      }

      // Generate a reset token (a random hex string)
      const resetToken = crypto.randomBytes(20).toString("hex");

      // Set reset token and expiration (valid for 10 minutes)
      user.passwordResetToken = resetToken;
      user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      // Send password reset email
      const resetUrl = `http://yourfrontendapp.com/reset-password?token=${resetToken}&email=${encodeURIComponent(
        email
      )}`;
      const mailOptions = {
        from: emailUser,
        to: user.email,
        subject: "Password Reset Request",
        text:
          `You are receiving this because you (or someone else) requested to reset your account password.\n\n` +
          `Please click on the following link, or paste it into your browser to complete the process within 10 minutes:\n\n` +
          `${resetUrl}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending password reset email:", error);
          return res.status(500).json({ message: "Error sending email." });
        } else {
          console.log("Password reset email sent:", info.response);
          res.status(200).json({
            message:
              "A password reset link has been sent to your email address.",
          });
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// POST /api/auth/reset-password
router.post(
  "/reset-password",
  [
    check("email").isEmail().withMessage("Please provide a valid email."),
    check("token").notEmpty().withMessage("Reset token is required."),
    check("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: errors.array() });
    }
    const { email, token, newPassword } = req.body;

    try {
      const user = await User.findOne({
        email,
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid or expired password reset token." });
      }

      // Update the password (it will be hashed via the pre-save hook)
      user.password = newPassword;
      // Clear reset token fields
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      res.status(200).json({
        message:
          "Password has been reset successfully. You can now log in with your new password.",
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// NEW: Logout endpoint for users
router.post("/logout", (req, res) => {
  // For JWT, logout is handled on the client by discarding the token.
  // If you store the token in cookies, you could clear the cookie here.
  res.status(200).json({ message: "Logout successful." });
});

module.exports = router;
