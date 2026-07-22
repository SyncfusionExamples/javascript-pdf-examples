import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument, PdfPage, PdfBitmap, PdfImage, PdfRubberStampAnnotation } from '@syncfusion/ej2-pdf';

// Create and render the button in the UI.
const stampBtn = new Button({ cssClass: `e-primary` });
stampBtn.appendTo('#stampBtn');
// Attach the click event to generate the PDF with a rubber stamp annotation.
stampBtn.element.onclick = modifyAnnotations;
async function modifyAnnotations(): Promise<void> {
    // Read Base64 image data from image file
    let base64: string = await readFromUrl('https://cdn.syncfusion.com/content/pdf-resources/xamarin-jpeg.jpg');
    // Create a new PDF document.
    const document: PdfDocument = new PdfDocument();
    // Add a new page to the PDF document.
    const page: PdfPage = document.addPage();
    // Create a rubber stamp annotation and define its position and size.
    const annotation: PdfRubberStampAnnotation =
        new PdfRubberStampAnnotation({
            x: 50,     // Horizontal position
            y: 100,    // Vertical position
            width: 100,
            height: 75
        });
    // Create an image object from the Base64-encoded JPEG data.
    const image: PdfImage = new PdfBitmap(base64);
    // Draw the image onto the annotation's normal appearance template.
    // This image will be displayed as the visual content of the stamp.
    annotation.appearance.normal.graphics.drawImage(image, {
        x: 0,
        y: 0,
        width: 100,
        height: 75
    });
    // Add the rubber stamp annotation to the page.
    page.annotations.add(annotation);
    // Save the PDF document and download it as "StampAnnotations.pdf".
    document.save('StampAnnotation.pdf');
    // Release all resources associated with the document.
    document.destroy();
}

/**
 * Read image file
 * @param {string} url
 * @returns {Promise<string>}
 */
async function readFromUrl(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch ${url}: ${response.status} ${response.statusText}`
            );
        }
        const buffer = await response.arrayBuffer();
        return btoa(
            new Uint8Array(buffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
}