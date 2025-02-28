// middleware/auth.js
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // Expecting the token in the Authorization header as: Bearer <token>
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token and attach decoded payload to request object
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
}

module.exports = verifyToken;
