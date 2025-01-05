const teachersdetails = require('../schemas/teachers/teachersDetails');
const studentsdetails = require('../schemas/students/studentsDetails');

const jwt = require('jsonwebtoken');

exports.refreshToken = async (req, res) => {
	try {
		const cookies = req.cookies;
		if (!cookies) {
			return res.status(401).json({ message: 'No refresh token found' });
		}

		const refreshToken = cookies.jwt;
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

		const user = req.body.person === 'student' ? await studentsdetails.findOne({ refreshToken }) : await teachersdetails.findOne({ refreshToken });
		if (!user) {
			jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, async (err, decoded) => {
				if (err) {
					return res.status(401).json({ message: 'Invalid refresh token' });
				}
				console.log('attempted refresh token reuse!');
				const hackedUser = req.body.person === 'student' ? await studentsdetails.findOne({ username: decoded.username }) : await teachersdetails.findOne({ username: decoded.username });
				hackedUser.refreshToken = [];
				const result = await hackedUser.save();
				console.log(result);
			});
			return res.status(401).json({ message: 'Invalid refresh token' });
		}
		const newRefreshTokenArray = user.refreshToken.filter((rt) => rt !== refreshToken);

		jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, async (err, decoded) => {
			if (err) {
				console.log('expired refresh token');
				user.refreshToken = [...newRefreshTokenArray];
				const result = await user.save();
				console.log(result);
			}
			if (err || user.name !== decoded.username) return res.sendStatus(403);
			const person = req.body.person;
			const accessToken = jwt.sign(
				{
					UserInfo: {
						username: decoded.username,
						roles: decoded.roles,
					},
				},
				process.env.JWT_SECRET_KEY,
				{
					expiresIn: '1h',
				}
			);
			const newRefreshToken = jwt.sign({ username: user.name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
			user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
			const result = await user.save();

			res.cookie('jwt', newRefreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'None',
				maxAge: 24 * 60 * 60 * 1000,
			});
			console.log(result);
			res.json({ person, accessToken });
		});

		user.refreshToken = newRefreshTokenArray;
		const result = await user.save();
		const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
		res.cookie('userToken', accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'None',
			maxAge: 3600000, // 1 hour
		});

		res.status(200).json({ accessToken });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
