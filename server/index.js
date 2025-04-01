require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");

const authRoutes = require("./routes/auth");
const teacherAuthRoutes = require("./routes/teacherAuth");
const verifyToken = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(csurf({ cookie: true }));

// Endpoint to retrieve CSRF token
app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherAuthRoutes);

app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ message: "Form tampered with." });
  }
  res.status(500).json({ message: "Internal server error." });
});

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
