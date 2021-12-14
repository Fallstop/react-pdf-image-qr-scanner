import React, { useRef, useState } from "react";
import {InvalidPDFException} from "pdfjs-dist/legacy/build/pdf.js";

import './App.css';

import ScanCanvasImage from "./components/ScanCanvasImage";
import ImageUploader from "./components/FileUploader";

function App() {
	const canvasScannerRef = useRef();

	const [resultText, setResultText] = useState("");

	async function scanFile(selectedFile) {
		setResultText("");
		try {
			const qrCode = await canvasScannerRef.current.scanFile(selectedFile);
			// It returns null if no QR code is found
			setResultText(qrCode || "No QR code found");
		} catch (e) {

			// Example Error Handling
			if (e instanceof InvalidPDFException) {
				setResultText("Invalid PDF");
			} else if (e instanceof Event) {
				setResultText("Invalid Image");
			} else {
				console.log(e)
				setResultText("Unknown error");
			}
		}

	}

	return (
		<div className="App">
			<header className="App-header">
				React File QR Scanner
			</header>
			<ScanCanvasImage ref={canvasScannerRef}/>
				<ImageUploader onFileSelectError={(err) => { console.log(err); }} onFileSelectSuccess={(file)=>{scanFile(file)}} />
				<span style={{height: "40vh", width: "50vw", fontSize: "0.8rem", overflowWrap: "anywhere", overflow: "auto", border: "white solid 1px"}}>{resultText}</span>

		</div>
	);
}

export default App;
