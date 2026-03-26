/**
 * imageProcessor.ts
 * Client-side canvas utility for compositing a user photo with a campaign frame.
 * All processing happens in the browser – zero server calls required.
 */

export type FrameType = "hindi" | "english";

/** Canvas output size (square, Instagram-DP friendly) */
const OUTPUT_SIZE = 1080;

/**
 * Loads an image from a URL (or data-URL) and returns an HTMLImageElement.
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Composites the user photo with the selected frame and returns a PNG data-URL.
 *
 * Steps:
 * 1. Draw user photo centred & cropped to fill the OUTPUT_SIZE square.
 * 2. Draw the transparent-centre frame on top.
 */
export async function compositeImage(
  photoDataUrl: string,
  frameType: FrameType
): Promise<string> {
  const [photo, frame] = await Promise.all([
    loadImage(photoDataUrl),
    loadImage(`/frames/${frameType}.png`),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;
  const ctx = canvas.getContext("2d")!;

  // ── 1. Draw photo (cover / centre-crop) ────────────────────────────────
  const scale = Math.max(OUTPUT_SIZE / photo.width, OUTPUT_SIZE / photo.height);
  const sw = OUTPUT_SIZE / scale;
  const sh = OUTPUT_SIZE / scale;
  const sx = (photo.width - sw) / 2;
  const sy = (photo.height - sh) / 2;

  ctx.drawImage(photo, sx, sy, sw, sh, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

  // ── 2. Overlay frame PNG (must have transparent centre) ─────────────────
  ctx.drawImage(frame, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

  return canvas.toDataURL("image/png");
}

/**
 * Triggers a browser download of the composited image.
 */
export function downloadImage(dataUrl: string, filename = "geeta-frame.png"): void {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

/**
 * Converts a data-URL blob to a sharable object URL.
 * Returns null if the Blob API is unavailable (SSR guard).
 */
export async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl);
  return res.blob();
}
