const teachersdetails = require('../schemas/teachers/teachersDetails');
const studentsdetails = require('../schemas/students/studentsDetails');
const { getImageFromS3 } = require('../utils/uplod');

require('dotenv').config();
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userDetails = {};

exports.login = async (req, res) => {
	// const dd = 'f';
	// res.cookie('jwt', dd, {
	// 	httpOnly: true,
	// 	maxAge: 24 * 60 * 60 * 1000,
	// });
	// return res.json({ message: 'Login successful' });
	const cookies = req.cookies;
	console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: 'Email and password are required' });
	}

	try {
		const teacher = await teachersdetails.findOne({ email });
		const student = await studentsdetails.findOne({ email });

		const user = teacher ? teacher : student;
		if (!user) {
			console.log('user not found and user not registered');
			return res.status(400).json({ message: 'User not registered' });
		}

		const isPasswordMatch = await bycrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			console.log('Incorrect password');
			return res.status(400).json({ message: 'Incorrect password' });
		}

		const accessToken = jwt.sign(
			{
				UserInfo: {
					username: user.name,
					roles: user.person,
				},
			},
			process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
			{ expiresIn: '10h' }
		);
		const newRefreshToken = jwt.sign({ username: user.name }, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' });
		console.log('newRefreshToken', newRefreshToken);
		// Changed to let keyword
		let newRefreshTokenArray = !cookies?.jwt ? user.refreshToken : user.refreshToken.filter((rt) => rt !== cookies.jwt);

		if (cookies?.jwt) {
			/* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
			const refreshToken = cookies.jwt;
			const foundToken = user.person === 'student' ? await studentsdetails.findOne({ refreshToken }) : await teachersdetails.findOne({ refreshToken });

			// Detected refresh token reuse!
			if (!foundToken) {
				console.log('attempted refresh token reuse at login!');
				// clear out ALL previous refresh tokens
				newRefreshTokenArray = [];
			}

			// res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
		}
		// Saving refreshToken with current user
		user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
		const result = await user.save();
		// console.log(result);
		console.log('Tokens saved:', newRefreshToken);

		// Set JWT in HttpOnly cookie
		res.cookie('jwt', accessToken, {
			httpOnly: true,
			// path: '/',
			//   secure: process.env.NODE_ENV === 'production',
			secure: false,
			sameSite: 'Strict',
			maxAge: 24 * 60 * 60 * 1000,
		});
		let imageData = '';
		if (user.pic.pic_url && user.contentType) {
			// const base64Data = user.pic.toString('base64');
			// const contentType = user.contentType;
			// imageData = `data:${contentType};base64,${base64Data}`;
			imageData = await getImageFromS3(user.pic.pic_name, user);
			// console.log(imageData);
		}
		const responseData = {
			name: user.name,
			email: user.email,
			phoneno: user.phoneno,
			branch: user.branch,
			person: user.person,
			pic: {
				pic_temporary: imageData,
			},
		};
		// userDetails[accessToken] = responseData;
		// console.log('login: ', userDetails[accessToken]);
		res.status(200).json({ message: 'Login successful', accessToken, responseData });
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: err.message });
	}
};
