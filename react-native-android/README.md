# React Native Android – Arabic PDF with `@syncfusion/ej2-pdf`

App lives in `app/` (React Native 0.88, TypeScript, Hermes).

## Structure
```
app/App.tsx               UI: button, status, path, observations, Open PDF
app/src/fontDownloader.ts fetch TTF -> ArrayBuffer -> Uint8Array
app/src/pdfGenerator.ts   PdfDocument + PdfTrueTypeFont + RTL drawString; pdf.save() -> Uint8Array
app/src/fileSaver.ts      bytes -> base64 -> react-native-blob-util -> Downloads (MediaStore)
```
## Install / build
```
cd app
npm install            # includes @syncfusion/ej2-pdf, react-native-blob-util, base64-js
npx react-native run-android   # emulator or USB device (needs Android SDK, JDK 17+)
```
Tap **Generate Arabic PDF**; file is saved as `Download/RTLText.pdf`; **Open PDF** launches a viewer.

## Compatibility findings (static analysis + Node run)
- `pdf.save()` with no filename returns a `Uint8Array` – no Blob/`window`/`document` download path is used. Do **not** call `save('x.pdf')` in RN (browser download code path).
- Scanning `ej2-pdf` dist: no use of `window`, `navigator`, canvas, `fs`, `path`, `stream`, `Buffer`, or `process` in the paths used. `DOMParser`/`atob` appear only in XFA/XMP-related code (not used here); `TextDecoder` use is guarded by `typeof`.
- Dependencies `@syncfusion/ej2-base` and `ej2-compression` resolve under Metro; no polyfills were needed. `npx react-native bundle --platform android` succeeds (2.8 MB bundle).
- Font: `noto-naskh-arabic-regular.ttf` downloads (217,140 bytes, HTTP 200) and is accepted by `PdfTrueTypeFont(Uint8Array, 13)`.
- Output (generated with the same API calls in Node; see `sample-output-RTLText.pdf/.png`): valid ~10.8 KB PDF, font embedded and subset, glyphs shaped to presentation forms (text extraction returns Arabic Presentation Forms-B), right-aligned, wraps within margins, paragraphs preserved.
- Limitation observed: in extracted text the embedded Latin run "PDF" is positioned in visual rather than logical order; check the rendered PNG for bidi placement of mixed Latin text.

## NOT validated in this environment
The sandbox has no Android SDK, emulator or device, so the APK build, on-device run, Downloads save and PDF open on Android were **not** executed. Only TypeScript type-check, Metro Android bundling and PDF generation in Node were verified. The Syncfusion skill URL (gitea.syncfusion.com) returned 404 from the sandbox, so API usage was validated against the package's shipped `.d.ts` files instead.

## Possible issues / workarounds
- Hermes lacks `DOMParser`; only needed by unused XFA features.
- Android ≤ 9: needs `WRITE_EXTERNAL_STORAGE` (declared with `maxSdkVersion=28`); falls back to the cache path if MediaStore copy fails.
- Large fonts/documents are CPU-bound on the JS thread; UI shows a spinner but may stutter.
