import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument, PdfBrush, PdfFontFamily, PdfFontStyle, PdfListItem, PdfListItemCollection, PdfOrderedList, PdfStringFormat, PdfUnorderedList, PdfUnorderedListStyle } from '@syncfusion/ej2-pdf';

// Create Ordered List button
let orderButton: Button = new Button();
orderButton.appendTo('#orderbtn');
orderButton.element.onclick = (): void => {
    // Create a new PDF document
    let pdf = new PdfDocument();
    // Add a new page
    let page = pdf.addPage();
    // Embed fonts
    let headerFont = pdf.embedFont(PdfFontFamily.helvetica, 14, PdfFontStyle.bold);
    let listFont = pdf.embedFont(PdfFontFamily.timesRoman, 10, PdfFontStyle.regular);
    // Draw title
    page.graphics.drawString(
        'Ordered List',
        headerFont,
        { x: 225, y: 10, width: 300, height: 100 },
        new PdfBrush({ r: 0, g: 0, b: 139 })
    );
    // Create string format
    let format = new PdfStringFormat();
    format.lineSpacing = 10;
    // Create ordered list
    const collection = new PdfListItemCollection([
        'Essential Tools',
        'Essential Grid',
        'Essential Chart',
        'Essential Edit',
        'Essential Diagram',
        'Essential XlsIO',
        'Essential Grouping',
        'Essential Calculate',
        'Essential PDF',
        'Essential HTMLUI',
        'Essential DocIO'
    ]);
    let orderedList = new PdfOrderedList(collection, {
        font: listFont,
        format: format,
        indent: 20,
        textIndent: 10
    });
    // Draw the ordered list
    orderedList.draw(page, {
        x: 0,
        y: 80,
        width: page.graphics.clientSize.width,
        height: page.graphics.clientSize.height - 80
    });
    // Save the PDF
    pdf.save('OrderedList.pdf');
    // Destroy the document instance
    pdf.destroy();
};

// Create Unordered List button
let unorderButton: Button = new Button();
unorderButton.appendTo('#unorderbtn');
unorderButton.element.onclick = (): void => {
    // Create a new PDF document
    let pdf = new PdfDocument();
    // Add a new page
    let page = pdf.addPage();
    // Embed fonts
    let font1 = pdf.embedFont(PdfFontFamily.helvetica, 14, PdfFontStyle.bold);
    let font2 = pdf.embedFont(PdfFontFamily.helvetica, 12, PdfFontStyle.regular);
    let font3 = pdf.embedFont(PdfFontFamily.timesRoman, 10, PdfFontStyle.bold);
    let font4 = pdf.embedFont(PdfFontFamily.timesRoman, 10, PdfFontStyle.regular);
    // Draw title and description
    page.graphics.drawString(
        'Unordered List',
        font1,
        { x: 225, y: 10, width: 300, height: 100 },
        new PdfBrush({ r: 0, g: 0, b: 139 })
    );
    page.graphics.drawString(
        'This sample demonstrates various features of unordered lists.',
        font2,
        {
            x: 0,
            y: 50,
            width: page.graphics.clientSize.width,
            height: page.graphics.clientSize.height - 50
        },
        new PdfBrush({ r: 0, g: 0, b: 0 })
    );
    // Create string format
    let format = new PdfStringFormat();
    format.lineSpacing = 10;
    // Create main unordered list
    const collection = new PdfListItemCollection([
        'List of Essential Studio products',
        'IO products'
    ]);
    let unorderedList = new PdfUnorderedList(collection, {
        format: format,
        font: font3,
        style: PdfUnorderedListStyle.disk,
        indent: 10,
        textIndent: 10
    });
    // Create unordered sublist
    const subListCollection = new PdfListItemCollection([
        'Essential PDF: It is a .NET library with the capability to produce Adobe PDF files.',
        'Essential DocIO: It is a .NET library that can read and write Microsoft Word files.',
        'Essential XlsIO: It is a .NET library that can read and write Microsoft Excel files.'
    ]);
    let subList = new PdfUnorderedList(subListCollection, {
        brush: new PdfBrush({ r: 0, g: 0, b: 0 }),
        indent: 20,
        font: font4,
        format: format,
        style: PdfUnorderedListStyle.square
    });
    // Add the unordered sublist to the second main item
    unorderedList.items.at(1).subList = subList;
    // Draw the unordered list
    unorderedList.draw(page, {
        x: 0,
        y: 130,
        width: page.graphics.clientSize.width,
        height: page.graphics.clientSize.height - 130
    });
    // Save the PDF
    pdf.save('UnorderedList.pdf');
    // Destroy the document instance
    pdf.destroy();
};