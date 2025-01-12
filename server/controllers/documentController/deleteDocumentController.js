const { deleteDocumentFromS3 } = require('../../utils/uplod');
const teachersdetails = require('../../schemas/teachers/teachersDetails');
const TeachersBooksPublicModel = require('../../schemas/teachers/teachersBooksPublic');
const TeachersBooksPrivateModel = require('../../schemas/teachers/teachersBooksPrivate');
const studentsdetails = require('../../schemas/students/studentsDetails');

exports.deleteDcoument = async (req, res) => {
	console.log('deleteDcoument api called');
	// console.log(req.body);
	// return;
	try {
		// const { id } = req.params;
		const { email, person, access, pdfFileid } = req.body;
		console.log(pdfFileid);
		// return;
		const User = person === 'student' ? studentsdetails : teachersdetails;
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const Document = access === 'private' ? TeachersBooksPrivateModel : TeachersBooksPublicModel;
		const document = await Document.findOne({ email });
		// console.log('document: ', document);

		if (!document) {
			return res.status(404).json({ message: 'Document not found in the database.' });
		}

		const fileIndex = document.files.findIndex((file) => file.file_id === pdfFileid);
		console.log('fileIndex: ', fileIndex);
		if (fileIndex === -1) {
			return res.status(404).json({ message: 'File not found in the database.' });
		}

		const params = {
			person: person,
			userId: user.user_id,
			fileId: pdfFileid,
			access: access,
		};
		console.log('params: ', params);
		await deleteDocumentFromS3(params);

		document.files.splice(fileIndex, 1);
		await document.save();
		// const result = document.toObject();
		res.status(200).json({ success: 'true', message: 'Documents fetched successfully' });
	} catch (error) {
		console.error('Error deleting file:', error);
		res.status(500).json({ message: 'Error deleting file.', error: error.message });
	}
};

// for (const document of privateDocuments) {
//     // const url = await getFilesFromS3(document.filename, user);
//     // result.push({ ...document.toObject(), url });
//     const filesWithImages = [];

//     for (const file of document.files) {
//         const params = {
//             person: person,
//             userId: user.user_idid,
//             fileId: file.file_id,
//             access: "private",
//         }
//         const imageData = await getFilesFromS3(params);
//         filesWithImages.push({ ...file.toObject(), url: imageData });
//     }
//     result.push({ ...document.toObject(), files: filesWithImages });
// }

// const documentsWithUrls = [];
// for (const document of result) {
//     const url = await getFilesFromS3(document.filename, user);
//     documentsWithUrls.push({ ...document.toObject(), url });
//     for (const file of document.files) {
//         const params = {
//             person: person,
//             userId: user.user_idid,
//             fileId: file.file_id,
//             access: "private",
//         }
//         const imageData = await getFilesFromS3(params);
//         file.url = imageData;
//     }
// }
