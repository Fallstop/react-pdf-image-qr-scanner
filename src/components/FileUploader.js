import React from 'react';

/**
 * File Uploader Success callback.
 *
 * @callback onFileSelectSuccess
 * @param {File} file - The PDF file.
 */

/**
 * File Uploader Error callback.
 *
 * @callback onFileSelectError
 * @param {object} error - Error Object.
 * @param {string} error.error - Error Message.
 */

/**
 * FileUploader
  * @param {object} props FileUploader Props.
  * @param {onFileSelectSuccess} props.onFileSelectSuccess Success Handler.
  * @param {onFileSelectError} props.onFileSelectError The email of the user.
 */
export default function FileUploader({ onFileSelectSuccess, onFileSelectError }) {
    /**
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file.type !== "application/pdf") {
            onFileSelectError({ error: "File must be a PDF" });
        } else {
            onFileSelectSuccess(file);
        }
    };

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput} accept=".pdf"/>
        </div>
    );
};