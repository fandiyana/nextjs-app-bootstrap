import Image from "next/image";

export default function Closing() {
  return (
    <section className="bg-sand pb-12 px-5 reveal">
      <div className="arch-card rounded-[28px] py-12 px-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <h3 className="font-[family-name:var(--font-pinyon)] text-[44px] leading-none text-ink">
          Terima Kasih
        </h3>

        <div className="mx-auto mt-6 w-[180px] h-[230px] relative rounded-t-[120px] rounded-b-[24px] overflow-hidden ring-4 ring-white/70 shadow-md">
          <Image
            src="/images/thanks.jpg"
            alt="Fandi & Chery"
            fill
            sizes="220px"
            className="object-cover"
          />
        </div>

        <p className="mt-6 font-[family-name:var(--font-cormorant)] text-[15px] text-ink/90 leading-relaxed">
          Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila
          Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan doa restu kepada
          kami.
        </p>

        <p className="mt-6 text-[12px] tracking-[0.32em] font-bold text-ink">
          KAMI YANG BERBAHAGIA,
        </p>
        <p className="mt-3 font-[family-name:var(--font-pinyon)] text-[44px] leading-none text-ink">
          Fandi &amp; Chery
        </p>
      </div>
    </section>
  );
}
