const jwt = require('jsonwebtoken');

exports.generateAccessToken = (username, person) => {
	try {
		if (!process.env.JWT_ACCESS_TOKEN_SECRET_KEY) {
			throw new Error('Missing JWT access token secret key.');
		}

		return jwt.sign({ username, person }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, { expiresIn: '10s' });
	} catch (error) {
		console.error('Error generating access token:', error.message);
		throw new Error('Could not generate access token.');
	}
};

exports.generateRefreshToken = (username, person) => {
	try {
		if (!process.env.JWT_REFRESH_TOKEN_SECRET_KEY) {
			throw new Error('Missing JWT refresh token secret key.');
		}

		return jwt.sign({ username, person }, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' });
	} catch (error) {
		console.error('Error generating refresh token:', error.message);
		throw new Error('Could not generate refresh token.');
	}
};
