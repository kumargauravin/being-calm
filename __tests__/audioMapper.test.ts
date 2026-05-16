import {mapSvgToToneEvents} from '../src/services/audioMapper';

describe('mapSvgToToneEvents', () => {
  it('maps svg elements to bounded calming tone events', () => {
    const toneEvents = mapSvgToToneEvents(
      {
        elements: [
          {shape: 'circle', color: '#88CCEE', x: 20, y: 40, size: 14},
          {shape: 'rect', color: '#CCDDEE', x: 60, y: 70, size: 24},
        ],
      },
      {intensity: 0.7, speed: 1.1},
    );

    expect(toneEvents).toHaveLength(2);
    expect(toneEvents[0].waveform).toBe('sine');
    expect(toneEvents[1].waveform).toBe('triangle');
    expect(toneEvents.every(item => item.frequency >= 120 && item.frequency <= 720)).toBe(true);
    expect(toneEvents.every(item => item.durationSeconds >= 0.25)).toBe(true);
  });

  it('returns a fallback calm tone for empty svg', () => {
    const fallback = mapSvgToToneEvents({elements: []});
    expect(fallback).toHaveLength(1);
    expect(fallback[0].waveform).toBe('sine');
  });
});
