const { getDocumentImagesFromS3 } = require('../../utils/uplod');
const teachersdetails = require('../../schemas/teachers/teachersDetails');
const TeachersBooksPublicModel = require('../../schemas/teachers/teachersBooksPublic');
const TeachersBooksPrivateModel = require('../../schemas/teachers/teachersBooksPrivate');
const studentsdetails = require('../../schemas/students/studentsDetails');

exports.getDocumentsImages = async (req, res) => {
	try {
		// const { id } = req.params;
		const { email, person } = req.body;
		const User = person === 'student' ? studentsdetails : teachersdetails;
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		console.log(email);
		const document = await TeachersBooksPublicModel.findOne({ email: 'siva' });

		// const publicDocuments = await TeachersBooksPublicModel.find({ email });
		// const privateDocuments = await TeachersBooksPrivateModel.find({ user_id: id }); // Replace with your user schema path
		// const documents = [...publicDocuments, ...privateDocuments];
		// const documentsWithUrls = await Promise.all(
		// 	documents.map(async (document) => {
		// 		const url = await getFilesFromS3(document.filename, user);
		// 		return { ...document.toObject(), url };
		// 	})
		// );
		console.log('documents: ', document.files);

		const result = [];

		console.log('getDocuments api called');

		// const url = await getFilesFromS3(document.filename, user);
		// result.push({ ...document.toObject(), url });
		const filesWithImages = [];

		for (const file of document.files) {
			console.log('document.files: ', document.files);
			const params = {
				person: person,
				userId: user.user_id,
				fileId: file.image.image_temporary,
				access: 'public',
			};

			const imageData = await getDocumentImagesFromS3(params);
			// filesWithImages.push({ ...file.toObject(), url: imageData });
			filesWithImages.push({
				fileDetails: file,
				imageUrl: imageData,
			});
		}
		// result.push({ ...document.toObject(), files: filesWithImages });
		result.push({
			documentDetails: {
				email: document.email,
				classified: document.classified,
				refer: document.refer,
			},
			filesWithImages,
		});

		res.status(200).json({ result, message: 'Documents fetched successfully' });
	} catch (error) {
		console.error('Error fetching allpdf data:', error);
		res.status(500).json({ error: 'Internal Server Error' });
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
