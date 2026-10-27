import {
  PdfDocument,
  PdfPageSettings,
  PdfMargins,
  PdfPage,
  PdfGraphics,
  PdfBrush,
  PdfStringFormat,
  PdfTextDirection,
  PdfTextAlignment,
  PdfTrueTypeFont,
} from '@syncfusion/ej2-pdf';
import { ARABIC_FONT_URL, fetchAsUint8Array } from './fontDownloader';

export const ARABIC_TEXT = `سنبدأ بنظرة عامة مفاهيمية على مستند PDF بسيط. تم تصميم هذا الفصل ليكون توجيهًا مختصرًا قبل الغوص في مستند حقيقي وإنشاءه من البداية.

يمكن تقسيم ملف PDF إلى أربعة أجزاء: الرأس والجسم والجدول الإسناد الترافقي والمقطورة. يضع الرأس الملف كملف PDF ، حيث يحدد النص المستند المرئي ، ويسرد جدول الإسناد الترافقي موقع كل شيء في الملف ، ويوفر المقطع الدعائي تعليمات حول كيفية بدء قراءة الملف.

رأس الصفحة هو ببساطة رقم إصدار PDF وتسلسل عشوائي للبيانات الثنائية. البيانات الثنائية تمنع التطبيقات الساذجة من معالجة ملف PDF كملف نصي. سيؤدي ذلك إلى ملف تالف ، لأن ملف PDF يتكون عادةً من نص عادي وبيانات ثنائية.`;

export interface PdfResult {
  bytes: Uint8Array;
  fontBytes: number;
  elapsedMs: number;
}

export async function generateArabicPdf(): Promise<PdfResult> {
  const start = Date.now();
  const pdf: PdfDocument = new PdfDocument();
  try {
    const pageSettings = new PdfPageSettings({ margins: new PdfMargins(40) });
    const page: PdfPage = pdf.addPage(pageSettings);
    const g: PdfGraphics = page.graphics;

    const arabicBytes = await fetchAsUint8Array(ARABIC_FONT_URL);

    const brush = new PdfBrush({ r: 0, g: 0, b: 0 });
    const clientBounds = g.clientSize;
    const rect = {
      x: 0,
      y: 0,
      width: clientBounds.width,
      height: clientBounds.height,
    };

    const format = new PdfStringFormat();
    format.textDirection = PdfTextDirection.rightToLeft;
    format.alignment = PdfTextAlignment.right;

    const arabicFont = new PdfTrueTypeFont(arabicBytes, 13);
    g.drawString(ARABIC_TEXT, arabicFont, rect, brush, format);

    // save() without a filename returns the bytes (no DOM/Blob download).
    const bytes = pdf.save();
    return {
      bytes,
      fontBytes: arabicBytes.length,
      elapsedMs: Date.now() - start,
    };
  } finally {
    pdf.destroy();
  }
}
