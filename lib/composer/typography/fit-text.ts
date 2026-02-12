/**
 * fitTextToBox — auto shrink, max lines, clamp responsive.
 * Prevents layout break with long headlines.
 */

export interface FitTextOptions {
  text: string;
  maxWidth: number;
  maxFontSize: number;
  minFontSize: number;
  maxLines: number;
  fontFamily?: string;
  fontWeight?: string;
}

export interface FitTextResult {
  fontSize: number;
  lines: string[];
  lineHeight: number;
}

/**
 * Measures text width at a given font size using a canvas.
 */
function measureText(
  ctx: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
  fontFamily: string,
  fontWeight: string
): number {
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  return ctx.measureText(text).width;
}

/**
 * Splits text into lines that fit within maxWidth at given fontSize.
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily: string,
  fontWeight: string
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    const w = measureText(ctx, test, fontSize, fontFamily, fontWeight);
    if (w <= maxWidth) {
      current = test;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function fitTextToBox(options: FitTextOptions): FitTextResult {
  const {
    text,
    maxWidth,
    maxFontSize,
    minFontSize,
    maxLines,
    fontFamily = "system-ui, sans-serif",
    fontWeight = "bold",
  } = options;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return {
      fontSize: maxFontSize,
      lines: [text],
      lineHeight: maxFontSize * 1.2,
    };
  }

  let fontSize = maxFontSize;
  let lines: string[] = [];

  while (fontSize >= minFontSize) {
    lines = wrapText(ctx, text, maxWidth, fontSize, fontFamily, fontWeight);
    if (lines.length <= maxLines) break;
    fontSize -= 4;
  }

  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
  }

  return {
    fontSize,
    lines,
    lineHeight: fontSize * 1.2,
  };
}
