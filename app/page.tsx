/**
 * page.tsx – Main single-page application.
 * Orchestrates: Upload → Frame Selection → Preview → Download / Share
 */
"use client";

import { useState, useCallback } from "react";
import Header from "@/app/components/Header";
import UploadBox from "@/app/components/UploadBox";
import FrameSelector from "@/app/components/FrameSelector";
import PreviewCanvas from "@/app/components/PreviewCanvas";
import ActionButtons from "@/app/components/ActionButtons";
import { FrameType } from "@/utils/imageProcessor";

// ── Step type ─────────────────────────────────────────────────────────────────
type Step = "upload" | "frame" | "preview";

export default function HomePage() {
  const [step, setStep] = useState<Step>("upload");
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [frameType, setFrameType] = useState<FrameType>("hindi");
  const [composited, setComposited] = useState<string | null>(null);

  // When a photo is selected, advance to the frame-selection step
  const handleImageSelected = useCallback((dataUrl: string) => {
    setPhotoDataUrl(dataUrl);
    setComposited(null);
    setStep("frame");
  }, []);

  // When frame changes, reset composited so preview re-renders
  const handleFrameChange = useCallback((f: FrameType) => {
    setFrameType(f);
    setComposited(null);
  }, []);

  const handleGoToPreview = () => setStep("preview");

  const handleReset = () => {
    setPhotoDataUrl(null);
    setComposited(null);
    setStep("upload");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8E7]">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <Header />

      {/* ── Main content ───────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-lg mx-auto px-4 py-6 space-y-6">

        {/* ── Step indicator ─────────────────────────────────────────── */}
        <StepIndicator current={step} />

        {/* ══ STEP 1: Upload ══════════════════════════════════════════ */}
        {step === "upload" && (
          <section className="animate-fade-in space-y-4">
            <SectionTitle
              emoji="📸"
              title="Upload Your Photo"
              subtitle="Select or drag your best photo"
            />
            <UploadBox onImageSelected={handleImageSelected} />

            {/* Tips */}
            <div className="rounded-xl bg-orange-50 border border-orange-200 px-4 py-3 text-sm text-orange-700 space-y-1">
              <p className="font-semibold">💡 Tips for best results</p>
              <p>• Use a square or portrait photo</p>
              <p>• Ensure your face is centred</p>
              <p>• Good lighting makes a big difference</p>
            </div>
          </section>
        )}

        {/* ══ STEP 2: Frame Selection ══════════════════════════════════ */}
        {step === "frame" && (
          <section className="animate-fade-in space-y-4">
            <SectionTitle
              emoji="🖼️"
              title="Choose Your Frame"
              subtitle="Pick Hindi or English campaign frame"
            />

            {/* Uploaded photo thumb */}
            {photoDataUrl && (
              <div className="flex items-center gap-3 bg-white rounded-2xl p-3 border border-orange-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoDataUrl}
                  alt="Your uploaded photo"
                  className="w-14 h-14 rounded-xl object-cover shadow"
                />
                <div>
                  <p className="text-sm font-semibold text-orange-800">Photo uploaded ✓</p>
                  <button
                    onClick={handleReset}
                    className="text-xs text-orange-400 hover:text-orange-600 underline mt-0.5"
                  >
                    Change photo
                  </button>
                </div>
              </div>
            )}

            <FrameSelector selected={frameType} onChange={handleFrameChange} />

            <button
              onClick={handleGoToPreview}
              className="
                w-full bg-gradient-to-r from-orange-600 to-orange-500
                hover:from-orange-700 hover:to-orange-600
                active:scale-95 transition-all duration-150
                text-white font-bold text-base py-3.5 rounded-2xl shadow-lg
              "
            >
              Generate Preview →
            </button>
          </section>
        )}

        {/* ══ STEP 3: Preview + Download ═══════════════════════════════ */}
        {step === "preview" && photoDataUrl && (
          <section className="animate-fade-in space-y-5">
            <SectionTitle
              emoji="✨"
              title="Your Campaign Frame"
              subtitle="Download or share with the world 🙏"
            />

            <div className="animate-float">
              <PreviewCanvas
                photoDataUrl={photoDataUrl}
                frameType={frameType}
                onComposited={setComposited}
              />
            </div>

            <ActionButtons compositedDataUrl={composited} />

            {/* Back / change frame */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep("frame")}
                className="flex-1 py-3 rounded-2xl border-2 border-orange-300 text-orange-600 font-semibold text-sm hover:bg-orange-50 transition-colors"
              >
                ← Change Frame
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Start Over
              </button>
            </div>
          </section>
        )}

      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="text-center py-4 text-xs text-orange-400 border-t border-orange-100">
        🕉️ वैश्विक गीता पाठ कार्यक्रम · Chapter 15 · 8 May
      </footer>
    </div>
  );
}

// ─── Helper components ────────────────────────────────────────────────────────

function SectionTitle({
  emoji,
  title,
  subtitle,
}: {
  emoji: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center">
      <div className="text-3xl mb-1">{emoji}</div>
      <h2 className="text-orange-800 font-bold text-lg">{title}</h2>
      <p className="text-orange-500 text-sm">{subtitle}</p>
    </div>
  );
}

function StepIndicator({ current }: { current: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "upload", label: "Upload" },
    { key: "frame", label: "Frame" },
    { key: "preview", label: "Preview" },
  ];
  const idx = steps.findIndex((s) => s.key === current);

  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <div
            className={`
              flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border-2 transition-all
              ${i <= idx
                ? "bg-orange-500 border-orange-500 text-white"
                : "bg-white border-orange-200 text-orange-300"
              }
            `}
          >
            {i < idx ? "✓" : i + 1}
          </div>
          <span
            className={`mx-1 text-xs font-medium ${
              i <= idx ? "text-orange-600" : "text-orange-300"
            }`}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 mx-1 rounded ${
                i < idx ? "bg-orange-400" : "bg-orange-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
