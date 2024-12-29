const express = require('express');
const router = express.Router();


const StudentsBooksPublicModel = require('../schemas/students/studentsBooksPublic')
const StudentsBooksPrivateModel = require('../schemas/students/studentsBooksPrivate')


const TeachersBooksPublicModel = require('../schemas/teachers/teachersBooksPublic')
const TeachersBooksPrivateModel = require('../schemas/teachers/teachersBooksPrivate')




router.post('/mylib-get-recent', async (req, res) => {
    let model1, model2;
    const person = req.body.person
    if (person === 'student') {
        model1 = StudentsBooksPublicModel;
        model2 = StudentsBooksPrivateModel;
    }
    else if (person === 'teacher') {
        model1 = TeachersBooksPublicModel;
        model2 = TeachersBooksPrivateModel;
    }

    const email = req.body.email;

    try {
        Promise.all([
            model1.find({ email: email }, { content: 0 }).sort({ 'createdAt.date': -1, 'createdAt.time': -1 }),
            model2.find({ email: email }, { content: 0 }).sort({ 'createdAt.date': -1, 'createdAt.time': -1 })
        ]).then(([publicPDFs, privatePDFs]) => {
            // Combine public and private PDFs
            const allPDFs = [...publicPDFs, ...privatePDFs];

            // Sort the combined PDFs by date and time
            allPDFs.sort((a, b) => {
                const dateComparison = new Date(b.createdAt.date) - new Date(a.createdAt.date);
                if (dateComparison !== 0) {
                    return dateComparison;
                }
                return new Date(b.createdAt.time) - new Date(a.createdAt.time);
            });
            const rreferences = allPDFs.slice(0, 6);
            res.json({ pdfData: { rreferences } });

            // console.log('6 Most Recent PDFs:', recentPDFs);
            // Send recentPDFs to the client
        })
        // const rreferences = await model.find({ email: email }, { content: 0 });
        // if (rreferences.length > 0) {
        //     console.log(rreferences.length)
        //     return res.json({ pdfData: { rreferences } });
        // } else {
        //     return res.json({ message: "No recent books found for the user" });
        // }
    }
    catch (error) {
        console.log(email);
        console.error('Error fetching recent books data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/mylib-get-private', async (req, res) => {
    let model;
    const person = req.body.person
    if (person === 'student') {
        model = StudentsBooksPrivateModel;
    }
    else if (person === 'teacher') {
        model = TeachersBooksPrivateModel;
    }

    const email = req.body.email
    try {
        const references = await model.find({ email: email }, { content: 0 });
        if (references) {
            res.json({ pdfData: { references } })
        }
    }
    catch (error) {
        console.error('Error fetching allpdf data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/mylib-get-public', async (req, res) => {
    let model;
    const person = req.body.person
    if (person === 'student') {
        model = StudentsBooksPublicModel;
    }
    else if (person === 'teacher') {
        model = TeachersBooksPublicModel;
    }

    const email = req.body.email

    try {
        const references = await model.find({ email: email }, { content: 0 });
        if (references) {
            res.json({ pdfData: { references } })
        }
    }
    catch (error) {
        console.error('Error fetching allpdf data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/change-PDF-type', async (req, res) => {
    const { person, access, pdfFileid } = req.body;
    let frompdf, topdf;
    const acc = 'private'
    const classify = access === 'public' ? 'private' : 'public';
    console.log(classify)
    if (person === 'student') {
        frompdf = access === 'public' ? StudentsBooksPublicModel : StudentsBooksPrivateModel;
        topdf = access === 'public' ? StudentsBooksPrivateModel : StudentsBooksPublicModel;
        console.log(frompdf, topdf)
    } else if (person === 'teacher') {
        frompdf = access === 'public' ? TeachersBooksPublicModel : TeachersBooksPrivateModel;
        topdf = access === 'public' ? TeachersBooksPrivateModel : TeachersBooksPublicModel;
    }
    try {
        const response = await frompdf.findOne({ file_id: pdfFileid });
        if (!response) {
            return res.json("no");
        }
        const { file_id, email, classified, year, semester, branch, subject_name, unit_no, filename, content, refer } = response
        const existingBooks = await topdf.find({
            email: email,
            year: year,
            semester: semester,
            branch: branch,
            subject_name: subject_name,
            unit_no: unit_no
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
        const changedata = new topdf({
            file_id: file_id,
            email: email,
            classified: classify,
            year: year,
            semester: semester,
            branch: branch,
            subject_name: subject_name,
            unit_no: unit_no,
            filename: filename,
            content: content,
            refer: newRefer
        })
        await changedata.save();
        await frompdf.deleteOne({ file_id: pdfFileid })
        res.json("ok");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
router.post('/delete-PDF', async (req, res) => {
    const { person, access, pdfFileid } = req.body;
    let model;
    if (person === 'student') {
        model = access === 'public' ? StudentsBooksPublicModel : StudentsBooksPrivateModel;
    } else if (person === 'teacher') {
        model = access === 'public' ? TeachersBooksPublicModel : TeachersBooksPrivateModel;
    }
    try {
        const existingPdf = await model.findOneAndDelete({ file_id: pdfFileid });
        if (!existingPdf) {
            res.json("no file");
        }
        else {

            res.json("ok");
        }


    }
    catch (error) {
        console.log(error)
        res.json("no")
    }
})

// const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3")
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
// require('dotenv').config();
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
//         secretAccessKey,
//     },
// });
// router.post('/libx', async (req, res) => {
//     let model, model1;
//     const person = req.body.person;
//     const typee = req.body.accessType;
//     const uniqueId = req.body.uniqueId;

//     const getParams = {
//         Bucket: bucketName,
//         Key: `${studentBooksPublic}/${uniqueId}`,
//     };
//     try {

//         const command = new GetObjectCommand(getParams);
//         const data = await s3Client.send(command);

//         // Set headers to tell the browser that it's a PDF
//         res.set('Content-Type', 'application/pdf');
//         // res.setHeader('Content-Disposition', 'inline; filename="file.pdf"');

//         // Pipe the data directly to the response
//         console.log(person, typee, "libx")
//         data.Body.pipe(res);
//     } catch (error) {
//         console.error('Error retrieving PDF from S3:', error);
//         res.status(500).json({ success: false, error: 'Failed to retrieve PDF' });
//     }

//     // if (person === 'student') {
//     //     if (typee === 'recent') {
//     //         model = StudentsBooksPrivateModel;
//     //         model1 = StudentsBooksPublicModel
//     //     }
//     //     else if (typee === 'private') {
//     //         model = StudentsBooksPrivateModel;
//     //     }
//     //     else if (typee === 'public') {
//     //         model = StudentsBooksPublicModel;
//     //     }
//     // }
//     // else if (person === 'teacher') {
//     //     if (typee === 'recent') {
//     //         model = TeachersBooksPrivateModel;
//     //         model1 = TeachersBooksPublicModel;

//     //     }
//     //     else if (typee === 'private') {
//     //         model = TeachersBooksPrivateModel;
//     //     }
//     //     else if (typee === 'public') {
//     //         model = TeachersBooksPublicModel;
//     //     }
//     // }
//     // try {
//     //     const uniqueId = req.body.uniqueId;
//     //     if (typee === 'recent') {
//     //         const result = await model1.findOne({ file_id: uniqueId });
//     //         const result1 = await model.findOne({ file_id: uniqueId });
//     //         if (!result && !result1) {
//     //             console.log("exit")
//     //             return res.status(404).json({ error: 'PDF not found' });
//     //         }
//     //         if (result) {
//     //             const pdfContent = result.content;
//     //             res.setHeader('Content-Type', 'application/pdf');
//     //             res.send(pdfContent);
//     //         }
//     //         if (result1) {
//     //             const pdfContent = result1.content;
//     //             res.setHeader('Content-Type', 'application/pdf');
//     //             res.send(pdfContent);
//     //         }
//     //     }
//     //     else {
//     //         const result = await model.findOne({ file_id: uniqueId });
//     //         if (!result) {
//     //             console.log("exit")
//     //             return res.status(404).json({ error: 'PDF not found' });
//     //         }

//     //         const pdfContent = result.content;
//     //         res.setHeader('Content-Type', 'application/pdf');
//     //         console.log("ok")
//     //         res.send(pdfContent);
//     //     }

//     // } catch (error) {
//     //     console.error('error retrieving PDF:', error);
//     //     res.status(500).json({ error: 'Internal server error' });
//     // }
// });


router.post('/libx', async (req, res) => {
    let model, model1;
    const person = req.body.person;
    const typee = req.body.accessType;
    console.log(person, typee, "libx")
    if (person === 'student') {
        if (typee === 'recent') {
            model = StudentsBooksPrivateModel;
            model1 = StudentsBooksPublicModel
        }
        else if (typee === 'private') {
            model = StudentsBooksPrivateModel;
        }
        else if (typee === 'public') {
            model = StudentsBooksPublicModel;
        }
    }
    else if (person === 'teacher') {
        if (typee === 'recent') {
            model = TeachersBooksPrivateModel;
            model1 = TeachersBooksPublicModel;

        }
        else if (typee === 'private') {
            model = TeachersBooksPrivateModel;
        }
        else if (typee === 'public') {
            model = TeachersBooksPublicModel;
        }
    }

    try {
        const uniqueId = req.body.uniqueId;
        if (typee === 'recent') {
            const result = await model1.findOne({ file_id: uniqueId });
            const result1 = await model.findOne({ file_id: uniqueId });
            if (!result && !result1) {
                console.log("exit")
                return res.status(404).json({ error: 'PDF not found' });
            }
            if (result) {
                const pdfContent = result.content;
                res.setHeader('Content-Type', 'application/pdf');
                res.send(pdfContent);
            }
            if (result1) {
                const pdfContent = result1.content;
                res.setHeader('Content-Type', 'application/pdf');
                res.send(pdfContent);
            }
        }
        else {
            const result = await model.findOne({ file_id: uniqueId });
            if (!result) {
                console.log("exit")
                return res.status(404).json({ error: 'PDF not found' });
            }

            const pdfContent = result.content;
            res.setHeader('Content-Type', 'application/pdf');
            console.log("ok")
            res.send(pdfContent);
        }

    } catch (error) {
        console.error('error retrieving PDF:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router