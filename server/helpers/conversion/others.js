const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

// Function to create a PDF from text
async function createPDF(text, outputFilePath) {
	const pdfDoc = await PDFDocument.create();
	const page = pdfDoc.addPage([600, 400]); // Width x Height
	const { width, height } = page.getSize();

	page.drawText(text, {
		x: 50,
		y: height - 50,
		size: 12,
		color: rgb(0, 0, 0),
	});

	const pdfBytes = await pdfDoc.save();
	fs.writeFileSync(outputFilePath, pdfBytes);
}
/////////////////////////////////////////////////////////////
const poppler = require('pdf-poppler');

// Function to convert PDF to image
async function convertPDFToImage(pdfFilePath, outputDir) {
	const options = {
		format: 'jpeg',
		out_dir: outputDir,
		out_prefix: `output-${Date.now()}`,
		page: 1, // First page
	};

	await poppler.convert(pdfFilePath, options);
	return path.join(outputDir, `${options.out_prefix}-1.jpg`);
}

////////////////////////////////////////////////////////////
app.post('/upload', async (req, res) => {
	try {
		const text = req.body.text; // Text to convert to PDF
		if (!text) {
			return res.status(400).send('No text provided');
		}

		// Step 1: Convert text to PDF
		const tempPDFPath = path.join(__dirname, 'uploads', `${Date.now()}-temp.pdf`);
		await createPDF(text, tempPDFPath);

		// Step 2: Convert PDF to image
		const outputDir = path.join(__dirname, 'output_images');
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir);
		}
		const imageFilePath = await convertPDFToImage(tempPDFPath, outputDir);

		// Step 3: Upload image to AWS S3
		// const contentType = mime.lookup(image
	} catch (e) {}
});

// const mime = require("mime-types");

// app.post("/upload", upload.single("pdf"), async (req, res) => {
//   try {
//     if (!req.file || !req.file.buffer) {
//       return res.status(400).send("File upload failed");
//     }

//     // Write buffer to a temporary file
//     const tempFilePath = path.join(__dirname, "uploads", ${Date.now()}-temp.pdf);
//     fs.writeFileSync(tempFilePath, req.file.buffer);

//     // Ensure output directory exists
//     const outputDir = path.join(__dirname, "output_images");
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir);
//     }

//     const options = {
//       format: "jpeg",
//       out_dir: outputDir,
//       out_prefix: output-${Date.now()},
//       page: 1,
//     };

//     // Convert the first page of the PDF to an image
//     await poppler.convert(tempFilePath, options);

//     const outputFilePath = path.join(outputDir, ${options.out_prefix}-1.jpg);

//     // Determine MIME type of the image
//     const contentType = mime.lookup(outputFilePath); // Returns 'image/jpeg'

//     // Read the image file as a buffer
//     const imageBuffer = fs.readFileSync(outputFilePath);

//     // Upload to AWS S3
//     const s3 = new AWS.S3();
//     const uploadParams = {
//       Bucket: "your-s3-bucket-name",
//       Key: images/${path.basename(outputFilePath)}, // Use the image file name
//       Body: imageBuffer,
//       ContentType: contentType, // Use the determined MIME type
//     };

//     const uploadResult = await s3.upload(uploadParams).promise();

//     // Clean up temporary files
//     fs.unlinkSync(tempFilePath);
//     fs.unlinkSync(outputFilePath);

//     res.json({ success: true, s3Url: uploadResult.Location });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error processing PDF");
//   }
// });         this is converting the first page of pdf to image. if the errors are comming for node-canvas. i would chnage the way as: convert the txt to pdf. and then extract the first page as image.
// ChatGPT said:
// ChatGPT
// If you want to switch from using node-canvas to a method where you first convert text to a PDF and then extract the first page as an image, you can achieve this using libraries like pdf-lib for PDF creation and pdf-poppler for PDF to image conversion.

// Here’s how you can modify your approach:

// 1. Convert Text to PDF
// Use the pdf-lib library to create a PDF from the text.

// javascript
// Copy code
// const { PDFDocument, rgb } = require("pdf-lib");
// const fs = require("fs");
// const path = require("path");

// // Function to create a PDF from text
// async function createPDF(text, outputFilePath) {
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([600, 400]); // Width x Height
//   const { width, height } = page.getSize();

//   page.drawText(text, {
//     x: 50,
//     y: height - 50,
//     size: 12,
//     color: rgb(0, 0, 0),
//   });

//   const pdfBytes = await pdfDoc.save();
//   fs.writeFileSync(outputFilePath, pdfBytes);
// }
// 2. Extract First Page as Image
// Use pdf-poppler to convert the first page of the generated PDF to an image.

// javascript
// Copy code
// const poppler = require("pdf-poppler");

// // Function to convert PDF to image
// async function convertPDFToImage(pdfFilePath, outputDir) {
//   const options = {
//     format: "jpeg",
//     out_dir: outputDir,
//     out_prefix: `output-${Date.now()}`,
//     page: 1, // First page
//   };

//   await poppler.convert(pdfFilePath, options);
//   return path.join(outputDir, `${options.out_prefix}-1.jpg`);
// }
// 3. Integrate into Express Route
// Combine the above functions in your POST /upload route.

// javascript
// Copy code
// app.post("/upload", async (req, res) => {
//   try {
//     const text = req.body.text; // Text to convert to PDF
//     if (!text) {
//       return res.status(400).send("No text provided");
//     }

//     // Step 1: Convert text to PDF
//     const tempPDFPath = path.join(__dirname, "uploads", `${Date.now()}-temp.pdf`);
//     await createPDF(text, tempPDFPath);

//     // Step 2: Convert PDF to image
//     const outputDir = path.join(__dirname, "output_images");
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir);
//     }
//     const imageFilePath = await convertPDFToImage(tempPDFPath, outputDir);

//     // Step 3: Upload image to AWS S3
//     const contentType = mime.lookup(image
