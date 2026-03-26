/**
 * PreviewCanvas.tsx – Shows the composited result (photo + frame).
 * Triggers recomposition whenever the photo or frame changes.
 */
"use client";

import { useEffect, useState } from "react";
import { compositeImage, FrameType } from "@/utils/imageProcessor";

interface PreviewCanvasProps {
  photoDataUrl: string;
  frameType: FrameType;
  onComposited: (dataUrl: string) => void;
}

export default function PreviewCanvas({
  photoDataUrl,
  frameType,
  onComposited,
}: PreviewCanvasProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setPreview(null);

    compositeImage(photoDataUrl, frameType)
      .then((dataUrl) => {
        if (!cancelled) {
          setPreview(dataUrl);
          onComposited(dataUrl);
        }
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [photoDataUrl, frameType, onComposited]);

  return (
    <div className="w-full">
      <h2 className="text-center text-orange-800 font-semibold text-sm uppercase tracking-widest mb-3">
        Preview
      </h2>
      <div className="relative aspect-square w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-xl bg-orange-50">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-orange-50 z-10">
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin" />
            <p className="mt-3 text-orange-500 text-sm font-medium">Creating your frame…</p>
          </div>
        )}

        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Composited preview"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
