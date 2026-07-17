import { Button } from "@syncfusion/ej2-buttons";
import { PdfBrush, PdfCjkFontFamily, PdfCjkStandardFont, PdfDocument, PdfFontFamily, PdfFontStyle, PdfGraphics, PdfPage, PdfStandardFont, PdfStringFormat, PdfTextAlignment, PdfTextDirection, PdfTrueTypeFont, PdfVerticalAlignment } from '@syncfusion/ej2-pdf';

let button: Button = new Button({ cssClass: `e-primary` });
button.appendTo('#drawText');
// Font URLs
var inputData = 'https://cdn.syncfusion.com/content/pdf-resources/noto-naskh-arabic-regular.ttf';
button.element.onclick = async (): Promise<void> => {
    // Load Arabic font bytes
    const arabicFontBytes = await fetchAsUint8Array(inputData);
    // Create PDF document and page
    const document: PdfDocument = new PdfDocument();
    const page: PdfPage = document.addPage();
    const graphics: PdfGraphics = page.graphics;
    const bounds = graphics.clientSize;
    // Common colors
    const headingBrush: PdfBrush = new PdfBrush({ r: 126, g: 70, b: 19 });
    const greenBrush: PdfBrush = new PdfBrush({ r: 0, g: 255, b: 0 });
    const blueBrush: PdfBrush = new PdfBrush({ r: 0, g: 0, b: 255 });
    const redBrush: PdfBrush = new PdfBrush({ r: 255, g: 0, b: 0 });
    // Fonts
    const headingFont: PdfStandardFont = document.embedFont(PdfFontFamily.helvetica, 20, PdfFontStyle.bold);
    const standardFont: PdfStandardFont = document.embedFont(PdfFontFamily.helvetica, 13, PdfFontStyle.regular);
    // Embedded TrueType font for Arabic text
    const arabicFont: PdfTrueTypeFont = new PdfTrueTypeFont(arabicFontBytes, 13);
    // CJK font for Japanese text
    const cjkFont: PdfCjkStandardFont = new PdfCjkStandardFont(PdfCjkFontFamily.heiseiKakuGothicW5, 13, PdfFontStyle.bold);
    //-------------------------------------------------------------------------
    // Font Types Section
    //-------------------------------------------------------------------------
    graphics.drawString("Font types", headingFont, { x: 200, y: 50, width: bounds.width, height: bounds.height }, headingBrush);

    // Standard font text
    graphics.drawString("Hello World - Standard font type", standardFont, { x: 10, y: 100, width: bounds.width, height: bounds.height }, greenBrush);
    // Arabic text using embedded TrueType font
    graphics.drawString("سنبدأ بنظرة عامة مفاهيمية على مستند PDF بسيط. تم تصميم هذا الفصل ليكون توجيهًا مختصرًا قبل الغوص في مستند حقيقي وإنشاءه من البداية.\nيمكن تقسيم ملف PDF إلى أربعة أجزاء: الرأس والجسم والجدول الإسناد الترافقي والمقطورة. يضع الرأس الملف كملف PDF ، حيث يحدد النص المستند المرئي ، ويسرد جدول الإسناد الترافقي موقع كل شيء في الملف ، ويوفر المقطع الدعائي تعليمات حول كيفية بدء قراءة الملف. - TrueType Font type",
        arabicFont, { x: 10, y: 130, width: bounds.width, height: bounds.height }, blueBrush
    );
    // Japanese text using CJK font
    graphics.drawString("こんにちは世界 - CJK Font type", cjkFont, { x: 10, y: 250, width: bounds.width, height: bounds.height }, redBrush);
    //-------------------------------------------------------------------------
    // Text Alignment Section
    //-------------------------------------------------------------------------
    graphics.drawString("Alignment types", headingFont, { x: 200, y: 280, width: bounds.width, height: bounds.height }, headingBrush);
    // Right-to-left text format
    let textFormat: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
    textFormat.wordSpacing = 2;
    textFormat.characterSpacing = 1;
    textFormat.textDirection = PdfTextDirection.rightToLeft;
    textFormat.lineLimit = false;
    textFormat.noClip = true;
    graphics.drawString("JavaScript PDF Library - Alignment Right and Bottom", standardFont, { x: 10, y: 150, width: 400, height: 200 }, blueBrush, textFormat);
    // Left-top alignment
    textFormat = new PdfStringFormat(PdfTextAlignment.left, PdfVerticalAlignment.top);
    graphics.drawString("JavaScript PDF Library - Alignment Left and Top", standardFont, { x: 10, y: 380, width: 400, height: 200 }, blueBrush, textFormat);
    // Save and clean up
    document.save("DrawText.pdf");
    document.destroy();
};

// Helper: fetch font as Uint8Array
function fetchAsUint8Array(url: string): Promise<Uint8Array> {
    return fetch(url, { cache: 'no-cache' })
        .then(function (res) {
            if (!res.ok) throw new Error("Failed to fetch " + url + ": " + res.status + " " + res.statusText);
            return res.arrayBuffer();
        })
        .then(function (buf) {
            return new Uint8Array(buf);
        });
}