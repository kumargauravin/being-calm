import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  errorCodes,
  isErrorWithCode,
  keepLocalCopy,
  pick,
} from '@react-native-documents/picker';
import RNFS from 'react-native-fs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';

import {PREDEFINED_CALMING_SVGS} from './src/data/predefinedCalmingSvgs';
import {mapSvgToToneEvents} from './src/services/audioMapper';
import {playToneSequence, stopToneSequence} from './src/services/audioSynthesis';
import {parseSvg} from './src/services/svgParser';

function App(): React.JSX.Element {
  const [svgXml, setSvgXml] = useState(PREDEFINED_CALMING_SVGS[0].svg);
  const [selectedPresetId, setSelectedPresetId] = useState(PREDEFINED_CALMING_SVGS[0].id);
  const [intensity, setIntensity] = useState(0.6);
  const [speed, setSpeed] = useState(1);
  const [status, setStatus] = useState('Ready with calming preset.');
  const [loadingFile, setLoadingFile] = useState(false);

  const parsed = useMemo(() => parseSvg(svgXml), [svgXml]);
  const toneEvents = useMemo(
    () => mapSvgToToneEvents(parsed, {intensity, speed}),
    [parsed, intensity, speed],
  );

  const loadSvg = (xml: string, sourceLabel: string, presetId?: string) => {
    setSvgXml(xml);
    if (presetId) {
      setSelectedPresetId(presetId);
    }

    setStatus(`Loaded ${sourceLabel}. ${parseSvg(xml).elements.length} shapes mapped.`);
  };

  const handleOpenLocalSvg = async () => {
    try {
      setLoadingFile(true);
      const [selection] = await pick({
        mode: 'open',
        requestLongTermAccess: false,
        allowMultiSelection: false,
        type: ['image/svg+xml', 'text/plain'],
      });

      const localCopy = await keepLocalCopy({
        files: [
          {
            uri: selection.uri,
            fileName: selection.name ?? 'custom.svg',
          },
        ],
        destination: 'cachesDirectory',
      });

      const copied = localCopy[0];
      if (copied.status !== 'success') {
        throw new Error(copied.copyError ?? 'Unable to import file');
      }

      const importedSvg = await RNFS.readFile(copied.localUri, 'utf8');
      loadSvg(importedSvg, selection.name ?? 'local SVG');
      setSelectedPresetId('custom');
    } catch (error) {
      if (isErrorWithCode(error) && error.code === errorCodes.OPERATION_CANCELED) {
        setStatus('File selection canceled.');
      } else {
        setStatus('Could not open SVG file. Please try another SVG.');
      }
    } finally {
      setLoadingFile(false);
    }
  };

  const handlePlay = async () => {
    try {
      setStatus('Generating offline calming audio…');
      await playToneSequence(toneEvents);
      setStatus(`Playing ${toneEvents.length} calming tones.`);
    } catch {
      setStatus('Audio playback failed. Check native setup for Android build.');
    }
  };

  const adjustIntensity = (delta: number) => {
    setIntensity(current => Math.min(1, Math.max(0.2, Number((current + delta).toFixed(2)))));
  };

  const adjustSpeed = (delta: number) => {
    setSpeed(current => Math.min(1.5, Math.max(0.5, Number((current + delta).toFixed(2)))));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f7ff" />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.container}>
        <Text style={styles.title}>Being Calm</Text>
        <Text style={styles.subtitle}>
          A soothing SVG-to-audio playground designed for calm, predictable interactions.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Pick a calming visual</Text>
          <View style={styles.presetGrid}>
            {PREDEFINED_CALMING_SVGS.map(preset => (
              <Pressable
                key={preset.id}
                style={[
                  styles.presetCard,
                  selectedPresetId === preset.id && styles.presetCardSelected,
                ]}
                onPress={() => loadSvg(preset.svg, preset.title, preset.id)}>
                <Text style={styles.presetTitle}>{preset.title}</Text>
                <Text style={styles.presetDescription}>{preset.description}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.uploadButton} onPress={handleOpenLocalSvg}>
            <Text style={styles.uploadButtonText}>Load local SVG file</Text>
          </Pressable>
          {loadingFile ? <ActivityIndicator color="#4d79ff" /> : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Preview SVG</Text>
          <View style={styles.previewBox}>
            <SvgXml xml={svgXml} width="100%" height="200" />
          </View>
          <Text style={styles.metricsText}>
            Shapes mapped: {parsed.elements.length} • Tone events: {toneEvents.length}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Tune calming output</Text>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Calm intensity: {(intensity * 100).toFixed(0)}%</Text>
            <View style={styles.stepper}>
              <Pressable style={styles.stepButton} onPress={() => adjustIntensity(-0.1)}>
                <Text style={styles.stepButtonText}>-</Text>
              </Pressable>
              <Pressable style={styles.stepButton} onPress={() => adjustIntensity(0.1)}>
                <Text style={styles.stepButtonText}>+</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Pace: {speed.toFixed(2)}x</Text>
            <View style={styles.stepper}>
              <Pressable style={styles.stepButton} onPress={() => adjustSpeed(-0.1)}>
                <Text style={styles.stepButtonText}>-</Text>
              </Pressable>
              <Pressable style={styles.stepButton} onPress={() => adjustSpeed(0.1)}>
                <Text style={styles.stepButtonText}>+</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.actionRow}>
            <Pressable style={styles.playButton} onPress={handlePlay}>
              <Text style={styles.actionText}>Preview calming audio</Text>
            </Pressable>
            <Pressable
              style={styles.stopButton}
              onPress={() => {
                stopToneSequence();
                setStatus('Playback stopped.');
              }}>
              <Text style={styles.actionText}>Stop</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.statusText}>{status}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f7ff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 18,
    fontSize: 34,
    fontWeight: '800',
    color: '#3558b2',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 22,
    color: '#5a6c99',
  },
  section: {
    marginBottom: 18,
    padding: 14,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: '700',
    color: '#2e4278',
  },
  presetGrid: {
    gap: 10,
  },
  presetCard: {
    borderWidth: 2,
    borderColor: '#d9e5ff',
    borderRadius: 14,
    padding: 12,
    backgroundColor: '#f8fbff',
  },
  presetCardSelected: {
    borderColor: '#6f92ff',
    backgroundColor: '#ecf2ff',
  },
  presetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3657aa',
  },
  presetDescription: {
    marginTop: 4,
    fontSize: 13,
    color: '#54648e',
  },
  uploadButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#b8d4ff',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1d3f8c',
  },
  previewBox: {
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#eef5ff',
    borderWidth: 1,
    borderColor: '#dae8ff',
  },
  metricsText: {
    marginTop: 10,
    fontSize: 13,
    color: '#506089',
  },
  controlRow: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2f4278',
  },
  stepper: {
    flexDirection: 'row',
    gap: 8,
  },
  stepButton: {
    minWidth: 36,
    borderRadius: 999,
    backgroundColor: '#d8e6ff',
    alignItems: 'center',
    paddingVertical: 7,
  },
  stepButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2e4f9b',
  },
  actionRow: {
    marginTop: 2,
    flexDirection: 'row',
    gap: 10,
  },
  playButton: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#7ab3ff',
    paddingVertical: 12,
    alignItems: 'center',
  },
  stopButton: {
    minWidth: 90,
    borderRadius: 12,
    backgroundColor: '#f7b8c7',
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1d2f52',
  },
  statusText: {
    marginBottom: 22,
    fontSize: 14,
    fontWeight: '600',
    color: '#3a4a70',
  },
});

export default App;
