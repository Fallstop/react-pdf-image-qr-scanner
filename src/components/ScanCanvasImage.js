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
		 * @param {File} FileHandle - File handle of the PDF/Image file to scan. 
		 * @returns {Promise<string?>} QR Code Data.
		 */

		async scanFile(FileHandle) {
			// async read of selected PDF file
			let uploadedFile = new Response(FileHandle);

			if (FileHandle.type === "application/pdf") {
				// PDF.js is used to parse the PDF file from the typed array.
				const pdfTypedArray = new Uint8Array(await uploadedFile.arrayBuffer());
				const loadedPDF = await getDocument(pdfTypedArray).promise;
				
				return await renderPDF(loadedPDF);
			} else {
				// It's an image, so we use the canvas to render the image.
				const imageBlob = await uploadedFile.blob();
				return await renderImage(imageBlob);
			}

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
	 * Wrapper for new Image() to load image from blob.
	 * Needed to make it compatible with Async/Await.
	 * @param {Blob} imageBlob 
	 * @returns {Promise<Image>}
	 */

	function generateImageObject(imageBlob) {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.onload = () => resolve(image);
			image.onerror = reject;
			image.src = URL.createObjectURL(imageBlob);
		})
	}
		

	/**
	 * Takes image file, creates Image, then renders it on a canvas, and finally extracts the QRCode data
	 * @param {Blob} imageBlob
	 * @return {string?} QR code data.
	 */
	async function renderImage(imageBlob) {
		let image = await generateImageObject(imageBlob);

		const canvas = canvasRef.current;
		canvas.height = image.height;
		canvas.width = image.width;

		const context = canvas.getContext('2d');
		context.drawImage(image, 0, 0);

		return extractQRCode(canvas);
	}

	/**
	 * Extracts QR code from canvas.
	 * @param {HTMLCanvasElement} canvas Canvas element to extract QR code from.
	 * @return {string?} QR code data.
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