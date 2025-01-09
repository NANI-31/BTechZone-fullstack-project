const express = require('express');
const router = express.Router();
const { deleteAccount } = require('../controllers/deleteAccountController');

router.post('/', deleteAccount);

module.exports = router;
