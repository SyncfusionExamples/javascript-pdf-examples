import { PdfDocument, PdfXmpMetadata, PdfDocumentInformation } from '@syncfusion/ej2-pdf';
import { Button } from '@syncfusion/ej2-buttons';

// Create the Add Metadata button
const addBtn = new Button({ cssClass: 'e-primary' });
addBtn.appendTo('#addBtn');
// Add metadata when the button is clicked
addBtn.element.onclick = addMetaData;

// Create the Modify Metadata button
const modifyBtn = new Button({ cssClass: 'e-primary' });
modifyBtn.appendTo('#modifyBtn');
// Modify metadata when the button is clicked
modifyBtn.element.onclick = modifyMetaData;

// Add metadata to a new PDF document
function addMetaData() {
    // Create a PDF document
    let document: PdfDocument = new PdfDocument();
    // Get the document information
    let documentProperties: PdfDocumentInformation = document.getDocumentInformation(false);
    // Access the XMP metadata
    let xmpMetadata: PdfXmpMetadata = documentProperties.xmpMetadata;
    // Set basic metadata
    xmpMetadata.basicSchema.creatorTool = 'My App';
    xmpMetadata.basicSchema.createDate = new Date();
    xmpMetadata.basicSchema.modifyDate = new Date();
    // Set Dublin Core metadata
    xmpMetadata.dublinCoreSchema.title = { 'en-US': 'Sample PDF' };
    xmpMetadata.dublinCoreSchema.creator = ['Syncfusion'];
    // Save the PDF document
    document.save('AddedMetaData.pdf');
    // Dispose the document
    document.destroy();
}

// Modify metadata in an existing PDF document
function modifyMetaData() {
    fetchAsUint8Array(
        'https://cdn.syncfusion.com/content/pdf-resources/AddedMetaData.pdf'
    ).then(function (pdfBytes) {
        // Load the PDF document
        let document: PdfDocument = new PdfDocument(pdfBytes);
        // Get the document information
        let documentProperties: PdfDocumentInformation = document.getDocumentInformation(false);
        // Access the XMP metadata
        let xmpMetadata: PdfXmpMetadata = documentProperties.xmpMetadata;
        // Update the metadata values
        xmpMetadata.basicSchema.creatorTool = 'Updated Tool';
        xmpMetadata.dublinCoreSchema.title = { 'en-US': 'Updated Title' };
        // Save the updated PDF document
        document.save('ModifiedMetaData.pdf');
        // Dispose the document
        document.destroy();
    });
}

// Fetch a file as a Uint8Array
async function fetchAsUint8Array(url: string): Promise<Uint8Array> {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    const buf = await res.arrayBuffer();
    return new Uint8Array(buf);
}