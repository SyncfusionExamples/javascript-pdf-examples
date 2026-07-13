
import { PdfDocument, PdfTextBoxField } from '@syncfusion/ej2-pdf';
import { Button } from '@syncfusion/ej2-buttons';

// Create and initialize the PDF creation button
var modifyForm = new Button();
modifyForm.appendTo('#modifyForm');
// Generate an Modified Form PDF when the button is clicked
modifyForm.element.onclick = modifyFormFields;
function modifyFormFields() {
    fetchAsUint8Array(
        'https://cdn.syncfusion.com/content/pdf-resources/form-filling-document.pdf'
    )
        .then(function (pdfBytes) {
            // Create a PdfDocument instance from the loaded PDF bytes
            const pdf = new PdfDocument(pdfBytes);
            // Access the Name text box field (Field Index: 1)
            let nameField: PdfTextBoxField = pdf.form.fieldAt(1) as PdfTextBoxField;
            // Set the name value
            nameField.text = 'John Allister';
            nameField.setAppearance(true);
            // Save the modified PDF document and download it
            pdf.save('ModifiedForm.pdf');
            // Release resources associated with the PDF document
            pdf.destroy();
        })
        .catch(function (err) {
            console.error(err);
            alert('Failed to create fillable form PDF');
        })
}
//   Fetch URL and return Uint8Array
async function fetchAsUint8Array(url: string): Promise<Uint8Array> {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    const buf = await res.arrayBuffer();
    return new Uint8Array(buf);
}