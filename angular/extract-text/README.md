# How to Extract Text from a PDF Document Using the JavaScript PDF Library

This sample demonstrates how to extract text from a PDF document using the `Syncfusion JavaScript PDF Library` and `PDF Data Extractor`.

## Features Demonstrated

This sample shows how to:

- Load an existing PDF document from a URL.
- Extract all text from a PDF document.
- Extract text from a specific page range.
- Extract text while preserving the document layout.
- Extract text lines along with their bounds and page information.
- Save and download the extracted text as a TXT file.
- Release resources after processing the PDF document.

## Project Structure

### app.ts

#### extractText()

The `extractText()` method performs the following operations:

- Downloads and loads the input PDF document.
- Creates a `PdfDataExtractor` instance.
- Extracts all text content from the PDF document.
- Saves the extracted text as a TXT file.
- Releases PDF resources after processing.

#### extractbyPageRange()

The `extractbyPageRange()` method performs the following operations:

- Loads the PDF document.
- Creates a `PdfDataExtractor` instance.
- Extracts text from the specified page range.
- Saves the extracted text as a TXT file.
- Releases PDF resources after processing.

#### extractLayout()

The `extractLayout()` method performs the following operations:

- Loads the PDF document.
- Creates a `PdfDataExtractor` instance.
- Extracts text while preserving the original document layout.
- Saves the extracted text as a TXT file.
- Releases PDF resources after processing.

#### extractTextLines()

The `extractTextLines()` method performs the following operations:

- Loads the PDF document.
- Creates a `PdfDataExtractor` instance.
- Extracts text lines from the specified page range.
- Retrieves text content, bounds, and page index information.
- Formats the extracted information into a readable text output.
- Saves the extracted data as a TXT file.
- Releases PDF resources after processing.

#### downloadTextFile()

The `downloadTextFile()` helper method performs the following operations:

- Creates a temporary object URL from a Blob.
- Creates an anchor element.
- Triggers the file download.
- Cleans up temporary resources after download.

#### getInputBytes()

The `getInputBytes()` helper method performs the following operations:

- Downloads the PDF document from the specified URL.
- Converts the document content into a `Uint8Array`.
- Returns the PDF data for further processing.

### app.html

The user interface includes the following buttons:

- **Extract Text**
- **Extract Text by Page Range**
- **Extract Text with Layout**
- **Extract Text Lines**

When a button is clicked, the corresponding text extraction operation is performed and the extracted content is downloaded as a TXT file.

## Prerequisites

Ensure the following software is installed:

- Node.js
- Angular CLI

## Installation

Install the Syncfusion packages:

```bash
npm install @syncfusion/ej2-pdf
npm install @syncfusionej2-pdf-data-extract
```

## Running the Application

Install the project dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
ng serve
```

Then open:

```text
http://localhost:4200/
```

Use any of the available buttons to perform the desired text extraction operation. The extracted content will be downloaded automatically as a text file.

## Additional Resources

### Documentation

[JavaScript PDF Library Documentation](https://help.syncfusion.com/document-processing/pdf/pdf-library/javascript/text-extraction)

### Online Demos

[JavaScript PDF Library Demos](https://document.syncfusion.com/demos/pdf/angular/#/tailwind3/pdf/extract-text)

### Product Page

[JavaScript PDF Library Product Page](https://www.syncfusion.com/document-sdk/javascript-pdf-library)