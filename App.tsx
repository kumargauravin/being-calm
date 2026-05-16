import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {EmotionScreen} from './src/screens/EmotionScreen';
import {GuideScreen} from './src/screens/GuideScreen';
import {ManageContentScreen} from './src/screens/ManageContentScreen';

type Tab = 'sessions' | 'guide' | 'manage';

export default function App() {
  const [tab, setTab] = useState<Tab>('sessions');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.nav}>
        <TabButton label="Sessions" active={tab === 'sessions'} onPress={() => setTab('sessions')} />
        <TabButton label="Guide" active={tab === 'guide'} onPress={() => setTab('guide')} />
        <TabButton label="Manage" active={tab === 'manage'} onPress={() => setTab('manage')} />
      </View>
      {tab === 'sessions' && <EmotionScreen />}
      {tab === 'guide' && <GuideScreen />}
      {tab === 'manage' && <ManageContentScreen />}
    </SafeAreaView>
  );
}

function TabButton({label, active, onPress}: {label: string; active: boolean; onPress: () => void}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.tabButton, active && styles.active]}>
      <Text style={[styles.tabText, active && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#F5F7FA'},
  nav: {flexDirection: 'row', justifyContent: 'space-between', gap: 8, padding: 12, backgroundColor: '#FFFFFF'},
  tabButton: {flex: 1, borderRadius: 10, paddingVertical: 10, alignItems: 'center', backgroundColor: '#E3F2FD'},
  active: {backgroundColor: '#0D47A1'},
  tabText: {fontWeight: '600', color: '#0D47A1'},
  activeText: {color: '#FFFFFF'}
});
