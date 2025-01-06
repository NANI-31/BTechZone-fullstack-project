const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
	const token = req.cookies.jwt;
	console.log(token);
	if (!token) {
		console.log('No token');
		return res.status(401).json({ message: 'Not authenticated' });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		console.log(decoded);
		console.log('decoded');
		req.username = decoded.username;
		next();
	} catch (error) {
		console.log('Invalid token');
		res.status(401).json({ message: 'Invalid token' });
	}
};

// const verifyJWT = (req, res, next) => {
// 	console.log('verifyJWT middleware triggered');
// 	const authHeader = req.headers.authorization || req.headers.Authorization;
// 	if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
// 	const token = authHeader.split(' ')[1];
// 	console.log(token);
// 	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
// 		if (err) return res.sendStatus(403); //invalid token
// 		req.user = decoded.UserInfo.username;
// 		req.person = decoded.UserInfo.person;
// 		next();
// 	});
// };

module.exports = verifyJWT;
