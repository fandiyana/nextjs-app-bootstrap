"use client";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function Cover(props: { onOpen: () => void }) {
  return (
    <Suspense fallback={<CoverInner {...props} recipient="" />}>
      <CoverWithSearch {...props} />
    </Suspense>
  );
}

function CoverWithSearch({ onOpen }: { onOpen: () => void }) {
  const sp = useSearchParams();
  const recipient = sp.get("to") || sp.get("kepada") || "";
  return <CoverInner onOpen={onOpen} recipient={recipient} />;
}

function CoverInner({
  onOpen,
  recipient,
}: {
  onOpen: () => void;
  recipient: string;
}) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  const click = () => {
    setLeaving(true);
    setTimeout(onOpen, 600);
  };

  return (
    <section
      className={`relative w-full h-[100dvh] overflow-hidden arch-full ${leaving ? "cover-leave" : ""}`}
    >
      {/* Floral arch is provided by .arch-card background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        <div className="mt-4">
          <p className="font-[family-name:var(--font-cormorant)] tracking-[0.32em] text-[14px] text-ink mb-4 font-medium">
            THE WEDDING OF
          </p>
          <h1 className="font-[family-name:var(--font-pinyon)] text-[76px] leading-[0.95] text-ink">
            Fandi
          </h1>
          <p className="font-[family-name:var(--font-pinyon)] text-[32px] leading-none my-1 text-ink">
            &amp;
          </p>
          <h1 className="font-[family-name:var(--font-pinyon)] text-[76px] leading-[0.95] text-ink mb-4">
            Chery
          </h1>
          <p className="font-[family-name:var(--font-cormorant)] tracking-[0.2em] text-[15px] text-ink font-medium">
            07 . 06 . 2026
          </p>
        </div>

        <div className="mt-8 text-[13px] text-ink">
          <p className="font-medium">Kepada Yth.</p>
          <p className="font-medium">Bapak/Ibu/Saudara/i</p>
          {recipient && (
            <p className="mt-2 font-[family-name:var(--font-cormorant)] text-xl text-ink">
              {recipient}
            </p>
          )}
        </div>

        <button
          onClick={click}
          aria-label="Buka Undangan"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-taupe text-white px-7 py-3 text-[12px] tracking-[0.18em] shadow-md active:translate-y-[1px] hover:bg-taupe-dark transition-all"
        >
          <EnvelopeIcon className="w-4 h-4" />
          BUKA UNDANGAN
        </button>
      </div>

      {/* Music spinning hint - hidden until opened */}
      <Image
        src="/images/cover-couple.jpg"
        alt=""
        width={1}
        height={1}
        className="hidden"
        priority
      />
    </section>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
