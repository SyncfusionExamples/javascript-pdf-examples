import { Button } from '@syncfusion/ej2-buttons';
import { PdfDocument, PdfPage, PdfLineAnnotation, PdfAnnotationLineEndingStyle, PdfLineEndingStyle, PdfAnnotationCaption, PdfLineCaptionType } from '@syncfusion/ej2-pdf';

const addBtn = new Button({ cssClass: `e-primary` });
addBtn.appendTo('#addBtn');
addBtn.element.onclick = addAnnotations;

function addAnnotations() {
    //Create PDF document
    const document: PdfDocument = new PdfDocument();
    // Access the first page
    let page: PdfPage = document.addPage();
    // Creates a new line annotation.
    let lineAnnotation: PdfLineAnnotation = new PdfLineAnnotation({ x: 180, y: 620 }, { x: 300, y: 620 }, {
        text: 'Line Annotation',
        author: 'Syncfusion',
        color: { r: 255, g: 0, b: 0 },
        innerColor: { r: 255, g: 255, b: 0 },
        lineEndingStyle: new PdfAnnotationLineEndingStyle({ begin: PdfLineEndingStyle.circle, end: PdfLineEndingStyle.diamond }),
        opacity: 0.5
    });
    // Assigns the leader line
    lineAnnotation.leaderExt = 0;
    lineAnnotation.leaderLine = 0;
    // Assigns the line caption type
    lineAnnotation.caption = new PdfAnnotationCaption({ cap: true, type: PdfLineCaptionType.inline });
    // Adds annotation to the page
    page.annotations.add(lineAnnotation);
    // Save the PDF
    document.save('Annotations.pdf');
    // Destroy the document instance to release memory
    document.destroy();
}