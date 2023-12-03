const jwt = require("jsonwebtoken");
const signup = require("../models/signup");
exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const secretKey = "secretKey";
    const payload = jwt.verify(token, secretKey);
    const loggedInUserData = await signup.findOne({
      where: { id: payload.userId },
    });
    if (!loggedInUserData) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = loggedInUserData;
    next();
  } catch (error) {
    console.log("Authentication error:", error);
    return res.status(500).json({ message: "Error in the Authentication" });
  }
};
