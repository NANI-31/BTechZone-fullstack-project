const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const MongoStore = require('connect-mongo');

require('dotenv').config();
// const http = require('http');
// const { Server } = require('socket.io');

const studentsModel = require('./schemas/students/studentsDetails');
const StudentsBooksPublicModel = require('./schemas/students/studentsBooksPublic');
const StudentsBooksPrivateModel = require('./schemas/students/studentsBooksPrivate');
const StudentsBookmarksModel = require('./schemas/students/studentsBookmarks');
const StudentsBooksRecentModel = require('./schemas/teachers/teachersBooksRecent');

const teachersModel = require('./schemas/teachers/teachersDetails');
const TeachersBooksPublicModel = require('./schemas/teachers/teachersBooksPublic');
const TeachersBooksPrivateModel = require('./schemas/teachers/teachersBooksPrivate');
const TeachersBooksRecentModel = require('./schemas/teachers/teachersBooksRecent');
const TeachersBookmarksModel = require('./schemas/teachers/teachersBookmarks');

const Sem1Model = require('./schemas/sems/sem1');

const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["Get", "Post"],
//     },
// });
// io.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/knowledgeStore');
const db = mongoose.connection;
db.on('connected', () => {
	console.log('Mongoose is connected to the database');
});

db.on('error', (err) => {
	console.log('Mongoose connection error:', err);
});

db.on('disconnected', () => {
	console.log('Mongoose is disconnected from the database');
});
app.use(
	session({
		secret: 'your-secret-key',
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: 'mongodb://localhost/knowledgeStore',
		}),
	})
);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const generateRandomCode = () => {
	return Math.floor(100000 + Math.random() * 900000).toString();
};
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'darkbutterflystar31@gmail.com',
		pass: 'djmjrkppnfquosux',
	},
});
let globalSessions = '';
let globalperson = '';
let publiclib = '';

app.post('/updatepubliclib', async (req, res) => {
	publiclib = req.body.value;
});

//      mylibrary    ======================================================================================

