const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const studentsModel = require('../schemas/students/studentsDetails');
const teachersModel = require('../schemas/teachers/teachersDetails');

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user1 = await studentsModel.findOne({ email });
		const user2 = await teachersModel.findOne({ email });

		let user;
		if (user1) {
			user = user1;
		} else if (user2) {
			user = user2;
		} else {
			return res.json('User not registered');
		}
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (passwordMatch) {
			req.session.email = email;
			req.session.globalperson = user.person;
			// globalperson = user==user1? 'student': 'teacher';
			// console.log(globalSessions, globalperson)
			console.log(req.session.email, req.session.globalperson);

			let imageData = '';
			if (user.pic && user.contentType) {
				const base64Data = user.pic.toString('base64');
				const contentType = user.contentType;
				imageData = `data:${contentType};base64,${base64Data}`;
			}
			const responseData = {
				name: user.name,
				email: user.email,
				phoneno: user.phoneno,
				year: user.year,
				sem: user.semester,
				branch: user.branch,
				person: user.person,
			};
			if (imageData) {
				responseData.pic = imageData;
			}

			res.json(responseData);
		} else {
			return res.send('Incorrect password');
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json('Internal server error');
	}
});
module.exports = router;
