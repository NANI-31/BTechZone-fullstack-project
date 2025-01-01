const { sendEmailVerification, otpStore } = require('../utils/sendEmail');
const teachersdetails = require('../schemas/teachers/teachersDetails');
const studentsdetails = require('../schemas/students/studentsDetails');

const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const path = require('path');
require('dotenv').config();

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
	console.log(otpcode, email, 'body');
	console.log(otpcode, storedOtp, 'diff');
	try {
		if (storedOtp == otpcode) {
			const { name, hashedPassword, phoneno, branch, person } = details[email];
			const latestEmployee = await teachersdetails.findOne({}, {}, { sort: { id: -1 } });
			const newUserId = (latestEmployee && latestEmployee.id ? latestEmployee.id : 0) + 1;

			// const hashedPassword = await bycrypt.hash(password, 10);

			const teacher = new teachersdetails({
				id: newUserId,
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

const verifyUser = async (req, res, next) => {
	const token = req.cookies.userToken;
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = decoded.useId;
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid token' });
	}
};

exports.home = async (req, res) => {
	try {
		res.status(200).json({ message: 'Success' });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const teacher = await teachersdetails.findOne({ email });
		const student = await studentsdetails.findOne({ email });

		let user = teacher ? teacher : student;
		if (!user) {
			console.log('1');
			return res.status(400).json({ message: 'User not registered' });
		}

		const isPasswordMatch = await bycrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			console.log('2');
			return res.status(400).json({ message: 'Incorrect password' });
		}

		const token = jwt.sign({ useId: user.name }, process.env.JWT_SECRET_KEY, { expiresIn: '6h' });

		// Set JWT in HttpOnly cookie
		res.cookie('userToken', token, {
			httpOnly: true,
			path: '/',
			//   secure: process.env.NODE_ENV === 'production',
			secure: true,
			sameSite: 'Strict',
			maxAge: 3600000, // 1 hour
		});
		const responseData = {
			name: user.name,
			email: user.email,
			phoneno: user.phoneno,
			branch: user.branch,
			person: user.person,
		};
		console.log(responseData);
		res.status(200).json({ message: 'Login successful', token, responseData });
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: err.message });
	}
};

exports.profileChange = async (req, res) => {
	const imgBuffer = req.file?.buffer;
	const imgg = req.file?.mimetype;
	const { name, phoneno, branch, email, person } = req.body;

	const model = person === 'teacher' ? teachersdetails : studentsdetails;

	try {
		console.log(email);
		const existingUser = await model.findOne({ email });

		if (!existingUser) {
			return res.status(404).send({ message: 'User not found', status: 'error' });
		}

		// Check if name and phone number already exist
		const existingName = await model.findOne({ name });

		// Update fields if they are present
		if (imgBuffer && imgg) {
			existingUser.pic = imgBuffer;
			existingUser.contentType = imgg;
		}

		if (phoneno) existingUser.phoneno = phoneno;
		if (branch) existingUser.branch = branch;

		// Save updated user data
		await existingUser.save();

		let message = 'Profile updated successfully';
		if (existingName) message += ' but not name because it already exists';

		console.log(imgg);
		console.log(existingUser.name);

		res.send({ message, status: 'success' });
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: 'Error updating profile', status: 'error' });
	}
};

// exports.logout = async (req, res) => {
//     try {
//         res.clearCookie("userToken")
//         res.json({ message: "Logout successful" });
//     } catch (error) {
//         res.status(400).json({ message: "Logout failed" });
//     }
// }

// exports.forgotPassword = async (req, res) => {
//     try {
//         res.send("forgotPassword")
//     } catch (error) {
//         res.send(error)
//     }
// }

// exports.resetPassword = async (req, res) => {
//     try {
//         res.send("resetPassword")
//     } catch (error) {
//         res.send(error)
//     }
// }

// exports.updatePassword = async (req, res) => {
//     try {
//         res.send("updatePassword")
//     } catch (error) {
//         res.send(error)
//     }
// }

// exports.updateProfile = async (req, res) => {
//     try {
//         res.send("updateProfile")
//     } catch (error) {
//         res.send(error)
//     }
// }
// exports.sendVerificationEmail = async (req, res) => {
//     try {
//         res.send("sendVerificationEmail")
//     } catch (error) {
//         res.send(error)
//     }
// }

// exports.resendVerificationEmail = async (req, res) => {
//     try {
//         res.send("resendVerificationEmail")
//     } catch (error) {
//         res.send(error)
//     }
// }

// exports.sendResetPasswordEmail = async (req, res) => {
//     try {
//         res.send("sendResetPasswordEmail")
//     } catch (error) {
//         res.send(error)
//     }
// }

// exports.sendUpdatePasswordEmail = async (req, res) => {
//     try {
//         res.send("sendUpdatePasswordEmail")
//     } catch (error) {
//         res.send(error)
//     }
// }

// exports.sendUpdateProfileEmail = async (req, res) => {
//     try {
//         res.send("sendUpdateProfileEmail")
//     } catch (error) {
//         res.send(error)
//     }
// }

// exports.sendVerifyEmailEmail = async (req, res) => {
//     try {
//         res.send("sendVerifyEmailEmail")
//     } catch (error) {
//         res.send(error)
//     }
// }

// exports.sendResendVerificationEmailEmail = async (req, res) => {
//     try {
//         res.send("sendResendVerificationEmailEmail")
//     } catch (error) {
//         res.send(error)
//     }
// }
