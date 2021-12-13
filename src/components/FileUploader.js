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
    const [fileName, setFileName] = useState("");

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
            setFileName(file.name);
            onFileSelectSuccess(file);
        }
    };

    return (
        <div className="file-uploader">
            <StyledFileName>{fileName}</StyledFileName>

            <StyledFileUploader>
                <input style={{display: "none"}} type="file" onChange={handleFileInput} accept=".pdf"/>
                Choose PDF
            </StyledFileUploader>
        </div>
    );
};