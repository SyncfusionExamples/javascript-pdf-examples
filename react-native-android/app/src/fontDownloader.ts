export const ARABIC_FONT_URL =
  'https://cdn.syncfusion.com/content/pdf-resources/noto-naskh-arabic-regular.ttf';

export async function fetchAsUint8Array(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Font download failed: HTTP ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}
