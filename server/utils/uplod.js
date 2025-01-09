require('dotenv').config();
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { imgdata } = require('pdf-poppler');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
	region,
	credentials: {
		accessKeyId,
		secretAccessKey,
	},
});

exports.uploadImageToS3 = async (buffer, mimetype, fileName, user) => {
	console.log('uploadImageToS3 triggered');
	const folderPrefix = user.person;
	const userFolder = user.user_id;
	const folderPath = `${folderPrefix}/${userFolder}/pic`;

	// fileName = `${folderPrefix}/${userFolder}/${fileName}`;
	try {
		// const headCommand = new HeadObjectCommand({ Bucket: bucketName, Key: filePath });
		// try {
		// 	await s3Client.send(headCommand); // If successful, file exists

		// 	// If the file exists, delete it
		// 	const deleteCommand = new DeleteObjectCommand({ Bucket: bucketName, Key: filePath });
		// 	await s3Client.send(deleteCommand);
		// 	console.log(`Existing file deleted: ${filePath}`);
		// } catch (err) {
		// 	if (err.name === 'NotFound') {
		// 		console.log(`File does not exist: ${filePath}`);
		// 	} else {
		// 		throw err; // Handle other errors
		// 	}
		// }
		// Upload the new file

		const listCommand = new ListObjectsV2Command({
			Bucket: bucketName,
			Prefix: folderPath,
		});
		const listResponse = await s3Client.send(listCommand);

		// Check if a file exists and delete it
		// console.log('listResponse', listResponse.Contents);
		console.log('deleting existing file');
		if (listResponse.Contents && listResponse.Contents.length > 0) {
			const existingFileKey = listResponse.Contents[0].Key; // There should only be one file
			const deleteCommand = new DeleteObjectCommand({
				Bucket: bucketName,
				Key: existingFileKey,
			});
			await s3Client.send(deleteCommand);
			// console.log(`Deleted existing file: ${existingFileKey}`);
			console.log(`Deleted existing file: `);
		}

		const filePath = `${folderPath}/${fileName}`;
		const params = {
			Bucket: bucketName,
			Key: filePath,
			Body: buffer,
			ContentType: mimetype,
			// ACL: 'public-read', // Enable this setting to make the file public
		};

		const command = new PutObjectCommand(params);
		await s3Client.send(command);

		// console.log('Image uploaded to S3 successfully:', filePath);
		return `https://${bucketName}.s3.${region}.amazonaws.com/${filePath}`;
	} catch (error) {
		console.error('Error uploading image to S3:', error);
		throw new Error('Image upload failed');
	}
};

exports.getImageFromS3 = async (key, user) => {
	console.log('getImageFromS3 triggered');
	const folderPrefix = user.person;
	const userFolder = user.user_id;
	const fileKey = `${folderPrefix}/${userFolder}/pic/${key}`;
	try {
		const command = new GetObjectCommand({
			Bucket: bucketName,
			Key: fileKey,
		});
		const url = await getSignedUrl(s3Client, command, { expiresIn: 36000 });
		// console.log('Image retrieved from S3:');
		// console.log('Image retrieved from S3:', url);
		return url;
	} catch (error) {
		console.error('Error getting image from S3:', error);
		throw new Error('Image retrieval failed');
	}
};

