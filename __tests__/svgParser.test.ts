import {parseSvgAttributes} from '../src/services/svgParser';

describe('parseSvgAttributes', () => {
  it('extracts colors, shapes, and max size', () => {
    const attributes = parseSvgAttributes('<svg width="200" height="100"><rect width="90" height="50" fill="#00AAFF"/><circle cx="20" cy="20" r="11" fill="#FFAA00"/></svg>');
    expect(attributes.colors).toEqual(['#00aaff', '#ffaa00']);
    expect(attributes.shapes).toEqual(['circle', 'rect']);
    expect(attributes.maxSize).toBe(200);
  });
});
