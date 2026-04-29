"use client";
import { useState } from "react";

const accounts = [
  {
    bank: "Bank BCA",
    holder: "Chery Afrenza",
    number: "0292256858",
  },
  {
    bank: "Bank BRI",
    holder: "Danu Fandiyana",
    number: "010001129886507",
  },
];

const address =
  "Sidorejo RT 005 RW 021, Caturharjo, Sleman, Sleman, Daerah Istimewa Yogyakarta";

export default function WeddingGift() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (txt: string, key: string) => {
    try {
      await navigator.clipboard.writeText(txt);
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    } catch {}
  };

  return (
    <section className="bg-sand pb-12 px-5 reveal">
      <div className="arch-card rounded-[28px] py-10 px-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-taupe/30">
        <GiftIcon className="w-10 h-10 mx-auto text-ink" />
        <h3 className="font-[family-name:var(--font-pinyon)] text-[44px] leading-none text-ink mt-2">
          Wedding Gift
        </h3>
        <p className="mt-5 font-[family-name:var(--font-cormorant)] text-[15px] text-ink/90 px-2 leading-relaxed">
          Doa restu anda merupakan karunia yang sangat berarti bagi kami. Namun
          jika memberi adalah ungkapan tanda kasih, kami akan senang hati
          menerimanya yang tentu akan semakin melengkapi kebahagiaan kami.
        </p>
        <button
          onClick={() => setOpen((o) => !o)}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-taupe text-white px-6 py-2.5 text-[12px] hover:bg-taupe-dark transition"
        >
          {open ? "Tutup" : "Lihat Rekening"}
          <ArrowIcon className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="mt-6 space-y-3">
            {accounts.map((a) => (
              <div
                key={a.number}
                className="bg-white/70 rounded-xl border border-white/80 p-4 text-left"
              >
                <p className="font-[family-name:var(--font-cormorant)] font-bold text-[15px] text-ink">
                  {a.bank}
                </p>
                <p className="text-[12px] text-ink/80 mt-0.5">a.n {a.holder}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-mono text-[15px] tracking-wider text-ink">
                    {a.number}
                  </p>
                  <button
                    onClick={() => copy(a.number, a.number)}
                    className="text-[11px] rounded-full bg-taupe text-white px-3 py-1 hover:bg-taupe-dark"
                  >
                    {copied === a.number ? "Tersalin" : "Salin"}
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-white/70 rounded-xl border border-white/80 p-4 text-left">
              <p className="font-[family-name:var(--font-cormorant)] font-bold text-[15px] text-ink">
                Kirim Kado
              </p>
              <p className="text-[13px] text-ink/85 mt-1 leading-snug">
                {address}
              </p>
              <button
                onClick={() => copy(address, "addr")}
                className="mt-2 text-[11px] rounded-full bg-taupe text-white px-3 py-1 hover:bg-taupe-dark"
              >
                {copied === "addr" ? "Tersalin" : "Salin Alamat"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function GiftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3" y="9" width="18" height="11" rx="1" />
      <path d="M3 13h18M12 9v11" />
      <path d="M12 9c-2 0-4-1.5-4-3.5S10 3 12 6c2-3 4-3 4-.5S14 9 12 9z" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12h6M13 9l3 3-3 3" />
    </svg>
  );
}
