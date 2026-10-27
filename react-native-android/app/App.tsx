import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import { generateArabicPdf } from './src/pdfGenerator';
import { savePdf, openPdf } from './src/fileSaver';

function App() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('Idle');
  const [path, setPath] = useState('');
  const [notes, setNotes] = useState<string[]>([]);

  const onGenerate = async () => {
    setBusy(true);
    setStatus('Generating...');
    setPath('');
    setNotes([]);
    try {
      const r = await generateArabicPdf();
      const saved = await savePdf(r.bytes);
      setPath(saved);
      setStatus('Success');
      setNotes([
        `Font downloaded: ${r.fontBytes} bytes`,
        `PDF size: ${r.bytes.length} bytes`,
        `Generation time: ${r.elapsedMs} ms`,
      ]);
    } catch (e: any) {
      setStatus('Failure');
      setNotes([String(e?.stack ?? e)]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>Arabic PDF (ej2-pdf)</Text>
        <Pressable
          accessibilityRole="button"
          style={[styles.button, busy && styles.disabled]}
          disabled={busy}
          onPress={onGenerate}>
          <Text style={styles.buttonText}>Generate Arabic PDF</Text>
        </Pressable>
        {busy && <ActivityIndicator style={styles.gap} />}
        <Text style={styles.label}>Status</Text>
        <Text testID="status">{status}</Text>
        <Text style={styles.label}>PDF location</Text>
        <Text testID="path" selectable>{path || '-'}</Text>
        {!!path && (
          <Pressable style={styles.button} onPress={() => openPdf(path)}>
            <Text style={styles.buttonText}>Open PDF</Text>
          </Pressable>
        )}
        <Text style={styles.label}>Observations</Text>
        {notes.map(n => (
          <Text key={n} selectable>{n}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  body: { padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  button: {
    backgroundColor: '#1565c0',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  disabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: '600' },
  label: { marginTop: 16, fontWeight: '700' },
  gap: { margin: 8 },
});

export default App;
