import {EmotionSet} from '../types/content';

export const EMOTION_SETS: EmotionSet[] = [
  {
    id: 'crying-wave-1',
    emotion: 'crying',
    label: 'Crying Blue Wave',
    svgPath: 'assets/SVGs/crying_wave_1.svg',
    audioPath: 'assets/Audio/crying_wave_1.mp3',
    tonePreset: 'mellow',
    source: 'preloaded',
    svgMarkup: '<svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="140" fill="#E3F2FD"/><path d="M0 70 C 40 30, 80 110, 120 70 C 160 30, 190 100, 220 60" stroke="#1E88E5" stroke-width="8" fill="none"/></svg>'
  },
  {
    id: 'crying-wave-2',
    emotion: 'crying',
    label: 'Gentle Tear Stream',
    svgPath: 'assets/SVGs/crying_wave_2.svg',
    audioPath: 'assets/Audio/crying_wave_2.mp3',
    tonePreset: 'mellow',
    source: 'preloaded',
    svgMarkup: '<svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="140" fill="#F1F8FE"/><path d="M15 45 C 50 25, 90 90, 125 60 C 160 35, 190 100, 210 70" stroke="#42A5F5" stroke-width="6" fill="none"/><ellipse cx="60" cy="110" rx="18" ry="12" fill="#90CAF9"/></svg>'
  },
  {
    id: 'sad-harmony-1',
    emotion: 'sad',
    label: 'Sad Circle Harmony',
    svgPath: 'assets/SVGs/sad_harmony_1.svg',
    audioPath: 'assets/Audio/sad_harmony_1.mp3',
    tonePreset: 'harmonic',
    source: 'preloaded',
    svgMarkup: '<svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="140" fill="#E8EAF6"/><circle cx="70" cy="70" r="36" fill="#5C6BC0"/><circle cx="150" cy="70" r="24" fill="#7986CB"/></svg>'
  },
  {
    id: 'sad-harmony-2',
    emotion: 'sad',
    label: 'Soft Indigo Orbit',
    svgPath: 'assets/SVGs/sad_harmony_2.svg',
    audioPath: 'assets/Audio/sad_harmony_2.mp3',
    tonePreset: 'harmonic',
    source: 'preloaded',
    svgMarkup: '<svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="140" fill="#F3E5F5"/><ellipse cx="110" cy="70" rx="75" ry="42" stroke="#7E57C2" stroke-width="7" fill="none"/><circle cx="110" cy="70" r="14" fill="#9575CD"/></svg>'
  },
  {
    id: 'frustrated-ground-1',
    emotion: 'frustrated',
    label: 'Frustration Grounding Zigzag',
    svgPath: 'assets/SVGs/frustrated_ground_1.svg',
    audioPath: 'assets/Audio/frustrated_ground_1.mp3',
    tonePreset: 'bass',
    source: 'preloaded',
    svgMarkup: '<svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="140" fill="#FFF3E0"/><path d="M10 95 L45 50 L80 98 L115 45 L150 99 L190 55" stroke="#EF6C00" stroke-width="10" fill="none"/></svg>'
  },
  {
    id: 'frustrated-ground-2',
    emotion: 'frustrated',
    label: 'Deep Breathing Peaks',
    svgPath: 'assets/SVGs/frustrated_ground_2.svg',
    audioPath: 'assets/Audio/frustrated_ground_2.mp3',
    tonePreset: 'bass',
    source: 'preloaded',
    svgMarkup: '<svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="140" fill="#FFF8E1"/><polygon points="20,105 60,40 95,105 130,55 165,105 200,62" fill="#FFA726"/></svg>'
  },
  {
    id: 'anger-release-1',
    emotion: 'anger',
    label: 'Anger Release Pattern',
    svgPath: 'assets/SVGs/anger_release_1.svg',
    audioPath: 'assets/Audio/anger_release_1.mp3',
    tonePreset: 'steady',
    source: 'preloaded',
    svgMarkup: '<svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="140" fill="#FFEBEE"/><path d="M15 110 L45 25 L75 110 L105 35 L135 110 L165 20 L195 110" stroke="#C62828" stroke-width="9" fill="none"/></svg>'
  },
  {
    id: 'anger-release-2',
    emotion: 'anger',
    label: 'Lava to Calm',
    svgPath: 'assets/SVGs/anger_release_2.svg',
    audioPath: 'assets/Audio/anger_release_2.mp3',
    tonePreset: 'steady',
    source: 'preloaded',
    svgMarkup: '<svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="140" fill="#FBE9E7"/><rect x="32" y="35" width="155" height="70" rx="20" fill="#D84315"/><circle cx="72" cy="70" r="12" fill="#FFAB91"/></svg>'
  },
  {
    id: 'shouting-cooldown-1',
    emotion: 'shouting',
    label: 'Shouting Cooldown Rings',
    svgPath: 'assets/SVGs/shouting_cooldown_1.svg',
    audioPath: 'assets/Audio/shouting_cooldown_1.mp3',
    tonePreset: 'steady',
    source: 'preloaded',
    svgMarkup: '<svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="140" fill="#E0F7FA"/><circle cx="110" cy="70" r="48" stroke="#00838F" stroke-width="8" fill="none"/><circle cx="110" cy="70" r="26" stroke="#26C6DA" stroke-width="7" fill="none"/></svg>'
  },
  {
    id: 'shouting-cooldown-2',
    emotion: 'shouting',
    label: 'Volume to Whisper',
    svgPath: 'assets/SVGs/shouting_cooldown_2.svg',
    audioPath: 'assets/Audio/shouting_cooldown_2.mp3',
    tonePreset: 'steady',
    source: 'preloaded',
    svgMarkup: '<svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="140" fill="#E0F2F1"/><path d="M15 85 C 35 45, 65 120, 90 75 C 110 45, 140 95, 160 60 C 180 42, 197 75, 210 65" stroke="#00897B" stroke-width="8" fill="none"/></svg>'
  },
  {
    id: 'cheated-balance-1',
    emotion: 'cheated',
    label: 'Cheated to Balance',
    svgPath: 'assets/SVGs/cheated_balance_1.svg',
    audioPath: 'assets/Audio/cheated_balance_1.mp3',
    tonePreset: 'uplift',
    source: 'preloaded',
    svgMarkup: '<svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="140" fill="#E8F5E9"/><line x1="30" y1="96" x2="190" y2="96" stroke="#2E7D32" stroke-width="8"/><line x1="110" y1="25" x2="110" y2="96" stroke="#66BB6A" stroke-width="8"/><circle cx="75" cy="70" r="16" fill="#81C784"/><circle cx="145" cy="70" r="16" fill="#81C784"/></svg>'
  },
  {
    id: 'cheated-balance-2',
    emotion: 'cheated',
    label: 'Fairness Spiral',
    svgPath: 'assets/SVGs/cheated_balance_2.svg',
    audioPath: 'assets/Audio/cheated_balance_2.mp3',
    tonePreset: 'uplift',
    source: 'preloaded',
    svgMarkup: '<svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="140" fill="#F1F8E9"/><path d="M40 100 C 40 30, 180 30, 180 100 C 180 120, 155 120, 155 100 C 155 50, 65 50, 65 100" stroke="#7CB342" stroke-width="7" fill="none"/></svg>'
  }
];

