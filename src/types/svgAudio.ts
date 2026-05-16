export type SvgShape =
  | 'circle'
  | 'rect'
  | 'ellipse'
  | 'line'
  | 'polygon'
  | 'polyline'
  | 'path';

export type ParsedSvgElement = {
  shape: SvgShape;
  color: string;
  x: number;
  y: number;
  size: number;
};

export type ParsedSvgData = {
  width?: number;
  height?: number;
  viewBox?: string;
  elements: ParsedSvgElement[];
};

export type WaveformType = 'sine' | 'triangle' | 'square' | 'sawtooth';

export type ToneEvent = {
  frequency: number;
  durationSeconds: number;
  volume: number;
  waveform: WaveformType;
};
