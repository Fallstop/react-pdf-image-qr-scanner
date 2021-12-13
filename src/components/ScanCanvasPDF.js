import {useRef, forwardRef, useImperativeHandle } from "react";

import jsQR from "jsqr";

import {GlobalWorkerOptions, getDocument} from "pdfjs-dist/legacy/build/pdf.js";
import * as pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";


/**
  * Scans a PDF file and returns the QR codes found in the file.
  * Start a scan using the `scanPDF` method.
 */
const ScanCanvasPDF = forwardRef((_, ref) => {
	GlobalWorkerOptions.workerSrc = pdfjsWorker;

	const canvasRef = useRef();

	useImperativeHandle(ref, () => ({

		/**
		 * Scan PDF file and return QR code data.
		 * 
		 * @param {File} PDFFile 
		 * @returns {Promise<string?>}
		 */

		async scanPDF(PDFFile) {
			// async read of selected PDF file
			let pdfArrayBuffer = await new Response(PDFFile).arrayBuffer();
			let pdfTypedArray = new Uint8Array(pdfArrayBuffer);

			// PDF.js is used to parse the PDF file from the typed array.
			const loadedPDF = await getDocument(pdfTypedArray).promise;
			
			return await renderPDF(loadedPDF);
		}
	}));


	/**
	 * Render PDF to canvas, and scans the QR code using the Canvas data.
	 * @param {Uint8Array} pdfData PDF data to be scanned.
	 * @return {string?} QR code data.
	 */

	async function renderPDF(pdfTypedArray) {

		// Current implementation only renders first page.
		const pageToRender = 1;

		const page = await pdfTypedArray.getPage(pageToRender)

		const viewport = page.getViewport({ scale: 1.5 });

		console.log(canvasRef)
		const canvas = canvasRef.current;

		// Simulation of A4 at 300dpi resolution
		canvas.height = 3508;
		canvas.width = 2480;

		const renderContext = {
			canvasContext: canvas.getContext('2d'),
			viewport: viewport
		};

		await page.render(renderContext).promise;

		// PDF Page is now fully rendered to canvas, so we can now extract the QR code.
		return extractQRCode(canvas);
	}

	/**
	 * Extracts QR code from canvas.
	 * @param {HTMLCanvasElement} canvas Canvas element to extract QR code from.
	 */

	function extractQRCode(canvas) {
		const ctx = canvas.getContext('2d');
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const qrData = jsQR(imageData.data, canvas.width, canvas.height);
		return qrData?.data || null;
	}

	return (
		<div style={{display: "none"}}>
			<canvas ref={canvasRef}></canvas>
		</div>
	);
});

export default ScanCanvasPDF;