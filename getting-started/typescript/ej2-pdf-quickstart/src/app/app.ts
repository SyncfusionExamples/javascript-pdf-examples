import { PdfDocument, PdfGraphics, PdfPage, PdfFont, PdfFontFamily, PdfFontStyle, PdfBrush } from '@syncfusion/ej2-pdf';

const button = document.getElementById('normalButton');

if (button) {
    button.onclick = (): void => {
        // Create a new PDF document
        let pdf = new PdfDocument();

        // Add a new page
        let page: PdfPage = pdf.addPage();

        // Get graphics from the page
        let graphics: PdfGraphics = page.graphics;

        // Set font
        let font: PdfFont = pdf.embedFont(
            PdfFontFamily.helvetica,
            36,
            PdfFontStyle.regular
        );

        // Create a new black brush
        let brush = new PdfBrush({ r: 0, g: 0, b: 0 });

        // Draw text
        graphics.drawString(
            'Hello World!!!',
            font,
            { x: 20, y: 20, width: graphics.clientSize.width - 20, height: 60 },
            brush
        );

        // Save and download PDF
        pdf.save('output.pdf');

        // Destroy the PDF document instance
        pdf.destroy();
    };
}