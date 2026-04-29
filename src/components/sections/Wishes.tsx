"use client";
import { useState } from "react";

type Wish = {
  id: string;
  name: string;
  message: string;
  attendance: "hadir" | "tidak" | "maybe";
  ts: number;
};

const STORAGE_KEY = "fc-wishes";

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Wish[]) : [];
    } catch {
      return [];
    }
  });
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<Wish["attendance"]>("hadir");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Nama minimal 2 karakter.");
      return;
    }
    if (message.trim().length < 2) {
      setError("Ucapan minimal 2 karakter.");
      return;
    }
    setError("");
    const w: Wish = {
      id: crypto.randomUUID(),
      name: name.trim(),
      message: message.trim(),
      attendance,
      ts: Date.now(),
    };
    const next = [w, ...wishes].slice(0, 100);
    setWishes(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    setName("");
    setMessage("");
    setAttendance("hadir");
  };

  const hadirCount = wishes.filter((w) => w.attendance === "hadir").length;
  const tidakCount = wishes.filter((w) => w.attendance === "tidak").length;

  return (
    <section className="bg-sand pb-12 px-5 reveal">
      <div className="text-center mb-4">
        <h2 className="font-[family-name:var(--font-pinyon)] text-[52px] leading-none text-ink">
          Wishes
        </h2>
        <p className="font-[family-name:var(--font-cormorant)] text-[15px] text-ink/85 mt-1">
          Ucapan Selamat &amp; Do&apos;a
        </p>
      </div>

      <div className="bg-[#eef1f6] rounded-2xl p-5 shadow-sm">
        <p className="text-center font-bold text-ink mb-4">
          {wishes.length} Comments
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-md bg-emerald-600 text-white text-center py-3">
            <div className="text-2xl font-bold">{hadirCount}</div>
            <div className="text-[12px]">Hadir</div>
          </div>
          <div className="rounded-md bg-red-600 text-white text-center py-3">
            <div className="text-2xl font-bold">{tidakCount}</div>
            <div className="text-[12px]">Tidak hadir</div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama"
            className="w-full rounded-md bg-white border border-gray-200 px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-taupe/40"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ucapan"
            rows={4}
            className="w-full rounded-md bg-white border border-gray-200 px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-taupe/40 resize-none"
          />
          <select
            value={attendance}
            onChange={(e) =>
              setAttendance(e.target.value as Wish["attendance"])
            }
            className="w-full rounded-md bg-white border border-gray-200 px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-taupe/40"
          >
            <option value="hadir">Hadir</option>
            <option value="maybe">Mungkin</option>
            <option value="tidak">Tidak Hadir</option>
          </select>
          {error && <p className="text-red-600 text-[12px]">{error}</p>}
          <button
            type="submit"
            className="rounded-md bg-taupe text-white px-5 py-2 text-[13px] hover:bg-taupe-dark"
          >
            Kirim
          </button>
          <p className="text-[10px] text-ink/60">
            *Mohon maaf! Khusus untuk tamu undangan
          </p>
        </form>

        {wishes.length > 0 && (
          <ul className="mt-5 space-y-3 max-h-[280px] overflow-y-auto pr-1">
            {wishes.map((w) => (
              <li
                key={w.id}
                className="bg-white rounded-md border border-gray-100 p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[13px] text-ink">{w.name}</p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full text-white ${
                      w.attendance === "hadir"
                        ? "bg-emerald-600"
                        : w.attendance === "tidak"
                          ? "bg-red-600"
                          : "bg-amber-500"
                    }`}
                  >
                    {w.attendance === "hadir"
                      ? "Hadir"
                      : w.attendance === "tidak"
                        ? "Tidak hadir"
                        : "Mungkin"}
                  </span>
                </div>
                <p className="text-[13px] text-ink/85 mt-1 leading-snug">
                  {w.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
