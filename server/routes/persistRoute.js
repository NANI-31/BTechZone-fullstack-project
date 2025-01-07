const express = require('express');
const router = express.Router();
const { persist } = require('../controllers/persistController');

router.get('/', persist);

module.exports = router;
