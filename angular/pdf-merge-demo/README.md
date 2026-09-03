# Merging PDF Documents in the JavaScript PDF Library 

This sample demonstrates how to merge PDF documents using the `Syncfusion JavaScript PDF Library`.

## Features Demonstrated

This sample shows how to:

- Load existing PDF documents from URLs.
- Merge all pages from one PDF document into another.
- Import a selected range of pages at a specific position.
- Import individual pages with custom import options.
- Rotate imported pages during the merge process.
- Optimize resources while importing pages.
- Group form fields with identical names.
- Save and download the generated PDF document.

## Project Structure

### app.ts

The `mergePdfDocument()` method performs the following operations:

- Downloads the destination and source PDF documents.
- Loads both PDF documents.
- Imports all pages from the source document into the destination document.
- Imports a selected page range at a specified position.
- Imports an individual page with rotation and optimization settings.
- Saves the merged PDF as `Output.pdf`.
- Releases resources by destroying the PDF document instances.

The `getPdfAsUint8Array()` helper method:

- Retrieves a PDF document from the specified URL.
- Converts the file into a `Uint8Array`.
- Returns the PDF data for further processing.

### app.html

The user interface includes:

- A **Merge PDF Documents** button.
- A simple layout to trigger the merge operation.

When the button is clicked, the application merges the PDF documents and downloads the generated output file.

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

Click **Merge PDF Documents** to generate and download the merged PDF file.

## Additional Resources

### Documentation

[JavaScript PDF Library Documentation](https://help.syncfusion.com/document-processing/pdf/pdf-library/javascript/merge-document)

### Online Demos

[JavaScript PDF Library Demos](https://document.syncfusion.com/demos/pdf/angular/#/tailwind3/pdf/merge-documents)

### Product Page

[JavaScript PDF Library Product Page](https://www.syncfusion.com/document-sdk/javascript-pdf-library)