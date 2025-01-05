// exports.logout = async (req, res) => {
//   try {
//     const cookieOptions = {
//       http: true,
//       secure: false,
//     };

//     res.cookie('token', '', cookieOptions).status(200).json({
//       message: 'session out logout',
//       success: true,
//     });

//     // res.clearCookie('userToken');
//     // res.json({ message: 'Logout successful' });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       error: true,
//     });
//   }
// };
const teachersdetails = require('../schemas/teachers/teachersDetails');
const studentsdetails = require('../schemas/students/studentsDetails');

exports.logout = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204); //No content
	const refreshToken = cookies.jwt;
	const user = req.body.person === 'student' ? await studentsdetails.findOne({ refreshToken }) : await teachersdetails.findOne({ refreshToken });
	// const user = await teachersdetails.findOne({ refreshToken });

	if (!user) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
		return res.sendStatus(204);
	}

	// Delete refreshToken in db
	// user.refreshToken = '';
	user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
	const result = await user.save();
	console.log(result);

	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
	res.sendStatus(204);
};
