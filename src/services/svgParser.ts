import {SvgAttributes} from '../types/content';

const SHAPES = ['circle', 'rect', 'path', 'ellipse', 'polygon', 'line'];

export function parseSvgAttributes(svgMarkup: string): SvgAttributes {
  const lower = svgMarkup.toLowerCase();
  const colors = Array.from(new Set((svgMarkup.match(/#(?:[0-9a-fA-F]{3}){1,2}/g) || []).map((hex) => hex.toLowerCase())));
  const shapes = SHAPES.filter((shape) => lower.includes(`<${shape}`));
  const sizeMatches = [
    ...(svgMarkup.match(/(?:width|height|r|rx|ry)="(\d+(?:\.\d+)?)"/g) || []).map((entry) =>
      Number(entry.replace(/[^0-9.]/g, ''))
    )
  ].filter((value) => Number.isFinite(value));

  return {
    colors,
    shapes,
    maxSize: sizeMatches.length ? Math.max(...sizeMatches) : 0
  };
}
