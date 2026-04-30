import Image from "next/image";

export default function OpeningArch() {
  return (
    <section className="relative w-full h-[100dvh] arch-full overflow-hidden reveal">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
        <p className="font-[family-name:var(--font-cormorant)] tracking-[0.32em] text-[13px] text-ink font-medium">
          THE WEDDING OF
        </p>
        <h1 className="font-[family-name:var(--font-pinyon)] text-[64px] leading-[0.95] text-ink mt-2">
          Fandi
        </h1>
        <p className="font-[family-name:var(--font-pinyon)] text-[26px] my-1 text-ink">
          &amp;
        </p>
        <h1 className="font-[family-name:var(--font-pinyon)] text-[64px] leading-[0.95] text-ink mb-3">
          Chery
        </h1>
        <p className="font-[family-name:var(--font-cormorant)] tracking-[0.2em] text-[13px] text-ink font-medium">
          07 . 06 . 2026
        </p>

        <div className="mt-10 w-full max-w-[260px]">
          <Image
            src="/images/bismillah.png"
            alt="Bismillah"
            width={520}
            height={130}
            className="w-full h-auto opacity-90"
          />
        </div>

        <p className="mt-6 text-[12px] leading-relaxed text-ink/85 px-2">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang
          Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.
        </p>
      </div>
    </section>
  );
}
