// Mode 2 project entry. Usage (run from the workspace folder that should hold the output):
//   node <job-dir>/src/index.js --output output/report.pdf [--input in.pdf] [--force]
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { registerLicense } = require('@syncfusion/ej2-base');
const { PdfDocument, PdfStandardFont, PdfFontFamily, PdfBrush } = require('@syncfusion/ej2-pdf');

const jobDir = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const opts = { force: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--input') { opts.input = argv[++i]; }
    else if (arg === '--output') { opts.output = argv[++i]; }
    else if (arg === '--force') { opts.force = true; }
    else { throw new Error(`Unknown argument: ${arg}`); }
  }
  if (!opts.output) { throw new Error('Missing required --output <file.pdf>'); }
  return opts;
}

// Keep paths inside the working directory, outside the temporary job folder, and ending in .pdf.
function resolveSafePath(p, label) {
  if (p.includes('\0')) { throw new Error(`${label}: invalid path`); }
  const cwd = process.cwd();
  const resolved = path.resolve(cwd, p);
  const rel = path.relative(cwd, resolved);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new Error(`${label}: path must be inside the working directory`);
  }
  if (label === 'output' && !path.relative(jobDir, resolved).startsWith('..')) {
    throw new Error('output must not be inside the temporary job folder (it is deleted afterwards)');
  }
  if (path.extname(resolved).toLowerCase() !== '.pdf') { throw new Error(`${label}: must end with .pdf`); }
  return resolved;
}

function registerSyncfusionLicense() {
  let key = process.env.SYNCFUSION_LICENSE_KEY?.trim();
  const licenseFile = path.join(process.cwd(), 'SyncfusionLicense.txt');
  if (!key && fs.existsSync(licenseFile)) { key = fs.readFileSync(licenseFile, 'utf8').trim(); }
  if (key) { registerLicense(key); }
}

// *** REPLACE THIS FUNCTION BODY WITH THE REQUESTED OPERATION ***
// Host-neutral: takes input bytes (only when the user supplied a PDF) and returns the document.
// Use only @syncfusion/ej2-pdf APIs so the same body runs in a browser (references/browser-and-node-io.md).
function buildDocument(inputBytes) {
  const document = inputBytes ? new PdfDocument(inputBytes) : new PdfDocument();
  if (!inputBytes) {
    const page = document.addPage();
    page.graphics.drawString('Hello', new PdfStandardFont(PdfFontFamily.helvetica, 12),
      { x: 40, y: 40, width: 300, height: 20 }, new PdfBrush({ r: 0, g: 0, b: 0 }));
  }
  return document;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const output = resolveSafePath(opts.output, 'output');
  const input = opts.input ? resolveSafePath(opts.input, 'input') : undefined;
  if (input && !fs.existsSync(input)) { throw new Error('input: file not found'); }
  if (input && input === output) { throw new Error('output must differ from input; the input PDF is never overwritten'); }
  if (fs.existsSync(output) && !opts.force) {
    throw new Error('output already exists; pass --force only if overwriting was requested');
  }

  registerSyncfusionLicense();
  // An input PDF is read only when the user supplied one; creating a new document needs none.
  const document = buildDocument(input ? new Uint8Array(fs.readFileSync(input)) : undefined);
  const bytes = document.save();
  document.destroy();
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, bytes);

  if (!fs.existsSync(output) || fs.statSync(output).size === 0) {
    throw new Error('output file was not created or is empty');
  }
  console.log(`SUCCESS: ${path.relative(process.cwd(), output)}`);
}

try {
  main();
  // The library keeps the event loop alive after save(); exit explicitly.
  process.exit(0);
} catch (err) {
  console.error(`ERROR: ${err && err.message ? err.message : String(err)}`);
  process.exit(1);
}