exports.uploadPdfToS3 = async (params) => {
	console.log('uploadPdfToS3 triggered');
	const { pdfBuffer, imageBuffer, pdfMimeType, imageMimeType, originalFileName, fileName, access, user } = params;
	const folderPrefix = user.person;
	const userFolder = user.user_id;
	// const folderPath = `${folderPrefix}/${userFolder}/pdf/${access}`;

	let fileTypeFolder;
	// if (pdfMimeType.includes('pdf')) {
	// 	fileTypeFolder = 'pdfsFiles';
	// } else if (pdfMimeType.includes('presentation')) {
	// 	fileTypeFolder = 'pptFiles';
	// } else if (pdfMimeType.includes('word')) {
	// 	fileTypeFolder = 'wordFiles';
	// } else if (pdfMimeType.includes('plain')) {
	// 	fileTypeFolder = 'textFiles';
	// }

	const pdfFolderPath = `${folderPrefix}/${userFolder}/documents/pdfsFiles/${access}/Files`;
	const imageFolderPath = `${folderPrefix}/${userFolder}/documents/pdfsFiles/${access}/Images`;

	try {
		// pdf upload
		const pdfFilePath = `${pdfFolderPath}/${fileName}`;
		const fileParams = {
			Bucket: bucketName,
			Key: pdfFilePath,
			Body: pdfBuffer,
			ContentType: pdfMimeType,
			// ACL: 'public-read', // Enable this setting to make the file public
		};
		const command = new PutObjectCommand(fileParams);
		await s3Client.send(command);
		console.log('File uploaded to S3 successfully:', pdfFilePath);

		// image upload
		const imageFileName = fileName.replace(/\.[^/.]+$/, '.jpg'); // Replace extension with .jpg
		const imageFilePath = `${imageFolderPath}/${imageFileName}`;
		const imageFileParams = {
			Bucket: bucketName,
			Key: imageFilePath,
			Body: imageBuffer,
			ContentType: imageMimeType,
		};
		const imageCommand = new PutObjectCommand(imageFileParams);
		await s3Client.send(imageCommand);
		console.log('Image uploaded to S3 successfully:', imageFilePath);

		const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${pdfFilePath}`;
		const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${imageFilePath}`;

		return { fileUrl, imageUrl };
	} catch (error) {
		console.error('Error uploading PDF to S3:', error);
		throw new Error('File and Image upload failed');
	}
};

exports.getDocumentImagesFromS3 = async (params) => {
	console.log('getFilesFromS3 triggered');
	const { person, userId, fileId, access } = params;
	const folderPrefix = person;
	const userFolder = userId;
	const fileKey = `${folderPrefix}/${userFolder}/documents/pdfsFiles/${access}/Images/${fileId}`;

	try {
		const command = new GetObjectCommand({
			Bucket: bucketName,
			Key: fileKey,
		});
		const response = await s3Client.send(command);

		if (response.Body) {
			const chunks = [];
			for await (const chunk of response.Body) {
				chunks.push(chunk); // Collect the chunks
			}
			const fileBuffer = Buffer.concat(chunks); // Combine chunks into a single buffer
			const imageData = Buffer.from(fileBuffer, 'base64'); // Replace with your actual Buffer
			const base64Image = imageData.toString('base64');
			const mimeType = 'image/jpeg'; // Replace with your actual image MIME type

			const imgSrc = `data:${mimeType};base64,${base64Image}`;

			console.log('File retrieved from S3 in chunks');
			return imgSrc; // Return the buffer for further processing
		} else {
			const url = await getSignedUrl(s3Client, command, { expiresIn: 36000 });
			console.log('else Image retrieved from S3');
			console(error);
			return url;
			throw new Error('No data in the response body from S3');
		}
	} catch (error) {
		console.error('Error getting image from S3:', error);
		throw new Error('Image retrieval failed');
	}
};

exports.deleteUserFroms3 = async (userId) => {
	const folderPath = `teacher/${userId}/`;

	try {
		// List all objects in the folder
		const listCommand = new ListObjectsV2Command({
			Bucket: bucketName,
			Prefix: folderPath,
		});
		const listResponse = await s3Client.send(listCommand);

		if (listResponse.Contents && listResponse.Contents.length > 0) {
			// Create an array of object keys to delete
			const deleteParams = {
				Bucket: bucketName,
				Delete: {
					Objects: listResponse.Contents.map((item) => ({ Key: item.Key })),
				},
			};

			// Delete all objects
			const deleteCommand = new DeleteObjectsCommand(deleteParams);
			const deleteResponse = await s3Client.send(deleteCommand);

			console.log(`Deleted all contents of folder: ${folderPath}`);
			return deleteResponse;
		} else {
			// console.log(`No objects found in folder: ${folderPath}`);
			console.log(`Folder does not exist: ${folderPath}`);
			return { message: `Folder not found: ${folderPath}` };
		}
	} catch (err) {
		console.error('Error deleting folder:', err);
		throw err; // Handle this in the caller
	}
};
