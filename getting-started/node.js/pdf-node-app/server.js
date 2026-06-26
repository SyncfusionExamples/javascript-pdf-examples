const express = require('express');
const path = require('path');
const {
    PdfDocument,
    PdfFontFamily,
    PdfFontStyle,
    PdfBrush
} = require('@syncfusion/ej2-pdf');

const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// PDF generation API
app.get('/generate-pdf', (req, res) => {
    const document = new PdfDocument();
    // Create PDF document
    const page = document.addPage();
    const graphics = page.graphics;
    const font = document.embedFont(
        PdfFontFamily.helvetica,
        24,
        PdfFontStyle.regular
    );
    const brush = new PdfBrush({ r: 0, g: 0, b: 0 });
    graphics.drawString(
        "Hello World",
        font,
        {
            x: 20,
            y: 20,
            width: graphics.clientSize.width - 20,
            height: 50
        },
        brush
    );
    // Save PDF as bytes
    const pdfBytes = document.save();
    document.destroy();
    // Send PDF to browser
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=Output.pdf");

    res.send(Buffer.from(pdfBytes));
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});