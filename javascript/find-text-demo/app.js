// UI logic only. All PDF work lives in pdf-generator.js.
import {
    DEFAULT_ARABIC_TEXT,
    DEFAULT_SEARCH_TEXT,
    generateArabicPdf,
    loadSamplePdf,
    extractText,
    findText,
    highlightMatches
} from './pdf-generator.js';

const $ = (id) => document.getElementById(id);
const el = {
    search: $('searchText'), status: $('status'), results: $('results'),
    viewer: $('viewer'), info: $('matchInfo'),
    caseSensitive: $('caseSensitive'), wholeWord: $('wholeWord'),
    generate: $('generateBtn'), extract: $('extractBtn'),
    find: $('findBtn'), highlight: $('highlightBtn'), download: $('downloadBtn'),
    prev: $('prevBtn'), next: $('nextBtn')
};

const state = {
    original: null,       // bytes of the loaded/generated PDF (never modified)
    displayed: null,      // bytes currently shown (original or highlighted)
    fileName: 'document.pdf',
    matches: [],
    current: -1,
    viewerUrl: null
};

el.search.value = DEFAULT_SEARCH_TEXT;

function setStatus(message, kind = '') {
    el.status.textContent = message;
    el.status.className = 'status ' + kind;
}

function updateControls() {
    const hasPdf = !!state.original;
    el.generate.disabled = false;
    el.extract.disabled = !hasPdf;
    el.find.disabled = !hasPdf;
    el.highlight.disabled = !hasPdf || state.matches.length === 0;
    el.download.disabled = !state.displayed;
    el.prev.disabled = state.matches.length < 2;
    el.next.disabled = state.matches.length < 2;
    el.info.textContent = state.matches.length
        ? `Match ${state.current + 1} of ${state.matches.length}`
        : 'Matches: 0';
}

async function run(label, task) {
    const buttons = [el.generate, el.extract, el.find, el.highlight, el.download, el.prev, el.next];
    buttons.forEach((b) => (b.disabled = true));
    setStatus(label, 'busy');
    try {
        await task();
    } catch (error) {
        console.error(error);
        setStatus(`Error: ${error.message || error}`, 'error');
    } finally {
        updateControls();
    }
}

function show(bytes, page = 1) {
    state.displayed = bytes;
    if (state.viewerUrl) URL.revokeObjectURL(state.viewerUrl);
    state.viewerUrl = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
    el.viewer.src = `${state.viewerUrl}#page=${page}&toolbar=0&navpanes=0`;
    el.viewer.hidden = false;
}

function setPdf(bytes, name) {
    state.original = bytes;
    state.fileName = name;
    state.matches = [];
    state.current = -1;
    el.results.textContent = 'Search results will appear here...';
    show(bytes);
}

function goToMatch(index) {
    const count = state.matches.length;
    if (!count) return;
    state.current = (index + count) % count;
    const { pageIndex, bounds } = state.matches[state.current];
    // Re-assigning the hash makes the viewer jump to the page of the match.
    el.viewer.src = `${state.viewerUrl}#page=${pageIndex + 1}&zoom=100&toolbar=0&navpanes=0`;
    setStatus(`Match ${state.current + 1} of ${count}: page ${pageIndex + 1}, ` +
        `x ${bounds.x.toFixed(1)}, y ${bounds.y.toFixed(1)}`);
    updateControls();
}

el.generate.onclick = () => run('Generating PDF…', async () => {
    const bytes = await generateArabicPdf(DEFAULT_ARABIC_TEXT);
    downloadPdf(bytes, 'arabic.pdf');
    setStatus('Arabic PDF generated and downloaded.');
});

el.extract.onclick = () => run('Extracting text…', async () => {
    const text = await extractText(state.original);
    // Extract and Find share the same output area; extracting clears the matches, which disables Highlight.
    state.matches = [];
    state.current = -1;
    el.results.textContent = text || '(no text found)';
    setStatus(`Extracted ${text.length} characters.`);
});

async function doFind() {
    const { pageCount, matches } = await findText(state.original, el.search.value, {
        caseSensitive: el.caseSensitive.checked,
        wholeWord: el.wholeWord.checked
    });
    state.matches = matches;
    state.current = -1;
    const lines = [`Search text: "${el.search.value}"`, `Pages searched: ${pageCount}`, `Result count: ${matches.length}`, ''];
    matches.forEach((m, i) => lines.push(
        `#${i + 1} page ${m.pageIndex + 1}: { x: ${m.bounds.x.toFixed(2)}, y: ${m.bounds.y.toFixed(2)}, ` +
        `width: ${m.bounds.width.toFixed(2)}, height: ${m.bounds.height.toFixed(2)} }`));
    el.results.textContent = matches.length ? lines.join('\n') : lines.join('\n') + 'No matches found.';
    if (state.displayed !== state.original) show(state.original);
    return matches.length;
}

el.find.onclick = () => run('Searching…', async () => {
    const count = await doFind();
    setStatus(`Total matches found: ${count}`);
    if (count) goToMatch(0);
});

el.highlight.onclick = () => run('Highlighting…', async () => {
    if (!state.matches.length) await doFind();
    if (!state.matches.length) throw new Error(`No matches found for "${el.search.value}".`);
    const first = state.matches[0].pageIndex + 1;
    show(await highlightMatches(state.original, state.matches), first);
    state.current = 0;
    setStatus(`Highlighted ${state.matches.length} match(es). Use Download PDF to save.`);
});

function downloadPdf(bytes, fileName) {
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

el.download.onclick = () => downloadPdf(state.displayed,
    state.displayed === state.original ? state.fileName : state.fileName.replace(/\.pdf$/i, '') + '-highlighted.pdf');

el.prev.onclick = () => goToMatch(state.current - 1);
el.next.onclick = () => goToMatch(state.current + 1);
el.search.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !el.find.disabled) el.find.click(); });

updateControls();
run('Loading sample PDF…', async () => {
    setPdf(await loadSamplePdf(), 'sample.pdf');
    setStatus('Ready');
});
