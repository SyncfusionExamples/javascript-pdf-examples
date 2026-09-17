# How to Redact Content in a PDF Document Using the JavaScript PDF Library 

This sample demonstrates how to redact content in a PDF document using the `Syncfusion JavaScript PDF Library`.

## Features Demonstrated

This sample shows how to:

- Load an existing PDF document from a URL.
- Redact content from a specified region in a PDF document.
- Apply a custom fill color to the redacted area.
- Customize the text displayed in the redacted region.
- Save and download the redacted PDF document.
- Release resources after processing the PDF document.

## Project Structure

### app.ts

The `redactContent()` method performs the following operations:

- Loads the input PDF document.
- Creates a redaction region on the specified page.
- Adds the redaction region to the PDF redactor.
- Applies the redaction to permanently remove the content.
- Saves the redacted PDF document.
- Releases resources after processing.

The `applyRedactionFillColor()` method performs the following operations:

- Loads the input PDF document.
- Creates a redaction region.
- Applies a custom fill color to the redacted area.
- Processes the redaction.
- Saves the modified PDF document.
- Releases resources after processing.

The `customizeTextAppearance()` method performs the following operations:

- Loads the input PDF document.
- Creates a redaction region with appearance customization enabled.
- Adds custom text within the redacted area.
- Applies the redaction.
- Saves the resulting PDF document.
- Releases resources after processing.

The `getInputBytes()` helper method performs the following operations:
 
- Downloads the PDF document from the specified URL.
- Converts the document content to a `Uint8Array`.
- Returns the PDF data for further processing.

### app.html

The user interface includes:

- A **Redact Content** button.
- An **Apply Fill Color** button.
- A **Customize Text Appearance** button.
- A simple layout to trigger the redaction operations.

When a button is clicked, the application performs the selected redaction operation and downloads the resulting PDF document.

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

Use one of the available buttons to perform the desired redaction operation. The resulting PDF document will be downloaded automatically.

## Additional Resources

### Documentation

[JavaScript PDF Library Documentation](https://help.syncfusion.com/document-processing/pdf/pdf-library/javascript/redaction)

### Online Demos

[JavaScript PDF Library Demos](https://document.syncfusion.com/demos/pdf/angular/#/tailwind3/pdf/redaction)

### Product Page

[JavaScript PDF Library Product Page](https://www.syncfusion.com/document-sdk/javascript-pdf-library)