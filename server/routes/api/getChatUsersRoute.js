const express = require('express');
const router = express.Router();

const { getUserDetails } = require('../../controllers/chats/userDetailsController');

router.get('/', getUserDetails);

module.exports = router;
