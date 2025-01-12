const express = require('express');
const router = express.Router();

const { deleteDcoument } = require('../../controllers/documentController/deleteDocumentController');

router.post('/', deleteDcoument);

module.exports = router;
