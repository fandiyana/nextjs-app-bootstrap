export default function EventDetails() {
  return (
    <section className="bg-sand pb-12 px-5 reveal">
      <EventCard
        title="Akad Nikah"
        date="Ahad, 7 Juni 2026"
        time="07.00 - 08.00 WIB"
        venue="Crystal Ballroom"
        address="Jl. Jambon, Kragilan, Sinduadi, Mlati, Sleman, Daerah Istimewa Yogyakarta"
        note="Dress Code acara Akad warna Putih"
      />
      <div className="h-6" />
      <EventCard
        title="Resepsi"
        date="Ahad, 7 Juni 2026"
        time="10.00 - 12.00 WIB"
        venue="Crystal Ballroom"
        address="Jl. Jambon, Kragilan, Sinduadi, Mlati, Sleman, Daerah Istimewa Yogyakarta"
      />
    </section>
  );
}

function EventCard({
  title,
  date,
  time,
  venue,
  address,
  note,
}: {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  note?: string;
}) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    venue + " " + address,
  )}`;
  return (
    <div className="arch-card rounded-[28px] py-10 px-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <HeartIcon className="w-7 h-7 mx-auto text-taupe" />
      <h3 className="font-[family-name:var(--font-pinyon)] text-[44px] leading-none text-ink mt-3">
        {title}
      </h3>
      <p className="mt-5 font-[family-name:var(--font-cormorant)] text-[15px] text-ink/90">
        Insya Allah akan dilaksanakan pada:
      </p>
      <p className="font-[family-name:var(--font-cormorant)] font-bold text-[18px] text-ink mt-1">
        {date}
      </p>
      <p className="font-[family-name:var(--font-cormorant)] text-[14px] text-ink mt-1">
        {time}
      </p>

      <PinIcon className="w-6 h-6 mx-auto text-taupe mt-6" />
      <p className="font-[family-name:var(--font-cormorant)] font-bold text-[18px] text-ink mt-2">
        {venue}
      </p>
      <p className="font-[family-name:var(--font-cormorant)] text-[14px] text-ink/90 mt-1 leading-snug px-3">
        {address}
      </p>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-taupe text-white px-5 py-2 text-[12px] hover:bg-taupe-dark transition"
      >
        <MapIcon className="w-4 h-4" /> Google Maps
      </a>

      {note && (
        <div className="mt-5 text-[14px] text-ink/90">
          <p className="font-bold">Note:</p>
          <p className="font-[family-name:var(--font-cormorant)]">{note}</p>
        </div>
      )}
    </div>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-7.5-4.6-9.5-9.4C1 7.5 4.5 4 8 4c1.7 0 3.2.8 4 2 .8-1.2 2.3-2 4-2 3.5 0 7 3.5 5.5 7.6C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2c-4 0-7 3-7 7 0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M9 3l-6 3v15l6-3 6 3 6-3V3l-6 3-6-3z" />
      <path d="M9 3v15M15 6v15" />
    </svg>
  );
}
