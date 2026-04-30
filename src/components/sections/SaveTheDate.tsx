"use client";
import { useEffect, useState } from "react";

export default function SaveTheDate({ targetDate }: { targetDate: string }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setT({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <section className="bg-sand pb-12 px-5 reveal">
      <div className="arch-card rounded-[28px] py-12 px-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <h2 className="font-[family-name:var(--font-pinyon)] text-[46px] leading-none text-ink">
          Save The Date
        </h2>

        <div className="grid grid-cols-2 gap-3 mt-8 max-w-[260px] mx-auto">
          <Cell value={t.d} label="Days" />
          <Cell value={t.h} label="Hours" />
          <Cell value={t.m} label="Minutes" />
          <Cell value={t.s} label="Seconds" />
        </div>

        <a
          href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Fandi+%26+Chery&dates=20260607T000000Z/20260607T050000Z&details=Akad+%26+Resepsi+Fandi+dan+Chery&location=Crystal+Ballroom%2C+Sleman%2C+Yogyakarta"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-taupe text-taupe-dark bg-white/70 px-4 py-2 text-[12px] hover:bg-white transition"
        >
          <CalIcon className="w-4 h-4" /> Save to Calendar
        </a>
      </div>
    </section>
  );
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-taupe/85 text-white rounded-md py-4 shadow-sm">
      <div className="font-[family-name:var(--font-prata)] text-[34px] leading-none">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-[11px] tracking-wide mt-1 opacity-95">{label}</div>
    </div>
  );
}

function CalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}
