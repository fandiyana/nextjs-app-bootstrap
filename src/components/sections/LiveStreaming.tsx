export default function LiveStreaming() {
  return (
    <section className="bg-sand pb-12 px-5 reveal">
      <div className="arch-card rounded-[28px] py-10 px-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <YoutubeIcon className="w-9 h-9 mx-auto text-taupe" />
        <h3 className="font-[family-name:var(--font-pinyon)] text-[44px] leading-none text-ink mt-3">
          Live Streaming
        </h3>
        <p className="mt-4 font-[family-name:var(--font-cormorant)] text-[15px] text-ink/90 px-2">
          Temui kami secara virtual untuk menyaksikan acara pernikahan kami
          melalui tautan di bawah ini:
        </p>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-taupe text-white px-6 py-2.5 text-[12px] hover:bg-taupe-dark transition"
        >
          <YoutubeIcon className="w-4 h-4" /> Tonton Live
        </a>
      </div>
    </section>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.6 7.2a3 3 0 00-2.1-2.1C17.7 4.7 12 4.7 12 4.7s-5.7 0-7.5.4A3 3 0 002.4 7.2 31 31 0 002 12a31 31 0 00.4 4.8 3 3 0 002.1 2.1c1.8.4 7.5.4 7.5.4s5.7 0 7.5-.4a3 3 0 002.1-2.1c.3-1.6.4-3.2.4-4.8a31 31 0 00-.4-4.8zM10 15V9l5 3-5 3z" />
    </svg>
  );
}
