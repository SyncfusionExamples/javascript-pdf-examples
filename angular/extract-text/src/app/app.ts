import { Component } from '@angular/core';
import { PdfDocument, Rectangle } from '@syncfusion/ej2-pdf';
import { TextLine, PdfDataExtractor } from '@syncfusion/ej2-pdf-data-extract';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {

  // URL of the input PDF document
  private readonly documentUrl =
    'https://cdn.syncfusion.com/content/pdf-resources/pdf-succinctly.pdf';

  // Variable to store PDF document bytes  
  private documentBytes!: Uint8Array;

  // Load the PDF document when the component initializes
  async ngOnInit(): Promise<void> {
    this.documentBytes = await this.getInputBytes(this.documentUrl);
  }

  // Extract all text from the PDF document
  async extractText(): Promise<void> {

    // Load the PDF document from byte array
    const inputDocument = new PdfDocument(this.documentBytes);

    // Create a PDF data extractor instance
    let extractor: PdfDataExtractor = new PdfDataExtractor(inputDocument);

    // Extract all text content from the document
    let text: string = extractor.extractTextSync();

    // Release PDF resources
    inputDocument.destroy();

    // Download the extracted text as a TXT file
    this.downloadTextFile(
      new Blob([text], { type: 'text/plain' }),
      'Output.txt'
    );
  }

  // Extract text from a specified page range
  async extractbyPageRange(): Promise<void> {

    // Load the PDF document
    const inputDocument = new PdfDocument(this.documentBytes);

    // Create a PDF data extractor instance
    let extractor: PdfDataExtractor = new PdfDataExtractor(inputDocument);

    // // Extract text from pages 0 through 1
    let text: string = extractor.extractTextSync({
      startPageIndex: 0,
      endPageIndex: 1,
    });

    // Release PDF resources
    inputDocument.destroy();

    // Download the extracted text as a TXT file
    this.downloadTextFile(
      new Blob([text], { type: 'text/plain' }),
      'Output.txt'
    );
  }

  // Extract text while preserving the document layout
  async extractLayout(): Promise<void> {

    // Load the PDF document
    const inputDocument = new PdfDocument(this.documentBytes);

    // Create a PDF data extractor instance
    let extractor: PdfDataExtractor = new PdfDataExtractor(inputDocument);

    // Extract text and maintain the original layout
    let text: string = extractor.extractTextSync({
      isLayout: true
    });

    // Release PDF resources
    inputDocument.destroy();

    // Download the extracted text
    this.downloadTextFile(
      new Blob([text], { type: 'text/plain' }),
      'Output.txt'
    );
  }

  // Extract text lines along with their bounds and page information
  async extractTextLines(): Promise<void> {

    // Load the PDF document
    const inputDocument = new PdfDocument(this.documentBytes);

    // Create a PDF data extractor instance
    let extractor: PdfDataExtractor = new PdfDataExtractor(inputDocument);

    // Extract text lines from pages 0 through 1
    let textLines: Array<TextLine> = extractor.extractTextLinesSync({
      startPageIndex: 0,
      endPageIndex: 1
    });

    // Variable to store formatted output
    let extractedText: string = '';

    // Iterate through each extracted text line
    textLines.forEach((textLine: TextLine) => {

      // Get the bounding rectangle of the text line
      const bounds: Rectangle = textLine.bounds;

      // Add extracted text to the output
      extractedText += `Text: ${textLine.text}\n`;

      // Add bounds information to the output
      extractedText += `Bounds: X=${bounds.x}, Y=${bounds.y}, Width=${bounds.width}, Height=${bounds.height}\n`;

      // Add page index information
      extractedText += `Page Index: ${textLine.pageIndex}\n`;

      // Add a separator for readability
      extractedText += '-----------------------------------\n';
    });

    // Release PDF resources
    inputDocument.destroy();

    // Download the extracted text line details
    this.downloadTextFile(new Blob([extractedText], { type: 'text/plain' }), 'Output.txt');
  }

  // Download a Blob object as a file
  private downloadTextFile(blob: Blob, fileName: string): void {

    // Create a temporary object URL
    const url = URL.createObjectURL(blob);

    // Create an anchor element
    const a = document.createElement('a');

    // Set the download URL
    a.href = url;

    // Set the output file name
    a.download = fileName;

    // Add the anchor element to the document
    document.body.appendChild(a);

    // Trigger the download
    a.click();

    // Remove the anchor element
    document.body.removeChild(a);

    // Release the object URL
    URL.revokeObjectURL(url);
  }

  // Fetch the PDF document and return its bytes
  private async getInputBytes(url: string): Promise<Uint8Array> {
    const response = await fetch(url);
    return new Uint8Array(await response.arrayBuffer());
  }

}
