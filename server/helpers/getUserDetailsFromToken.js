const jwt = require('jsonwebtoken');
const UserModel = require('../schemas/chatting/UserModel');
exports.getUserDetailsFromToken = async (token) => {
  if (!token) {
    return {
      messsage: 'session out',
      logout: true,
    };
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await UserModel.findById(decoded.id).select('-password');
  if (!user) {
    return {
      messsage: 'session out',
      logout: true,
    };
  }
  return user;
  //   const base64Url = token.split('.')[1];
  //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   const jsonPayload = decodeURIComponent(
  //     atob(base64)
  //       .split('')
  //       .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
  //       .join('')
  //   );
  //   return JSON.parse(jsonPayload);
  // Parse the JSON payload into an object
};
