export default function AdabWalimah() {
  const items = [
    {
      title: "Datang Tepat Waktu",
      desc: "Mohon hadir sesuai jadwal acara yang tertera pada undangan.",
    },
    {
      title: "Menjaga Adab",
      desc: "Senantiasa menjaga sopan santun selama acara berlangsung.",
    },
    {
      title: "Mendoakan",
      desc: "Mohon kesediaannya memanjatkan doa terbaik untuk kedua mempelai.",
    },
  ];
  return (
    <section className="bg-sand pb-12 px-5 reveal">
      <div className="arch-card rounded-[28px] py-10 px-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <h3 className="font-[family-name:var(--font-pinyon)] text-[40px] leading-none text-ink">
          Adab Walimah
        </h3>
        <ul className="mt-6 space-y-4 text-left">
          {items.map((it, i) => (
            <li
              key={i}
              className="bg-white/55 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/70"
            >
              <p className="font-[family-name:var(--font-cormorant)] font-bold text-[16px] text-ink">
                {i + 1}. {it.title}
              </p>
              <p className="font-[family-name:var(--font-cormorant)] text-[14px] text-ink/85 mt-1 leading-snug">
                {it.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
