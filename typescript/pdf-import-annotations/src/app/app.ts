import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument, DataFormat } from '@syncfusion/ej2-pdf';

// Create the Import Annotations button
const importBtn = new Button({ cssClass: `e-primary` });
importBtn.appendTo('#importBtn');
// Import annotations when the button is clicked
importBtn.element.onclick = importAnnotations;

// Import annotations into a PDF document
function importAnnotations() {
    Promise.all([
        fetchAsUint8Array('https://document.syncfusion.com/content/pdf-resources/ImportAnnotations.pdf'),
        fetchAsUint8Array('https://document.syncfusion.com/content/pdf-resources/ImportAnnotations.json')
    ])
        .then(function ([pdfBytes, jsonData]) {
            // Load the PDF document
            const document: PdfDocument = new PdfDocument(pdfBytes);
            // Import annotations from the JSON file
            document.importAnnotations(jsonData, DataFormat.json);
            // Save the updated PDF document
            document.save('output.pdf');
            // Dispose the document
            document.destroy();
        });
}

// Fetch a file as a Uint8Array
function fetchAsUint8Array(url: any): Promise<Uint8Array> {
    return fetch(url, { cache: 'no-cache' })
        .then(function (res) {
            if (!res.ok) {
                throw new Error(
                    'Failed to fetch ' + url + ': ' + res.status + ' ' + res.statusText
                );
            }
            return res.arrayBuffer();
        })
        .then(function (buf) {
            return new Uint8Array(buf);
        });
}