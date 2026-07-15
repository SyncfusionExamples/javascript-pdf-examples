import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument, PdfSignatureField, PdfSignature, CryptographicStandard, DigestAlgorithm, PdfBitmap } from '@syncfusion/ej2-pdf';

const signBtn = new Button({ cssClass: `e-primary`});
signBtn.appendTo('#signBtn');
signBtn.element.onclick = async (): Promise<void> => {
    try {
        // Load the PDF document, certificate, and logo image
        const [pdfBytes, pfxBytes, logoBytes] = await Promise.all([
            readFromPdfResources(
                'https://cdn.syncfusion.com/content/pdf-resources/pdf-succinctly.pdf'
            ),
            readFromPdfResources(
                'https://cdn.syncfusion.com/content/pdf-resources/PDF.pfx'
            ),
            readFromPdfResources(
                'https://cdn.syncfusion.com/content/pdf-resources/logo.png'
            )
        ]);
        // Load the PDF document
        const pdf = new PdfDocument(pdfBytes);
        // Retrieve the first page
        const page = pdf.getPage(0);
        // Create a signature field
        const signatureField = new PdfSignatureField(
            page,
            'Signature',
            {
                x: 20,
                y: 20,
                width: 200,
                height: 100
            }
        );
        // Create a digital signature using the PFX certificate
        const signature = PdfSignature.create(
            pfxBytes,
            'password123',
            {
                cryptographicStandard: CryptographicStandard.cms,
                digestAlgorithm: DigestAlgorithm.sha256,
                contactInfo: 'support@syncfusion.com',
                locationInfo: 'USA',
                reason: 'Document Approved'
            }
        );
        // Assign the signature to the signature field
        signatureField.setSignature(signature);
        // Add Syncfusion logo to the signature appearance
        const appearance = signatureField.getAppearance();
        const logo = new PdfBitmap(logoBytes);
        appearance.normal.graphics.drawImage(logo, {
            x: 10,
            y: 10,
            width: 80,
            height: 35
        });
        // Add the signature field to the PDF form
        pdf.form.add(signatureField);
        // Save and download the signed PDF
        pdf.save('SignedPDF.pdf');
        // Release resources
        pdf.destroy();
    } catch (error) {
        console.error('PDF signing failed:', error);
    }
};
async function readFromPdfResources(url: string): Promise<Uint8Array> {
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error(
            `Failed to fetch ${url}: ${response.status} ${response.statusText}`
        );
    }
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer);
}