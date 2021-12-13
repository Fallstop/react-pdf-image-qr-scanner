
import React, { useCallback, useEffect, useRef, useState, ReactDOM } from "react";

import FileUploader from "./FileUploader";

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import * as pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";

import jsQR from "jsqr";


function Canvas({ pdfFile }) {
	const canvasRef = useRef();
	pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

	const [pdfRef, setPdfRef] = useState();


	const renderPage = useCallback((pageNum, pdf = pdfRef) => {
		console.log("renderPage", pageNum, pdf);
		pdf && pdf.getPage(pageNum).then(async function (page) {
			const viewport = page.getViewport({ scale: 1.5 });
			const canvas = canvasRef.current;
			
			// A4 at 300dpi resolution
			canvas.height = 3508;
			canvas.width = 2480;

			const ctx = canvas.getContext('2d');

			const renderContext = {
				canvasContext: ctx,
				viewport: viewport
			};
			await page.render(renderContext).promise;
			console.log(canvas);
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			console.log("JSQR Data",jsQR(imageData.data, canvas.width, canvas.height));
		});
	}, [pdfRef]);

	useEffect(() => {
	}, [pdfRef, renderPage]);

	useEffect(async() => {
		let pdfArrayBuffer =await new Response(pdfFile).arrayBuffer();
		console.log("pdfArrayBuffer",pdfArrayBuffer)

		let typedArray = new Uint8Array(pdfArrayBuffer);

		const loadingTask = pdfjsLib.getDocument(typedArray);
		loadingTask.promise.then(loadedPdf => {
			setPdfRef(loadedPdf);
			renderPage(1, loadedPdf);
			console.log("loaded");
		}, function (reason) {
			console.error(reason);
		});
	}, [pdfFile]);
	return <canvas ref={canvasRef}></canvas>;
}

class PDFScanner extends React.Component {
	constructor(props) {
		super(props);


		this.state = {
			canvasElement: <div/>
		};
	}

	loadCanvas(file) {
		console.log("Adding to ");
		this.setState({
			canvasElement: <Canvas pdfFile={file} />
		})
	}

	render() {
		return (
			<div>
				<div style={{display: "none"}}>{this.state.canvasElement}</div>
				<FileUploader onFileSelectError={(err) => { console.log(err); }} onFileSelectSuccess={(file)=>{this.loadCanvas(file)}} />
			</div>
		);
		}
}
export default PDFScanner;
