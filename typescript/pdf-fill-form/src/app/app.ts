
import { PdfDocument, PdfForm, PdfTextBoxField, PdfCheckBoxField, PdfRadioButtonListField, PdfListBoxField } from '@syncfusion/ej2-pdf';
import { Button } from '@syncfusion/ej2-buttons';
// Create and initialize the Ordered List button
var editForm = new Button();
editForm.appendTo('#editForm');
// Generate an Ordered List PDF when the button is clicked
editForm.element.onclick = editFormFields;
function editFormFields() {
    fetchAsUint8Array(
        'https://cdn.syncfusion.com/content/pdf-resources/form-filling-document.pdf'
    )
        .then(function (pdfBytes) {
            // Create a PdfDocument instance from the loaded PDF bytes
            const pdf = new PdfDocument(pdfBytes);
            // Access the Date text box field (Field Index: 0)
            let dateField: PdfTextBoxField = pdf.form.fieldAt(0) as PdfTextBoxField;
            // Set the date value
            dateField.text = '07/07/2026';
            dateField.setAppearance(true);
            // Access the Name text box field (Field Index: 1)
            let nameField: PdfTextBoxField = pdf.form.fieldAt(1) as PdfTextBoxField;
            // Set the name value
            nameField.text = 'John Allister';
            nameField.setAppearance(true);
            // Access the Email text box field (Field Index: 2)
            let mailField: PdfTextBoxField = pdf.form.fieldAt(2) as PdfTextBoxField;
            // Set the email address
            mailField.text = 'allister.john@example.com';
            mailField.setAppearance(true);
            // Access the Gender radio button field (Field Index: 3)
            let genderField: PdfRadioButtonListField = pdf.form.fieldAt(3) as PdfRadioButtonListField;
            // Select the radio button option at index 2
            genderField.selectedIndex = 2;
            genderField.setAppearance(true);
            // Access the Country/Selection list box field (Field Index: 4)
            let dropdownField: PdfListBoxField = pdf.form.fieldAt(4) as PdfListBoxField;
            // Select the list item at index 4
            dropdownField.selectedIndex = 4;
            dropdownField.setAppearance(true);
            // Access the CheckBox field (Field Index: 5)
            let checkboxField: PdfCheckBoxField = pdf.form.fieldAt(5) as PdfCheckBoxField;
            // Set a tooltip for the checkbox field
            checkboxField.toolTip = 'Check Box Field';
            checkboxField.setAppearance(true);
            // Save the modified PDF document and download it
            pdf.save('FillForm.pdf');
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