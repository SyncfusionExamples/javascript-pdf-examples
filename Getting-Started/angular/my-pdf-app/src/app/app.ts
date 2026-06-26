import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfDocument, PdfGraphics, PdfPage, PdfFontFamily, PdfFontStyle, PdfFont, PdfBrush } from '@syncfusion/ej2-pdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  createPdf(): void {
    // Create a new PDF document
    const document = new PdfDocument();
    // Add a new page
    const page: PdfPage = document.addPage();
    // Get graphics from the page
    const graphics: PdfGraphics = page.graphics;
    // Set font
    const font: PdfFont = document.embedFont(PdfFontFamily.helvetica, 36, PdfFontStyle.regular);
    // Create a new black brush
    const brush = new PdfBrush({ r: 0, g: 0, b: 0 });
    // Draw text
    graphics.drawString('Hello World!!!', font, { x: 20, y: 20, width: graphics.clientSize.width - 20, height: 60 }, brush);
    // Save and download PDF
    document.save('Output.pdf');
    // Destroy the PDF document instance
    document.destroy();
  }
}
