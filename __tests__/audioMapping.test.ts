import {mapAttributesToTone} from '../src/services/audioMapping';

describe('mapAttributesToTone', () => {
  it('maps cool colors to smooth waveform and bounded tempo', () => {
    const mapping = mapAttributesToTone({
      colors: ['#00aaff'],
      shapes: ['circle', 'rect', 'path'],
      maxSize: 150
    });
    expect(mapping.waveform).toBe('sine');
    expect(mapping.tempo).toBeGreaterThanOrEqual(55);
    expect(mapping.pitchRange[1]).toBeGreaterThan(220);
  });
});
