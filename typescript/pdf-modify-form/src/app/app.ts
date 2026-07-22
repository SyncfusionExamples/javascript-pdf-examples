
import { PdfDocument, PdfTextBoxField, PdfTextAlignment, PdfJavaScriptAction, PdfFormFieldVisibility, PdfStandardFont, PdfForm, PdfFontFamily } from '@syncfusion/ej2-pdf';
import { Button } from '@syncfusion/ej2-buttons';

// Create and initialize the PDF creation button
var modifyForm = new Button({ cssClass: `e-primary` });
modifyForm.appendTo('#modifyForm');
// Generate an Modified Form PDF when the button is clicked
modifyForm.element.onclick = modifyFormFields;
function modifyFormFields() {
    fetchAsUint8Array(
        'https://cdn.syncfusion.com/content/pdf-resources/filled-form.pdf'
    )
        .then(function (pdfBytes) {
            // Load the PDF document
            const pdf: PdfDocument = new PdfDocument(pdfBytes);
            const form: PdfForm = pdf.form;
            // -------------------------
            // Date of Birth field
            // -------------------------
            const dobField = form.fieldAt(0) as PdfTextBoxField;
            dobField.text = '13/07/2002';
            dobField.textAlignment = PdfTextAlignment.left;
            // Date format used for validation and formatting
            const dateFormat: string = 'yyyy-mm-dd';
            // Add JavaScript actions for date formatting and validation
            dobField.actions.format = new PdfJavaScriptAction(
                `AFDate_FormatEx("${dateFormat}");`
            );
            dobField.actions.keyPressed = new PdfJavaScriptAction(
                `AFDate_KeystrokeEx("${dateFormat}");`
            );
            dobField.actions.validate = new PdfJavaScriptAction(
                `AFDate_Validate("${dateFormat}");`
            );
            dobField.setAppearance(true);
            // -------------------------
            // Name field
            // -------------------------
            const nameField = form.fieldAt(1) as PdfTextBoxField
            nameField.maxLength = 0;
            nameField.required = false;
            nameField.insertSpaces = false;
            nameField.multiLine = false;
            nameField.toolTip = "Text Box Tooltip";
            nameField.borderColor = { r: 0, g: 0, b: 0 };
            nameField.backColor = { r: 218, g: 234, b: 0 };
            nameField.font = new PdfStandardFont(PdfFontFamily.helvetica, 10);
            nameField.visibility = PdfFormFieldVisibility.visible;
            nameField.text = 'John Allister';
            nameField.defaultValue = 'John Allister';
            nameField.textAlignment = PdfTextAlignment.center;
            nameField.setAppearance(true);
            // Save the updated PDF
            pdf.save('ModifiedForm.pdf');
            // Release resources
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