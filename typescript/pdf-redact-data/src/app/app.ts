import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument } from '@syncfusion/ej2-pdf';
import { PdfRedactor, PdfRedactionRegion } from '@syncfusion/ej2-pdf-data-extract';

// Create Redact button
let redactbtn: Button = new Button();
redactbtn.appendTo('#redactbtn');
redactbtn.element.onclick = async () => {
    const rects = [
        { x: 70, y: 120, width: 200, height: 80 },
        { x: 400, y: 150, width: 100, height: 30 }
    ];
    try {
        const pdfData = await fetchAsUint8Array(input1);
        await redactPdf(pdfData, rects);
    } catch (err) {
        console.error(err);
        alert('Failed to redact the resource PDF. Check the file path and server setup.');
    }
};

const input1 = 'https://cdn.syncfusion.com/content/pdf-resources/credit_card_statement.pdf';

async function fetchAsUint8Array(url: string): Promise<Uint8Array> {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    const buf = await res.arrayBuffer();
    return new Uint8Array(buf);
}


async function redactPdf(
    pdfBytes: Uint8Array,
    rect: { x: number; y: number; width: number; height: number }
        | Array<{ x: number; y: number; width: number; height: number }>): Promise<void> {
    const bytes = pdfBytes instanceof Uint8Array ? pdfBytes : new Uint8Array(pdfBytes);
    // Create a new PDF document
    const pdf = new PdfDocument(bytes);
    const rects = Array.isArray(rect) ? rect : [rect];
    // Create redactor from the document
    const redactor = new PdfRedactor(pdf);
    // Build regions for page index 0
    const regions: PdfRedactionRegion[] = rects.map((r) => {
        const region = new PdfRedactionRegion(0, { x: r.x, y: r.y, width: r.width, height: r.height });
        // Black fill for redaction
        region.fillColor = { r: 0, g: 0, b: 0 };
        return region;
    });
    // Add redactor region
    redactor.add(regions);
    // Apply redaction
    redactor.redactSync();
    // Save the PDF
    pdf.save('Redaction.pdf');
    // Destory the document
    pdf.destroy();
};