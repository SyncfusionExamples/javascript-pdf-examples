# How to Split a PDF Document in the JavaScript PDF Library 

This sample demonstrates how to split a PDF document using the `Syncfusion JavaScript PDF Library`.

## Features Demonstrated

This sample shows how to:

- Load an existing PDF document from a URL.
- Split a PDF document into individual pages.
- Split a PDF document by specified page ranges.
- Split a PDF document into smaller documents with a fixed number of pages.
- Save and download the generated PDF documents.
- Handle split operations using the document split event.
- Release resources after processing the PDF document.

## Project Structure

### app.ts

The `splitIntoIndividualPages()` method performs the following operations:

- Loads the input PDF document.
- Splits the document into individual pages.
- Generates a separate PDF document for each page.
- Downloads each generated PDF file.
- Releases resources by destroying the PDF document instance.

The `splitPageRange()` method performs the following operations:

- Loads the input PDF document.
- Splits the document based on the specified page ranges.
- Creates a separate PDF document for each page range.
- Downloads the generated PDF files.
- Releases resources after processing.

The `splitFixedNumber()` method performs the following operations:

- Loads the input PDF document.
- Splits the document into smaller PDF documents containing a fixed number of pages.
- Downloads each generated PDF file.
- Releases resources after processing.

The `documentSplitEvent()` event handler:

- Receives the generated PDF document data.
- Converts the document data to a `Uint8Array`.
- Creates a Blob object from the PDF data.
- Downloads the generated PDF document.

The `getInputBytes()` helper method:

- Downloads the PDF document from the specified URL.
- Converts the document to a `Uint8Array`.
- Returns the PDF data for further processing.

### app.html

The user interface includes:

- A **Split into Individual Pages** button.
- A **Split by Page Range** button.
- A **Split by Fixed Number** button.
- A simple layout to trigger the split operations.

When a button is clicked, the application performs the selected split operation and downloads the generated PDF files.

## Prerequisites

Ensure the following software is installed:

- Node.js
- Angular CLI

## Installation

Install the Syncfusion JavaScript PDF Library package:

```bash
npm install @syncfusion/ej2-pdf
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

Use one of the available buttons to perform the desired split operation. The generated PDF documents will be downloaded automatically.

## Additional Resources

### Documentation

[JavaScript PDF Library Documentation](https://help.syncfusion.com/document-processing/pdf/pdf-library/javascript/split-documents)

### Online Demos

[JavaScript PDF Library Demos](https://document.syncfusion.com/demos/pdf/angular/#/tailwind3/pdf/split-pdf)

### Product Page

[JavaScript PDF Library Product Page](https://www.syncfusion.com/document-sdk/javascript-pdf-library)