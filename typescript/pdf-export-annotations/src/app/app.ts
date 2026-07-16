import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument, DataFormat, PdfAnnotationExportSettings } from '@syncfusion/ej2-pdf';

const exportBtn = new Button({ cssClass: `e-primary` });
exportBtn.appendTo('#exportBtn');
exportBtn.element.onclick = exportAnnotations;

function exportAnnotations() {
    const templateUrl = 'https://cdn.syncfusion.com/content/pdf-resources/annotation.pdf';
    readFromUrl(templateUrl)
        .then(function (pdfBytes) {
            // Load the existing PDF document
            const document: PdfDocument = new PdfDocument(pdfBytes);
            const settings = new PdfAnnotationExportSettings();
            settings.exportAppearance = true;
            settings.dataFormat = DataFormat.json;
            document.exportAnnotations('ExportAnnotations.json', settings);
            // Destroy the document instance to release memory
            document.destroy();
        });
}

// Fetch PDF data from a URL
function readFromUrl(url: any): Promise<Uint8Array> {
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