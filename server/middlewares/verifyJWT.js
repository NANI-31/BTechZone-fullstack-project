const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
	console.log('verifyJWT middleware triggered');
	const authHeader = req.headers['Authorization'] || req.headers['authorization'];
	const tokenn = authHeader.split(' ')[1];

	console.log('authHeader::: ');
	console.log(authHeader.slice(-10));
	// const token = req.cookies.jwt;
	console.log('tokenn::: ');
	console.log(tokenn.slice(-10));
	// if (!token) {
	// console.log('No token');
	// return res.status(401).json({ message: 'Not authenticated' });
	// }
	try {
		const decoded = jwt.verify(tokenn, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
		// console.log(decoded);
		console.log('decoded');
		next();
	} catch (error) {
		console.log('Invalid token: ', error);
		res.status(403).json({ message: 'Invalid token' });
	}
};

// const verifyJWT = (req, res, next) => {
// 	const authHeader = req.headers.authorization || req.headers.Authorization;
// 	const authHeader = req.headers['Authorization'];
// 	console.log('authHeader: ', authHeader);
// 	if (!authHeader?.startsWith('Bearer ')) {
// 		console.log('verifyJWT');
// 		console.log('No token verify jwt 401');
// 		return res.sendStatus(401);
// 	}
// 	const token = authHeader.split(' ')[1];
// 	console.log('verify: ', token);
// 	jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
// 		if (err) {
// 			console.log(err);
// 			return res.sendStatus(403);
// 		} //invalid token
// 		req.user = decoded.UserInfo.username;
// 		req.person = decoded.UserInfo.person;
// 		console.log('verifyJWT middleware triggered');
// 		next();
// 	});
// };

module.exports = verifyJWT;
