import {
  PdfDocument, PdfPageSettings, PdfMargins, PdfBrush, PdfPen,
  PdfFontFamily, PdfFontStyle, PdfTextWebLinkAnnotation
} from '@syncfusion/ej2-pdf';


function App() {

  /**
    * Generates a single-page PDF with a brochure-like layout.
    * Flow:
    * 1) Create document + page (with zero margins)
    * 2) Paint background blocks (header/body/footer regions)
    * 3) Draw header branding text
    * 4) Draw header bullet points (top region)
    * 5) Draw body bullet points (middle region)
    * 6) Draw two-column feature sections (bottom region)
    * 7) Add footer + web link annotation
    * 8) Save and dispose the document
  */
  const createPDF = () => {

    // Create a new PDF document and a single page with zero margins
    const pdf = new PdfDocument();
    const settings = new PdfPageSettings({ margins: new PdfMargins(0) });

    // Add a page with the above settings
    const page = pdf.addPage(settings);

    // Graphics context used for all drawing operations on this page
    const graphics = page.graphics;

    // ---------------------- Brushes & Pens ----------------------

    // Brushes fill shapes and text; pens draw lines/strokes.
    const gray = new PdfBrush({ r: 64, g: 64, b: 64 });
    const black = new PdfBrush({ r: 0, g: 0, b: 0 });
    const white = new PdfBrush({ r: 255, g: 255, b: 255 });
    const violet = new PdfBrush({ r: 255, g: 153, b: 255 });
    const redPen = new PdfPen({ r: 255, g: 0, b: 0 }, 2);
    const violetPen = new PdfPen({ r: 148, g: 0, b: 211 }, 2);
    const greenPen = new PdfPen({ r: 0, g: 128, b: 0 }, 2);
    const bluePen = new PdfPen({ r: 0, g: 0, b: 255 }, 2);

    // ---------------------- Background layout blocks ----------------------

    // 1) Full-page background (gray)
    graphics.drawRectangle(
      { x: 0, y: 0, width: graphics.clientSize.width, height: graphics.clientSize.height },
      gray
    );

    // 2) Header strip at the top (black)
    graphics.drawRectangle(
      { x: 0, y: 0, width: graphics.clientSize.width, height: 130 },
      black
    );

    // 3) Bottom content area (white) to contrast with the gray background
    graphics.drawRectangle(
      { x: 0, y: 400, width: graphics.clientSize.width, height: graphics.clientSize.height - 450 },
      white
    );

    // ---------------------- Header branding ----------------------

    // Large header font for the main brand word
    const headerFont = pdf.embedFont(
      PdfFontFamily.timesRoman, 35, PdfFontStyle.regular
    );

    // Draw the main header word in violet
    graphics.drawString(
      'Enterprise', headerFont,
      { x: 10, y: 20, width: 150, height: 200 },
      violet
    );

    // Draw a violet highlight rectangle behind the subheading
    graphics.drawRectangle({ x: 10, y: 63, width: 140, height: 35 }, violet);

    // Subheading font placed on top of the violet highlight
    const subHeadingFont = pdf.embedFont(
      PdfFontFamily.timesRoman, 16, PdfFontStyle.regular);
    graphics.drawString(
      'Reporting Solutions', subHeadingFont,
      { x: 15, y: 70, width: 130, height: 200 },
      black
    );

    // Header bullet points: small highlights under header area
    const bodyFont = pdf.embedFont(
      PdfFontFamily.timesRoman, 11, PdfFontStyle.regular
    );
    const bulletHeaderFont = pdf.embedFont(
      PdfFontFamily.zapfDingbats, 10, PdfFontStyle.regular
    );

    // Y-position cursor used to place text blocks vertically in sequence
    let yPos = 30;

    // ---------------------- Header bullet list (top black strip) ----------------------

    // These are short selling points displayed in the header area.
    // drawHeaderPoint() returns the next Y position to keep stacking lines neatly.
    yPos = drawHeaderPoint(graphics,
      'Develop cloud-ready reporting applications in as little as 20% of the time.',
      yPos, bulletHeaderFont, bodyFont, white, violet
    );
    yPos = drawHeaderPoint(graphics,
      'Proven, reliable platform thousands of users over the past 10 years.',
      yPos, bulletHeaderFont, bodyFont, white, violet
    );
    yPos = drawHeaderPoint(graphics,
      'Microsoft Excel, Word, Adobe PDF, RDL display and editing.',
      yPos, bulletHeaderFont, bodyFont, white, violet
    );
    yPos = drawHeaderPoint(graphics,
      'Why start from scratch? Rely on our dependable solution frameworks',
      yPos, bulletHeaderFont, bodyFont, white, violet
    );

    // Add spacing before moving into the larger middle bullet list
    yPos += 105;

    // Larger bullets + larger text for the body feature list
    const bulletBodyFont = pdf.embedFont(
      PdfFontFamily.zapfDingbats, 16, PdfFontStyle.regular
    );
    const bodyContentFont = pdf.embedFont(
      PdfFontFamily.timesRoman, 17, PdfFontStyle.regular
    );

    // ---------------------- Body bullet list (middle area) ----------------------

    yPos = drawBodyContent(graphics,
      'Deployment-ready framework tailored to your needs.',
      yPos, bulletBodyFont, bodyContentFont, white, violet
    );
    yPos = drawBodyContent(graphics,
      'Our architects and developers have years of reporting experience.',
      yPos, bulletBodyFont, bodyContentFont, white, violet
    );
    yPos = drawBodyContent(graphics,
      'Solutions available for web, desktop, and mobile applications.',
      yPos, bulletBodyFont, bodyContentFont, white, violet);
    yPos = drawBodyContent(graphics,
      'Backed by our end-to-end product maintenance infrastructure.',
      yPos, bulletBodyFont, bodyContentFont, white, violet);
    yPos = drawBodyContent(graphics,
      'The quickest path from concept to delivery.',
      yPos, bulletBodyFont, bodyContentFont, white, violet
    );

    // ---------------------- Lower white section: two-column feature blocks ----------------------

    // Left edge alignment reference for the feature blocks
    const headerBulletsXposition = 45;

    // Reset Y to the start of the white region content
    yPos = 350;

    // Title font used for headings in the lower section
    const titleFont = pdf.embedFont(
      PdfFontFamily.timesRoman, 20, PdfFontStyle.regular
    );

    // ---- Row 1: "The Experts" and "Accurate Estimates" ----

    // Decorative vertical line + heading on the left column
    graphics.drawLine(redPen,
      { x: headerBulletsXposition, y: yPos + 92 },
      { x: headerBulletsXposition, y: yPos + 145 }
    );
    graphics.drawString('The Experts', titleFont,
      { x: headerBulletsXposition + 10, y: yPos + 90, width: 150, height: 200 }, black
    );
    graphics.drawLine(violetPen,
      { x: headerBulletsXposition + 280, y: yPos + 92 },
      { x: headerBulletsXposition + 280, y: yPos + 145 }
    );
    graphics.drawString('Accurate Estimates', titleFont,
      { x: headerBulletsXposition + 290, y: yPos + 90, width: 300, height: 200 },
      black
    );

    // Supporting text under each heading
    graphics.drawString(
      'A substantial number of .NET reporting applications use our frameworks',
      bodyFont,
      { x: headerBulletsXposition + 10, y: yPos + 115, width: 250, height: 200 },
      black
    );
    graphics.drawString(
      'Given our expertise, you can expect estimates to be accurate.',
      bodyFont, { x: headerBulletsXposition + 290, y: yPos + 115, width: 250, height: 200 },
      black
    );

    // Move down for the second row of feature blocks
    yPos += 200;

    // ---- Row 2: "Product Licensing" and "About Syncfusion" ----
    graphics.drawLine(greenPen,
      { x: headerBulletsXposition, y: yPos + 32 }, { x: headerBulletsXposition, y: yPos + 85 });
    graphics.drawString('Product Licensing',
      titleFont,
      { x: headerBulletsXposition + 10, y: yPos + 30, width: 250, height: 200 },
      black
    );
    graphics.drawLine(bluePen, { x: headerBulletsXposition + 280, y: yPos + 32 },
      { x: headerBulletsXposition + 280, y: yPos + 85 }
    );
    graphics.drawString('About Syncfusion',
      titleFont,
      { x: headerBulletsXposition + 290, y: yPos + 30, width: 250, height: 200 },
      black
    );

    // Supporting text for second row
    graphics.drawString(
      'Solution packages can be combined with product licensing for great cost savings.',
      bodyFont,
      { x: headerBulletsXposition + 10, y: yPos + 55, width: 250, height: 200 },
      black
    );
    graphics.drawString(
      'Syncfusion has more than 7,000 customers including large financial institutions and Fortune 100 companies.',
      bodyFont,
      { x: headerBulletsXposition + 290, y: yPos + 55, width: 250, height: 200 },
      black
    );

    // ---------------------- Footer text ----------------------

    const footerFont = pdf.embedFont(PdfFontFamily.timesRoman, 8, PdfFontStyle.italic);

    // Footer disclaimer placed near the bottom-left (drawn in white on gray)
    graphics.drawString(
      'All trademarks mentioned belong to their owners.',
      footerFont, { x: 10, y: graphics.clientSize.height - 30, width: 250, height: 200 }, white);

    // ---------------------- Clickable web link annotation ----------------------

    // Add a hyperlink-like annotation near the bottom-right.
    // The annotation rectangle defines clickable area; the appearance uses white text.
    const annot = new PdfTextWebLinkAnnotation(
      { x: graphics.clientSize.width - 100, y: graphics.clientSize.height - 30, width: 70, height: 10 },
      { r: 255, g: 255, b: 255 },
      null,
      0,
      { text: 'www.syncfusion.com', font: footerFont, url: 'http://www.syncfusion.com' });

    // Attach annotation to the page so it becomes interactive in the PDF
    page.annotations.add(annot);

    // Save PDF to file and dispose the document
    pdf.save('Output.pdf');
    pdf.destroy();
  };

  /**
   * Draw a bullet header point in PDF
   */
  const drawHeaderPoint = (graphics, text, y, bulletFont, bodyFont, white, violet) => {
    graphics.drawString('l', bulletFont, { x: 220, y: y, width: 100, height: 100 }, violet);
    graphics.drawString(text, bodyFont, { x: 240, y: y, width: 400, height: 100 }, white);
    return y + 15;
  };

  /**
   * Draw a bullet body content in PDF
   */
  const drawBodyContent = (graphics, text, y, bulletBodyFont, bodyFont, white, violet) => {
    graphics.drawString('3', bulletBodyFont, { x: 35, y: y, width: 100, height: 100 }, violet);
    graphics.drawString(text, bodyFont, { x: 60, y: y, width: 500, height: 100 }, white);
    return y + 25;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f7fc",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,.1)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#0f6cbd",
            marginBottom: "20px",
          }}
        >
          JavaScript PDF Library
        </h2>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#444",
          }}
        >
          Click the button below to generate a PDF document using the
          Syncfusion JavaScript PDF Library.
        </p>
        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.6",
            color: "#666",
          }}
        >
          Note: Adobe Reader or an equivalent PDF viewer is required to open
          the generated document.
        </p>
        <button
          onClick={createPDF}
          style={{
            marginTop: "20px",
            background: "#0f6cbd",
            color: "white",
            border: "none",
            padding: "12px 28px",
            fontSize: "18px",
            fontWeight: 600,
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Generate PDF
        </button>
      </div>
    </div>
  )
}

export default App
