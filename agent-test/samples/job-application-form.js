// Mode 1 sample: job application form with Syncfusion JavaScript PDF (@syncfusion/ej2-pdf).
// Install: npm install @syncfusion/ej2-pdf
// In a browser, document.save() downloads the file. In Node, write the Uint8Array returned by document.save() with fs.
import {
  PdfDocument, PdfBrush, PdfFontFamily, PdfFontStyle, PdfInteractiveBorder, PdfBorderStyle,
  PdfTextBoxField, PdfRadioButtonListField, PdfComboBoxField, PdfBarcodeField, PdfJavaScriptAction,
  PdfBarcodeSymbology, PdfBarcodeValueFormat, PdfQRErrorCorrectionLevel
} from '@syncfusion/ej2-pdf';

const document = new PdfDocument();
const page = document.addPage();
const black = new PdfBrush({ r: 0, g: 0, b: 0 });
const titleFont = document.embedFont(PdfFontFamily.helvetica, 20, PdfFontStyle.bold);
const labelFont = document.embedFont(PdfFontFamily.helvetica, 11, PdfFontStyle.bold);
const inputFont = document.embedFont(PdfFontFamily.helvetica, 10, PdfFontStyle.regular);
const border = new PdfInteractiveBorder({ width: 1, style: PdfBorderStyle.solid });
const borderColor = { r: 0, g: 122, b: 204 };
const X = 50, FX = 200, W = 300;

page.graphics.drawString('Job Application Form', titleFont, { x: X, y: 30, width: 400, height: 30 }, black);

const addLabel = (text, y) =>
  page.graphics.drawString(text, labelFont, { x: X, y: y + 4, width: 140, height: 18 }, black);
const addText = (name, y, options = {}, height = 22) => {
  const field = new PdfTextBoxField(page, name, { x: FX, y, width: W, height }, {
    font: inputFont, border, borderColor, backColor: { r: 255, g: 255, b: 255 }, ...options
  });
  document.form.add(field);
  return field;
};

// Applicant name
addLabel('Applicant Name', 90);
addText('ApplicantName', 90, { toolTip: 'Enter the applicant name' });

// Email ID with JavaScript validation
addLabel('Email ID', 130);
const email = addText('EmailID', 130, { toolTip: 'Enter a valid email address' });
email.actions.validate = new PdfJavaScriptAction(
  'if (event.value !== "" && !/^[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}$/.test(event.value)) {' +
  ' app.alert("Please enter a valid email ID."); event.rc = false; }'
);

// Phone number: text box that accepts digits only
addLabel('Phone Number', 170);
const phone = addText('PhoneNumber', 170, { toolTip: 'Digits only', maxLength: 15 });
phone.actions.keyPressed = new PdfJavaScriptAction(
  'if (!event.willCommit && !/^\\d*$/.test(event.change)) { event.rc = false; }'
);
phone.actions.validate = new PdfJavaScriptAction(
  'if (event.value !== "" && !/^\\d+$/.test(event.value)) { app.alert("Phone number must contain digits only."); event.rc = false; }'
);

// Gender: radio buttons
addLabel('Gender', 210);
document.form.add(new PdfRadioButtonListField(page, 'Gender', {
  items: [
    { name: 'Male', bounds: { x: FX, y: 214, width: 14, height: 14 } },
    { name: 'Female', bounds: { x: FX + 90, y: 214, width: 14, height: 14 } },
    { name: 'Other', bounds: { x: FX + 190, y: 214, width: 14, height: 14 } }
  ],
  toolTip: 'Select gender'
}));
['Male', 'Female', 'Other'].forEach((text, i) =>
  page.graphics.drawString(text, inputFont, { x: FX + 20 + i * 90 + (i === 2 ? 10 : 0), y: 214, width: 60, height: 14 }, black));

// Education qualification
addLabel('Education Qualification', 250);
addText('EducationQualification', 250, { toolTip: 'Highest qualification' });

// Current address (multi-line)
addLabel('Current Address', 290);
addText('CurrentAddress', 290, { multiLine: true, toolTip: 'Current address' }, 70);

// Application for: drop-down with 4 jobs
addLabel('Application For', 380);
document.form.add(new PdfComboBoxField(page, 'ApplicationFor', { x: FX, y: 380, width: W, height: 22 }, {
  items: [
    { text: 'Software Engineer', value: 'Software Engineer' },
    { text: 'QA Engineer', value: 'QA Engineer' },
    { text: 'Business Analyst', value: 'Business Analyst' },
    { text: 'Project Manager', value: 'Project Manager' }
  ],
  selectedIndex: 0, font: inputFont, border, borderColor, toolTip: 'Select the job'
}));

// Application ID: 6-character value from a GUID, read-only
addLabel('Application ID', 420);
const applicationId = addText('ApplicationID', 420, {
  text: crypto.randomUUID().replace(/-/g, '').substring(0, 6).toUpperCase()
});
applicationId.readOnly = true;

// Barcode field linked to the Application ID text box
document.form.add(new PdfBarcodeField(page, 'ApplicationBarcode', { x: FX, y: 470, width: 150, height: 150 }, {
  fields: ['ApplicationID'],
  valueFormat: PdfBarcodeValueFormat.TabDelimited,
  caption: 'Application ID',
  barcodeOptions: {
    symbology: PdfBarcodeSymbology.QR,
    xDimention: 4, // the API spells it this way
    errorCorrectionLevel: PdfQRErrorCorrectionLevel.Medium
  }
}));
addLabel('Application Barcode', 470);

document.save('job-application-form.pdf');
document.destroy();
