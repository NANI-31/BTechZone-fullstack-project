const poppler = require('pdf-poppler');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

exports.convertPdfToImage = async (pdfBuffer) => {
	try {
		console.log('starting the conversion pdf to image...');
		// const tempFilePath = await fs.promises.mkdtemp(path.join(__dirname, 'uploads', 'temp-'));
		// fs.writeFileSync(tempFilePath, pdfBuffer);
		const tempFilePath = path.join(__dirname, 'uploads', `${Date.now()}-temp.pdf`);
		fs.writeFileSync(tempFilePath, pdfBuffer);

		// Ensure output directory exists
		const outputDir = path.join(__dirname, 'output_images');
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir);
		}

		const options = {
			format: 'jpeg',
			out_dir: outputDir,
			out_prefix: `output-${Date.now()}`,
			page: 1,
		};

		// Convert the first page of the PDF to an image
		await poppler.convert(tempFilePath, options);

		const outputFilePath = path.join(outputDir, `${options.out_prefix}-1.jpg`);
		const imageMimeType = mime.lookup(outputFilePath);

		console.log(imageMimeType);

		const imageBuffer = fs.readFileSync(outputFilePath);

		fs.unlinkSync(tempFilePath);
		fs.unlinkSync(outputFilePath);

		console.log('completed the conversion pdf to image...');

		return { imageBuffer, imageMimeType };
	} catch (error) {
		console.error('Error converting PDF to image:', error);
		throw error;
	}
};
