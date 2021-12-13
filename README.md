# React PDF QR Scanner

The React PDF QR Scanner is a simple React component that allows you to scan QR codes from a PDF file.

The scanning functionality is implemented in `/src/components/pdfScanner.js`. Have a look at `/src/App.js` to see how it is used. The file uploader (`/src/components/FileUploader.js`) can be swapped out for anything, and is completely dependent on your setup.

## Mandatory Extra Dependencies
 - `jsqr` (QR code scanner)
 - `pdfjs-dist` (PDF rendering)
 - `worker-loader` (peer dependency of `pdfjs-dist`)