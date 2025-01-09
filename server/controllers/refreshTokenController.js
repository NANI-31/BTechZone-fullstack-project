const teachersdetails = require('../schemas/teachers/teachersDetails');
const studentsdetails = require('../schemas/students/studentsDetails');
const { generateAccessToken, generateRefreshToken } = require('../helpers/jwtHelper');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// exports.refreshToken = async (req, res) => {
// 	try {
// 		console.log('refresh token api called');
// 		const cookies = req.cookies;
// 		if (!cookies) {
// 			console.log('No refresh token found');
// 			return res.status(401).json({ message: 'No refresh token found' });
// 		}

// 		const refreshToken = cookies.jwt;
// 		console.log('refreshToken from the cokkies: ', refreshToken);
// 		res.clearCookie('jwt', { httpOnly: true, sameSite: 'Strict', secure: false });

// 		const user = req.body.person === 'student' ? await studentsdetails.findOne({ refreshToken }) : await teachersdetails.findOne({ refreshToken });
// 		if (!user) {
// 			jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, async (err, decoded) => {
// 				if (err) {
// 					return res.status(401).json({ message: 'Invalid refresh token' });
// 				}
// 				console.log('attempted refresh token reuse!');
// 				const hackedUser = req.body.person === 'student' ? await studentsdetails.findOne({ username: decoded.username }) : await teachersdetails.findOne({ username: decoded.username });
// 				hackedUser.refreshToken = [];
// 				const result = await hackedUser.save();
// 				console.log(result);
// 			});
// 			return res.status(401).json({ message: 'Invalid refresh token' });
// 		}
// 		// const newRefreshTokenArray = user.refreshToken.filter((rt) => rt !== refreshToken);

// 		jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, async (err, decoded) => {
// 			if (err) {
// 				console.log('expired refresh token');
// 				// user.refreshToken = [...newRefreshTokenArray];
// 				// const result = await user.save();
// 				console.log(result);
// 			}
// 			if (err || user.name !== decoded.username) return res.sendStatus(403);
// 			const person = req.body.person;
// 			const accessToken = jwt.sign(
// 				{
// 					UserInfo: {
// 						username: decoded.username,
// 						person: decoded.person,
// 					},
// 				},
// 				process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
// 				{
// 					expiresIn: '5s',
// 				}
// 			);
// 			const newRefreshToken = jwt.sign({ username: user.name }, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' });
// 			// Saving refreshToken with current user
// 			user.refreshToken = newRefreshToken;
// 			const result = await user.save();
// 			// Creates Secure Cookie with refresh token
// 			res.cookie('jwt', newRefreshToken, {
// 				httpOnly: true,
// 				secure: false,
// 				sameSite: 'Strict',
// 				maxAge: 24 * 60 * 60 * 1000,
// 			});
// 			console.log('refresh token updated: ', result);
// 			res.json({ person, accessToken });
// 		});
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ message: 'Internal server error' });
// 	}
// };

exports.refreshToken = async (req, res) => {
	console.log('refresh token api called');
	try {
		const token = req.cookies.jwt || '';
		const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET_KEY);
		const username = decoded.username;
		console.log('refresh token api called');
		const user = await teachersdetails.findOne({ name: username });
		if (!user) {
			console.log('user data not found');
			return res.status(404).json({ message: 'User not found' });
		}
		const newAccessToken = generateAccessToken(user.name, user.person);
		const newRefreshToken = generateRefreshToken(user.name, user.person);
		// send the user data to the client
		console.log('refresh token api: ', newAccessToken);
		res.status(200).json({ accessToken: newAccessToken });
	} catch (error) {
		console.error('refreshTokens error: ', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