export const EMOJI_LIKE_LIBRARY = [
  {
    id: 'emoji-smile-calm',
    label: 'Smile Calm',
    svgPath: 'assets/SVGs/emoji_smile.svg',
    svgMarkup: '<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg"><circle cx="90" cy="90" r="78" fill="#FFF176"/><circle cx="63" cy="74" r="9" fill="#6D4C41"/><circle cx="117" cy="74" r="9" fill="#6D4C41"/><path d="M52 105 C 70 129, 110 129, 128 105" stroke="#6D4C41" stroke-width="8" fill="none"/></svg>'
  },
  {
    id: 'emoji-heart-calm',
    label: 'Heart Calm',
    svgPath: 'assets/SVGs/emoji_heart.svg',
    svgMarkup: '<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="180" fill="#FCE4EC"/><path d="M90 150 L35 95 C 10 65, 20 25, 58 25 C 74 25, 85 35, 90 45 C 95 35, 106 25, 122 25 C 160 25, 170 65, 145 95 Z" fill="#EC407A"/></svg>'
  },
  {
    id: 'emoji-star-calm',
    label: 'Star Focus',
    svgPath: 'assets/SVGs/emoji_star.svg',
    svgMarkup: '<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="180" fill="#E3F2FD"/><polygon points="90,20 108,70 160,70 118,100 136,150 90,118 44,150 62,100 20,70 72,70" fill="#42A5F5"/></svg>'
  }
];
