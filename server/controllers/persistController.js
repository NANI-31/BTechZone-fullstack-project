require('dotenv').config();
const jwt = require('jsonwebtoken');
const teachersDetails = require('../schemas/teachers/teachersDetails');

exports.persist = async (req, res) => {
	try {
		const token = req.cookies.jwt || '';
		const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
		const { username } = decoded.UserInfo;
		const user = await teachersDetails.findOne({ username });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		// send the user data to the client
		res.status(200).json(user);
	} catch (error) {
		console.error('persist error: ', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
