export type PredefinedCalmingSvg = {
  id: string;
  title: string;
  description: string;
  assetPath: string;
  svg: string;
};

const gentleWavesSvg = `<svg width="320" height="200" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="200" fill="#E3F5FF" />
  <path d="M0 130 C40 110, 80 150, 120 130 C160 110, 200 150, 240 130 C280 110, 320 150, 360 130" stroke="#6AAFE6" stroke-width="6" fill="none" />
  <path d="M0 160 C40 140, 80 180, 120 160 C160 140, 200 180, 240 160 C280 140, 320 180, 360 160" stroke="#91C8F6" stroke-width="4" fill="none" />
  <circle cx="50" cy="55" r="18" fill="#FFF2B2" />
</svg>`;

const softGardenSvg = `<svg width="320" height="200" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="200" fill="#F5FFF1" />
  <ellipse cx="70" cy="145" rx="42" ry="22" fill="#D5F5D1" />
  <ellipse cx="160" cy="140" rx="54" ry="24" fill="#BEEEC1" />
  <ellipse cx="255" cy="146" rx="38" ry="20" fill="#CFF3D0" />
  <circle cx="88" cy="90" r="14" fill="#FFD8E6" />
  <circle cx="165" cy="84" r="18" fill="#E8D1FF" />
  <circle cx="240" cy="95" r="12" fill="#FFE9B8" />
</svg>`;

export const PREDEFINED_CALMING_SVGS: PredefinedCalmingSvg[] = [
  {
    id: 'gentle-waves',
    title: 'Gentle Waves',
    description: 'Slow wave lines and a soft sun mapped to mellow tones.',
    assetPath: 'assets/calming-svgs/gentle-waves.svg',
    svg: gentleWavesSvg,
  },
  {
    id: 'soft-garden',
    title: 'Soft Garden',
    description: 'Rounded shapes that generate warm and steady harmonies.',
    assetPath: 'assets/calming-svgs/soft-garden.svg',
    svg: softGardenSvg,
  },
];
