// server/models/Teacher.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please fill a valid 10-digit mobile number"],
  },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  otpSecret: { type: String },
  otpExpires: { type: Date },
  // Fields for password reset functionality
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
});

// Pre-save hook to hash password before saving teacher
TeacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Teacher", TeacherSchema);
