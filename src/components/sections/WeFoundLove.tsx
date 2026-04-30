import Image from "next/image";

export default function WeFoundLove() {
  return (
    <section className="bg-sand py-12 px-5 reveal">
      <div className="arch-card rounded-[28px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="px-5 pt-5">
          <div className="overflow-hidden rounded-[18px] aspect-[3/4] relative">
            <Image
              src="/images/we-found-love.jpg"
              alt="Fandi & Chery"
              fill
              sizes="(max-width: 480px) 100vw, 480px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="px-6 py-8 text-center">
          <h2 className="font-[family-name:var(--font-pinyon)] text-[44px] leading-none text-ink">
            We Found Love
          </h2>

          <p className="mt-6 font-[family-name:var(--font-cormorant)] text-[15px] leading-relaxed text-ink/90">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia
            menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar
            kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di
            antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu
            benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang
            berpikir.&rdquo;
          </p>
          <p className="mt-4 font-[family-name:var(--font-cormorant)] font-semibold text-ink">
            - QS. Ar-Rum : 21 -
          </p>
        </div>
      </div>
    </section>
  );
}
