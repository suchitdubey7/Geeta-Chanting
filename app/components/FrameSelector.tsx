/**
 * FrameSelector.tsx – Toggle between Hindi and English campaign frames.
 */
"use client";

import Image from "next/image";
import { FrameType } from "@/utils/imageProcessor";

interface FrameSelectorProps {
  selected: FrameType;
  onChange: (frame: FrameType) => void;
}

const FRAMES: { type: FrameType; label: string; sublabel: string }[] = [
  {
    type: "hindi",
    label: "हिंदी",
    sublabel: "मैं सहभागी हूँ",
  },
  {
    type: "english",
    label: "English",
    sublabel: "I'm Participating",
  },
];

export default function FrameSelector({ selected, onChange }: FrameSelectorProps) {
  return (
    <div className="w-full">
      <h2 className="text-center text-orange-800 font-semibold text-sm uppercase tracking-widest mb-3">
        Choose Your Frame
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {FRAMES.map(({ type, label, sublabel }) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`
              relative flex flex-col items-center rounded-2xl border-2 p-3 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-orange-400
              ${selected === type
                ? "border-orange-500 bg-orange-50 shadow-lg scale-[1.03]"
                : "border-orange-200 bg-white hover:border-orange-400 hover:shadow"
              }
            `}
            aria-pressed={selected === type}
          >
            {/* Frame thumbnail */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-orange-100 mb-2 shadow-inner">
              <Image
                src={`/frames/${type}.png`}
                alt={`${label} frame preview`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 40vw, 200px"
              />
            </div>

            {/* Label */}
            <span className={`font-bold text-base ${selected === type ? "text-orange-700" : "text-orange-500"}`}>
              {label}
            </span>
            <span className="text-xs text-gray-500 mt-0.5">{sublabel}</span>

            {/* Selected badge */}
            {selected === type && (
              <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
