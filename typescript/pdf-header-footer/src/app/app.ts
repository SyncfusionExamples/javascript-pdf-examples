import { Button } from "@syncfusion/ej2-buttons";
import { PdfDocument, PdfFontFamily, PdfBrush, PdfStandardFont, PdfCompositeField, PdfDashStyle, PdfFontStyle, PdfMargins, PdfPageCountField, PdfPageNumberField, PdfPageSettings, PdfPageTemplateElement, PdfPen, PdfStringFormat, PdfTextAlignment, Rectangle } from '@syncfusion/ej2-pdf';

// Create and initialize the PDF creation button
var generatePDF = new Button({ cssClass: `e-primary` });
generatePDF.appendTo('#generatePDF');
// Generate an Modified Form PDF when the button is clicked
generatePDF.element.onclick = generateHeaderFooter;

function generateHeaderFooter() {
    const pageWidth = 800;
    const pageHeight = 520;
    let doc = new PdfDocument();
    let setting = new PdfPageSettings();
    setting.size = { width: pageWidth, height: pageHeight };
    const margin = new PdfMargins(15);
    setting.margins = margin;
    let page1 = doc.addPage(setting);
    let page2 = doc.addPage(setting);
    const header = new PdfPageTemplateElement({ width: pageWidth, height: 125 });
    const hg = header.graphics;
    const titleFont = new PdfStandardFont(PdfFontFamily.helvetica, 18, PdfFontStyle.bold);
    const font = new PdfStandardFont(PdfFontFamily.helvetica, 10);
    const blue = new PdfBrush({ r: 91, g: 125, b: 192 });
    const black = new PdfBrush({ r: 0, g: 0, b: 0 });
    // ===== TITLE =====
    hg.drawString('Credit Card Statement', titleFont, { x: 20, y: 20, width: 400, height: 25 }, blue);
    // ===== RIGHT SIDE TEXT =====
    const rightFormat = new PdfStringFormat();
    rightFormat.alignment = PdfTextAlignment.right;
    // fonts
    const boldFont = new PdfStandardFont(PdfFontFamily.helvetica, 10, PdfFontStyle.bold);
    const rightBlockX = pageWidth - 220;
    const rightBlockWidth = 200;
    // ✅ Move DOWN to center with address section
    hg.drawString('For Lost or Stolen Card,', boldFont,
        {
            x: rightBlockX - 20,
            y: 55,   // ✅ key fix (was too high before)
            width: rightBlockWidth,
            height: 15
        }, black, rightFormat
    );
    hg.drawString('Call: 1-800-XXX-XXXX', font,
        {
            x: rightBlockX - 30,
            y: 70,   // ✅ directly below
            width: rightBlockWidth,
            height: 15
        }, black, rightFormat
    );
    // ===== CUSTOMER DETAILS (LEFT) =====
    let y = 55;
    hg.drawString('Name: Abraham Swearengin', font, { x: 20, y, width: 300, height: 15 }, black);
    y += 15;
    hg.drawString('Address: United States, California,', font, { x: 20, y, width: 320, height: 15 }, black);
    y += 15;
    hg.drawString('San Mateo, 9920 BridgePointe Parkway,', font, { x: 20, y, width: 320, height: 15 }, black);
    y += 15;
    hg.drawString('Account Number: 12345-67-8901', font, { x: 20, y, width: 320, height: 15 }, black);
    // ===== DIVIDER LINE (IMPORTANT MISSING PART) =====
    const dividerPen = new PdfPen({ r: 91, g: 125, b: 192 }, 1);
    hg.drawLine(dividerPen, { x: 20, y: 120 }, { x: pageWidth - 20, y: 120 });
    // APPLY TEMPLATE
    doc.template.top = { template: header };
    const footer = new PdfPageTemplateElement({ width: pageWidth, height: 70 });
    const fg = footer.graphics;
    // dashed line
    const pen = new PdfPen({ r: 91, g: 125, b: 192 }, 1);
    pen.dashStyle = PdfDashStyle.dash;
    fg.drawLine(pen, { x: 20, y: 5 }, { x: pageWidth - 20, y: 5 });
    // page number
    const pageNumber = new PdfPageNumberField({ font });
    const pageCount = new PdfPageCountField({ font });
    const composite = new PdfCompositeField({ font, brush: black, pattern: 'Page {0} of {1}', automaticFields: [pageNumber, pageCount] });
    for (let i = 0; i < doc.pageCount; i++) {
        let page = doc.getPage(i);
        const bottomY = 335;
        composite.draw(page.graphics, { x: 20, y: bottomY });
    }
    fg.drawString('800 Interchange Blvd.\nSuite 2501, Austin, TX 78721\nAny Questions? support@adventure-works.com',
        font, { x: pageWidth - 300, y: 15, width: 280, height: 50 }, black, rightFormat);
    doc.template.bottom = { template: footer };
    const g = page1.graphics;
    let y1 = 0;
    const startX = 20;
    const contentWidth = pageWidth - 40;
    const contentFont = new PdfStandardFont(PdfFontFamily.helvetica, 10);
    const boldContentFont = new PdfStandardFont(PdfFontFamily.helvetica, 10, PdfFontStyle.bold);
    const blueBrush = new PdfBrush({ r: 91, g: 125, b: 192 });
    const whiteBrush = new PdfBrush({ r: 255, g: 255, b: 255 });
    const blackBrush = new PdfBrush({ r: 0, g: 0, b: 0 });
    const linePen = new PdfPen({ r: 120, g: 120, b: 120 }, 0.5);
    g.drawRectangle({ x: startX, y: y1, width: pageWidth - 110, height: 22 }, blueBrush);
    g.drawString('Payment Information', boldContentFont, { x: startX + 8, y: y1 + 5, width: 300, height: 20 }, whiteBrush);
    y1 += 30;
    // ================= PAYMENT TEXT =================
    const gap = 18;
    g.drawString('Date: 10/15/XX', contentFont, { x: startX, y: y1, width: 300, height: 20 }, blackBrush);
    y1 += gap;
    g.drawString('Payment Due Date: 11/5/XX', contentFont, { x: startX, y: y1, width: 300, height: 20 }, blackBrush);
    y1 += gap;
    g.drawString('New Balance: $2402.00', contentFont, { x: startX, y: y1, width: 300, height: 20 }, blackBrush);
    y1 += gap;
    g.drawString('Minimum Payment: $50', contentFont, { x: startX, y: y1, width: 300, height: 20 }, blackBrush);
    y1 += 20;
    // ================= DIVIDER =================
    g.drawLine(linePen, { x: startX, y: y1 }, { x: startX + contentWidth - 30, y: y1 });
    y1 += 5;
    // ================= TABLE SETUP =================
    // ✅ 2 columns (FULL WIDTH)
    const colWidths = [contentWidth * 0.60, contentWidth * 0.30];
    // ================= TABLE HEADER =================
    g.drawRectangle({ x: startX, y: y1, width: pageWidth - 115, height: 22 }, blueBrush);
    g.drawString('Account Summary', boldContentFont, { x: startX + 8, y: y1 + 4, width: pageWidth - 115, height: 20 }, whiteBrush);
    y1 += 22;
    // ================= ROW HELPER =================
    function drawRow(label: string, value: string) {
        const rightAlign = new PdfStringFormat();
        rightAlign.alignment = PdfTextAlignment.right;
        // ✅ DRAW CELLS
        g.drawRectangle({ x: startX, y: y1, width: colWidths[0], height: 20 }, linePen);
        g.drawRectangle({ x: startX + colWidths[0], y: y1, width: colWidths[1], height: 20 }, linePen);
        g.drawString(label, contentFont, { x: startX + 5, y: y1 + 4, width: colWidths[0] - 10, height: 20 }, blackBrush);
        // ✅ VALUE (FIXED CLIPPING ISSUE)
        g.drawString(value, contentFont,
            {
                x: startX + colWidths[0] - 2,   // ✅ shift LEFT instead of inside
                y: y1 + 4,
                width: colWidths[1],
                height: 20
            }, blackBrush, rightAlign
        );
        y1 += 20;
    }
    // ================= TABLE DATA =================
    drawRow('Previous Balance', '$1200.00');
    drawRow('Payment, Credits', '-$200.00');
    drawRow('Purchases', '$1500.00');
    drawRow('Cash Advances', '$100.00');
    drawRow('Fees Charged', '$0');
    drawRow('Interest Charged', '$2.00');
    drawRow('New Balance', '$2402.00');
    // ================= PAGE 2 =================
    const g2 = page2.graphics;
    let y2 = 0;
    // ✅ Same margins as Page 1
    const startX2 = 20;
    const contentWidth2 = pageWidth - 40;
    // Reuse fonts/brushes already defined
    const rightAlign2 = new PdfStringFormat();
    rightAlign2.alignment = PdfTextAlignment.right;
    // ================= SECTION 1 =================
    // HEADER (✅ same width as page1)
    g2.drawRectangle({ x: startX2, y: y2, width: pageWidth - 115, height: 22 }, blueBrush
    );
    g2.drawString('Account Summary', boldContentFont, { x: startX2 + 8, y: y2 + 4, width: 200, height: 20 }, whiteBrush);
    y2 += 22;
    const colW1 = contentWidth2 * 0.60;
    const colW2 = contentWidth2 * 0.30;
    function drawRow2(left: string, right: string) {
        g2.drawRectangle({ x: startX2, y: y2, width: colW1, height: 20 }, linePen);
        g2.drawRectangle({ x: startX2 + colW1, y: y2, width: colW2, height: 20 }, linePen);
        g2.drawString(left, contentFont, { x: startX2 + 5, y: y2 + 4, width: colW1 - 10, height: 20 }, blackBrush);
        g2.drawString(right, contentFont,
            {
                x: startX2 + colW1 - 2,
                y: y2 + 4,
                width: colW2,
                height: 20
            }, blackBrush, rightAlign2
        );
        y2 += 20;
    }
    drawRow2('Opening/Closing Date', '9/15/XX - 10/14/XX');
    drawRow2('Credit Access Line', '$15,000.00');
    drawRow2('Available Credit', '$10,000.00');
    drawRow2('Cash Access Line', '$2,000');
    drawRow2('Available for Cash', '$2,000');
    drawRow2('Previous Due Amount', '$0');
    drawRow2('Balance Over the Credit Access Line', '$0');
    y2 += 20;
    // ================= SECTION 2 =================
    const tableWidth = pageWidth - 115;
    const col3 = [tableWidth * 0.4, tableWidth * 0.3, tableWidth * 0.3];
    const centerAlign = new PdfStringFormat();
    centerAlign.alignment = PdfTextAlignment.center;
    let x = startX2;
    ['Finance Charge Summary', 'Purchases', 'Advances'].forEach((text, i) => {
        g2.drawRectangle({ x, y: y2, width: col3[i], height: 22 }, blueBrush);
        g2.drawString(text, boldContentFont, { x, y: y2 + 4, width: col3[i], height: 20 }, whiteBrush, centerAlign);
        x += col3[i];
    });
    y2 += 22;
    function drawRow3(label: string, val1: string, val2: string) {
        let x = startX2;
        col3.forEach(w => {
            g2.drawRectangle({ x, y: y2, width: w, height: 20 }, linePen);
            x += w;
        });
        g2.drawString(label, contentFont, { x: startX2 + 5, y: y2 + 4, width: col3[0] - 10, height: 20 }, blackBrush);
        g2.drawString(val1, contentFont,
            {
                x: startX2 + col3[0] - 2,
                y: y2 + 4,
                width: col3[1],
                height: 20
            }, blackBrush, rightAlign2
        );
        g2.drawString(val2, contentFont,
            {
                x: startX2 + col3[0] + col3[1] - 2,
                y: y2 + 4,
                width: col3[2],
                height: 20
            }, blackBrush, rightAlign2
        );
        y2 += 20;
    }
    drawRow3('Periodic Rate', '1.05%', '0.73%');
    drawRow3('Annual Percentage Rate (APR)', '12.05%', '5.25%');
    doc.save('HeaderAndFooter.pdf');
}