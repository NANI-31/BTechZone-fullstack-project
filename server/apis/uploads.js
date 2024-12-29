const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// const fs = require('fs');
// const path = require('path');
// const upload = multer({ dest: '/uploadAWS' });

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const studentsModel = require('../schemas/students/studentsDetails')
const StudentsBooksPublicModel = require('../schemas/students/studentsBooksPublic')
const StudentsBooksPrivateModel = require('../schemas/students/studentsBooksPrivate')

const teachersModel = require('../schemas/teachers/teachersDetails')
const TeachersBooksPublicModel = require('../schemas/teachers/teachersBooksPublic')
const TeachersBooksPrivateModel = require('../schemas/teachers/teachersBooksPrivate')


require('dotenv').config();
const crypto = require('crypto')

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


// const { S3Client, PutObjectCommand, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand } = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
// const bucketName = process.env.AWS_BUCKET_NAME
// const studentBooksPrivate = process.env.AWS_BUCKET_STUDENTS_BOOKS_PRIVATE
// const studentBooksPublic = process.env.AWS_BUCKET_STUDENTS_BOOKS_PUBLIC
// const studentsProfilePics = process.env.AWS_BUCKET_STUDENTS_PROFILE_PICS
// const teachersBooksPrivate = process.env.AWS_BUCKET_TEACHERS_BOOKS_PRIVATE
// const teachersBooksPublic = process.env.AWS_BUCKET_TEACHERS_BOOKS_PUBLIC
// const teachersProfilePics = process.env.AWS_BUCKET_TEACHERS_PROFILE_PICS
// const region = process.env.AWS_BUCKET_REGION
// const accessKeyId = process.env.AWS_ACCESS_KEY
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
// const s3Client = new S3Client({
//     region,
//     credentials: {
//         accessKeyId,
//         secretAccessKey
//     }
// })
// router.post("/generate-single-presigned-url", async (req, res) => {
//     try {
//         const fileName = req.body.fileName;

//         const params = {
//             Bucket: bucketName,
//             Key: fileName,
//             ACL: "bucket-owner-full-control",
//         };
//         const command = new PutObjectCommand(params);
//         const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
//         // let url = await s3Client.getSignedUrl("putObject", params);

//         return res.status(200).json({ url });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: "Error generating presigned URL" });
//     }
// });

// Start Multipart Upload
// router.post("/start-multipart-upload", async (req, res) => {
//     const fileName = req.body.fileName;
//     const contentType = req.body.contentType;

//     const params = {
//         Bucket: bucketName,
//         Key: fileName,
//         //   ContentDisposition: contentType === "VIDEO" ? "inline" : undefined,
//         //   ContentType: contentType === "VIDEO" ? "video/mp4" : undefined,
//     };

//     try {
//         const command = new CreateMultipartUploadCommand(params);
//         const multipart = await s3Client.send(command);
//         res.json({ uploadId: multipart.UploadId });
//     } catch (error) {
//         console.error("Error starting multipart upload:", error);
//         return res.status(500).json({ error: "Error starting multipart upload" });
//     }
// });

// Generate Presigned URL for each part
// router.post("/generate-presigned-url", async (req, res) => {
//     const { fileName, uploadId, partNumbers } = req.body;
//     const totalParts = Array.from({ length: partNumbers }, (_, i) => i + 1);

//     try {
//         const presignedUrls = await Promise.all(
//             totalParts.map(async (partNumber) => {
//                 const params = {
//                     Bucket: bucketName,
//                     Key: fileName,
//                     PartNumber: partNumber,
//                     UploadId: uploadId,
//                 };

//                 const command = new UploadPartCommand(params);
//                 const url = await getSignedUrl(s3Client, command, { expiresIn: 10800 }); // 3 hours
//                 return url;
//             })
//         );
//         res.json({ presignedUrls });
//     } catch (error) {
//         console.error("Error generating pre-signed URLs:", error);
//         return res.status(500).json({ error: "Error generating pre-signed URLs" });
//     }
// });

// Complete Multipart Upload
// router.post("/complete-multipart-upload", async (req, res) => {
//     const { fileName, uploadId, parts } = req.body;

//     const params = {
//         Bucket: bucketName,
//         Key: fileName,
//         UploadId: uploadId,
//         MultipartUpload: {
//             Parts: parts.map((part, index) => ({
//                 ETag: part.etag,
//                 PartNumber: index + 1,
//             })),
//         },
//     };

