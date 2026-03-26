/**
 * Header.tsx – Top banner showing the event name and branding.
 */
export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-[#8B1A00] via-[#C8410A] to-[#8B1A00] py-4 px-4 shadow-lg">
      <div className="max-w-lg mx-auto text-center">
        {/* Sanskrit / Hindi title */}
        <h1 className="text-yellow-200 font-bold text-xl sm:text-2xl leading-tight tracking-wide drop-shadow">
          🕉️ वैश्विक गीता पाठ कार्यक्रम
        </h1>
        {/* English subtitle */}
        <p className="text-orange-100 text-sm sm:text-base mt-1 tracking-widest font-medium">
          Geeta Chanting Mahotsav
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="h-px w-12 bg-yellow-400 opacity-60" />
          <span className="text-yellow-300 text-xs">Chapter 15 · 8 May</span>
          <span className="h-px w-12 bg-yellow-400 opacity-60" />
        </div>
      </div>
    </header>
  );
}
