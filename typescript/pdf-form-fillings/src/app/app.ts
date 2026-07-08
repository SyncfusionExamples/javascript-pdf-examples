import { PdfDocument, PdfForm, PdfTextBoxField, PdfCheckBoxField, PdfListFieldItem, PdfComboBoxField, PdfRadioButtonListField } from '@syncfusion/ej2-pdf';
import { CheckBox, Button } from '@syncfusion/ej2-buttons';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

// Create and initialize the Ordered List button
var editForm = new Button();
editForm.appendTo('#editForm');
// Generate an Ordered List PDF when the button is clicked
editForm.element.onclick = editFormFields;
// Gender DropDownList
var genderData = [
    { text: 'Male', value: 'Male' },
    { text: 'Female', value: 'Female' },
    { text: 'Other', value: 'Other' }
];
var genderDropDown = new DropDownList({
    dataSource: genderData,
    fields: { text: 'text', value: 'value' },
    value: 'Male',
    popupHeight: '200px'
});
genderDropDown.appendTo('#gender');

// State DropDownList
var stateData = [
    'Alabama', 'Alaska', 'California', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Indiana', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'New Jersey',
    'New Mexico', 'New York', 'Texas', 'Washington', 'Wyoming'
];
var stateDropDown = new DropDownList({
    dataSource: stateData,
    value: 'Alabama',
    popupHeight: '200px'
});
stateDropDown.appendTo('#state');

// Date of Birth DatePicker
var dobPicker = new DatePicker({
    value: new Date(2012, 11, 5),
    format: 'MM/dd/yyyy'
});
dobPicker.appendTo('#dob');

// Newsletter CheckBox
var newsletterCheckBox = new CheckBox({
    label: 'Would you like to receive our Newsletter?',
    cssClass: 'e-custom'
});
newsletterCheckBox.appendTo('#newsletter');

function editFormFields() {
    fetchAsUint8Array(
        'https://cdn.syncfusion.com/content/pdf-resources/form-filling-document.pdf'
    )
        .then(function (pdfBytes) {
            // Read current form values from the page
            const values = getFormValues();
            // Create a PdfDocument from the fetched bytes
            const pdf = new PdfDocument(pdfBytes);
            // Get the PdfForm
            const form = pdf.form;
            // Map and set each field if present, then set appearance
            const nameField = findByName(form, 'name') as PdfTextBoxField | undefined;
            if (nameField) {
                nameField.text = values.name;
                nameField.setAppearance(true);
            }
            const gender = findByName(form, 'gender') as PdfRadioButtonListField | undefined;
            if (gender) {
                switch (values.gender) {
                    case 'Male': gender.selectedIndex = 0; break;
                    case 'Other': gender.selectedIndex = 1; break;
                    case 'Female': gender.selectedIndex = 2; break;
                }
                gender.setAppearance(true);
            }
            const dobField = findByName(form, 'dob') as PdfTextBoxField | undefined;
            if (dobField) {
                dobField.text = values.dob;
                dobField.setAppearance(true);
            }
            const emailField = findByName(form, 'email') as PdfTextBoxField | undefined;
            if (emailField) {
                emailField.text = values.email;
                emailField.setAppearance(true);
            }
            const stateField = findByName(form, 'state') as PdfComboBoxField | undefined;
            if (stateField) {
                for (let i = 0; i < stateField.itemsCount; i++) {
                    const item = stateField._options[i] as any;
                    if (item === values.state) {
                        stateField.selectedIndex = i;
                        break;
                    }
                }
                stateField.setAppearance(true);
            }
            const newsField = findByName(form, 'newsletter');
            if (newsField && 'checked' in newsField) {
                (newsField as PdfCheckBoxField).checked = values.newsletter;
                (newsField as PdfCheckBoxField).setAppearance(true);
            }
            // Save and download the document
            pdf.save('FormFillings.pdf');
            // Destroy the document
            pdf.destroy();
        })
        .catch(function (err) {
            console.error(err);
            alert('Failed to create fillable form PDF');
        })
}

// Read values from EJ2 form controls
function getFormValues() {
    function getInstance(id: string): any {
        const el = document.getElementById(id) as any;
        return el?.ej2_instances?.[0];
    }
    const name = (document.getElementById('name') as HTMLInputElement)?.value || '';
    const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
    const gender = getInstance('gender')?.value || 'Male';
    const state = getInstance('state')?.value || '';
    const newsletter = !!getInstance('newsletter')?.checked;
    let dob = '';
    const dobInst = getInstance('dob');
    if (dobInst?.value) {
        const d = dobInst.value;
        const mm = pad(d.getMonth() + 1);
        const dd = pad(d.getDate());
        const yyyy = d.getFullYear();
        dob = `${mm}/${dd}/${yyyy}`;
    }
    return {
        name,
        gender,
        dob,
        email,
        state,
        newsletter
    };
}
function pad(val: number): string {
    return val < 10 ? '0' + val : String(val);
}
// Find PDF form field by name
function findByName(form: PdfForm, name: string) {
    for (let i = 0; i < form.count; i++) {
        const field = form.fieldAt(i);
        if (field && field.name === name) return field;
    }
    return undefined;
}
//   Fetch URL and return Uint8Array
async function fetchAsUint8Array(url: string): Promise<Uint8Array> {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    const buf = await res.arrayBuffer();
    return new Uint8Array(buf);
}