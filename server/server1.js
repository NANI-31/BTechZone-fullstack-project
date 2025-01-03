const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const cokkieParser = require('cookie-parser');

const region = process.env.AWS_BUCKET_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const fs = require('fs');
const path = require('path');
const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3Client = new S3Client({ region, Credentials: { accessKeyId, secretAccessKey } });

async function getObjectURL(key) {
	const command = new GetObjectCommand({
		Bucket: bucketName,
		Key: key,
	});
	const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
	return url;
}
async function putObject(filepath, key) {
	try {
		const fileC = fs.readFileSync(filepath);
		const command = new PutObjectCommand({
			Bucket: bucketName,
			Key: key,
			Body: fileC,
			// ACL: 'bucket-owner-full-control',
			ContentType: 'image/jpeg',
		});
		await s3Client.send(command);
		console.log(`File uploaded successfully: ${key}`);
	} catch (err) {
		console.error('Error uploading file:', err);
	}
	// const command = new PutObjectCommand({
	// 	Bucket: bucketName,
	// 	Key: key,
	// 	Body: body,
	// });

	// await s3Client.send(command);
}
async function init() {
	// await putObject(path.join(__dirname, 'a.jpg'), 'a.jpg');
	// const url = await getObjectURL('a.jpg');
	// console.log('URL for image: ', url);
}
// init();

require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
require('./config/db');

const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cokkieParser());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
	const { name, age } = req.body;

	res.send('name: ' + name + ' age: ' + age);
});

app.listen(process.env.PORT || 5000, () => {
	console.log(`server is running on ${process.env.PORT}`);
});
