const UserModel = require('../schemas/chatting/UserModel');
exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const checkEmail = await UserModel.findOne({ email }).select('-password');
    if (!checkEmail) {
      return res.status(400).json({
        message: 'user not exist',
        data: checkEmail,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'email verify successfully',
      success: true,
      data: checkEmail,
    });
  } catch (error) {
    console.error(`authController: Failed to send verification email: ${error}`);
    res.status(500).json({ message: error.message, error: true });
  }
};
