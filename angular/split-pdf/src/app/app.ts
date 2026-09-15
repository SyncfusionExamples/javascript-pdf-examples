import { Component } from '@angular/core';
import { PdfDocument, PdfDocumentSplitEventArgs } from '@syncfusion/ej2-pdf';
import { Save } from '@syncfusion/ej2-file-utils';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  // URL of the input PDF document
  private readonly documentUrl =
    'https://cdn.syncfusion.com/content/pdf-resources/pdf-succinctly.pdf';

  // Stores the PDF document as a byte array  
  private documentBytes!: Uint8Array;

  // Load the PDF document when the component initializes
  async ngOnInit(): Promise<void> {
    this.documentBytes = await this.getInputBytes(this.documentUrl);
  }

  /**
    * Split the PDF document into individual pages
   */
  async splitIntoIndividualPages(): Promise<void> {

    // Load the input PDF document
    const inputDocument = new PdfDocument(this.documentBytes);

    // Assign the split event handler
    inputDocument.splitEvent = documentSplitEvent;

    // Split the document so that each page becomes a separate PDF
    inputDocument.split();

    // Triggered for each generated PDF document
    function documentSplitEvent(
      sender: PdfDocument,
      args: PdfDocumentSplitEventArgs
    ): void {

      // Convert the split PDF data to a Uint8Array
      const pdfBytes = new Uint8Array(args.pdfData);

      // Download the generated PDF document
      Save.save(
        'output_' + args.index + '.pdf',
        new Blob(
          [pdfBytes.buffer.slice(0)],
          { type: 'application/pdf' }
        )
      );
    }

    // Release resources used by the PDF document
    inputDocument.destroy();
  }

  /**
    * Split the PDF document based on specific page ranges
   */
  async splitPageRange(): Promise<void> {

    // Load the input PDF document
    const inputDocument = new PdfDocument(this.documentBytes);

    // Assign the split event handler
    inputDocument.splitEvent = documentSplitEvent;

    // Split the document into separate PDFs for the specified page ranges
    inputDocument.splitByPageRanges([[1, 2], [3, 4]]);

    // Triggered for each generated PDF documen
    function documentSplitEvent(
      sender: PdfDocument,
      args: PdfDocumentSplitEventArgs
    ): void {

      // Convert the split PDF data to a Uint8Array
      const pdfBytes = new Uint8Array(args.pdfData);

      // Download the generated PDF document
      Save.save(
        'output_' + args.index + '.pdf',
        new Blob(
          [pdfBytes.buffer.slice(0)],
          { type: 'application/pdf' }
        )
      );
    }

    // Release resources used by the PDF document
    inputDocument.destroy();
  }

  /**
    * Split the PDF document into smaller PDFs with a fixed number of pages
   */
  async splitFixedNumber(): Promise<void> {

    // Load the input PDF document
    const inputDocument = new PdfDocument(this.documentBytes);

    // Assign the split event handler
    inputDocument.splitEvent = documentSplitEvent;

    // Split the document into PDFs containing one page each
    inputDocument.splitByFixedNumber(1);

    // Triggered for each generated PDF document
    function documentSplitEvent(
      sender: PdfDocument,
      args: PdfDocumentSplitEventArgs
    ): void {

      // Convert the split PDF data to a Uint8Array
      const pdfBytes = new Uint8Array(args.pdfData);

      // Download the generated PDF document
      Save.save(
        'output_' + args.index + '.pdf',
        new Blob(
          [pdfBytes.buffer.slice(0)],
          { type: 'application/pdf' }
        )
      );
    }
    // Release resources used by the PDF document
    inputDocument.destroy();
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
