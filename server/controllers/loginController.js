const teachersdetails = require('../schemas/teachers/teachersDetails');
const studentsdetails = require('../schemas/students/studentsDetails');
const { getImageFromS3 } = require('../utils/uplod');
const { generateAccessToken, generateRefreshToken } = require('../helpers/jwtHelper');
const bycrypt = require('bcrypt');

const userDetails = {};

exports.login = async (req, res) => {
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
		let imageData = '';
		if (user.pic.pic_url && user.contentType) {
			// const base64Data = user.pic.toString('base64');
			// const contentType = user.contentType;
			// imageData = `data:${contentType};base64,${base64Data}`;
			imageData = await getImageFromS3(user.pic.pic_name, user);
		}
		const accessToken = generateAccessToken(user.name, user.person);
		console.log('accessToken:::');
		console.log(accessToken);

		const responseData = {
			name: user.name,
			email: user.email,
			phoneno: user.phoneno,
			branch: user.branch,
			person: user.person,
			pic: {
				pic_temporary: imageData,
			},
			accessToken,
		};
		const newRefreshToken = generateRefreshToken(user.name, user.person);
		console.log('newRefreshToken:::');
		console.log(newRefreshToken);
		if (!accessToken && !newRefreshToken) {
			return res.status(400).json({ message: 'Login failed' });
		}
		user.refreshToken = newRefreshToken;
		await user.save();
		res.cookie('jwt', newRefreshToken, {
			httpOnly: true,
			// path: '/',
			secure: false,
			sameSite: 'Strict',
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.status(200).json({ message: 'Login successful', responseData });
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: err.message });
	}
};
