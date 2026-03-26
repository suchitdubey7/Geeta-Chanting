"use client";

import { useEffect, useState } from "react";

// 9 May 2026, 19:30 IST = 14:00 UTC
const EVENT_DATE = new Date("2026-05-09T14:00:00Z");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function calcTimeLeft(): TimeLeft {
  const total = EVENT_DATE.getTime() - Date.now();
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  const days    = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { days, hours, minutes, seconds, total };
}

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(calcTimeLeft());
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Don't render on server (avoids hydration mismatch)
  if (!time) return null;

  if (time.total <= 0) {
    return (
      <div className="w-full rounded-2xl bg-gradient-to-br from-[#7A1500] to-[#C8410A] px-4 py-4 text-center shadow-lg">
        <p className="text-yellow-300 font-bold text-lg">🕉️ The chanting has begun!</p>
        <p className="text-orange-200 text-sm mt-0.5">Gita Samarpan is live right now</p>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  const units = [
    { label: "Days",    value: time.days    },
    { label: "Hours",   value: time.hours   },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-[#5A0A05] via-[#7A1500] to-[#8B1A00] px-4 py-4 shadow-lg border border-yellow-800/40">
      {/* Label */}
      <p className="text-center text-yellow-300 text-xs font-bold tracking-widest uppercase mb-3">
        ⏳ Event Starts In
      </p>

      {/* Countdown blocks */}
      <div className="flex justify-center gap-2">
        {units.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center">
            <div className="
              w-16 h-16 flex items-center justify-center
              rounded-xl bg-black/30 border border-yellow-600/50
              shadow-inner
            ">
              <span className="text-yellow-200 font-bold text-2xl tabular-nums leading-none">
                {pad(value)}
              </span>
            </div>
            <span className="text-yellow-500 text-[10px] font-semibold mt-1 tracking-wide uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Event detail */}
      <p className="text-center text-orange-200 text-xs mt-3 font-medium">
        📅 9 May 2026 &nbsp;·&nbsp; 🕖 7:30 PM IST &nbsp;·&nbsp; Chapter 15
      </p>
    </div>
  );
}
