const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.MONGO_DB_URI;

mongoose
	.connect(DB)
	.then(() => console.log('DATABASE connected'))
	.catch((err) => console.log('error : ' + err.message));

// mongoose.connect(DB);
// const db = mongoose.connection;
// db.on('connected', () => {
// 	console.log('DATABASE connected');
// });

// db.on('error', (err) => {s
// 	console.log('DATABASE connection error:', err);
// });

// db.on('disconnected', () => {
// 	console.log('Mongoose is disconnected from the DATABASE');
// });
