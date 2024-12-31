const UserModel = require('../schemas/chatting/UserModel');
const bycrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, profile_pic } = req.body;
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return res.json({
        message: 'email already exists',
        error: true,
      });
    }

    const salt = await bycrypt.genSalt(10);

    const hashedPassword = await bycrypt.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashedPassword,
      profile_pic,
    };
    const user = new UserModel(payload);
    const userSave = await user.save();
    res.status(200).json({
      message: 'User created successfully',
      data: userSave,
      success: true,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: error.message, error: true });
  }
};
