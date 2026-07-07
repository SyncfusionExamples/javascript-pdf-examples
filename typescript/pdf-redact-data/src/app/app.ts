import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument } from '@syncfusion/ej2-pdf';
import { PdfRedactor, PdfRedactionRegion } from '@syncfusion/ej2-pdf-data-extract';

// Create Redact button
let redactbtn: Button = new Button();
redactbtn.appendTo('#redactbtn');
redactbtn.element.onclick = redactPdf;
// Template PDF URL
var input = 'https://cdn.syncfusion.com/content/pdf-resources/credit_card_statement.pdf';

// Redact predefined regions from resource PDF
function redactPdf() {
    readFromUrl(input)
        .then(function (pdfData) {
            var data = pdfData instanceof Uint8Array ? pdfData : new Uint8Array(pdfData);
            // Load PDF data
            var pdf = PdfDocument(data);
            // Rectangle bounds to apply redaction
            var rects = [{ x: 70, y: 120, width: 200, height: 80 }, { x: 400, y: 150, width: 100, height: 30 }];
            // Create PDF redactor instance
            var redactor = new PdfRedactor(pdf);
            // Define redaction regions to apply redaction on PDF pages
            var regions = rects.map(function (r) {
                var region = new PdfRedactionRegion(0, {
                    x: r.x,
                    y: r.y,
                    width: r.width,
                    height: r.height
                });
                region.fillColor = { r: 0, g: 0, b: 0 };
                return region;
            });
            // Add redaction regions to the collection
            redactor.add(regions);
            // Apply redaction
            redactor.redactSync();
            // Save redacted PDF document
            pdf.save('Redaction.pdf');
            pdf.destroy();
        })
        .catch(function (err) {
            console.error(err);
            alert('Failed to redact the resource PDF.');
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