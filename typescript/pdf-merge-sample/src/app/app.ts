import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument } from '@syncfusion/ej2-pdf';

// Create the Merge button and attach it to the container element
const mergeBtn = new Button({ cssClass: `e-primary`});
mergeBtn.appendTo('#mergeBtn');

// URLs of the PDF files to be merged
const templateUrl1 = 'https://cdn.syncfusion.com/content/pdf-resources/pdf-succinctly.pdf';
const templateUrl2 = 'https://cdn.syncfusion.com/content/pdf-resources/syncfusion-brochure.pdf';
const templateUrl3 = 'https://cdn.syncfusion.com/content/pdf-resources/credit_card_statement.pdf';

// Handle the button click event
mergeBtn.element.onclick = async (): Promise<void> => {
    try {
        // Fetch both PDF files as Uint8Array
        const pdfBytes1 = await fetchAsUint8Array(templateUrl1);
        const pdfBytes2 = await fetchAsUint8Array(templateUrl2);
        const pdfBytes3 = await fetchAsUint8Array(templateUrl3);
        // Create PdfDocument instances from the downloaded PDF data
        const doc1 = new PdfDocument(pdfBytes1);
        const doc2 = new PdfDocument(pdfBytes2);
        const doc3 = new PdfDocument(pdfBytes3);
        // Import all pages from doc2 into doc1
        // Parameters:
        //   doc2                 -> Source PDF document
        //   0                    -> Starting page index
        //   doc2.pageCount - 1   -> Ending page index
        doc1.importPageRange(doc2, 0, doc2.pageCount - 1);
        doc1.importPageRange(doc3, 0, doc3.pageCount - 1);
        // Save the merged PDF and trigger download
        doc1.save('MergedPDF.pdf');
        // Release resources used by both PDF documents
        doc1.destroy();
        doc2.destroy();
        doc3.destroy();
    } catch (err) {
        // Log any errors that occur during the merge process
        console.error('Merge PDFs failed:', err);
    }
};

/**
 * Downloads a PDF file and converts it to Uint8Array.
 *
 * @param url - URL of the PDF file to download.
 * @returns Promise that resolves with the PDF content as Uint8Array.
 */
async function fetchAsUint8Array(url: string): Promise<Uint8Array> {
    // Fetch the file from the specified URL
    const res = await fetch(url, { cache: 'no-cache' });

    // Throw an error if the request fails
    if (!res.ok) {
        throw new Error(
            `Failed to fetch ${url}: ${res.status} ${res.statusText}`
        );
    }

    // Convert the response into an ArrayBuffer
    const buf = await res.arrayBuffer();

    // Return the data as Uint8Array for PdfDocument processing
    return new Uint8Array(buf);
}