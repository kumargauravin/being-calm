import {parseSvg} from '../src/services/svgParser';

describe('parseSvg', () => {
  it('extracts shape attributes from svg', () => {
    const result = parseSvg(`
      <svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="30" r="10" fill="#88CCEE" />
        <rect x="60" y="25" width="24" height="16" fill="#CCDDEE" />
        <line x1="10" y1="90" x2="190" y2="90" stroke="#99AACC" />
      </svg>
    `);

    expect(result.width).toBe(200);
    expect(result.height).toBe(100);
    expect(result.elements).toHaveLength(3);
    expect(result.elements.map(item => item.shape)).toEqual(['circle', 'rect', 'line']);
  });
});
