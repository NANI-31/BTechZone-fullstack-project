const { sendEmailVerification, otpStore } = require('../utils/sendEmail');
const teachersdetails = require('../schemas/teachers/teachersDetails');
const studentsdetails = require('../schemas/students/studentsDetails');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

const bycrypt = require('bcrypt');

const details = {};

exports.signup = async (req, res) => {
	const { name, email, password, phoneno, branch, person } = req.body;
	console.log(req.body);
	const hashedPassword = await bycrypt.hash(password, 10);
	details[email] = { name, hashedPassword, phoneno, branch, person };
	console.log('signup: ', details[email]);

	try {
		const { success, code } = await sendEmailVerification({ email });
		if (success) {
			console.log(`authController: Verification code sent successfully: ${code}`);
			res.status(200).json({ message: 'Verification code sent successfully', code, email });
		}
	} catch (error) {
		res.status(500).json({ message: 'Failed to send verification code' });
		console.error(`authController: Failed to send verification email: ${error}`);
	}
};

exports.verifyEmail = async (req, res) => {
	const { otpcode, email } = req.body;
	const storedOtp = otpStore[email];
	const user_id = uuidv4();
	try {
		if (storedOtp == otpcode) {
			const { name, hashedPassword, phoneno, branch, person } = details[email];
			const latestEmployee = await teachersdetails.findOne({}, {}, { sort: { id: -1 } });
			const newUserId = (latestEmployee && latestEmployee.id ? latestEmployee.id : 0) + 1;

			// const hashedPassword = await bycrypt.hash(password, 10);

			const teacher = new teachersdetails({
				id: newUserId,
				user_id: user_id,
				name: name,
				email: email,
				password: hashedPassword,
				phoneno: phoneno,
				branch: branch,
				person: person,
			});
			await teacher.save();

			delete details[email];
			delete otpStore[email];

			console.log('OTP verified successfully.');
			res.status(200).json({ message: 'OTP verified successfully' });
		} else {
			console.log(storedOtp, otp);
			res.status(400).json({ message: 'Invalid OTP' });
		}
	} catch (error) {
		console.log(storedOtp, otpcode, 'signup');
		res.send(error);
	}
};
