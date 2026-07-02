
import { Button } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { PdfDocument } from '@syncfusion/ej2-pdf';


const DEFAULT_PDF_URL =
    'https://cdn.syncfusion.com/content/pdf-resources/pdf-succinctly.pdf';

// Initialize input box
const numericBox = new NumericTextBox(
    {
        min: 1,
        value: 2,
        format: 'n0',
        width: '120px',
        showSpinButton: true
    }
);
numericBox.appendTo('#pagesPerFileInput');
// Initialize button
const splitBtnSf = new Button();
splitBtnSf.appendTo('#splitBtn');
splitBtnSf.element.onclick = async function (): Promise<void> {
    try {
        const response = await fetch(DEFAULT_PDF_URL);
        const buffer = await response.arrayBuffer();
        const pdf = new PdfDocument(new Uint8Array(buffer));
        // Download each generated PDF
        (pdf as any).splitEvent = (
            _sender: unknown,
            args: { index: number; pdfData: Uint8Array }
        ) => {
            const splitDocument = new PdfDocument(args.pdfData);

            splitDocument.save(`SplitDocument_${args.index + 1}.pdf`);
            splitDocument.destroy();
        };
        const inputElement = document.getElementById(
            'pagesPerFileInput'
        ) as HTMLElement;
        const instance = (inputElement as any).ej2_instances[0];
        const pagesPerFile = instance.value;
        // Split PDF by page count
        (pdf as any).splitByFixedNumber(pagesPerFile);
        pdf.destroy();
    } catch (error) {
        console.error(error);
        alert('Failed to split PDF.');
    }
}
