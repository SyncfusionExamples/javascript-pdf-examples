import { Component } from '@angular/core';
import {
  PdfDocument, PdfPageImportOptions, PdfRotationAngle
} from '@syncfusion/ej2-pdf';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html'
})

export class App {

  // URL of the destination PDF document
  private readonly destinationUrl =
    'https://cdn.syncfusion.com/content/pdf-resources/pdf-succinctly.pdf';

  // URL of the source PDF document  
  private readonly sourceUrl =
    'https://cdn.syncfusion.com/content/PDFViewer/flutter-succinctly.pdf';

  /**
 * Merges pages from one PDF document into another PDF document
 */
  async mergePdfDocument(): Promise<void> {

    // Retrieve the destination PDF document as a byte array
    const destinationBytes = await this.getPdfAsUint8Array(this.destinationUrl);

    // Retrieve the source PDF document as a byte array
    const sourceBytes = await this.getPdfAsUint8Array(this.sourceUrl);

    // Load an existing PDF document
    const destination = new PdfDocument(destinationBytes);

    // Load another existing PDF document
    const source = new PdfDocument(sourceBytes);

    // Scenario 1: Import all pages from the source document
    destination.importPageRange(source, 0, source.pageCount - 1);

    // Scenario 2: Import a selected page range at a specific position

    // Create options to customize the page import process
    const options = new PdfPageImportOptions();

    // Set the target page index where the imported pages will be inserted
    options.targetIndex = 3;

    // Import pages from index 2 to 4 and insert them at the specified position
    destination.importPageRange(source, 2, 4, options);

    // Scenario 3: Import a single page with optimization options

    // Set the rotation angle for the imported page
    options.rotation = PdfRotationAngle.angle270;

    // Set the target page index where the imported page will be inserted
    options.targetIndex = 7;

    // Enable resource optimization while importing pages
    options.optimizeResources = true;

    // Group form fields with the same name during the import process
    options.groupFormFields = true;

    // Import a single page from the source document using the specified options
    destination.importPage(
      source.getPage(1),
      source,
      options
    );

    // Save the output PDF document
    destination.save('Output.pdf');

    // Destroy the documents to free resources
    destination.destroy();
    source.destroy();
  }

  /**
   * Retrieves a PDF document from the specified URL
   * and returns its content as a Uint8Array
  */
  private async getPdfAsUint8Array(url: string): Promise<Uint8Array> {

    // Send a request to retrieve the PDF document
    const response = await fetch(url);

    // Convert the response content to a Uint8Array
    return new Uint8Array(await response.arrayBuffer());
  }

}