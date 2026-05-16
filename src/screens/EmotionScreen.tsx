import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {EMOTION_SETS, EMOJI_LIKE_LIBRARY} from '../content/emotionSets';
import {mapAttributesToTone} from '../services/audioMapping';
import {playAsset} from '../services/audioPlayer';
import {parseSvgAttributes} from '../services/svgParser';
import {Emotion, EmotionSet} from '../types/content';

const EMOTIONS: Emotion[] = ['crying', 'sad', 'frustrated', 'anger', 'shouting', 'cheated'];

export function EmotionScreen() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>('crying');
  const [playing, setPlaying] = useState<string>('');

  const filtered = useMemo(
    () => EMOTION_SETS.filter((set) => set.emotion === selectedEmotion),
    [selectedEmotion]
  );

  const onPlay = async (set: EmotionSet) => {
    setPlaying(set.id);
    const attributes = parseSvgAttributes(set.svgMarkup);
    mapAttributesToTone(attributes);
    try {
      await playAsset(set.audioPath);
    } finally {
      setPlaying('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Being Calm</Text>
      <Text style={styles.subtitle}>Pick how you feel and play a calm visual + tone set.</Text>

      <View style={styles.chipRow}>
        {EMOTIONS.map((emotion) => (
          <TouchableOpacity
            key={emotion}
            onPress={() => setSelectedEmotion(emotion)}
            style={[styles.chip, selectedEmotion === emotion && styles.activeChip]}
            accessibilityRole="button"
            accessibilityLabel={`select-${emotion}`}>
            <Text style={[styles.chipText, selectedEmotion === emotion && styles.activeChipText]}>{emotion}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.map((set) => (
        <View key={set.id} style={styles.card}>
          <Text style={styles.cardTitle}>{set.label}</Text>
          <SvgXml xml={set.svgMarkup} width={220} height={140} />
          <TouchableOpacity onPress={() => onPlay(set)} style={styles.playButton}>
            <Text style={styles.playButtonText}>{playing === set.id ? 'Playing...' : 'Play calm tone'}</Text>
          </TouchableOpacity>
          <Text style={styles.assetText}>{set.svgPath} + {set.audioPath}</Text>
        </View>
      ))}

      <Text style={styles.emojiTitle}>Emoji-like SVG Library</Text>
      <View style={styles.emojiRow}>
        {EMOJI_LIKE_LIBRARY.map((item) => (
          <View key={item.id} style={styles.emojiCard}>
            <SvgXml xml={item.svgMarkup} width={120} height={120} />
            <Text style={styles.emojiLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {padding: 16, gap: 12, backgroundColor: '#F5F8FF'},
  title: {fontSize: 28, fontWeight: '700', color: '#263238'},
  subtitle: {fontSize: 16, color: '#455A64'},
  chipRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
  chip: {paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#E3F2FD'},
  activeChip: {backgroundColor: '#1976D2'},
  chipText: {textTransform: 'capitalize', color: '#0D47A1'},
  activeChipText: {color: '#FFFFFF'},
  card: {backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, gap: 8, borderColor: '#DDE6F6', borderWidth: 1},
  cardTitle: {fontWeight: '600', fontSize: 17, color: '#1B2733'},
  playButton: {backgroundColor: '#2E7D32', borderRadius: 10, padding: 10, alignItems: 'center'},
  playButtonText: {color: '#fff', fontWeight: '600'},
  assetText: {fontSize: 12, color: '#607D8B'},
  emojiTitle: {fontSize: 19, fontWeight: '700', marginTop: 8},
  emojiRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
  emojiCard: {backgroundColor: '#fff', padding: 8, borderRadius: 10, alignItems: 'center'},
  emojiLabel: {fontSize: 12, color: '#37474F'}
});
