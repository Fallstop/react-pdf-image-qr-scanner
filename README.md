# react-pdf-image-qr-scanner

> This is a component to scan user uploaded PDF&#x27;s and Images for QR-Codes

[![NPM](https://img.shields.io/npm/v/react-pdf-image-qr-scanner.svg)](https://www.npmjs.com/package/react-pdf-image-qr-scanner) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo
There is a demo available [here](https://react-pdf-qr-scanner.pages.dev/). The source of the demo is in the `/example` folder.

## Install

```bash
yarn add react-pdf-image-qr-scanner
npm install --save react-pdf-image-qr-scanner
```

## Usage

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

## License

MIT © [Fallstop](https://github.com/Fallstop)
