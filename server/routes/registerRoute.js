const express = require('express');
const router = express.Router();
const { signup, verifyEmail } = require('../controllers/registerController');

router.post('/signup', signup);
router.post('/verifyEmail', verifyEmail);

module.exports = router;
