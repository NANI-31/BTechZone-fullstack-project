import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfFile from './1.pdf';

// import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs';
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

const DisplayDocument = () => {
	// const pdfFile = './1.pdf';
	const [numPages, setNumPages] = useState();
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	return (
		<div className="pdf-div">
			<p>
				Page {pageNumber} of {numPages || '?'}
			</p>
			<div style={{ border: '1px solid red', width: '52%', height: '100%' }}>
				<Document
					style={{ border: '1px solid red', width: '10%', height: '100%' }}
					file={pdfFile}
					onLoadSuccess={onDocumentLoadSuccess}
					onLoadError={(error) => console.error('Error loading PDF:', error)}
				>
					{Array.from({ length: numPages || 0 }, (_, index) => (
						<Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} />
					))}
				</Document>
			</div>
		</div>
	);
};

export default DisplayDocument;
