import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const guideSections = [
  {
    title: 'How to map new SVG + audio pairs',
    steps: [
      '1. Add SVG files under assets/SVGs/.',
      '2. Add MP3 files under assets/Audio/.',
      '3. Create a new set in src/content/emotionSets.ts with emotion, paths, and svgMarkup.',
      '4. Ensure the audio path is added in src/services/audioPlayer.ts require map for offline playback.'
    ]
  },
  {
    title: 'How mapping works',
    steps: [
      'Color palette impacts waveform selection (cool colors use smoother waves).',
      'Shape complexity affects playback tempo (more complex shapes slow the pace).',
      'SVG size influences pitch range for generated tone profiles.'
    ]
  },
  {
    title: 'Offline usage',
    steps: [
      'Preloaded assets are bundled in assets/SVGs and assets/Audio.',
      'Custom mappings are stored locally via AsyncStorage.',
      'No internet connection is required for predefined calming sessions.'
    ]
  },
  {
    title: 'iOS readiness notes',
    steps: [
      'Platform-specific native APIs should stay in service files.',
      'Use flexible layout and test larger tablets such as iPad.',
      'Audio player abstraction allows platform-specific replacement without UI rewrites.'
    ]
  }
];

export function GuideScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>In-App Guide</Text>
      {guideSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.steps.map((step) => (
            <Text key={step} style={styles.step}>{step}</Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {padding: 16, gap: 12, backgroundColor: '#FCFDFF'},
  title: {fontSize: 24, fontWeight: '700', color: '#1E2A36'},
  section: {backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E6EDF7', borderRadius: 12, padding: 12, gap: 6},
  sectionTitle: {fontSize: 17, fontWeight: '700', color: '#244A73'},
  step: {fontSize: 14, color: '#455A64', lineHeight: 20}
});
