const express = require('express');
const dotenv = require('dotenv');
const cokkieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
require('./config/db');

const app = express();
app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:3000',
	})
);
app.use(cokkieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
	const { name, age } = req.body;

	res.send('name: ' + name + ' age: ' + age);
});

app.listen(process.env.PORT || 5000, () => {
	console.log(`server is running on ${process.env.PORT}`);
});

// NG25
