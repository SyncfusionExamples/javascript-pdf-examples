
import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument, PdfDocumentSplitEventArgs } from '@syncfusion/ej2-pdf';
import { Save } from '@syncfusion/ej2/file-utils';


const DEFAULT_PDF_URL = 'https://cdn.syncfusion.com/content/pdf-resources/pdf-succinctly.pdf';
// Initialize button
const splitBtnSf = new Button({ cssClass: `e-primary`});
splitBtnSf.appendTo('#splitBtn');
splitBtnSf.element.onclick = splitPDF;

function splitPDF() {
    readFromUrl(DEFAULT_PDF_URL)
        .then(function (pdfBytes) {
            const pdf = new PdfDocument(pdfBytes);
            // Download each generated PDF
            pdf.splitEvent = (sender: PdfDocument, args: PdfDocumentSplitEventArgs) => {
                Save.save('SplitDocument_' + (args.index + 1) + '.pdf', new Blob([args.pdfData], { type: 'application/pdf' }));
            };
            // Split PDF document into individual pages
            pdf.split();
            pdf.destroy();
        });
}

// Fetch PDF data from a URL
function readFromUrl(url: string): Promise<Uint8Array> {
    return fetch(url, { cache: 'no-cache' })
        .then(function (res) {
            // Check whether the request was successful
            if (!res.ok) {
                throw new Error(
                    'Failed to fetch ' + url + ': ' + res.status + ' ' + res.statusText
                );
            }
            return res.arrayBuffer();
        })
        .then(function (buf) {
            // Convert the response to Uint8Array
            return new Uint8Array(buf);
        });
}
