import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument, PdfLayerCollection, PdfLayer } from '@syncfusion/ej2-pdf';

const removeBtn = new Button({ cssClass: `e-primary`});
removeBtn.appendTo('#removeBtn');
removeBtn.element.onclick = removeLayers;

function removeLayers(): void {
    readFromUrl(templateURL)
        .then((pdfData: Uint8Array) => {
            // Load PDF document
            let document: PdfDocument = new PdfDocument(pdfData);
            // Get the layer collection.
            let layers: PdfLayerCollection = document.layers;
            // Retrieve the first layer from the layers collection
            let layer: PdfLayer = layers.at(0);
            // Remove the layer from layer collection with instance
            layers.remove(layer);
            // Remove an layer from specific index
            layers.removeAt(1);
            // Save the document
            document.save('Output.pdf');
            // Close the document
            document.destroy();
        })
        .catch((err: Error) => {
            console.error(err);
            alert('Failed to remove layers from resource PDF.');
        });
}

// Template PDF URL
const templateURL: string = 'https://cdn.syncfusion.com/content/pdf-resources/layers.pdf';

async function readFromUrl(url: string): Promise<Uint8Array> {
  const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    const buf = await res.arrayBuffer();
    return new Uint8Array(buf);
}