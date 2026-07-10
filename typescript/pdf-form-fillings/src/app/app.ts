import { PdfDocument, PdfTextBoxField, PdfStandardFont, PdfFontFamily, PdfFontStyle, PdfBrush, PdfRadioButtonListField, PdfInteractiveBorder, PdfBorderStyle, PdfComboBoxField, PdfJavaScriptAction, PdfCheckBoxField, PdfButtonField, PdfHighlightMode } from '@syncfusion/ej2-pdf';
import { Button } from '@syncfusion/ej2-buttons';

// Create button
const formBtn = new Button();
formBtn.appendTo('#formBtn');
// Generate PDF form on click
formBtn.element.onclick = createFormFields;

function createFormFields(): void {
    // Create PDF document and page
    const document = new PdfDocument();
    const page = document.addPage();
    const graphics = page.graphics;
    // Fonts
    const font: PdfStandardFont = document.embedFont(
        PdfFontFamily.helvetica,
        20,
        PdfFontStyle.regular
    );
    const radioFont = document.embedFont(
        PdfFontFamily.helvetica,
        13,
        PdfFontStyle.regular
    );
    const comboFont = document.embedFont(
        PdfFontFamily.helvetica,
        10,
        PdfFontStyle.regular
    );
    // Common styles
    const black = { r: 0, g: 0, b: 0 };
    const white = { r: 255, g: 255, b: 255 };
    const brush = new PdfBrush(black);
    const solidBorder = new PdfInteractiveBorder({
        width: 1,
        style: PdfBorderStyle.solid
    });
    // Name field
    graphics.drawString('Name:', font, { x: 10, y: 58, width: 300, height: 400 }, brush);
    const nameField = new PdfTextBoxField(page, 'Name', {
        x: 100,
        y: 60,
        width: 200,
        height: 22
    });
    document.form.add(nameField);
    // Gender field
    graphics.drawString('Gender:', font, { x: 10, y: 98, width: 300, height: 400 }, brush);
    graphics.drawString('Male', radioFont, { x: 100, y: 105, width: 300, height: 400 }, brush);
    graphics.drawString('Female', radioFont, { x: 150, y: 105, width: 300, height: 400 }, brush);
    graphics.drawString('Other', radioFont, { x: 220, y: 105, width: 300, height: 400 }, brush);
    const genderField = new PdfRadioButtonListField(page, 'Gender', {
        items: [
            { name: 'Male', bounds: { x: 130, y: 108, width: 14, height: 10 } },
            { name: 'Female', bounds: { x: 195, y: 108, width: 14, height: 10 } },
            { name: 'Other', bounds: { x: 255, y: 108, width: 14, height: 10 } }
        ],
        selectedIndex: 1
    });
    document.form.add(genderField);
    // Mail field
    graphics.drawString('Mail:', font, { x: 10, y: 138, width: 300, height: 400 }, brush);
    const mailField = new PdfTextBoxField(page, 'Name', {
        x: 100,
        y: 140,
        width: 200,
        height: 22
    });
    document.form.add(mailField);
    // State dropdown
    graphics.drawString('State:', font, { x: 10, y: 178, width: 300, height: 400 }, brush);
    const stateField = new PdfComboBoxField(
        page,
        'State',
        { x: 100, y: 180, width: 200, height: 22 },
        {
            items: [
                { text: 'California', value: 'CA' },
                { text: 'Washington D.C', value: 'DC' },
                { text: 'London', value: 'LN' }
            ],
            color: black,
            backColor: white,
            borderColor: black,
            border: solidBorder,
            selectedIndex: 0,
            font: comboFont
        }
    );
    document.form.add(stateField);
    // Date of birth field
    graphics.drawString('DOB:', font, { x: 10, y: 218, width: 300, height: 400 }, brush);
    const dateField = new PdfTextBoxField(page, 'DateField', {
        x: 100,
        y: 220,
        width: 200,
        height: 22
    });
    // Default date value
    dateField.text = '18/08/2003';
    // Date format validation
    const format = 'yyyy-mm-dd';
    dateField.actions.format =
        new PdfJavaScriptAction(`AFDate_FormatEx("${format}");`);
    dateField.actions.keyPressed =
        new PdfJavaScriptAction(`AFDate_KeystrokeEx("${format}"):`);
    dateField.actions.validate =
        new PdfJavaScriptAction(`AFDate_Validate("${format}");`);
    document.form.add(dateField);
    // Terms and conditions checkbox
    graphics.drawString('T&C', font, { x: 10, y: 258, width: 300, height: 400 }, brush);
    const checkboxField = new PdfCheckBoxField(
        'AcceptTerms',
        { x: 100, y: 262, width: 14, height: 14 },
        page,
        {
            toolTip: 'Accept the terms and conditions',
            backColor: white,
            borderColor: black,
            border: solidBorder,
            checked: true
        }
    );
    document.form.add(checkboxField);
    // Submit button
    const buttonField = new PdfButtonField(
        page,
        'Submit',
        { x: 10, y: 300, width: 120, height: 28 },
        {
            toolTip: 'Submit form',
            color: white,
            backColor: { r: 0, g: 122, b: 204 },
            borderColor: black,
            border: solidBorder,
            text: 'Submit',
            highlightMode: PdfHighlightMode.push
        }
    );
    // Generate button appearance
    buttonField.setAppearance(true);
    document.form.add(buttonField);
    // Save PDF
    document.save('FormCreation.pdf');
    // Release resources
    document.destroy();
}