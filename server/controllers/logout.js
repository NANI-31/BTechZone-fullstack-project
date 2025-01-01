exports.logout = async (req, res) => {
  try {
    const cookieOptions = {
      http: true,
      secure: false,
    };

    res.cookie('token', '', cookieOptions).status(200).json({
      message: 'session out logout',
      success: true,
    });

    // res.clearCookie('userToken');
    // res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};
