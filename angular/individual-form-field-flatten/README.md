# How to Flatten an Individual Form Field in the JavaScript PDF Library 

This sample demonstrates how to flatten an individual form field using the `Syncfusion JavaScript PDF Library`.

## Features Demonstrated

This sample shows how to:

- Load an existing PDF document from a URL.
- Access the form fields of a loaded PDF document.
- Locate a specific field of the form using its index.
- Fill a text box field with sample text.
- Flatten an individual form field to remove editability.
- Save and download the generated PDF document.
- Release resources after processing the PDF document.

## Project Structure

### app.ts

The `flattenIndividualFormField()` method performs the following operations:

- Downloads the input PDF document from the specified URL.
- Loads the existing PDF document.
- Accesses the form from the loaded PDF document.
- Retrieves the individual form field to be flattened.
- Fills the text box field with sample text.
- Flattens the individual form field.
- Saves the modified PDF as `Output.pdf`.
- Releases resources by destroying the PDF document instance.

The `getPdfAsUint8Array()` helper method:

- Retrieves a PDF document from the specified URL.
- Converts the file into a `Uint8Array`.
- Returns the PDF data for further processing.

### app.html

The user interface includes:

- A **Flatten Individual Form Field** button.
- A simple layout to trigger the flatten operation.

When the button is clicked, the application flattens an individual form field in the PDF document and downloads the generated output file.

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

Click **Flatten Individual Form Field** to load the form PDF, flatten the selected field, and download the output file.

## Additional Resources

### Documentation

[JavaScript PDF Library Documentation](https://help.syncfusion.com/document-processing/pdf/pdf-library/javascript/working-with-forms)

### Online Demos

[JavaScript PDF Library Demos](https://document.syncfusion.com/demos/pdf/angular/#/tailwind3/pdf/)

### Product Page

[JavaScript PDF Library Product Page](https://www.syncfusion.com/document-sdk/javascript-pdf-library)