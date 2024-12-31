const { getUserDetailsFromToken } = require('../helpers/getUserDetailsFromToken');
exports.userDetails = async (req, res) => {
  try {
    const token = req.cookies.token || '';
    console.log(token);
    const user = await getUserDetailsFromToken(token);
    return res.status(200).json({
      message: 'user deatils',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};
