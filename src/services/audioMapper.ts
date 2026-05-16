import {ParsedSvgData, ParsedSvgElement, ToneEvent, WaveformType} from '../types/svgAudio';

const SHAPE_TO_WAVEFORM: Record<ParsedSvgElement['shape'], WaveformType> = {
  circle: 'sine',
  ellipse: 'sine',
  rect: 'triangle',
  line: 'square',
  polygon: 'sawtooth',
  polyline: 'triangle',
  path: 'sine',
};

const RED_WEIGHT = 0.2;
const GREEN_WEIGHT = 0.5;
const BLUE_WEIGHT = 0.3;
// Pentatonic-like calm scale: G3, A3, B3, C4, D4, E4, G4.
const CALM_SCALE = [196, 220, 246.94, 261.63, 293.66, 329.63, 392];

function normalizeHexColor(color: string): string {
  const cleaned = color.replace('#', '').trim();

  if (cleaned.length === 3) {
    return cleaned
      .split('')
      .map(char => `${char}${char}`)
      .join('')
      .toLowerCase();
  }

  if (cleaned.length >= 6) {
    return cleaned.slice(0, 6).toLowerCase();
  }

  return '8fb8ff';
}

function colorToScaleIndex(color: string): number {
  const hex = normalizeHexColor(color);
  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);

  const weighted = red * RED_WEIGHT + green * GREEN_WEIGHT + blue * BLUE_WEIGHT;
  return Math.round((weighted / 255) * (CALM_SCALE.length - 1));
}

export function mapSvgToToneEvents(
  svgData: ParsedSvgData,
  options?: {intensity?: number; speed?: number},
): ToneEvent[] {
  const intensity = Math.min(Math.max(options?.intensity ?? 0.6, 0.2), 1);
  const speed = Math.min(Math.max(options?.speed ?? 1, 0.5), 1.5);

  if (svgData.elements.length === 0) {
    return [
      {
        frequency: 220,
        durationSeconds: 1.2,
        volume: intensity * 0.45,
        waveform: 'sine',
      },
    ];
  }

  return svgData.elements.slice(0, 24).map(element => {
    const scaleIndex = colorToScaleIndex(element.color);
    const positionBend = element.y / 400;
    const baseFrequency = CALM_SCALE[scaleIndex] * (1 + positionBend * 0.2);
    const sizeFactor = Math.min(Math.max(element.size / 40, 0.4), 1.4);

    return {
      frequency: Math.max(120, Math.min(baseFrequency, 720)),
      durationSeconds: Math.max(0.25, (0.75 + sizeFactor * 0.6) / speed),
      volume: Math.max(0.12, Math.min(0.8, intensity * (0.4 + sizeFactor * 0.35))),
      waveform: SHAPE_TO_WAVEFORM[element.shape],
    };
  });
}
