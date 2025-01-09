require('dotenv').config();
const jwt = require('jsonwebtoken');
const teachersDetails = require('../schemas/teachers/teachersDetails');

exports.persist = async (req, res) => {
	try {
		const token = req.cookies.jwt || '';
		const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET_KEY);
		const username = decoded.username;

		const user = await teachersDetails.findOne({ name: username }).select('-password');
		if (!user) {
			console.log('user data not found');
			return res.status(404).json({ message: 'User not found' });
		}
		// send the user data to the client
		res.status(200).json({ user });
	} catch (error) {
		console.error('persist error: ', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
