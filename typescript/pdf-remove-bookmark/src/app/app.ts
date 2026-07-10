import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument, PdfBookmarkBase } from '@syncfusion/ej2-pdf';

const indexBtn = new Button();
indexBtn.appendTo('#indexBtn');
indexBtn.element.onclick = getBookmarkIndex;

function getBookmarkIndex() {
    const templateUrl = 'https://cdn.syncfusion.com/content/pdf-resources/bookmarks.pdf';
    readFromUrl(templateUrl)
        .then(function (pdfBytes) {
            // Load the existing PDF document
            const document: PdfDocument = new PdfDocument(pdfBytes);
            // Get the bookmarks collection
            const bookmarks: PdfBookmarkBase = document.bookmarks;
            // Remove the bookmark from the document at the index 1
            let bookmark = bookmarks.remove(1);
            // Save the Updated PDF
            document.save('Bookmark.pdf');
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