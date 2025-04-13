// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], required: true },
  otp: String, // Temporarily store OTP
  otpExpires: Date, // OTP expiration timestamp
  resetToken: String, // Token used for password reset
  resetTokenExpires: Date,
});

module.exports = mongoose.model("User", userSchema);
