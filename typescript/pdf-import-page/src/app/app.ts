import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument } from '@syncfusion/ej2-pdf';

const importBtn = new Button({ cssClass: `e-primary`});
importBtn.appendTo('#importBtn');
importBtn.element.onclick = async (): Promise<void> => {
    try {
        const pdfBytes1 = await fetchAsUint8Array(templateUrl1);
        const pdfBytes2 = await fetchAsUint8Array(templateUrl2);
        // Create two PdfDocument instances (doc1 and doc2) from the same source bytes
        const doc1 = new PdfDocument(pdfBytes1);
        const doc2 = new PdfDocument(pdfBytes2);
        //Import all pages from doc2 into doc1 using importPageRange
        doc1.importPageRange(doc2, 0, doc2.pageCount - 1);
        //Save and download the document
        doc1.save(outputPdfName);
        // Destroy the document instance
        doc1.destroy();
        doc2.destroy();
    } catch (err) {
        console.error('Merge PDFs failed:', err);
    }
};

const templateUrl1 = 'https://cdn.syncfusion.com/content/pdf-resources/pdf-succinctly.pdf';
const templateUrl2 = 'https://cdn.syncfusion.com/content/pdf-resources/syncfusion-brochure.pdf';
const outputPdfName = 'MergedPDF.pdf';
async function fetchAsUint8Array(url: string): Promise<Uint8Array> {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    const buf = await res.arrayBuffer();
    return new Uint8Array(buf);
}