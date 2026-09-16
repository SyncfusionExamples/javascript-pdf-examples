import { Component } from '@angular/core';
import {
  PdfDocument, PdfTextBoxField
} from '@syncfusion/ej2-pdf';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html'
})

export class App {

  // URL of the form filling PDF document
  private readonly formFillingDocument =
    'https://cdn.syncfusion.com/content/pdf-resources/form-filling-document.pdf';

  /**
 * Flattens an individual form field in a PDF document
 */
  async flattenIndividualFormField(): Promise<void> {

    // Retrieve the source PDF document as a byte array
    const documentBytes = await this.getPdfAsUint8Array(this.formFillingDocument);

    // Load an existing PDF document
    const document = new PdfDocument(documentBytes);

    // Get the form from the loaded PDF document
    const form = document.form;

    // Retrieve the individual form field to be flattened
    const field = form.fieldAt(0) as PdfTextBoxField;
    if (field instanceof PdfTextBoxField) {

      // Fill the text box field with the required text
      field.text = '01/01/2000';

      // Flatten the individual form field
      field.flatten = true;
    }

    // Save the output PDF document
    document.save('Output.pdf');

    // Destroy the document to free resources
    document.destroy();
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