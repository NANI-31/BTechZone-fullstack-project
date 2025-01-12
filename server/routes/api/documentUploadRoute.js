const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// const upload = multer({ dest: 'uploads/' });

const { uploadPdfHandler } = require('../../controllers/documentController/pdfUploadController');

router.post('/', upload.single('pdfFile'), uploadPdfHandler);

module.exports = router;
