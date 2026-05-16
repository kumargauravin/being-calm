export type Emotion =
  | 'crying'
  | 'sad'
  | 'frustrated'
  | 'anger'
  | 'shouting'
  | 'cheated';

export interface EmotionSet {
  id: string;
  emotion: Emotion;
  label: string;
  svgPath: string;
  audioPath: string;
  svgMarkup: string;
  tonePreset: 'mellow' | 'harmonic' | 'bass' | 'steady' | 'uplift';
  source: 'preloaded' | 'custom';
}

export interface SvgAttributes {
  colors: string[];
  shapes: string[];
  maxSize: number;
}

export interface ToneMapping {
  waveform: 'sine' | 'triangle' | 'square' | 'sawtooth';
  tempo: number;
  pitchRange: [number, number];
}
