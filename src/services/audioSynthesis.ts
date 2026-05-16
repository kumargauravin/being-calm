import RNFS from 'react-native-fs';
import SoundPlayer from 'react-native-sound-player';

import {ToneEvent, WaveformType} from '../types/svgAudio';

const SAMPLE_RATE = 22050;

function waveformSample(type: WaveformType, phase: number): number {
  switch (type) {
    case 'triangle':
      return 1 - 4 * Math.abs(Math.round(phase - 0.25) - (phase - 0.25));
    case 'square':
      return phase < 0.5 ? 1 : -1;
    case 'sawtooth':
      return 2 * (phase - Math.floor(phase + 0.5));
    case 'sine':
    default:
      return Math.sin(2 * Math.PI * phase);
  }
}

function toneToPcm(tone: ToneEvent, sampleRate: number): Int16Array {
  const sampleCount = Math.max(1, Math.floor(tone.durationSeconds * sampleRate));
  const pcm = new Int16Array(sampleCount);

  for (let i = 0; i < sampleCount; i += 1) {
    const t = i / sampleRate;
    const phase = (t * tone.frequency) % 1;
    const wave = waveformSample(tone.waveform, phase);

    const attack = Math.min(i / (sampleCount * 0.08), 1);
    const release = Math.min((sampleCount - i) / (sampleCount * 0.15), 1);
    const envelope = Math.max(0, Math.min(attack, release));

    pcm[i] = Math.max(
      -32768,
      Math.min(32767, Math.round(wave * tone.volume * envelope * 32767)),
    );
  }

  return pcm;
}

function buildWav(events: ToneEvent[]): Uint8Array {
  const pcmChunks = events.map(event => toneToPcm(event, SAMPLE_RATE));
  const silence = new Int16Array(Math.floor(SAMPLE_RATE * 0.08));
  const totalSamples = pcmChunks.reduce((sum, chunk) => sum + chunk.length, 0) + silence.length * pcmChunks.length;

  const dataSize = totalSamples * 2;
  const wav = new Uint8Array(44 + dataSize);
  const view = new DataView(wav.buffer);

  const writeAscii = (offset: number, text: string) => {
    text.split('').forEach((char, idx) => {
      wav[offset + idx] = char.charCodeAt(0);
    });
  };

  writeAscii(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeAscii(8, 'WAVE');
  writeAscii(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, SAMPLE_RATE, true);
  view.setUint32(28, SAMPLE_RATE * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeAscii(36, 'data');
  view.setUint32(40, dataSize, true);

  let writeOffset = 44;
  for (const chunk of pcmChunks) {
    for (let i = 0; i < chunk.length; i += 1) {
      view.setInt16(writeOffset, chunk[i], true);
      writeOffset += 2;
    }

    for (let i = 0; i < silence.length; i += 1) {
      view.setInt16(writeOffset, 0, true);
      writeOffset += 2;
    }
  }

  return wav;
}

function toBase64(bytes: Uint8Array): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let output = '';

  for (let i = 0; i < bytes.length; i += 3) {
    const byte1 = bytes[i];
    const byte2 = bytes[i + 1];
    const byte3 = bytes[i + 2];

    const chunk = byte1 * 65536 + (byte2 ?? 0) * 256 + (byte3 ?? 0);

    output += alphabet[Math.floor(chunk / 262144) % 64];
    output += alphabet[Math.floor(chunk / 4096) % 64];
    output += byte2 === undefined ? '=' : alphabet[Math.floor(chunk / 64) % 64];
    output += byte3 === undefined ? '=' : alphabet[chunk % 64];
  }

  return output;
}

export async function playToneSequence(events: ToneEvent[]): Promise<void> {
  const wavBytes = buildWav(events);
  const base64Wav = toBase64(wavBytes);
  const filePath = `${RNFS.CachesDirectoryPath}/being-calm-preview.wav`;

  await RNFS.writeFile(filePath, base64Wav, 'base64');
  SoundPlayer.playUrl(`file://${filePath}`);
}

export function stopToneSequence(): void {
  SoundPlayer.stop();
}
