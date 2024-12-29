const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.userAuthMiddleware = (req, res, next) => {
  const token = req.cookies.userToken;
  console.log(token);
  if (!token) {
    console.log('No token');
    return res.status(401).json({ message: 'Not authenticated' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    console.log('decoded');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log('Invalid token');
    res.status(401).json({ message: 'Invalid token' });
  }
};
