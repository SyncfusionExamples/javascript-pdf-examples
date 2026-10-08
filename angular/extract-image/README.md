# How to Extract Images from a PDF Document Using the JavaScript PDF Library 

This sample demonstrates how to extract images from a PDF document using the `Syncfusion JavaScript PDF Library`.

## Features Demonstrated

This sample shows how to:

- Load an existing PDF document from a URL.
- Extract images from all pages in a PDF document.
- Access the extracted image data.
- Convert extracted image data into a downloadable image file.
- Save and download the redacted PDF document.
- Download the extracted image to the local machine.
- Release resources after processing the PDF document.

## Project Structure

### app.ts

The `extractImage()` method performs the following operations:

- Downloads the input PDF document from a specified URL.
- Loads the PDF document using the `PdfDocument` class.
- Creates a `PdfDataExtractor` instance.
- Extracts images from all pages in the PDF document.
- Accesses the extracted image data.
- Converts the image data into a Blob object.
- Creates a downloadable image file.
- Downloads the extracted image.
- Releases resources after processing.

The `canvasRenderCallback()` helper method performs the following operations:

- Creates a canvas element required for image extraction.
- Returns the canvas configuration used by the PDF Data Extractor.

The `getInputBytes()` helper method performs the following operations:

- Downloads the PDF document from the specified URL.
- Converts the document content to a `Uint8Array`.
- Returns the PDF data for further processing.

### app.html

The user interface includes:

- A **Extract Image** button.
- A simple layout to trigger the image extraction operation.

When the `Extract Image` button is clicked, the application extracts the images from the PDF document and downloads the first extracted image automatically.

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

Click the `Extract Image` button to extract images from the PDF document. The first extracted image will be downloaded automatically.

## Additional Resources

### Documentation

[JavaScript PDF Library Documentation](https://help.syncfusion.com/document-processing/pdf/pdf-library/javascript/image-extraction)

### Online Demos

[JavaScript PDF Library Demos](https://document.syncfusion.com/demos/pdf/angular/#/tailwind3/pdf/extract-image)

### Product Page

[JavaScript PDF Library Product Page](https://www.syncfusion.com/document-sdk/javascript-pdf-library)