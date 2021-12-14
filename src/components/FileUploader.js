import React, {useState} from 'react';

import styled from 'styled-components';

const StyledFileUploader = styled.label`
    display: block;
    border: 1px solid #4CAF50;
    display: inline-block;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    color: #4CAF50;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #4CAF50;
        color: #fff;
    }
    &:active {
        transform: translateY(2px);
    }
`;

const StyledFileName = styled.span`
    display: block;
    font-size: 1rem;
    margin-bottom: 1rem;
`;

/**
 * ImageUploader Success callback.
 *
 * @callback onFileSelectSuccess
 * @param {File} file - The image file.
 */

/**
 * ImageUploader Error callback.
 *
 * @callback onFileSelectError
 * @param {object} error - Error Object.
 * @param {string} error.error - Error Message.
 */

/**
 * ImageUploader
  * @param {object} props ImageUploader Props.
  * @param {onFileSelectSuccess} props.onFileSelectSuccess Success Handler.
  * @param {onFileSelectError} props.onFileSelectError The email of the user.
 */
export default function ImageUploader({ onFileSelectSuccess, onFileSelectError }) {

    // MIME Types to allow for upload.
    const supportedFiles = ['application/pdf','image/png','image/jpeg'];
    // Splitting the end of the string to get the file extension is not the best way to do this.
    // Will break for MIME's like SVG 'image/svg+xml'.
    const supportedFileEnds = supportedFiles.map(file => file.split('/')[1]).join(', ');

    const [fileName, setFileName] = useState("");

    /**
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const handleFileInput = (e) => {
        // Makes sure it's the correct file type.
        const file = e.target.files[0];
        if (supportedFiles.includes(file.type)) {
            setFileName(file.name);
            onFileSelectSuccess(file);
        } else {
            onFileSelectError({ error: "File must be a PDF" });
        }
    };

    return (
        <div className="file-uploader">
            <StyledFileName>{fileName}{fileName==="" && `Supports: ${supportedFileEnds}`}</StyledFileName>

            <StyledFileUploader>
                <input style={{display: "none"}} type="file" onChange={handleFileInput} accept={supportedFiles.join(",")}/>
                Choose File
            </StyledFileUploader>
        </div>
    );
};