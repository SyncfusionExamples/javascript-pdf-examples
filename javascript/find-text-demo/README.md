# JavaScript PDF Find Text Demo (Arabic / RTL)

Standalone ES-module sample using only `@syncfusion/ej2-pdf` and `@syncfusion/ej2-pdf-data-extract`.

Workflow: generate/load PDF → extract text → find text → get page index and bounds → draw rectangles with `PdfGraphics.drawRectangle()` → save and download the highlighted PDF.

## Running

```
npm install
npm start
```

The sample is served by Vite (ES modules and npm packages need a bundler/dev server; opening `index.html` directly will not work).

## Files

- `pdf-generator.js` – PDF logic only (generate Arabic RTL PDF, extract, find, highlight).
- `app.js` – UI logic (load/generate, search, navigation, download).
- `assets/sample.pdf` – sample Arabic PDF.

## Notes

Generating a PDF downloads the Noto Naskh Arabic font from the Syncfusion CDN. Match coordinates are in PDF points; `pageIndex` is zero-based.
Syncfusion libraries require a license; see the repository README.
