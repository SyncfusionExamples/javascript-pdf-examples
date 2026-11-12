# Execution mode (Mode 2)

Create a real `.pdf` by running a temporary Node.js project. Use only when the user explicitly asks to create/update a PDF file or to run code. Otherwise stay in Mode 1 (code only).

## Table of contents

- [Requirements](#requirements)
- [Procedure](#procedure)
- [Project template](#project-template)
- [Safety checks](#safety-checks)
- [Input PDFs](#input-pdfs)
- [Errors and diagnostics](#errors-and-diagnostics)
- [Limitations](#limitations)

## Requirements

- Node.js 18+ and `npm`. Browser-only environments cannot run Mode 2; answer with Mode 1 code.
- Network access for `npm install` of `@syncfusion/ej2-pdf` and `@syncfusion/ej2-base`.

## Procedure

1. **Create the project:** copy `{skill-root}/syncfusion-javascript-pdf/scripts/project-template/` to `{workspace}/.ej2-pdf-job-{unix-timestamp}/`. Fill `buildDocument()` in `src/index.js` using only documented APIs.
2. **Install:** `cd .ej2-pdf-job-{timestamp} && npm install`.
3. **Run** from the folder that should contain the output: `node .ej2-pdf-job-{timestamp}/src/index.js --output output/report.pdf [--input in.pdf] [--force]`.
4. **Verify** `SUCCESS: <path>` was printed.
5. **Clean up:** delete the whole `.ej2-pdf-job-{timestamp}/` folder, also when the run failed. Never delete the output or the user's input.
6. **Report** SUCCESS or ERROR with the output path and any fix.

## Project template

`scripts/project-template/` holds `package.json` (CommonJS, depends on `@syncfusion/ej2-pdf` and `@syncfusion/ej2-base`), `src/index.js` and `.gitignore`. Only `buildDocument(inputBytes)` changes per request; it is host-neutral, so its body can be reused in a browser. File I/O lives in `main()`.

## Safety checks

| Behavior | Detail |
|---|---|
| `--output <file.pdf>` | Required; inside the working directory; `.pdf`; not inside the job folder |
| `--input <file.pdf>` | Optional; must exist; never overwritten |
| `--force` | Replace an existing output; only if the user asked |
| Exit code | Non-zero on error, message printed as `ERROR: ...` |
| Licensing | `SYNCFUSION_LICENSE_KEY` or `SyncfusionLicense.txt` (workspace root); never printed |
| Logging | Only the output path |

## Input PDFs

Creating a new document needs no input. For parsing, extraction, redaction, form filling, merging and similar tasks, use the PDF the user supplies via `--input`. If none was given, ask for it; do not invent one.

## Errors and diagnostics

| Message | Cause |
|---|---|
| `output already exists` | Re-run with `--force` only if overwrite was requested |
| `path must be inside the working directory` | Output/input path escapes cwd |
| `output must not be inside the temporary job folder` | Output would be deleted with the project |
| `input: file not found` | Missing user PDF |
| `output file was not created or is empty` | Save failed |

## Limitations

- Verified with Node 22; the script calls `process.exit(0)` after success because the library keeps the event loop alive.
- Text extraction and redaction also need `@syncfusion/ej2-pdf-data-extract` (add it to the project's `package.json` before `npm install`).
- Browser download/upload flows cannot run here.
