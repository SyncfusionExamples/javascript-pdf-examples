# Create a PDF File in React Using the JavaScript PDF Library

This sample demonstrates how to create a PDF document using the `Syncfusion JavaScript PDF Library` in an `React` application.

The generated PDF includes a custom page layout with colored background sections, formatted text, bullet-point lists, two-column content blocks, decorative lines, footer text, and a clickable web link.

## Features Demonstrated

This sample shows how to:

- Create a PDF document programmatically.
- Add pages with custom page settings and margins.
- Draw rectangles, lines, and text.
- Apply different fonts, colors, and text styles.
- Create bullet-point lists using symbols.
- Organize content in multiple sections.
- Add hyperlink annotations.
- Save and download the generated PDF document.

## Project Structure

### App.jsx

The `createPdf()` method performs the following operations:

1. Creates a PDF document.
2. Adds a page with custom settings.
3. Draws colored background sections.
4. Creates a header with branding content.
5. Adds feature highlights using bullet lists.
6. Creates a two-column information section.
7. Adds footer information and a hyperlink.
8. Saves the document as `Output.pdf`.

### User Interface

The user interface includes:

- A sample description.
- A **Generate PDF** button.
- Instructions for viewing the generated PDF.

When the button is clicked, the PDF document is generated and downloaded.

## Prerequisites

Ensure the following software is installed:

- Node.js
- npm

## Installation

Install the Syncfusion JavaScript PDF Library package:

```bash
npm install @syncfusion/ej2-pdf
```

## Running the Application

Start the Vite development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

Click **Generate PDF** to create and download the PDF document.

## Additional Resources

### Documentation

[JavaScript PDF Library Documentation](https://help.syncfusion.com/document-processing/pdf/pdf-library/javascript/create-pdf-document-react)

### Online Demos

[JavaScript PDF Library Demos](https://document.syncfusion.com/demos/pdf/react/#/fluent2/pdf/default)

### Product Page

[JavaScript PDF Library Product Page](https://www.syncfusion.com/document-sdk/javascript-pdf-library)