//     try {
//         const command = new CompleteMultipartUploadCommand(params);
//         const data = await s3Client.send(command);
//         res.status(200).json({ fileData: data });
//     } catch (error) {
//         console.error("Error completing multipart upload:", error);
//         return res.status(500).json({ error: "Error completing multipart upload" });
//     }
// });







router.post('/upload', upload.single('pdfFile'), async (req, res) => {
    const pdfBuffer = req.file;
    // const fileStream = fs.createReadStream(pdfBuffer.path);

    const { email, year, semester, branch, subject, unit, filename, value, person } = req.body;
    let model, modelpub, modelpri;
    if (person === 'student') {
        model = studentsModel;
        modelpub = StudentsBooksPublicModel;
        modelpri = StudentsBooksPrivateModel;
    }
    else if (person === 'teacher') {
        model = teachersModel;
        modelpub = TeachersBooksPublicModel;
        modelpri = TeachersBooksPrivateModel;
    }

    try {
        if (value === "true") {
            // const yearValue = year[0];
            // const lastSemesterValue = semester[semester.length - 1];
            // const branchValue = branch;
            // const subjectAbbreviation = subject
            //     .split(' ')
            //     .map(word => word.charAt(0))
            //     .join('');
            // const lastUnitValue = unit[unit.length - 1];
            // const file_uid = `${yearValue}${lastSemesterValue}${branchValue}${subjectAbbreviation}${lastUnitValue}`;
            // const uniqueId = uuidv4();
            const existingBooks = await modelpub.find({
                email: email,
                year: year,
                semester: semester,
                branch: branch,
                subject_name: subject,
                unit_no: unit
            });
            let maxRefer = 0;

            if (existingBooks.length > 0) {
                // If matching documents exist, find the maximum refer value among them
                const referValues = existingBooks.map(book => book.refer).filter(refer => !isNaN(refer));
                if (referValues.length > 0) {
                    maxRefer = Math.max(...referValues);
                }
            }
            const newRefer = maxRefer + 1;
            const pub = "public"
            const fileNameE = generateFileName()
            const newBook = new modelpub({
                file_id: fileNameE,
                email: email,
                classified: pub,
                year: year,
                semester: semester,
                branch: branch,
                subject_name: subject,
                unit_no: unit,
                filename: filename,
                content: pdfBuffer.buffer,
                refer: newRefer
            });
            await newBook.save();


            // const uploadParams = {
            //     Bucket: bucketName,
            //     Key: `${studentBooksPublic}/${fileNameE}`,
            //     Body: fileStream,
            //     ContentType: pdfBuffer.mimetype
            // }
            // await s3Client.send(new PutObjectCommand(uploadParams));
            // console.log("uploaded")

            const result = await model.findOne({ email: email });
            if (result) {
                result.uploads = result.uploads + 1;
                await result.save();
            }



        }
        else {
            // const uniqueIdr = uuidv4();
            const existingBooksp = await modelpri.find({
                email: email,
                year: year,
                semester: semester,
                branch: branch,
                subject_name: subject,
                unit_no: unit
            });
            let maxReferp = 0;

            if (existingBooksp.length > 0) {
                // If matching documents exist, find the maximum refer value among them
                const referValuesp = existingBooksp.map(book => book.refer).filter(refer => !isNaN(refer));
                if (referValuesp.length > 0) {
                    maxReferp = Math.max(...referValuesp);
                }
            }
            const newReferp = maxReferp + 1;
            const priv = "private"
            const fileNameE = generateFileName()
            const newBookp = new modelpri({
                file_id: fileNameE,
                email: email,
                classified: priv,
                year: year,
                semester: semester,
                branch: branch,
                subject_name: subject,
                unit_no: unit,
                filename: filename,
                content: pdfBuffer.buffer,
                refer: newReferp
            });
            await newBookp.save();

            // const uploadParams = {
            //     Bucket: bucketName,
            //     Key: `${studentBooksPrivate}/${fileNameE}`,
            //     Body: fileStream,
            //     ContentType: pdfBuffer.mimetype
            // }
            // await s3Client.send(new PutObjectCommand(uploadParams));


            const result = await model.findOne({ email: email });
            if (result) {
                result.uploads = result.uploads + 1
                await result.save();
            }
        }
        res.status(200).json({ success: true, message: 'PDF uploaded successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

module.exports = router;