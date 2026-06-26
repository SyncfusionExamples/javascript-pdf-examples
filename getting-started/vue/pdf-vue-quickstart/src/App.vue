<template>
  <div id="app">
    <button type="button" @click="createPdf">Create PDF</button>
  </div>
</template>

<script>
import * as ejPdf from '@syncfusion/ej2-pdf';

export default {
  name: 'App',
  methods: {
    createPdf() {
      // Create a new PDF document
      const pdf = new ejPdf.PdfDocument();
      // Add a new page
      const page = pdf.addPage();
      // Get graphics from the page
      const graphics = page.graphics;
      // Set font
      const font = pdf.embedFont(ejPdf.PdfFontFamily.helvetica, 36, ejPdf.PdfFontStyle.regular);
      // Create a new black brush
      const brush = new ejPdf.PdfBrush({ r: 0, g: 0, b: 0 });
      // Draw text
      graphics.drawString('Hello World!!!', font, { x: 20, y: 20, width: graphics.clientSize.width - 20, height: 60 }, brush);
      // Save and download PDF
      pdf.save('Output.pdf');
      // Destroy the PDF document instance
      pdf.destroy();
    }
  }
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
