/**
 * UploadBox.tsx – Drag-and-drop + file-picker for user photo upload.
 */
"use client";

import { useCallback, useRef, useState } from "react";

interface UploadBoxProps {
  onImageSelected: (dataUrl: string) => void;
}

export default function UploadBox({ onImageSelected }: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(
    (file: File) => {
      setError(null);
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setError("Please upload a JPG, PNG, or WEBP image.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) onImageSelected(e.target.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center
          border-2 border-dashed rounded-2xl cursor-pointer
          py-10 px-6 transition-all duration-200 select-none
          ${dragging
            ? "border-orange-400 bg-orange-50 scale-[1.01]"
            : "border-orange-300 bg-orange-50/50 hover:bg-orange-50 hover:border-orange-400"
          }
        `}
      >
        {/* Upload icon */}
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-3 shadow-inner">
          <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16l4-4m0 0l4-4m-4 4h12M16 16l-4-4m0 0l-4-4" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 12v9" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5" />
          </svg>
        </div>

        <p className="text-orange-700 font-semibold text-base">
          {dragging ? "Drop your photo here!" : "Upload Your Photo"}
        </p>
        <p className="text-orange-400 text-sm mt-1">Drag & drop, or tap to choose</p>
        <p className="text-gray-400 text-xs mt-1">JPG, PNG, WEBP · Any size</p>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}
