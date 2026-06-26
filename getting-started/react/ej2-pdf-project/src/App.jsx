import React from 'react';
import { PdfDocument, PdfFontFamily, PdfFontStyle, PdfBrush } from '@syncfusion/ej2-pdf';

export default function App() {
  const createPdf = () => {
    // Create a new PDF document
    let pdf = new PdfDocument();
    // Add a new page
    let page = pdf.addPage();
    // Get graphics from the page
    let graphics = page.graphics;
    // Set font (embed a standard font)
    let font = pdf.embedFont(PdfFontFamily.helvetica, 36, PdfFontStyle.regular);
    // Create a new black brush
    let brush = new PdfBrush({ r: 0, g: 0, b: 0 });
    // Draw text (include null for pen param)
    graphics.drawString(
      'Hello World!!!',
      font,
      { x: 20, y: 20, width: graphics.clientSize.width - 20, height: 60 },
      null,
      brush
    );
    // Save and download PDF
    pdf.save('Output.pdf');
    // Destroy the PDF document instance
    pdf.destroy();
  };

  return (
    <div>
      <button id="normalButton" onClick={createPdf}>
        Create PDF document
      </button>
    </div>
  );
}