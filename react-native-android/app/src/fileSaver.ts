import { Platform } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { fromByteArray } from 'base64-js';

export const PDF_FILE_NAME = 'RTLText.pdf';

/** Saves PDF bytes; returns the user-accessible path (Downloads when possible). */
export async function savePdf(bytes: Uint8Array): Promise<string> {
  const base64 = fromByteArray(bytes);
  const cachePath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${PDF_FILE_NAME}`;
  await ReactNativeBlobUtil.fs.writeFile(cachePath, base64, 'base64');

  if (Platform.OS === 'android') {
    try {
      // Android 10+: MediaStore, no storage permission needed.
      await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
        { name: PDF_FILE_NAME, parentFolder: '', mimeType: 'application/pdf' },
        'Download',
        cachePath,
      );
      return `/storage/emulated/0/Download/${PDF_FILE_NAME}`;
    } catch {
      // Fall back to the app-specific external folder.
    }
  }
  return cachePath;
}

export async function openPdf(path: string): Promise<void> {
  const local = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${PDF_FILE_NAME}`;
  await ReactNativeBlobUtil.android.actionViewIntent(
    (await ReactNativeBlobUtil.fs.exists(local)) ? local : path,
    'application/pdf',
  );
}
