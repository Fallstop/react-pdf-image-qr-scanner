## react-pdf-image-qr-scanner


# **Moved To [`openhealthnz-credentials/pdf-image-qr-scanner`](https://github.com/openhealthnz-credentials/pdf-image-qr-scanner)**

It was made framework agnostic, and moved to a new organisation. The new version has massive breaking changes, but has much better scanning abilites.


<hr/>
<br/><br/><br/><br/>



> This is a component to scan user uploaded PDF&#x27;s and Images for QR-Codes

[![NPM](https://img.shields.io/npm/v/react-pdf-image-qr-scanner.svg?style=flat-square)](https://www.npmjs.com/package/react-pdf-image-qr-scanner)

<h2 align="center">
	Demo
</h2>

There is a demo available [here](https://react-pdf-image-qr-scanner.pages.dev/). The source of the demo is in the `/example` folder.

<h2 align="center">
	Install
</h2>

```bash
yarn add react-pdf-image-qr-scanner
npm install --save react-pdf-image-qr-scanner
```
<h2 align="center">
	Usage
</h2>

```jsx
import React from 'react';

import ScanCanvasQR from 'react-pdf-image-qr-scanner';

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
			if (e?.name === "InvalidPDFException") {
				setResultText("Invalid PDF");
			} else if (e instanceof Event) {
				setResultText("Invalid Image");
			} else {
				console.log(e);
				setResultText("Unknown error");
			}
		}
	}

	return (
		<div>
			<ScanCanvasQR ref={canvasScannerRef} />
			<input type="file" onChange={(e) => { scanFile(e.target.files[0]); }} />
		</div>
	);
}
```
