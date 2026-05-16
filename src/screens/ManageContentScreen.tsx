import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {EmotionSet} from '../types/content';

const STORAGE_KEY = 'custom-emotion-sets';

export function ManageContentScreen() {
  const [customSets, setCustomSets] = useState<EmotionSet[]>([]);
  const [emotion, setEmotion] = useState('crying');
  const [label, setLabel] = useState('');
  const [svgPath, setSvgPath] = useState('assets/SVGs/custom.svg');
  const [audioPath, setAudioPath] = useState('assets/Audio/custom.mp3');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) {
        setCustomSets(JSON.parse(data));
      }
    });
  }, []);

  const saveEntry = async () => {
    const entry: EmotionSet = {
      id: `custom-${Date.now()}`,
      emotion: emotion as EmotionSet['emotion'],
      label: label || 'Custom calm set',
      svgPath,
      audioPath,
      svgMarkup:
        '<svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="140" fill="#ECEFF1"/><circle cx="110" cy="70" r="34" fill="#90A4AE"/></svg>',
      tonePreset: 'mellow',
      source: 'custom'
    };
    const next = [entry, ...customSets];
    setCustomSets(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setLabel('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Manage Custom Content</Text>
      <Text style={styles.help}>Upload files using your preferred file picker integration, then register paths here.</Text>
      <TextInput value={emotion} onChangeText={setEmotion} style={styles.input} placeholder="emotion (crying/sad/frustrated/anger/shouting/cheated)" />
      <TextInput value={label} onChangeText={setLabel} style={styles.input} placeholder="label" />
      <TextInput value={svgPath} onChangeText={setSvgPath} style={styles.input} placeholder="SVG path" />
      <TextInput value={audioPath} onChangeText={setAudioPath} style={styles.input} placeholder="Audio path" />
      <TouchableOpacity style={styles.button} onPress={saveEntry}>
        <Text style={styles.buttonText}>Save mapping</Text>
      </TouchableOpacity>

      <View style={styles.listWrap}>
        <Text style={styles.section}>Saved custom mappings</Text>
        {customSets.map((item) => (
          <Text key={item.id} style={styles.item}>• {item.label}: {item.svgPath} ↔ {item.audioPath}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {padding: 16, gap: 10, backgroundColor: '#F9FBFE'},
  title: {fontSize: 24, fontWeight: '700'},
  help: {color: '#546E7A'},
  input: {backgroundColor: '#fff', borderColor: '#CFD8DC', borderWidth: 1, borderRadius: 8, padding: 10},
  button: {backgroundColor: '#1565C0', padding: 11, borderRadius: 8, alignItems: 'center'},
  buttonText: {color: '#fff', fontWeight: '600'},
  listWrap: {marginTop: 8, backgroundColor: '#fff', borderRadius: 8, padding: 10, borderWidth: 1, borderColor: '#ECEFF1'},
  section: {fontWeight: '700', marginBottom: 6},
  item: {color: '#37474F', fontSize: 13, marginBottom: 4}
});
