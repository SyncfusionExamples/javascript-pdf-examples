import { Component, } from '@angular/core';
import {
  PdfBrush, PdfDocument, PdfFontFamily, PdfFontStyle
} from '@syncfusion/ej2-pdf';
import {
  PdfRedactor, PdfRedactionRegion, ApplicationPlatform
} from '@syncfusion/ej2-pdf-data-extract';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  // URL of the input PDF document
  private readonly documentUrl =
    'https://cdn.syncfusion.com/content/pdf-resources/credit_card_statement.pdf';

  // Stores the PDF document as a byte array  
  private documentBytes!: Uint8Array;

  // Load the PDF document when the component initializes
  async ngOnInit(): Promise<void> {
    this.documentBytes = await this.getInputBytes(this.documentUrl);
  }

  /**
   * Redact content from a specified region in the PDF document
  */
  async redactContent(): Promise<void> {

    // Load the PDF document from the byte array
    let pdfdocument: PdfDocument = new PdfDocument(this.documentBytes);

    // Create a PDF redactor instance
    let redactor: PdfRedactor = new PdfRedactor(pdfdocument);

    // Create a collection to hold redaction regions
    let redactions: PdfRedactionRegion[] = [];

    // Define the area to be redacted on the first page
    let redaction: PdfRedactionRegion = new PdfRedactionRegion(
      0,
      { x: 70, y: 120, width: 200, height: 80 }
    );

    // Add the redaction region to the collection
    redactions.push(redaction);

    // Add all redaction regions to the redactor
    redactor.add(redactions);

    // Create a canvas callback required for the redaction process
    const canvasRenderCallback = (): {
      canvas: any,
      applicationPlatform: ApplicationPlatform
    } => {

      // Create an HTML canvas element
      const canvas = document.createElement('canvas');

      // Return the canvas and platform information
      return { canvas: canvas, applicationPlatform: ApplicationPlatform.typescript };
    };

    // Apply the redaction to the PDF document
    await redactor.redact(canvasRenderCallback);

    // Save the redacted PDF document
    pdfdocument.save('output.pdf');

    // Release resources used by the PDF document
    pdfdocument.destroy();
  }

  /**
   * Apply a fill color to the redacted area
  */
  async applyRedactionFillColor(): Promise<void> {

    // Load the PDF document from the byte array
    let pdfdocument: PdfDocument = new PdfDocument(this.documentBytes);

    // Create a PdfRedactor instance
    let redactor: PdfRedactor = new PdfRedactor(pdfdocument);

    // Create a collection for redaction regions
    let redactions: PdfRedactionRegion[] = [];

    // Define the redaction region
    let redaction: PdfRedactionRegion = new PdfRedactionRegion(
      0,
      { x: 70, y: 120, width: 200, height: 80 }
    );

    // Set the fill color of the redacted area 
    redaction.fillColor = { r: 0, g: 0, b: 0 };

    // Add the redaction region to the collection
    redactions.push(redaction);

    // Add the redaction region to the redactor
    redactor.add(redactions);

    // Create a canvas callback
    const canvasRenderCallback = (): {
      canvas: any,
      applicationPlatform: ApplicationPlatform
    } => {

      // Create a canvas element
      const canvas = document.createElement('canvas');

      // Return the canvas and platform details
      return { canvas: canvas, applicationPlatform: ApplicationPlatform.typescript };
    };

    // Apply the redaction with the fill color
    await redactor.redact(canvasRenderCallback);

    // Save the output PDF document
    pdfdocument.save('output.pdf');

    // Release resources used by the PDF document
    pdfdocument.destroy();
  }

  /**
   * Customize the text appearance within the redacted area
  */
  async customizeTextAppearance(): Promise<void> {

    // Load the PDF document from the byte array
    let pdfdocument: PdfDocument = new PdfDocument(this.documentBytes);

    // Create a PdfRedactor instance
    let redactor: PdfRedactor = new PdfRedactor(pdfdocument);

    // Create a collection for redaction regions
    let redactions: PdfRedactionRegion[] = [];

    // Create a redaction region with appearance customization enabled
    let redaction: PdfRedactionRegion = new PdfRedactionRegion(
      0,
      { x: 70, y: 120, width: 200, height: 80 },
      true
    );

    // Embed a Helvetica font
    let font = pdfdocument.embedFont(PdfFontFamily.helvetica, 10, PdfFontStyle.regular);

    // Draw custom text in the redacted area
    redaction.appearance.normal.graphics.drawString(
      'Redacted Text',
      font,
      { x: 30, y: 40, width: 80, height: 20 },
      new PdfBrush({ r: 0, g: 0, b: 0 })
    );

    // Add the redaction region to the collection
    redactions.push(redaction);

    // Add the redaction regions to the redactor
    redactor.add(redactions);

    // Create a canvas callback
    const canvasRenderCallback = (): {
      canvas: any,
      applicationPlatform: ApplicationPlatform
    } => {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      // Return the canvas and platform information
      return { canvas: canvas, applicationPlatform: ApplicationPlatform.typescript };
    };

    // Apply the customized redaction
    await redactor.redact(canvasRenderCallback);

    // Save the output PDF document
    pdfdocument.save('output.pdf');

    // Release resources used by the PDF document
    pdfdocument.destroy();
  }

  /**
  * Retrieves a PDF document from the specified URL
  * and returns its content as a Uint8Array
 */
  private async getInputBytes(url: string): Promise<Uint8Array> {

    // Send a request to retrieve the PDF document
    const response = await fetch(url);

    // Convert the response content to a Uint8Array
    return new Uint8Array(await response.arrayBuffer());
  }
}
