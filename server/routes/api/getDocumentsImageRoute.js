const express = require('express');
const router = express.Router();

const { getDocumentsImages } = require('../../controllers/documentController/getDocumentsImageController');

router.post('/', getDocumentsImages);

module.exports = router;
