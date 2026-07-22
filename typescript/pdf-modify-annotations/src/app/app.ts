import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument, PdfPage, PdfAnnotation } from '@syncfusion/ej2-pdf';

const modifyBtn = new Button({ cssClass: `e-primary` });
modifyBtn.appendTo('#modifyBtn');
modifyBtn.element.onclick = modifyAnnotations;

function modifyAnnotations() {
    const templateUrl = 'https://cdn.syncfusion.com/content/pdf-resources/annotation.pdf';
    readFromUrl(templateUrl)
        .then(function (pdfBytes) {
            // Load the existing PDF document
            const document: PdfDocument = new PdfDocument(pdfBytes);
            // Access the first page
            let page: PdfPage = document.getPage(0);
            // Access first annotation from the PDF page
            let annotation: PdfAnnotation = page.annotations.at(0);
            annotation.name = 'Pop Annotation';
            annotation.text = 'Pop Annotation';
            annotation.color = { r: 255, g: 0, b: 0 };
            annotation.opacity = 0.5;
            annotation.author = 'John';
            annotation.subject = 'Popup';
            annotation.open = false;
            annotation.setAppearance(true);
            // Save the Updated PDF
            document.save('ModifyAnnotations.pdf');
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