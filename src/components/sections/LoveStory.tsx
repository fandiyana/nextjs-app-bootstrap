import Image from "next/image";

export default function LoveStory() {
  return (
    <section className="bg-sand pb-12 px-5 reveal">
      <div className="arch-card rounded-[28px] py-10 px-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <h2 className="text-center font-[family-name:var(--font-pinyon)] text-[44px] leading-none text-ink">
          Love Story
        </h2>

        <div className="mt-6 relative overflow-hidden rounded-[20px] aspect-[3/4]">
          <Image
            src="/images/love-story.jpg"
            alt="Love story"
            fill
            sizes="(max-width: 480px) 100vw, 480px"
            className="object-cover"
          />
        </div>

        <Story
          title="AWAL BERTEMU"
          body="Tidak ada yang kebetulan di dunia ini. Pertemuan kami dimulai dari sebuah momen sederhana yang tanpa disadari menjadi awal dari perjalanan yang indah. Dari sapaan singkat, obrolan hangat, hingga tumbuhnya rasa nyaman, kami perlahan saling mengenal. Waktu mengajarkan kami bahwa cinta hadir bukan karena kesempurnaan, melainkan karena dua hati yang saling menerima."
        />
        <Story
          title="KOMITMEN"
          body="Setelah melewati berbagai cerita, tawa, dan doa yang kami panjatkan bersama, kami semakin yakin bahwa kami adalah rumah bagi satu sama lain. Dengan restu keluarga dan penuh rasa syukur, kami melangkah ke tahap yang lebih serius. Dalam sebuah momen yang penuh haru dan bahagia, kami mengikat komitmen untuk melangkah bersama menuju masa depan."
        />
        <Story
          title="MENIKAH"
          body="Kini, dengan cinta yang telah tumbuh dan keyakinan yang semakin kuat, kami memutuskan untuk menyempurnakan perjalanan ini dalam ikatan suci pernikahan. Kami percaya, cinta bukan hanya tentang menemukan seseorang untuk dicintai, tetapi juga tentang memilih orang yang sama setiap hari. Semoga langkah kami selalu dipenuhi cinta, keberkahan, dan kebahagiaan sepanjang hayat."
        />
      </div>
    </section>
  );
}

function Story({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-6">
      <h3 className="font-[family-name:var(--font-cormorant)] font-bold tracking-wide text-[22px] text-ink">
        {title}
      </h3>
      <p className="mt-2 font-[family-name:var(--font-cormorant)] text-[15px] text-ink/90 leading-relaxed text-justify">
        {body}
      </p>
    </div>
  );
}
