import React, { useRef, useState } from "react";
import {InvalidPDFException} from "pdfjs-dist/legacy/build/pdf.js";


import './App.css';

import ScanCanvasPDF from "./components/ScanCanvasPDF";
import FileUploader from "./components/FileUploader";


function App() {
	const pdfScannerRef = useRef();

	const [resultText, setResultText] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);

	async function scanPDF() {
		try {
			const qrCode = await pdfScannerRef.current.scanPDF(selectedFile);
			// It returns null if no QR code is found
			setResultText(qrCode || "No QR code found");
		} catch (e) {

			// Example Error Handling
			if (e instanceof InvalidPDFException) {
				setResultText("Invalid PDF");
			} else {
				setResultText("Unknown error");
			}
		}

	}

	return (
		<div className="App">
			<header className="App-header">
				<ScanCanvasPDF ref={pdfScannerRef}/>
				<FileUploader onFileSelectError={(err) => { console.log(err); }} onFileSelectSuccess={(file)=>{setSelectedFile(file)}} />
				<button onClick={scanPDF} disabled={selectedFile===null}>
					Scan PDF
				</button>
				<span style={{height: "40vh", width: "50vw", fontSize: "0.8rem", overflowWrap: "anywhere", overflow: "auto", border: "white solid 1px"}}>{resultText}</span>
			</header>
		</div>
	);
}

export default App;
