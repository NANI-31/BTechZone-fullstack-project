const { v4: uuidv4 } = require('uuid');
const { uploadPdfToS3 } = require('../../utils/uplod');
const teachersdetails = require('../../schemas/teachers/teachersDetails');
const TeachersBooksPublicModel = require('../../schemas/teachers/teachersBooksPublic');
const TeachersBooksPrivateModel = require('../../schemas/teachers/teachersBooksPrivate');
const studentsdetails = require('../../schemas/students/studentsDetails');
const { convertPdfToImage } = require('../../helpers/conversion/convertPdfToImage');

exports.uploadPdfHandler = async (req, res) => {
	console.log('uploadPdfHandler api called');
	// console.log(req.file);
	// return res.status(200).json({ message: 'api called' });
	try {
		const { email, year, semester, branch, subject, unit, filename, value, person } = req.body; // Assuming `email` and `access` are sent in the request body
		// const { pdfBuffer, imageBuffer, fileMimeType, imageMimeType } = req.files; // Assuming files are sent as buffers
		console.log(value);
		const access = value === 'true' ? 'public' : 'private';
		console.log(access);
		const pdfBuffer = req.file?.buffer;
		const pdfMimeType = req.file?.mimeType;
		const originalFileName = req.file?.originalname;
		const User = person === 'student' ? studentsdetails : teachersdetails;
		const Model = access === 'public' ? TeachersBooksPublicModel : TeachersBooksPrivateModel;
		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			console.log('user not found');
			return res.status(404).json({ message: 'User not found' });
		}

		// Generate UUID for the file
		const fileId = uuidv4();
		const fileName = `${fileId}.pdf`; // Use UUID as the file name
		const { imageBuffer, imageMimeType } = await convertPdfToImage(pdfBuffer);

		// Upload the PDF and its image to S3
		const params = {
			pdfBuffer,
			imageBuffer,
			pdfMimeType,
			imageMimeType,
			originalFileName,
			fileName,
			access,
			user,
		};
		const { fileUrl, imageUrl } = await uploadPdfToS3(params);
		// Save file details in the user's record or another collection
		const fileData = {
			year: year,
			semester: semester,
			branch: branch,
			subject_name: subject,
			unit_no: unit,
			file_id: fileId,
			file_name: originalFileName,
			specified_file_name: filename,
			file: {
				file_url: fileUrl,
				file_temporary: fileId,
			},
			image: {
				image_url: imageUrl,
				image_temporary: fileId,
			},
			uploaded_at: new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })),
		};
		await Model.updateOne(
			{ email: user.email }, // Find the document by email
			// Remove the conflicting field
			{
				$setOnInsert: {
					email: user.email, // Insert the email if the document is new
					classified: access, // Insert the classified field if the document is new
				},
				$push: { files: fileData }, // Add the new file data to the files array
			},
			{ upsert: true } // Create a new document if it doesn't exist
		);

		// user.files.push(fileData); // Assuming a `files` array exists in the user schema
		// await user.save();
		// await fileData.save();

		// Respond with success
		res.status(200).json({
			message: 'File uploaded and saved successfully',
			fileData,
		});
	} catch (error) {
		console.error('Error handling PDF upload:', error);
		res.status(500).json({ message: 'Failed to upload file', error: error.message });
	}
};
