import {ToneMapping, SvgAttributes} from '../types/content';

function paletteToWaveform(colors: string[]): ToneMapping['waveform'] {
  if (colors.some((color) => color.startsWith('#ff') || color.startsWith('#d1'))) {
    return 'square';
  }
  if (colors.some((color) => color.startsWith('#00') || color.startsWith('#33'))) {
    return 'sine';
  }
  if (colors.some((color) => color.startsWith('#88') || color.startsWith('#66'))) {
    return 'triangle';
  }
  return 'sawtooth';
}

export function mapAttributesToTone(attributes: SvgAttributes): ToneMapping {
  const waveform = paletteToWaveform(attributes.colors);
  const complexity = attributes.shapes.length || 1;
  const tempo = Math.max(55, 120 - complexity * 10);
  const upper = Math.max(320, 220 + Math.min(attributes.maxSize, 180));
  return {
    waveform,
    tempo,
    pitchRange: [110, upper]
  };
}
