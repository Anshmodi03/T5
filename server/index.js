// index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");

const authRoutes = require("./routes/auth");
const verifyToken = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON and handle CORS
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Logging HTTP requests
app.use(morgan("combined"));

// Rate Limiting to protect against brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// CSRF Protection middleware (stores token in a cookie)
app.use(csurf({ cookie: true }));

// Endpoint to retrieve CSRF token
app.get("/api/csrf-token", (req, res) => {
  // Generate a token and return it in JSON format
  res.json({ csrfToken: req.csrfToken() });
});

// Mount the authentication routes
app.use("/api/auth", authRoutes);

// Example protected route
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Global error handling middleware for logging and safe error responses
app.use((err, req, res, next) => {
  // Log error details for audit purposes
  console.error(err.stack);

  // Handle CSRF errors specifically
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ message: "Form tampered with." });
  }

  res.status(500).json({ message: "Internal server error." });
});

// Connect to MongoDB then start the server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
