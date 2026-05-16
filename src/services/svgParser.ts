import {XMLParser} from 'fast-xml-parser';

import {ParsedSvgData, ParsedSvgElement, SvgShape} from '../types/svgAudio';

const SHAPE_TAGS: SvgShape[] = [
  'circle',
  'rect',
  'ellipse',
  'line',
  'polygon',
  'polyline',
  'path',
];
const DEFAULT_SVG_COLOR = '#8fb8ff';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  parseTagValue: false,
});

function toNumber(value: unknown): number | undefined {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return undefined;
  }

  const normalized = String(value).replace(/px$/, '');
  const num = Number.parseFloat(normalized);
  return Number.isFinite(num) ? num : undefined;
}

function parsePoint(points?: string): [number, number] {
  if (!points) {
    return [0, 0];
  }

  const [firstPoint] = points.trim().split(/\s+/);
  const [x, y] = firstPoint.split(',').map(part => Number.parseFloat(part));

  return [Number.isFinite(x) ? x : 0, Number.isFinite(y) ? y : 0];
}

function estimateSize(shape: SvgShape, attributes: Record<string, unknown>): number {
  switch (shape) {
    case 'circle':
      return toNumber(attributes.r) ?? 10;
    case 'rect':
      return ((toNumber(attributes.width) ?? 20) + (toNumber(attributes.height) ?? 20)) / 2;
    case 'ellipse':
      return ((toNumber(attributes.rx) ?? 15) + (toNumber(attributes.ry) ?? 10)) / 2;
    case 'line': {
      const x1 = toNumber(attributes.x1) ?? 0;
      const y1 = toNumber(attributes.y1) ?? 0;
      const x2 = toNumber(attributes.x2) ?? 20;
      const y2 = toNumber(attributes.y2) ?? 0;

      return Math.max(Math.hypot(x2 - x1, y2 - y1), 1);
    }
    case 'polygon':
    case 'polyline':
    case 'path':
      return 24;
    default:
      return 12;
  }
}

function buildElement(shape: SvgShape, attributes: Record<string, unknown>): ParsedSvgElement {
  const [pointX, pointY] = parsePoint(typeof attributes.points === 'string' ? attributes.points : undefined);

  const x =
    toNumber(attributes.x) ??
    toNumber(attributes.cx) ??
    toNumber(attributes.x1) ??
    pointX;

  const y =
    toNumber(attributes.y) ??
    toNumber(attributes.cy) ??
    toNumber(attributes.y1) ??
    pointY;

  const color =
    (typeof attributes.fill === 'string' && attributes.fill !== 'none' ? attributes.fill : undefined) ??
    (typeof attributes.stroke === 'string' && attributes.stroke !== 'none' ? attributes.stroke : undefined) ??
    DEFAULT_SVG_COLOR;

  return {
    shape,
    color,
    x,
    y,
    size: estimateSize(shape, attributes),
  };
}

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function walkNodes(node: unknown, elements: ParsedSvgElement[]): void {
  if (!node || typeof node !== 'object') {
    return;
  }

  const current = node as Record<string, unknown>;

  for (const shape of SHAPE_TAGS) {
    for (const shapeNode of asArray(current[shape])) {
      if (shapeNode && typeof shapeNode === 'object') {
        elements.push(buildElement(shape, shapeNode as Record<string, unknown>));
      }
    }
  }

  for (const [key, value] of Object.entries(current)) {
    if (key.startsWith('@_') || SHAPE_TAGS.includes(key as SvgShape)) {
      continue;
    }

    for (const nestedNode of asArray(value as Record<string, unknown> | Record<string, unknown>[] | undefined)) {
      walkNodes(nestedNode, elements);
    }
  }
}

export function parseSvg(svg: string): ParsedSvgData {
  const document = parser.parse(svg) as {svg?: Record<string, unknown>};
  const svgRoot = document.svg;

  if (!svgRoot) {
    return {elements: []};
  }

  const elements: ParsedSvgElement[] = [];
  walkNodes(svgRoot, elements);

  return {
    width: toNumber(svgRoot.width),
    height: toNumber(svgRoot.height),
    viewBox: typeof svgRoot.viewBox === 'string' ? svgRoot.viewBox : undefined,
    elements,
  };
}
