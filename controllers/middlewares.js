const jwt = require('jsonwebtoken');
const User = require("../model/User");

// Middleware to verify JWT token and extract user ID
exports.authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(token);
    if (!token) {
      return res.status(401).json({
          message: 'Authorization token is missing',
      });
  }
  const tokenValue = token.split(" ")[1];

  try {
      const decoded = jwt.verify(tokenValue,'vanshika');
      req.user = decoded.user;
      next();
  }
  catch (error) {
      return res.status(401).json({
          success: false,
          message: 'Invalid token',
      });
  }
};
