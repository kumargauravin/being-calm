# being-calm

Offline-first React Native calming app for ADHD children using SVG-to-audio mapping.

## Current implementation

- SVG attribute parser (`src/services/svgParser.ts`) extracts colors/shapes/sizes.
- Mapping engine (`src/services/audioMapping.ts`) converts SVG attributes to tone profile metadata.
- Preloaded emotion sets (2 each): crying, sad, frustrated, anger, shouting, cheated.
- Preloaded emoji-like SVG library: smile, heart, star.
- Offline bundled assets under:
  - `assets/SVGs/`
  - `assets/Audio/`
- App screens:
  - **Sessions**: emotion selection + visual preview + tone playback
  - **Guide**: how to map content and offline arrangement
  - **Manage**: local custom mapping registration

## Quick start

```bash
npm install
npm test
```

## Adding new content

1. Place SVG in `assets/SVGs/` and MP3 in `assets/Audio/`.
2. Add the set in `src/content/emotionSets.ts` with `svgPath`, `audioPath`, and `svgMarkup`.
3. Register the audio file in `src/services/audioPlayer.ts` require map for offline loading.
4. (Optional) Add mapping tests in `__tests__/`.

## iOS expansion readiness

- Keep native dependencies behind service abstractions (`src/services/audioPlayer.ts`).
- Continue responsive layouts for larger iPad screens.
- Add iOS runner/project and test audio permissions during expansion.

## Tests

- `__tests__/svgParser.test.ts` validates SVG parsing.
- `__tests__/audioMapping.test.ts` validates tone mapping.
- `__tests__/App.test.tsx` validates UI tab interaction.
