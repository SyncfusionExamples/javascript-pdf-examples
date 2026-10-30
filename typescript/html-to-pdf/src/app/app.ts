import { PdfBitmap, PdfDocument, PdfGraphics, PdfMargins, PdfPage, PdfPageOrientation, PdfPageSettings } from '@syncfusion/ej2-pdf';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
type TemplateType = 'html' | 'canvas';
interface TemplateDefinition {
    name: string;
    type: TemplateType;
    html?: string;
}
/*
 * HTML templates are captured at twice their CSS dimensions
 * to produce a higher-quality image.
 */
const htmlCapturePixelRatio: number = 2;
const templates: {
    [key: string]: TemplateDefinition;
} = {
    certificate: {
        name: 'Certificate',
        type: 'html',
        html: `
            <div class="certificate-template">
                <div class="certificate-inner">
                    <div class="certificate-icon">
                        ★
                    </div>
                    <p class="certificate-label">
                        Certificate of Achievement
                    </p>
                    <h2>Certificate of Excellence</h2>
                    <p class="certificate-presented">
                        This certificate is proudly presented to
                    </p>
                    <p class="certificate-recipient">
                        John Doe
                    </p>
                    <div class="certificate-divider"></div>
                    <p class="certificate-description">
                        For successfully completing the program and
                        demonstrating outstanding performance.
                    </p>
                    <div class="certificate-footer">
                        <div>
                            <span class="signature-line"></span>
                            <strong>
                                Authorized Signature
                            </strong>
                        </div>
                        <div class="certificate-seal">
                            2026
                        </div>
                        <div>
                            <span class="signature-line"></span>
                            <strong>
                                September 1, 2026
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    invoice: {
        name: 'Invoice',
        type: 'html',
        html: `
            <div class="invoice-template">
                <div class="invoice-header">
                    <div class="invoice-company">
                        <div class="company-logo">
                            C
                        </div>
                        <div>
                            <h2>Contoso Limited</h2>
                            <p>
                                Software solutions and services
                            </p>
                        </div>
                    </div>
                    <div class="invoice-title">
                        <h2>INVOICE</h2>
                        <p>#INV-2026-001</p>
                    </div>
                </div>
                <div class="invoice-information">
                    <div>
                        <span>Billed to</span>
                        <strong>Adventure Works</strong>
                        <p>123 Business Street</p>
                        <p>Chennai, Tamil Nadu</p>
                    </div>
                    <div>
                        <span>Invoice date</span>
                        <strong>September 1, 2026</strong>
                        <span class="due-date-label">
                            Due date
                        </span>
                        <strong>September 15, 2026</strong>
                    </div>
                </div>
                <table class="invoice-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Software license</td>
                            <td>1</td>
                            <td>$500.00</td>
                            <td>$500.00</td>
                        </tr>
                        <tr>
                            <td>Technical support</td>
                            <td>2</td>
                            <td>$100.00</td>
                            <td>$200.00</td>
                        </tr>
                        <tr>
                            <td>Implementation service</td>
                            <td>1</td>
                            <td>$300.00</td>
                            <td>$300.00</td>
                        </tr>
                    </tbody>
                </table>
                <div class="invoice-total-container">
                    <div>
                        <span>Subtotal</span>
                        <strong>$1,000.00</strong>
                    </div>
                    <div>
                        <span>Tax</span>
                        <strong>$180.00</strong>
                    </div>
                    <div class="invoice-grand-total">
                        <span>Total</span>
                        <strong>$1,180.00</strong>
                    </div>
                </div>
                <p class="invoice-note">
                    Thank you for your business.
                </p>
            </div>
        `
    },
    greeting: {
        name: 'Greeting Card',
        type: 'html',
        html: `
            <div class="greeting-template">
                <div class="greeting-circle circle-one"></div>
                <div class="greeting-circle circle-two"></div>
                <div class="greeting-circle circle-three"></div>
                <div class="greeting-content">
                    <div class="greeting-icon">
                        ✓
                    </div>
                    <p class="greeting-label">
                        Great achievement
                    </p>
                    <h2>Congratulations!</h2>
                    <p class="greeting-description">
                        Wishing you continued success and happiness
                        on your wonderful achievement.
                    </p>
                    <p class="greeting-footer">
                        Best wishes from your team
                    </p>
                </div>
            </div>
        `
    },
    canvas: {
        name: 'Canvas Drawing',
        type: 'canvas'
    }
};
let templateDropdown: DropDownList;
let createButtonComponent: Button;
let clearButtonComponent: Button;
let previewContainer: HTMLDivElement;
let previewType: HTMLSpanElement;
let statusMessage: HTMLParagraphElement;
document.addEventListener(
    'DOMContentLoaded',
    initializeSample
);
function initializeSample(): void {
    previewContainer = getElement<HTMLDivElement>('previewContainer');
    previewType = getElement<HTMLSpanElement>('previewType');
    statusMessage = getElement<HTMLParagraphElement>('statusMessage');
    initializeTemplateDropdown();
    initializeButtons();
}
function initializeTemplateDropdown(): void {
    const templateSelectInput: HTMLInputElement = getElement<HTMLInputElement>('templateSelect');
    templateDropdown = new DropDownList({
        dataSource: [
            {
                text: 'Select a template',
                value: ''
            },
            {
                text: 'Certificate',
                value: 'certificate'
            },
            {
                text: 'Invoice',
                value: 'invoice'
            },
            {
                text: 'Greeting Card',
                value: 'greeting'
            },
            {
                text: 'Canvas Drawing',
                value: 'canvas'
            }
        ],
        fields: {
            text: 'text',
            value: 'value'
        },
        value: '',
        change: onTemplateChange
    });
    templateDropdown.appendTo(templateSelectInput);
}
function initializeButtons(): void {
    const createButtonElement: HTMLButtonElement = getElement<HTMLButtonElement>('createButton');
    createButtonComponent = new Button({
        content: 'Create PDF', isPrimary: true, disabled: true
    });
    createButtonComponent.appendTo(createButtonElement);
    createButtonElement.addEventListener('click', createPdf);
    const clearButtonElement: HTMLButtonElement = getElement<HTMLButtonElement>('clearButton');
    clearButtonComponent = new Button({ content: 'Clear' });
    clearButtonComponent.appendTo(clearButtonElement);
    clearButtonElement.addEventListener('click', clearSample);
}
function getElement<T extends HTMLElement>(id: string): T {
    const element: HTMLElement | null = document.getElementById(id);
    if (element === null) {
        throw new Error('Element with ID "' + id + '" was not found.');
    }
    return element as T;
}
function getSelectedTemplateValue(): string {
    const currentValue = templateDropdown.value;
    if (currentValue === null || currentValue === undefined) {
        return '';
    }
    return String(currentValue);
}
function onTemplateChange(): void {
    const selectedValue: string = getSelectedTemplateValue();
    clearStatus();
    if (selectedValue === '') {
        showEmptyPreview();
        createButtonComponent.disabled = true;
        createButtonComponent.dataBind();
        previewType.textContent = 'No template';
        return;
    }
    const selectedTemplate: TemplateDefinition | undefined = templates[selectedValue];
    if (selectedTemplate === undefined) {
        showEmptyPreview();
        createButtonComponent.disabled = true;
        createButtonComponent.dataBind();
        previewType.textContent = 'No template';
        showStatus('The selected template is unavailable.', 'error');
        return;
    }
    if (selectedTemplate.type === 'canvas') {
        previewType.textContent = 'Canvas';
        renderCanvasTemplate();
    } else {
        previewType.textContent = 'HTML';
        renderHtmlTemplate(selectedTemplate);
    }
    createButtonComponent.disabled = false;
    createButtonComponent.dataBind();
    showStatus(selectedTemplate.name + ' template loaded successfully.', 'success');
}
function renderHtmlTemplate(template: TemplateDefinition): void {
    if (!template.html) {
        throw new Error('HTML content is unavailable for the selected template.');
    }
    previewContainer.className = 'preview-container';
    previewContainer.innerHTML = template.html;
}
function renderCanvasTemplate(): void {
    previewContainer.className = 'preview-container canvas-preview-container';
    previewContainer.innerHTML = '';
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.id = 'templateCanvas';
    canvas.width = 800;
    canvas.height = 500;
    canvas.setAttribute('aria-label', 'Canvas template preview');
    previewContainer.appendChild(canvas);
    drawCanvasContent(canvas);
}
function drawCanvasContent(canvas: HTMLCanvasElement): void {
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (context === null) {
        throw new Error('The Canvas 2D context is unavailable.');
    }
    const gradient: CanvasGradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0f766e');
    gradient.addColorStop(0.5, '#0891b2');
    gradient.addColorStop(1, '#2563eb');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.15;
    context.fillStyle = '#ffffff';
    context.beginPath();
    context.arc(100, 80, 130, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(730, 450, 190, 0, Math.PI * 2);
    context.fill();
    context.globalAlpha = 1;
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.font = 'bold 52px Arial';
    context.fillText('Canvas Content', canvas.width / 2, 195);
    context.font = '24px Arial';
    context.fillText('This content is created using the Canvas API', canvas.width / 2, 250);
    context.fillStyle = 'rgba(255, 255, 255, 0.2)';
    context.fillRect(245, 300, 310, 75);
    context.fillStyle = '#ffffff';
    context.font = 'bold 22px Arial';
    context.fillText('Ready to add into PDF', canvas.width / 2, 347);
}
async function createPdf(): Promise<void> {
    const selectedValue: string = getSelectedTemplateValue();
    if (selectedValue === '') {
        showStatus('Select a template before creating the PDF.', 'error');
        return;
    }
    const selectedTemplate: TemplateDefinition | undefined = templates[selectedValue];
    if (selectedTemplate === undefined) {
        showStatus('The selected template is unavailable.', 'error');
        return;
    }
    setCreatingState(true);
    clearStatus();
    let pdfDocument: PdfDocument | null = null;
    try {
        const imageData: string = await getTemplateImageData(selectedTemplate);
        const base64Image: string = removeDataUrlPrefix(imageData);
        const image: PdfBitmap = new PdfBitmap(base64Image);
        /*
         * HTML templates are captured using pixelRatio 2.
         * Convert the bitmap dimensions back to their
         * original CSS dimensions.
         *
         * The Canvas template is already created at its
         * original dimensions.
         */
        const originalImageWidth: number = selectedTemplate.type === 'html'
            ? image.width / htmlCapturePixelRatio : image.width;
        const originalImageHeight: number = selectedTemplate.type === 'html'
            ? image.height / htmlCapturePixelRatio : image.height;
        /*
         * The maximum image width inside the PDF.
         *
         * If an image is wider than this value, it will
         * be proportionally reduced.
         */
        const maximumImageWidth: number = 760;
        let drawWidth: number = originalImageWidth;
        let drawHeight: number = originalImageHeight;
        if (drawWidth > maximumImageWidth) {
            const scale: number = maximumImageWidth / drawWidth;
            drawWidth = drawWidth * scale;
            drawHeight = drawHeight * scale;
        }
        /*
         * Keep an equal margin around the generated image.
         */
        const margin: number = 30;
        const pageWidth: number = drawWidth + (margin * 2);
        const pageHeight: number = drawHeight + (margin * 2);
        const pageOrientation: PdfPageOrientation = pageWidth > pageHeight
            ? PdfPageOrientation.landscape
            : PdfPageOrientation.portrait;
        pdfDocument = new PdfDocument();
        /*
         * Use zero built-in margins because the image
         * margin is managed explicitly while drawing.
         */
        const pageSettings: PdfPageSettings =
            new PdfPageSettings({
                size: { width: pageWidth, height: pageHeight },
                orientation: pageOrientation,
                margins: new PdfMargins(0)
            });
        const page: PdfPage = pdfDocument.addPage(pageSettings);
        const graphics: PdfGraphics = page.graphics;
        graphics.drawImage(image,
            {
                x: margin,
                y: margin,
                width: drawWidth,
                height: drawHeight
            }
        );
        console.log('Original bitmap size:', image.width, image.height);
        console.log('Image drawing size:', drawWidth, drawHeight);
        console.log('Custom PDF page size:', pageWidth, pageHeight);
        pdfDocument.save(selectedValue + '-template.pdf');
        showStatus('The PDF document was created successfully.', 'success');
    } catch (error: unknown) {
        const errorMessage: string = error instanceof Error ? error.message : 'An unknown error occurred.';
        console.error('PDF creation failed:', error);
        showStatus('Unable to create the PDF. ' + errorMessage, 'error');
    } finally {
        if (pdfDocument !== null) {
            pdfDocument.destroy();
        }
        setCreatingState(false);
    }
}
async function getTemplateImageData(template: TemplateDefinition): Promise<string> {
    if (template.type === 'canvas') {
        const canvas: HTMLCanvasElement = getElement<HTMLCanvasElement>('templateCanvas');
        return canvas.toDataURL('image/png');
    }
    const templateElement: HTMLElement | null = previewContainer.firstElementChild as HTMLElement | null;
    if (templateElement === null) {
        throw new Error('The selected HTML template was not found.');
    }
    await waitForTemplateResources(templateElement);
    return convertHtmlElementToPng(templateElement, htmlCapturePixelRatio);
}
async function convertHtmlElementToPng(element: HTMLElement, pixelRatio: number): Promise<string> {
    const elementBounds: DOMRect = element.getBoundingClientRect();
    const elementWidth: number = Math.ceil(
        Math.max(
            elementBounds.width,
            element.scrollWidth,
            element.offsetWidth
        )
    );
    const elementHeight: number = Math.ceil(
        Math.max(
            elementBounds.height,
            element.scrollHeight,
            element.offsetHeight
        )
    );
    if (elementWidth <= 0 || elementHeight <= 0) {
        throw new Error('The selected template has invalid dimensions.');
    }
    if (pixelRatio <= 0) {
        throw new Error('The pixel ratio must be greater than zero.');
    }
    /*
     * Padding ensures borders, rounded corners and shadows
     * are not clipped by the SVG foreignObject boundary.
     */
    const capturePadding: number = 10;
    const captureWidth: number = elementWidth + (capturePadding * 2);
    const captureHeight: number = elementHeight + (capturePadding * 2);
    const clonedElement: HTMLElement = element.cloneNode(true) as HTMLElement;
    copyComputedStyles(element, clonedElement);
    clonedElement.style.position = 'static';
    clonedElement.style.margin = '0';
    clonedElement.style.left = 'auto';
    clonedElement.style.right = 'auto';
    clonedElement.style.top = 'auto';
    clonedElement.style.bottom = 'auto';
    clonedElement.style.width = elementWidth + 'px';
    clonedElement.style.height = elementHeight + 'px';
    clonedElement.style.maxWidth = 'none';
    clonedElement.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    const serializer: XMLSerializer = new XMLSerializer();
    const serializedElement: string = serializer.serializeToString(clonedElement);
    /*
     * Use an outer XHTML wrapper so the template does not
     * touch the foreignObject capture boundary.
     */
    const xhtmlContent: string =
        '<div ' +
        'xmlns="http://www.w3.org/1999/xhtml" ' +
        'style="' +
        'width:' + captureWidth + 'px;' +
        'height:' + captureHeight + 'px;' +
        'padding:' + capturePadding + 'px;' +
        'margin:0;' +
        'box-sizing:border-box;' +
        'overflow:visible;' +
        'background:#ffffff;' +
        '">' +
        serializedElement +
        '</div>';
    const svgContent: string =
        '<svg ' +
        'xmlns="http://www.w3.org/2000/svg" ' +
        'width="' + captureWidth + '" ' +
        'height="' + captureHeight + '" ' +
        'viewBox="0 0 ' +
        captureWidth + ' ' +
        captureHeight +
        '">' +
        '<foreignObject ' +
        'x="0" ' +
        'y="0" ' +
        'width="' + captureWidth + '" ' +
        'height="' + captureHeight + '" ' +
        'style="overflow:visible;">' +
        xhtmlContent +
        '</foreignObject>' +
        '</svg>';
    /*
     * Use a data URL instead of a Blob URL to prevent
     * the SVG foreignObject from tainting the canvas.
     */
    const svgDataUrl: string = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgContent);
    const renderedImage: HTMLImageElement = await loadImage(svgDataUrl);
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = Math.ceil(captureWidth * pixelRatio);
    canvas.height = Math.ceil(captureHeight * pixelRatio);
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (context === null) {
        throw new Error('The Canvas 2D context is unavailable.');
    }
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.drawImage(renderedImage, 0, 0, captureWidth, captureHeight);
    return canvas.toDataURL('image/png');
}
function copyComputedStyles(sourceElement: HTMLElement, targetElement: HTMLElement): void {
    copyElementStyle(sourceElement, targetElement);
    const sourceChildren: NodeListOf<HTMLElement> = sourceElement.querySelectorAll<HTMLElement>('*');
    const targetChildren: NodeListOf<HTMLElement> = targetElement.querySelectorAll<HTMLElement>('*');
    const childrenCount: number = Math.min(sourceChildren.length, targetChildren.length);
    for (let index: number = 0; index < childrenCount; index++) {
        copyElementStyle(sourceChildren[index], targetChildren[index]);
    }
}
function copyElementStyle(sourceElement: HTMLElement, targetElement: HTMLElement): void {
    const computedStyle: CSSStyleDeclaration = window.getComputedStyle(sourceElement);
    for (let index: number = 0; index < computedStyle.length; index++) {
        const propertyName: string = computedStyle.item(index);
        const propertyValue: string = computedStyle.getPropertyValue(propertyName);
        const propertyPriority: string = computedStyle.getPropertyPriority(propertyName);
        targetElement.style.setProperty(propertyName, propertyValue, propertyPriority);
    }
}
function loadImage(source: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>(
        function (
            resolve: (image: HTMLImageElement) => void,
            reject: (error: Error) => void
        ): void {
            const image: HTMLImageElement = new Image();
            image.onload = function (): void { resolve(image); };
            image.onerror = function (): void { reject(new Error('Unable to render the selected HTML template.')); };
            image.src = source;
        }
    );
}
function removeDataUrlPrefix(dataUrl: string): string {
    const separatorIndex: number = dataUrl.indexOf(',');
    if (separatorIndex === -1) {
        return dataUrl;
    }
    return dataUrl.substring(
        separatorIndex + 1
    );
}
async function waitForTemplateResources(container: HTMLElement): Promise<void> {
    if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
    }
    const images: HTMLImageElement[] = Array.from(container.querySelectorAll<HTMLImageElement>('img'));
    const imagePromises:
        Array<Promise<void>> =
        images.map(
            function (image: HTMLImageElement): Promise<void> {
                if (image.complete && image.naturalWidth > 0) {
                    return Promise.resolve();
                }
                return new Promise<void>(
                    function (
                        resolve: () => void,
                        reject: (error: Error) => void
                    ): void {
                        const handleLoad =
                            function (): void {
                                removeImageListeners();
                                resolve();
                            };
                        const handleError =
                            function (): void {
                                removeImageListeners();
                                reject(new Error('Unable to load image: ' + image.src));
                            };
                        const removeImageListeners =
                            function (): void {
                                image.removeEventListener('load', handleLoad);
                                image.removeEventListener('error', handleError);
                            };
                        image.addEventListener('load', handleLoad);
                        image.addEventListener('error', handleError);
                    }
                );
            }
        ); await Promise.all(imagePromises);
}
function setCreatingState(isCreating: boolean): void {
    templateDropdown.enabled = !isCreating;
    clearButtonComponent.disabled = isCreating;
    createButtonComponent.disabled = isCreating || getSelectedTemplateValue() === '';
    createButtonComponent.content = isCreating ? 'Creating PDF...' : 'Create PDF';
    templateDropdown.dataBind();
    clearButtonComponent.dataBind();
    createButtonComponent.dataBind();
}
function clearSample(): void {
    templateDropdown.value = '';
    templateDropdown.dataBind();
    createButtonComponent.disabled = true;
    createButtonComponent.content = 'Create PDF';
    createButtonComponent.dataBind();
    previewType.textContent = 'No template';
    showEmptyPreview();
    clearStatus();
}
function showEmptyPreview(): void {
    previewContainer.className = 'preview-container';
    previewContainer.innerHTML = `<div class="empty-preview">Select a template to display the preview.</div>`;
}
function showStatus(message: string, type: 'success' | 'error'): void {
    statusMessage.textContent = message;
    statusMessage.className = 'status-message status-' + type;
}
function clearStatus(): void {
    statusMessage.textContent = '';
    statusMessage.className = 'status-message';
}