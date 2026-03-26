/**
 * Header.tsx – Top banner showing the event name and branding.
 */
export default function Header() {
  return (
    <header className="w-full bg-gradient-to-b from-[#7A1500] via-[#C8410A] to-[#8B1A00] py-4 px-4 shadow-lg">
      <div className="max-w-lg mx-auto text-center">

        {/* Guinness badge */}
        <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full mb-2 shadow">
          🏆 Guinness World Record Attempt
        </div>

        {/* Hindi title */}
        <h1 className="text-yellow-200 font-bold text-xl sm:text-2xl leading-tight tracking-wide drop-shadow">
          🕉️ वैश्विक गीता पाठ कार्यक्रम
        </h1>

        {/* English subtitle */}
        <p className="text-orange-100 text-sm sm:text-base mt-0.5 font-semibold tracking-wide">
          Gita Samarpan – Global Chanting Initiative
        </p>

        {/* Key details row */}
        <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 mt-2">
          <span className="text-yellow-300 text-xs font-medium">📖 Chapter 15</span>
          <span className="text-yellow-500 text-xs">·</span>
          <span className="text-yellow-300 text-xs font-medium">📅 9 May 2026</span>
          <span className="text-yellow-500 text-xs">·</span>
          <span className="text-yellow-300 text-xs font-medium">🕖 7:30 PM IST</span>
        </div>

        {/* Participants count */}
        <p className="text-orange-200 text-xs mt-1.5">
          1,08,000 participants · Free for Indian students
        </p>
      </div>
    </header>
  );
}
