import Image from "next/image";

export default function BrideGroom() {
  return (
    <section className="bg-sand pb-12 px-5 reveal">
      <div className="arch-card rounded-[28px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="text-center pt-12 px-6">
          <RingsIcon className="w-14 h-14 mx-auto text-ink" />
          <h2 className="font-[family-name:var(--font-pinyon)] text-[46px] leading-tight text-ink mt-4">
            We Are
            <br />
            Getting Married!
          </h2>
          <p className="mt-5 font-[family-name:var(--font-cormorant)] text-[15px] leading-relaxed text-ink/90">
            Maha Suci Allah yang telah menciptakan makhluk-Nya
            berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi
            pernikahan kami:
          </p>
        </div>

        <Person
          name="Fandi"
          fullName="Danu Fandiyana"
          parents={
            <>
              Putra Pertama dari
              <br />
              Bapak Mardiyono
              <br />
              &amp; Ibu Widayati
            </>
          }
          ig="faanndi"
          photo="/images/fandi.jpg"
        />

        <div className="text-center font-[family-name:var(--font-prata)] text-[40px] my-2 text-ink">
          &amp;
        </div>

        <Person
          name="Chery"
          fullName="Chery Afrenza, S.Ak."
          parents={
            <>
              Putri Pertama dari
              <br />
              Bapak Rustan Barid (Alm)
              <br />
              &amp; Ibu Supriyanti
            </>
          }
          ig="crenzafr"
          photo="/images/chery.jpg"
        />
      </div>
    </section>
  );
}

function Person({
  name,
  fullName,
  parents,
  ig,
  photo,
}: {
  name: string;
  fullName: string;
  parents: React.ReactNode;
  ig: string;
  photo: string;
}) {
  return (
    <div className="px-6 pt-8 pb-2 text-center">
      <div className="mx-auto w-[180px] h-[230px] relative rounded-t-[120px] rounded-b-[24px] overflow-hidden ring-4 ring-white/70 shadow-md">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="220px"
          className="object-cover"
        />
      </div>
      <h3 className="font-[family-name:var(--font-pinyon)] text-[52px] leading-none text-ink mt-6">
        {name}
      </h3>
      <p className="font-[family-name:var(--font-cormorant)] font-bold text-[20px] mt-3 text-ink">
        {fullName}
      </p>
      <p className="font-[family-name:var(--font-cormorant)] text-[15px] mt-3 text-ink/90 leading-snug">
        {parents}
      </p>
      <a
        href={`https://instagram.com/${ig}`}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-taupe text-white px-5 py-2 text-[12px] tracking-wide hover:bg-taupe-dark transition-colors"
      >
        <IgIcon className="w-4 h-4" />
        {ig}
      </a>
    </div>
  );
}

function RingsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 17l4-6 4 6" />
      <path d="M35 17l4-6 4 6" />
      <circle cx="25" cy="38" r="14" />
      <circle cx="40" cy="42" r="14" />
    </svg>
  );
}

function IgIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
