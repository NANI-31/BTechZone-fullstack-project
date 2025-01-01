const bycrypt = require('bcrypt');
const UserModel = require('../schemas/chatting/UserModel');
const jwt = require('jsonwebtoken');
exports.checkPassword = async (req, res) => {
  try {
    const { password, userId } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: 'user not exist',
        error: true,
      });
    }
    const isPasswordMatch = await bycrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: 'please check password',
        error: true,
      });
    }
    const tokenData = { id: user._id, email: user.email };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY || 'secret', {
      expiresIn: '6h',
    });

    const cookieOptions = {
      // expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      http: true,
      secure: false,
    };

    return res.cookie('token', token, cookieOptions).status(200).json({
      message: 'login successfull',
      token: token,
      success: true,
    });
  } catch (error) {
    console.error(`authController: Failed to send verification email: ${error}`);
    res.status(500).json({ message: error.message, error: true });
  }
};
// Compare this snippet from server/schemas/chatting/UserModel.js:
