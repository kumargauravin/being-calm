import Sound from 'react-native-sound';

Sound.setCategory?.('Playback');

const AUDIO_REQUIRE_MAP: Record<string, number> = {
  'assets/Audio/crying_wave_1.mp3': require('../../assets/Audio/crying_wave_1.mp3'),
  'assets/Audio/crying_wave_2.mp3': require('../../assets/Audio/crying_wave_2.mp3'),
  'assets/Audio/sad_harmony_1.mp3': require('../../assets/Audio/sad_harmony_1.mp3'),
  'assets/Audio/sad_harmony_2.mp3': require('../../assets/Audio/sad_harmony_2.mp3'),
  'assets/Audio/frustrated_ground_1.mp3': require('../../assets/Audio/frustrated_ground_1.mp3'),
  'assets/Audio/frustrated_ground_2.mp3': require('../../assets/Audio/frustrated_ground_2.mp3'),
  'assets/Audio/anger_release_1.mp3': require('../../assets/Audio/anger_release_1.mp3'),
  'assets/Audio/anger_release_2.mp3': require('../../assets/Audio/anger_release_2.mp3'),
  'assets/Audio/shouting_cooldown_1.mp3': require('../../assets/Audio/shouting_cooldown_1.mp3'),
  'assets/Audio/shouting_cooldown_2.mp3': require('../../assets/Audio/shouting_cooldown_2.mp3'),
  'assets/Audio/cheated_balance_1.mp3': require('../../assets/Audio/cheated_balance_1.mp3'),
  'assets/Audio/cheated_balance_2.mp3': require('../../assets/Audio/cheated_balance_2.mp3')
};

export function playAsset(audioPath: string): Promise<void> {
  const resolved = AUDIO_REQUIRE_MAP[audioPath];
  return new Promise((resolve, reject) => {
    const sound = new Sound(resolved || audioPath, '', (error) => {
      if (error) {
        reject(error);
        return;
      }
      sound.play((success) => {
        sound.release();
        if (success) {
          resolve();
          return;
        }
        reject(new Error('Unable to play audio track'));
      });
    });
  });
}
