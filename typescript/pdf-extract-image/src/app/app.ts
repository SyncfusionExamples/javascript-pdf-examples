import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument } from '@syncfusion/ej2-pdf';
import { PdfDataExtractor } from '@syncfusion/ej2-pdf-data-extract';

const extractBtn = new Button();
extractBtn.appendTo('#extractbtn');

extractBtn.element.onclick = async (): Promise<void> => {
    try {
        // Load the PDF document
        const pdfBytes = await readFromPdfResources(templateUrl);
        const pdf = new PdfDocument(pdfBytes);
        // Extract images from all pages
        const extractor = new PdfDataExtractor(pdf, canvasRenderCallback);
        const images = await extractor.extractImages({
            startPageIndex: 0,
            endPageIndex: pdf.pageCount - 1
        });
        // Download the first extracted image
        if (images && images.length > 0) {
            const first = images[0];
            const blob = new Blob([first.data], { type: 'image/jpeg' });
            downloadBlob(blob, 'ExtractImage.jpg');
        } else {
            console.warn('No images found in the document.');
        }
        // Release resources
        pdf.destroy();
    } catch (err) {
        console.error('Extract Image failed:', err);
    }
};

// Callback for canvas rendering
function canvasRenderCallback(): any {
    const canvas = document.createElement('canvas');
    return { canvas: canvas, applicationPlatform: undefined };
}

const templateUrl = 'https://cdn.syncfusion.com/content/pdf-resources/image-template.pdf';

// Fetch PDF as Uint8Array
async function readFromPdfResources(url: string): Promise<Uint8Array> {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    return new Uint8Array(await res.arrayBuffer());
}

// Download blob as a file
function downloadBlob(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}