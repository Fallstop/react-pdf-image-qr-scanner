import React, { useRef, useState } from "react";
import {InvalidPDFException} from "pdfjs-dist/legacy/build/pdf.js";

import styled from 'styled-components';

import './App.css';

import ScanCanvasImage from "./components/ScanCanvasImage";
import ImageUploader from "./components/FileUploader";

const ScanButton = styled.button`
	background-color: #4CAF50;
	border: none;
	color: white;
	padding: 0.5rem 1rem;
	text-align: center;
	text-decoration: none;
	font-size: 1rem;
	cursor: pointer;
	margin: 1em;
	transition: all 0.3s ease-in-out;
	&:disabled {
		background-color: rgba(239, 239, 239, 0.3);
		cursor: default;
	}
	&:active {
        transform: translateY(2px);
    }
`


function App() {
	const canvasScannerRef = useRef();

	const [resultText, setResultText] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);

	async function scanFile() {
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
				<ImageUploader onFileSelectError={(err) => { console.log(err); }} onFileSelectSuccess={(file)=>{setSelectedFile(file)}} />
				<ScanButton onClick={scanFile} disabled={selectedFile===null}>
					Scan File
				</ScanButton>
				<span style={{height: "40vh", width: "50vw", fontSize: "0.8rem", overflowWrap: "anywhere", overflow: "auto", border: "white solid 1px"}}>{resultText}</span>

		</div>
	);
}

export default App;
