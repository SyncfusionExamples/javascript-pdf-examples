import { Component } from '@angular/core';
import { PdfDocument } from '@syncfusion/ej2-pdf';
import { PdfDataExtractor, TextSearchResult } from '@syncfusion/ej2-pdf-data-extract';

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}


@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  private readonly documentUrl = 'https://cdn.syncfusion.com/content/pdf-resources/pdf-succinctly.pdf';

  private documentBytes!: Uint8Array;

  async ngOnInit(): Promise<void> {
    this.documentBytes = await this.getInputBytes(this.documentUrl);
  }

  async findText(): Promise<void> {
    let document: PdfDocument = new PdfDocument(this.documentBytes);
    let extractor: PdfDataExtractor = new PdfDataExtractor(document);
    let searchResults = extractor.findTextSync('PDF', 
      { caseSensitive: false,
        wholeWord: false,
        startPageIndex: 0,
        endPageIndex: document.pageCount - 1
      }
    );

    let searchText: string = searchResults.searchText;
    let searchResult: Map<number, Rectangle[]> = searchResults.searchResults;

    searchResult.forEach((bounds: Rectangle[], pageIndex: number) => {
      bounds.forEach((bound: Rectangle) => {
        console.log(`Found "${searchText}" on page ${pageIndex} at bounds:`,
          bound
        );
      });
    });

    document.destroy();
  }

  async findMultipleText(): Promise<void> {
    let document: PdfDocument = new PdfDocument(this.documentBytes);
    let extractor: PdfDataExtractor = new PdfDataExtractor(document);
    let textSearchResults = extractor.findTextSync(['hello', 'PDF', 'document'], 
      { caseSensitive: false,
        wholeWord: false,
        startPageIndex: 0,
        endPageIndex: document.pageCount - 1
      }
    );

    textSearchResults.forEach((searchResults: TextSearchResult) => {
    let searchText: string = searchResults.searchText;
    let searchResult: Map<number, Rectangle[]> = searchResults.searchResults;

    searchResult.forEach((bounds: Rectangle[], pageIndex: number) => {
      bounds.forEach((bound: Rectangle) => {
        console.log(`Found "${searchText}" on page ${pageIndex} at bounds:`,
          bound
        );
      });
    });
    })

    document.destroy();
  }

  private async getInputBytes(url: string): Promise<Uint8Array> {
    const response = await fetch(url);
    return new Uint8Array(await response.arrayBuffer());
  }
  
}
