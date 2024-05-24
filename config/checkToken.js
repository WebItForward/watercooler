const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async function (req, res, next) {
  const token = req.get("Authorization")?.replace("Bearer ", "");
  console.log("Token received:", token); // Log the token received
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      console.log("Token decoded:", decoded); // Log the decoded token
      req.user = await User.findById(decoded.user._id);
      if (!req.user) {
        console.log("User not found");
        return res.status(401).json({ message: "Unauthorized" });
      }
      console.log("User found:", req.user); // Log the user found
    } catch (err) {
      console.log("Token verification failed:", err);
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    console.log("No token provided");
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
