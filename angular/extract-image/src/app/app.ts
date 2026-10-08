import { Component } from '@angular/core';
import { PdfDocument } from '@syncfusion/ej2-pdf';
import { PdfDataExtractor, PdfEmbeddedImage } from '@syncfusion/ej2-pdf-data-extract';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {

  // URL of the input PDF document
  private readonly documentUrl =
    'https://cdn.syncfusion.com/content/pdf-resources/pdf-succinctly.pdf';

  async extractImage(): Promise<void> {

    // Retrieve the input PDF document as a byte array
    const documentBytes = await this.getInputBytes(this.documentUrl);

    // Load an existing PDF document
    const pdfDocument = new PdfDocument(documentBytes);

    // Create a PdfDataExtractor instance
    const extractor = new PdfDataExtractor(pdfDocument, this.canvasRenderCallback);

    // Extract images from all pages in the PDF document
    const imageInfoCollection: PdfEmbeddedImage[] =
      await extractor.extractImages({
        startPageIndex: 0,
        endPageIndex: pdfDocument.pageCount - 1
      });

    // Access the first extracted image
    const imageInfo: PdfEmbeddedImage = imageInfoCollection[0];

    // Get the raw byte data of the extracted image
    const imageBytes = new Uint8Array(imageInfo.data);

    // Create a Blob object from the extracted image data
    const blob = new Blob([imageBytes], {
      type: 'image/jpeg'
    });

    // Download the image

    // Create an object URL for the image Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element to download the image
    const anchor = document.createElement('a');

    // Set the download URL
    anchor.href = url;

    // Specify the file name of the downloaded image
    anchor.download = 'ExtractedImage.jpg';

    // Trigger the download
    anchor.click();

    // Release the object URL to free memory
    URL.revokeObjectURL(url);

    // Destroy the PDF document and release resources
    pdfDocument.destroy();
  }

  /**
   * Creates a canvas required for image extraction
  */
  private canvasRenderCallback(): any {

    // Create a canvas element
    const canvas = document.createElement('canvas');

    // Return the canvas configuration
    return {
      canvas,
      applicationPlatform: undefined
    };
  }

  /**
  * Retrieves a PDF document from the specified URL
  * and returns its content as a Uint8Array
 */
  private async getInputBytes(url: string): Promise<Uint8Array> {
    const response = await fetch(url);
    return new Uint8Array(await response.arrayBuffer());
  }
}
