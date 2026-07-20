import { Button } from "@syncfusion/ej2-buttons";
import { PdfBrush, PdfDocument, PdfGraphics, PdfPage, PdfTrueTypeFont } from '@syncfusion/ej2-pdf';

let button: Button = new Button({ cssClass: `e-primary` });
button.appendTo('#unicodeText');
// Font URLs
var inputData = 'https://cdn.syncfusion.com/content/pdf-resources/noto-naskh-arabic-regular.ttf';
button.element.onclick = async (): Promise<void> => {
    // Load the TrueType font as a byte array
    const arabicFontBytes = await fetchAsUint8Array(inputData);
    // Create a new PDF document and add a page
    const document: PdfDocument = new PdfDocument();
    const page: PdfPage = document.addPage();
    const graphics: PdfGraphics = page.graphics;
    // Create a Unicode-supported font
    const font: PdfTrueTypeFont = new PdfTrueTypeFont(arabicFontBytes, 14);
    // Define the Unicode text to be displayed
    const text: string = "中文 العربية Ελληνικά 日本語 - Sample Unicode Text";
    // Draw the Unicode text on the PDF page
    graphics.drawString(text, font, { x: 200, y: 50, width: 300, height: 100 }, new PdfBrush({ r: 126, g: 70, b: 19 }));
    // Save the PDF document
    document.save("UnicodeText.pdf");
    // Dispose of document resources
    document.destroy();
};

// Helper: fetch font as Uint8Array
function fetchAsUint8Array(url: string): Promise<Uint8Array> {
    return fetch(url, { cache: 'no-cache' })
        .then(function (res) {
            if (!res.ok) throw new Error("Failed to fetch " + url + ": " + res.status + " " + res.statusText);
            return res.arrayBuffer();
        })
        .then(function (buf) {
            return new Uint8Array(buf);
        });
}