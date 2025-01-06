const teachersdetails = require('../schemas/teachers/teachersDetails');
const studentsdetails = require('../schemas/students/studentsDetails');
const { uploadImageToS3, getImageFromS3 } = require('../utils/uplod');
const poppler = require('pdf-poppler');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const mime = require('mime-types');

require('dotenv').config();

const jwt = require('jsonwebtoken');

// const userDetails = {};

const verifyUser = async (req, res, next) => {
	const accessToken = req.cookies.userToken;
	if (!accessToken) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
		req.user = decoded.useId;
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid accessToken' });
	}
};

exports.home = async (req, res) => {
	try {
		res.status(200).json({ message: 'Success' });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

exports.profileChange = async (req, res) => {
	const imgBuffer = req.file?.buffer;
	const imgMime = req.file?.mimetype;
	const { name, phoneno, branch, email, person } = req.body;
	// ============================================
	// const filePath = req.file.path;
	// const outputDir = 'output_images';
	// if (!fs.existsSync(outputDir)) {
	// 	fs.mkdirSync(outputDir);
	// }
	// const outputFilePath = path.join(outputDir, `${req.file.filename}.jpg`);
	// const options = {
	// 	format: 'jpeg',
	// 	out_dir: outputDir,
	// 	out_prefix: req.file.filename,
	// 	page: 1,
	// };
	// await poppler.convert(filePath, options);
	// const imageBuffer = fs.readFileSync(outputFilePath);

	// ============================================conversion of pdf to image
	// const tempFilePath = path.join(__dirname, 'uploads', `${Date.now()}-temp.pdf`);
	// fs.writeFileSync(tempFilePath, req.file.buffer);

	// // Ensure output directory exists
	// const outputDir = path.join(__dirname, 'output_images');
	// if (!fs.existsSync(outputDir)) {
	// 	fs.mkdirSync(outputDir);
	// }

	// const options = {
	// 	format: 'jpeg',
	// 	out_dir: outputDir,
	// 	out_prefix: `output-${Date.now()}`,
	// 	page: 1,
	// };

	// // Convert the first page of the PDF to an image
	// await poppler.convert(tempFilePath, options);

	// const outputFilePath = path.join(outputDir, `${options.out_prefix}-1.jpg`);
	// const mimee = mime.lookup(outputFilePath);
	// console.log(mimee);
	// const imageBuffer = fs.readFileSync(outputFilePath);

	// ============================================ end of conversion of pdf to image
	// const url = await S3Client.getSignedUrl('putObject', params);

	// s3.upload(params, (err, data) => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log(data);
	// 	}
	// });
	// console.log(imgMime);
	const model = person === 'teacher' ? teachersdetails : studentsdetails;

	console.log('email of the user: ', email);
	try {
		let imageUrl = '';
		const existingUser = await model.findOne({ email });

		if (!existingUser) {
			return res.status(404).send({ message: 'User not found', status: 'error' });
		}

		// Check if name and phone number already exist
		const existingName = await model.findOne({ name });

		if (imgBuffer && imgMime) {
			// existingUser.pic = imgBuffer;
			// existingUser.contentType = imgMime;
			console.log('uploading and getting image');
			imageUrl = await uploadImageToS3(imgBuffer, imgMime, req.file.originalname, existingUser);
			const imageTempUrl = await getImageFromS3(req.file.originalname, existingUser);
			existingUser.contentType = imgMime;
			existingUser.pic = {
				pic_url: imageUrl,
				pic_name: req.file.originalname,
				pic_temporary: imageTempUrl,
			};
			console.log('completed uploading and getting image');
		}
		// fs.unlinkSync(tempFilePath);
		// fs.unlinkSync(outputFilePath);

		// if (phoneno) existingUser.phoneno = phoneno;
		if (branch) existingUser.branch = branch;
		if (name) existingUser.name = name;

		await existingUser.save();

		let message = 'Profile updated successfully';
		if (existingName) message += ' but not name because it already exists';
		// let imageData = '';
		// if (existingUser.pic && existingUser.contentType) {
		// 	const base64Data = existingUser.pic.toString('base64');
		// 	const contentType = existingUser.contentType;
		// 	imageData = `data:${contentType};base64,${base64Data}`;
		// }
		const responseData = existingUser;

		res.send({ message, status: 'success', responseData });
	} catch (err) {
		console.error('profilechange-failed', err);
		res.status(500).send({ message: 'Error updating profile', status: 'error' });
	}
};

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
