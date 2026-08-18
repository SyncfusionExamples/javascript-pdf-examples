import { PdfDocument, PdfFormFieldExportSettings, DataFormat } from '@syncfusion/ej2-pdf';
import { Button } from '@syncfusion/ej2-buttons';
// Create the Import Form Data button
var importForm = new Button({ cssClass: `e-primary` });
importForm.appendTo('#importForm');
// Import form data when the button is clicked
importForm.element.onclick = importFormFields;
// Create the Export Form Data button
var exportForm = new Button({ cssClass: `e-primary` });
exportForm.appendTo('#exportForm');
// Export form data when the button is clicked
exportForm.element.onclick = exportFormFields;
// Import JSON data into a PDF form
function importFormFields() {
    Promise.all([
        fetchAsUint8Array(
            'https://cdn.syncfusion.com/content/pdf-resources/form-filling-document.pdf'
        ),
        fetchAsUint8Array(
            'https://cdn.syncfusion.com/content/pdf-resources/ExportedFormData.json'
        )
    ])
        .then(function ([pdfBytes, formData]: [Uint8Array, Uint8Array]) {
            // Load the PDF document
            const document: PdfDocument = new PdfDocument(pdfBytes);
            // Import the form data
            document.importFormData(formData, DataFormat.json);
            // Save the updated PDF document
            document.save('ImportedForm.pdf');
            // Dispose the document
            document.destroy();
        })
        .catch(function (err) {
            console.error(err);
            alert('Error:' + err);
            alert('Failed to create fillable form PDF');
        });
}
// Export PDF form data to a JSON file
function exportFormFields() {
    fetchAsUint8Array(
        'https://cdn.syncfusion.com/content/pdf-resources/filled-form.pdf'
    )
        .then(function (pdfBytes) {
            // Load the PDF document
            const pdf = new PdfDocument(pdfBytes);
            // Create export settings
            let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
            settings.dataFormat = DataFormat.json;
            // Export the form data
            pdf.exportFormData('ExportedFormData.json', settings);
            // Dispose the document
            pdf.destroy();
        });
}
// Fetch a file as a Uint8Array
async function fetchAsUint8Array(url: string): Promise<Uint8Array> {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    const buf = await res.arrayBuffer();
    return new Uint8Array(buf);
}