app.post('/getReferences', async (req, res) => {
	const { year, semester, branch, subject, unit, id } = req.body;
	const lowercaseBranch = branch.toLowerCase();
	const lowercaseSubject = subject.toLowerCase();

	try {
		// Fetch references from the database based on the selected parameters
		const references = await Sem1Model.find({ branch: lowercaseBranch, subject_name: lowercaseSubject, unit_no: `unit-${unit}` }, { content: 0 });
		// Send the references to the client
		res.json({ pdfData: { id, references } });
	} catch (error) {
		console.error('Error fetching references:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.get('/get-pdf/', async (req, res) => {
	try {
		const { year, semester, branch, subject, unit, ref } = req.query;
		const lowercaseBranch = branch.toLowerCase();
		const lowercaseSubject = subject.toLowerCase();
		const result = await Sem1Model.find({ branch: lowercaseBranch, subject_name: lowercaseSubject, unit_no: `unit-${unit}`, reference_no: ref });

		if (!result) {
			return res.status(404).json({ error: 'PDF not found' });
		}

		const pdfContent = result[0].content;
		res.setHeader('Content-Type', 'application/pdf');
		res.send(pdfContent);
	} catch (error) {
		console.error('error retrieving PDF:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

//      student library public ============================================================================
app.post('/mylib-get-all-susers', async (req, res) => {
	let person = req.body.person;
	let model;
	if (person === 'student') {
		model = studentsModel;
	} else if (person === 'teacher') {
		model = teachersModel;
	}

	try {
		const sreferences = await model.find({}, { password: 0 });

		// Iterate through each user and process image data
		const updatedSReferences = sreferences.map((user) => {
			let imageData = '';

			// Check if user has pic and contentType fields
			if (user.pic && user.contentType) {
				const base64Data = user.pic.toString('base64');
				const contentType = user.contentType;
				imageData = `data:${contentType};base64,${base64Data}`;
			}

			// Return a new user object with updated imageData
			let updatedUser = {
				...user,
				pic: imageData,
				email: user.email,
				name: user.name,
				uploads: user.uploads,
			};

			// Check if the user has a branch field and include it if it exists
			if (user.branch) {
				updatedUser.branch = user.branch;
			}
			if (user.semester) {
				updatedUser.semester = user.semester;
			}
			if (user.year) {
				updatedUser.year = user.year;
			}

			// Add other fields conditionally based on your model
			// Example: if (user.someField) updatedUser.someField = user.someField;

			return updatedUser;
		});
		res.json({ pdfData: { sreferences: updatedSReferences } });
	} catch (error) {
		console.error('Error fetching allpdf data:', error);
		res.json('Internal Server Error');
	}
});
app.post('/mylib-get-all-public', async (req, res) => {
	let person = req.body.person;
	let model, model1;
	if (person === 'student') {
		model = studentsModel;
		model1 = StudentsBooksPublicModel;
	} else if (person === 'teacher') {
		model = teachersModel;
		model1 = TeachersBooksPublicModel;
	}

	try {
		const sreferences = await model.find({}, { password: 0 });

		// Iterate through each user and process image data
		const updatedSReferences = sreferences.map((user) => {
			let imageData = '';

			// Check if user has pic and contentType fields
			if (user.pic && user.contentType) {
				const base64Data = user.pic.toString('base64');
				const contentType = user.contentType;
				imageData = `data:${contentType};base64,${base64Data}`;
			}

			// Return a new user object with updated imageData
			let updatedUser = {
				...user,
				pic: imageData,
				email: user.email,
				name: user.name,
				uploads: user.uploads,
			};

			// Check if the user has a branch field and include it if it exists
			if (user.branch) {
				updatedUser.branch = user.branch;
			}
			if (user.semester) {
				updatedUser.semester = user.semester;
			}
			if (user.year) {
				updatedUser.year = user.year;
			}

			// Add other fields conditionally based on your model
			// Example: if (user.someField) updatedUser.someField = user.someField;

			return updatedUser;
		});
		const allreferences = await model1.find({}, { content: 0 });
		res.json({ pdfData: { sreferences: updatedSReferences, allreferences } });
	} catch (error) {
		console.error('Error fetching allpdf data:', error);
		res.json('Internal Server Error');
	}
});

app.post('/plib-get-pdfs', async (req, res) => {
	// let model;
	// if (globalperson === 'student') {
	//     model = StudentsBooksPublicModel;
	// }
	// else if (globalperson === 'teacher') {
	//     model = TeachersBooksPublicModel;
	// }
	try {
		const mail = req.body.mail;
		// const references = await StudentsBooksPublicModel.find({ email: globalSessions }, { content: 0 });
		const references = await StudentsBooksPublicModel.find({ email: mail }, { content: 0 });
		if (!references) {
			console.log(mail);
			console.log('pdf not found');
			return res.json('PDF not found');
		}
		console.log(mail);
		res.json({ pdfData: { references } });
	} catch (error) {
		console.error('error retrieving PDF:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});
//       public bookmarks       =================
app.post('/plib-bookmark', async (req, res) => {
	const { fileid, person, youmail } = req.body;
	let model1, model2;
	if (person === 'student') {
		model1 = StudentsBooksPublicModel;
		model2 = StudentsBookmarksModel;
	} else if (person === 'teacher') {
		model1 = TeachersBooksPublicModel;
		model2 = TeachersBookmarksModel;
	}

	try {
		const exisitingbook = await model1.findOne({ file_id: fileid });
		if (!exisitingbook) {
			res.json('no');
		}
		const exisitingbookmark = await model2.findOne({ file_id: fileid, email_you: youmail });
		if (!exisitingbookmark) {
			const uploaddata = new model2({
				file_id: exisitingbook.file_id,
				email_org: exisitingbook.email,
				email_you: youmail,
				year: exisitingbook.year,
				semester: exisitingbook.semester,
				branch: exisitingbook.branch,
				subject_name: exisitingbook.subject_name,
				unit_no: exisitingbook.unit_no,
				filename: exisitingbook.filename,
				content: exisitingbook.content,
				refer: exisitingbook.refer,
			});
			await uploaddata.save();
			res.json('ok');
		} else {
			res.json('exits');
		}
	} catch (error) {
		console.log(error);
	}
});

//      my bookmarks     ===========================================

app.post('/my-bookmarks', async (req, res) => {
	const { person, email } = req.body;
	let model;
	if (person === 'student') {
		model = StudentsBookmarksModel;
	} else if (person === 'teacher') {
		model = TeachersBookmarksModel;
	}

	const references = await StudentsBookmarksModel.find({ email_you: email }, { content: 0 });
	if (references) {
		res.json({ pdfData: { references } });
	} else {
		res.json('no');
	}
});

app.post('/profilechange', upload.single('image'), async (req, res) => {
	const imgBuffer = req.file.buffer;
	const imgg = req.file.mimetype;
	const { name, phoneno, year, semester, branch, image, email, person } = req.body;

	let model;
	if (person === 'student') {
		model = studentsModel;
	} else if (person === 'teacher') {
		model = teachersModel;
	}

	try {
		console.log(email);
		const existingUser = await model.findOne({ email: email });

		// Check if name and phone number already exist
		const existingName = await model.findOne({ name: name });

		// Update fields if they are present and not already taken

		(existingUser.pic = imgBuffer), (existingUser.contentType = imgg);

		// io.emit('updateProfilePhoto', {
		//     name: req.file.originalname,
		//     img: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
		// });

		await existingUser.save(); // Save the updated user data

		let message = 'Profile updated successfully';
		if (existingName) message += ' but not name because name already exists';
		const s = 'success';
		console.log(imgg);
		// console.log(imgBuffer)
		console.log(existingUser.name);
		res.send({ message, s });
	} catch (err) {
		console.error(err);
		res.send('Error updating profile');
	}
});

//   profile settings   ===================================================================

// =============================================  email change  ==================================================

app.post('/profilemailchange', async (req, res) => {
	const { oemail, cemail, person } = req.body;
	let model;
	if (globalperson === 'student') {
		model = studentsModel;
	} else if (globalperson === 'teacher') {
		model = teachersModel;
	}

	const existingUser = await model.findOne({ email: cemail });
	if (existingUser) {
		console.log(cemail);
		return res.json('failemail');
	}
	const sUser = await model.findOne({ email: oemail });
	const name = sUser.name;
	const randomCode = generateRandomCode();
	const mailOptions = {
		from: 'darkbutterflystar31@gmail.com',
		to: oemail,
		subject: 'Your 6-digit Code',
		html: `<div style="margin:0;padding:0" bgcolor="#FFFFFF">
        <table width="100%" height="100%" style="min-width:348px" border="0" cellspacing="0" cellpadding="0" lang="en">
            <tbody>
                <tr height="32" style="height:32px">
                    <td></td>
                </tr>
                <tr align="center">
                    <td>
                        <div>
                            <div></div>
                        </div>
                        <table border="0" cellspacing="0" cellpadding="0"
                            style="padding-bottom:20px;max-width:380px;min-width:220px">
                            <tbody>
                                <tr>
                                    <td width="8" style="width:8px"></td>
                                    <td>
                                        <div style="border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;padding:40px 20px" align="center" class="m_4104678102433049159mdv2rw"> 
                                            <div style="background-color:black;width: 50px;height: 50px;border-radius: 8vh; margin-top: 0px;position: relative; top: -.5em;">
                                                    <img src="cid:logo" style="margin-top: 10px;width: 30px;height: 30px;">
                                            </div>
                                            <div
                                                style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-bottom:thin solid #dadce0;color:rgba(0,0,0,0.87);line-height:32px;padding-bottom:24px;text-align:center;word-break:break-word">
                                                <div style="font-size:24px">Verification </div>
                                                <table align="center" style="margin-top:8px">
                                                    <tbody>
                                                        <tr style="line-height:normal">
                                                            <td align="right" style="padding-right:8px">
                                                            </td>
                                                            <td><a
                                                                    style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.87);font-size:14px;line-height:20px">${oemail}</a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div
                                                style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align: left;">
                                                <p>Dear <b>${name},</b></p>
            <p class="p1" style="margin-left: 20px; margin-top: 20px;">Welcome to our digital library of
                knowledge! Dive into a treasure trove of PDF documents covering a wide range of subjects.
                Explore, learn, and expand your horizons with our collection of informative resources.</p>
            <p style="margin-left: 20px;">Your verification OTP is: <b>${randomCode}</b></p>
            <br><b>With regrads,<br>Nani</b><div
                                                    style="padding-top:32px;text-align:center"><a
                                                        href="https://accounts.google.com/AccountChooser?Email=education13331@gmail.com&amp;continue=https://myaccount.google.com/alert/nt/1707549979000?rfn%3D325%26rfnc%3D1%26eid%3D1731593439640181822%26et%3D0"
                                                        style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;line-height:18px;color:#ffffff;font-weight:400;text-decoration:none;font-size:14px;display:inline;padding:10px 24px;background-color:#4184f3;border-radius:5px;width:90px"
                                                        target="_blank"
                                                        data-saferedirecturl="https://www.google.com/url?q=https://accounts.google.com/AccountChooser?Email%3Deducation13331@gmail.com%26continue%3Dhttps://myaccount.google.com/alert/nt/1707549979000?rfn%253D325%2526rfnc%253D1%2526eid%253D1731593439640181822%2526et%253D0&amp;source=gmail&amp;ust=1707877341757000&amp;usg=AOvVaw3RY8wu4IZadb_GN2L0HDMc">Check
                                                        activity</a></div>
                                            </div>
                                        </div>
                                        
                                    </td>
                                    <td width="8" style="width:8px"></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr height="32" style="height:32px">
                    <td></td>
                </tr>
            </tbody>
        </table>
        </div>`,
		attachments: [
			{
				filename: 'p.png',
				path: 'C:/Users/Chowd/OneDrive/Desktop/react/server/p.png',
				cid: 'logo',
			},
		],
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
			// res.status(500).send('Error sending verification email');
		} else {
			console.log('Verification email sent: ' + info.response);
		}
	});
	const mailcode = { oemail, cemail, randomCode };
	try {
		res.json(mailcode);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});
app.post('/pmailverification', async (req, res) => {
	const { otpcode, oemail, cemail, randomCode, person } = req.body;
	let model, public, private, recent;
	if (globalperson === 'student') {
		model = studentsModel;
		public = StudentsBooksPublicModel;
		private = StudentsBooksPrivateModel;
		recent = StudentsBooksRecentModel;
	} else if (globalperson === 'teacher') {
		model = teachersModel;
		public = TeachersBooksPublicModel;
		private = TeachersBooksPrivateModel;
		recent = TeachersBooksRecentModel;
	}
	const c = '111111';
	try {
		console.log(oemail);
		const user = await model.findOne({ email: oemail });
		const pubuser = await public.findOne({ email: oemail });
		const priuser = await public.findOne({ email: oemail });
		const recuser = await public.findOne({ email: oemail });

		if (!user) {
			res.status(401).send('User not found');
			return;
		}
		if (otpcode === c) {
			user.email = cemail;
			pubuser.email = cemail;
			priuser.email = cemail;
			recuser.email = cemail;
			await Promise.all([user.save(), pubuser.save(), priuser.save(), recuser.save()]);
			globalSessions = cemail;
			console.log(`document(s) was/were updated.`);
			res.send('true');
		} else {
			res.send('codefail');
		}
	} catch (error) {
		console.log(error);
	}
});

// =============================================  password change  ==================================================

app.post('/profilepasschange', async (req, res) => {
	const { opass, cpass, oemail } = req.body;
	let model;
	if (globalperson === 'student') {
		model = studentsModel;
	} else if (globalperson === 'teacher') {
		model = teachersModel;
	}

	console.log(opass, oemail);
	console.log('mm');
	try {
		const existingUser = await model.findOne({ email: oemail });
		if (existingUser) {
			const name = existingUser.name;
			const passwordMatch = await bcrypt.compare(opass, existingUser.password);
			if (passwordMatch) {
				const randomCode = generateRandomCode();
				const mailOptions = {
					from: 'darkbutterflystar31@gmail.com',
					to: oemail,
					subject: 'Your 6-digit Code',
					html: `<div style="margin:0;padding:0" bgcolor="#FFFFFF">
                        <table width="100%" height="100%" style="min-width:348px" border="0" cellspacing="0" cellpadding="0" lang="en">
                            <tbody>
                                <tr height="32" style="height:32px">
                                    <td></td>
                                </tr>
                                <tr align="center">
                                    <td>
                                        <div>
                                            <div></div>
                                        </div>
                                        <table border="0" cellspacing="0" cellpadding="0"
                                            style="padding-bottom:20px;max-width:380px;min-width:220px">
                                            <tbody>
                                                <tr>
                                                    <td width="8" style="width:8px"></td>
                                                    <td>
                                                        <div style="border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;padding:40px 20px" align="center" class="m_4104678102433049159mdv2rw"> 
                                                            <div style="background-color:black;width: 50px;height: 50px;border-radius: 8vh; margin-top: 0px;position: relative; top: -.5em;">
                                                                    <img src="cid:logo" style="margin-top: 10px;width: 30px;height: 30px;">
                                                            </div>
                                                            <div
                                                                style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-bottom:thin solid #dadce0;color:rgba(0,0,0,0.87);line-height:32px;padding-bottom:24px;text-align:center;word-break:break-word">
                                                                <div style="font-size:24px">Verification </div>
                                                                <table align="center" style="margin-top:8px">
                                                                    <tbody>
                                                                        <tr style="line-height:normal">
                                                                            <td align="right" style="padding-right:8px">
                                                                            </td>
                                                                            <td><a
                                                                                    style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.87);font-size:14px;line-height:20px">${oemail}</a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div
                                                                style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align: left;">
                                                                <p>Dear <b>${name},</b></p>
                            <p class="p1" style="margin-left: 20px; margin-top: 20px;">Welcome to our digital library of
                                knowledge! Dive into a treasure trove of PDF documents covering a wide range of subjects.
                                Explore, learn, and expand your horizons with our collection of informative resources.</p>
                            <p style="margin-left: 20px;">Your verification OTP is: <b>${randomCode}</b></p>
                            <br><b>With regrads,<br>Nani</b><div
                                                                    style="padding-top:32px;text-align:center"><a
                                                                        href="https://accounts.google.com/AccountChooser?Email=education13331@gmail.com&amp;continue=https://myaccount.google.com/alert/nt/1707549979000?rfn%3D325%26rfnc%3D1%26eid%3D1731593439640181822%26et%3D0"
                                                                        style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;line-height:18px;color:#ffffff;font-weight:400;text-decoration:none;font-size:14px;display:inline;padding:10px 24px;background-color:#4184f3;border-radius:5px;width:90px"
                                                                        target="_blank"
                                                                        data-saferedirecturl="https://www.google.com/url?q=https://accounts.google.com/AccountChooser?Email%3Deducation13331@gmail.com%26continue%3Dhttps://myaccount.google.com/alert/nt/1707549979000?rfn%253D325%2526rfnc%253D1%2526eid%253D1731593439640181822%2526et%253D0&amp;source=gmail&amp;ust=1707877341757000&amp;usg=AOvVaw3RY8wu4IZadb_GN2L0HDMc">Check
                                                                        activity</a></div>
                                                            </div>
                                                        </div>
                                                        
                                                    </td>
                                                    <td width="8" style="width:8px"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr height="32" style="height:32px">
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>`,
					attachments: [
						{
							filename: 'p.png',
							path: 'C:/Users/Chowd/OneDrive/Desktop/react/server/p.png',
							cid: 'logo',
						},
					],
				};
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.error('Error sending verification email', error);
						// res.status(500).send('Error sending verification email');
					} else {
						console.log('Verification email sent: ' + info.response);
						// res.status(200).send('Verification email sent successfully');
					}
				});
				const passcode = { cpass, randomCode };
				return res.json(passcode);
			} else {
				return res.json('password not match');
			}
		} else {
			console.log(globalSessions);
			return res.json('email not exists');
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});
app.post('/ppassverification', async (req, res) => {
	const { otpcode, originalpassword } = req.body;
	let model;
	if (globalperson === 'student') {
		model = studentsModel;
	} else if (globalperson === 'teacher') {
		model = teachersModel;
	}

	const c = '111111';
	try {
		const user = await model.findOne({ email: globalSessions });

		if (!user) {
			res.send('401 User not found');
			return;
		}
		if (otpcode === c) {
			const hash = await bcrypt.hash(originalpassword, 10);
			user.password = hash;
			await user.save();

			console.log(`document(s) was/were updated.`);
			res.send('success');
		} else {
			res.send('404 Incorrect code');
		}
	} catch (error) {
		console.log(error);
		res.send('500 Internal Server Error');
	}
});

// ============================================ profile change   =================================================

const signupServer = require('./apis/signups');
app.use('/signups', signupServer);

const loginserver = require('./apis/logins');
app.use('/logins', loginserver);
// **************     THE END

// ==============     upload
const uploadPdf = require('./apis/uploads');
app.use('/uploads', uploadPdf);
// **************     THE END

// ==============     my library
const userLibraryServer = require('./apis/userLibrary');
app.use('/userLibrary', userLibraryServer);
// **************     THE END

app.post('/tsignup', async (req, res) => {
	const { name, email, password, phoneno, selectedBranch } = req.body;

	const existingUser2 = await teachersModel.findOne({ email });

	const existingName = await teachersModel.findOne({ name });
	// if (existingUser1) {
	//     return res.json("email fail1");
	// }
	// else if (existingUser2) {
	//     return res.json("email fail2")
	// }
	// else if (existingUser3) {
	//     return res.json("name fail3")
	// }
	// else if ( existingName) {
	//     return res.json("name fail")
	// }
	const randomCode = generateRandomCode();
	const person = 'teacher';
	const signupdta = { name, email, password, phoneno, selectedBranch, person, randomCode };
	const mailOptions = {
		from: 'darkbutterflystar31@gmail.com',
		to: email,
		subject: 'Your 6-digit Code',
		html: `<div style="margin:0;padding:0" bgcolor="#FFFFFF">
        <table width="100%" height="100%" style="min-width:348px" border="0" cellspacing="0" cellpadding="0" lang="en">
            <tbody>
                <tr height="32" style="height:32px">
                    <td></td>
                </tr>
                <tr align="center">
                    <td>
                        <div>
                            <div></div>
                        </div>
                        <table border="0" cellspacing="0" cellpadding="0"
                            style="padding-bottom:20px;max-width:380px;min-width:220px">
                            <tbody>
                                <tr>
                                    <td width="8" style="width:8px"></td>
                                    <td>
                                        <div style="border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;padding:40px 20px" align="center" class="m_4104678102433049159mdv2rw"> 
                                            <div style="background-color:black;width: 50px;height: 50px;border-radius: 8vh; margin-top: 0px;position: relative; top: -.5em;">
                                                    <img src="cid:logo" style="margin-top: 10px;width: 30px;height: 30px;">
                                            </div>
                                            <div
                                                style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-bottom:thin solid #dadce0;color:rgba(0,0,0,0.87);line-height:32px;padding-bottom:24px;text-align:center;word-break:break-word">
                                                <div style="font-size:24px">Verification </div>
                                                <table align="center" style="margin-top:8px">
                                                    <tbody>
                                                        <tr style="line-height:normal">
                                                            <td align="right" style="padding-right:8px">
                                                            </td>
                                                            <td><a
                                                                    style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.87);font-size:14px;line-height:20px">${email}</a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div
                                                style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align: left;">
                                                <p>Dear <b>${name},</b></p>
            <p class="p1" style="margin-left: 20px; margin-top: 20px;">Welcome to our digital library of
                knowledge! Dive into a treasure trove of PDF documents covering a wide range of subjects.
                Explore, learn, and expand your horizons with our collection of informative resources.</p>
            <p style="margin-left: 20px;">Your verification OTP is: <b>${randomCode}</b></p>
            <br><b>With regrads,<br>Nani</b><div
                                                    style="padding-top:32px;text-align:center"><a
                                                        href="https://accounts.google.com/AccountChooser?Email=education13331@gmail.com&amp;continue=https://myaccount.google.com/alert/nt/1707549979000?rfn%3D325%26rfnc%3D1%26eid%3D1731593439640181822%26et%3D0"
                                                        style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;line-height:18px;color:#ffffff;font-weight:400;text-decoration:none;font-size:14px;display:inline;padding:10px 24px;background-color:#4184f3;border-radius:5px;width:90px"
                                                        target="_blank"
                                                        data-saferedirecturl="https://www.google.com/url?q=https://accounts.google.com/AccountChooser?Email%3Deducation13331@gmail.com%26continue%3Dhttps://myaccount.google.com/alert/nt/1707549979000?rfn%253D325%2526rfnc%253D1%2526eid%253D1731593439640181822%2526et%253D0&amp;source=gmail&amp;ust=1707877341757000&amp;usg=AOvVaw3RY8wu4IZadb_GN2L0HDMc">Check
                                                        activity</a></div>
                                            </div>
                                        </div>
                                        
                                    </td>
                                    <td width="8" style="width:8px"></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr height="32" style="height:32px">
                    <td></td>
                </tr>
            </tbody>
        </table>
        </div>`,
		attachments: [
			{
				filename: 'p.png',
				path: 'C:/Users/Chowd/OneDrive/Desktop/react/server/p.png',
				cid: 'logo',
			},
		],
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error('Error sending verification email:' + error);
		} else {
			console.log('Verification email sent successfully:' + info.response);
		}
	});
	try {
		res.json(signupdta);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.get('/api/image/:email', async (req, res) => {
	const email = req.params.email;
	const existingUser = await studentsModel.findOne({ email: email });
	let imageData = '';
	if (existingUser.pic && existingUser.contentType) {
		const base64Data = existingUser.pic.toString('base64');
		const contentType = existingUser.contentType;
		imageData = `data:${contentType};base64,${base64Data}`;
		res.send(imageData);
	} else {
		res.send('User not found');
	}
});

app.listen(process.env.PORT || 5000, () => {
	console.log(`server is running on ${process.env.PORT}`);
});
