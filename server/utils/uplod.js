require('dotenv').config();
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, HeadObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

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
	console.log(mimetype);
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
		if (listResponse.Contents && listResponse.Contents.length > 0) {
			const existingFileKey = listResponse.Contents[0].Key; // There should only be one file
			const deleteCommand = new DeleteObjectCommand({
				Bucket: bucketName,
				Key: existingFileKey,
			});
			await s3Client.send(deleteCommand);
			console.log(`Deleted existing file: ${existingFileKey}`);
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

		console.log('Image uploaded to S3 successfully:', filePath);
		return `https://${bucketName}.s3.${region}.amazonaws.com/${filePath}`;
	} catch (error) {
		console.error('Error uploading image to S3:', error);
		throw new Error('Image upload failed');
	}
};

exports.getImageFromS3 = async (key, user) => {
	const folderPrefix = user.person;
	const userFolder = user.user_id;
	const fileKey = `${folderPrefix}/${userFolder}/pic/${key}`;
	try {
		const command = new GetObjectCommand({
			Bucket: bucketName,
			Key: fileKey,
		});
		const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
		console.log('Image retrieved from S3:', url);
		return url;
	} catch (error) {
		console.error('Error getting image from S3:', error);
		throw new Error('Image retrieval failed');
	}
};
