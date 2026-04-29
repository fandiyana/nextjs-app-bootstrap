"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";

export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [coverHidden, setCoverHidden] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [formData, setFormData] = useState({ name: "", message: "", attendance: "" });
  const [wishes, setWishes] = useState<Array<{ name: string; message: string; attendance: string }>>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const weddingDate = useMemo(() => new Date("2026-06-07T07:00:00+07:00"), []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  const handleOpenInvitation = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => setCoverHidden(true), 800);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  const copyToClipboard = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(label);
      setTimeout(() => setCopySuccess(""), 2000);
    }).catch(() => {});
  }, []);

  const handleSubmitWish = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.message) {
      setWishes((prev) => [{ ...formData }, ...prev]);
      setFormData({ name: "", message: "", attendance: "" });
    }
  }, [formData]);

  const saveToCalendar = useCallback(() => {
    const event = {
      title: "Pernikahan Fandi & Chery",
      start: "20260607T000000Z",
      end: "20260607T050000Z",
      location: "Crystal Ballroom, Jl. Jambon, Kragilan, Sinduadi, Mlati, Sleman, DIY",
    };
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&location=${encodeURIComponent(event.location)}`;
    window.open(url, "_blank");
  }, []);

  return (
    <main className="relative w-full h-screen flex">
      {/* Audio */}
      <audio ref={audioRef} loop preload="auto">
        <source src="https://by.memonika.com/wp-content/uploads/2025/12/Lagu-Pernikahan-Kita-Tiara-Andini-Arsy-Widianto-Piano-Karaoke-by-Andre-Panggabean.mp3" type="audio/mpeg" />
      </audio>

      {/* LEFT PANEL - Hero Photo (hidden on mobile) */}
      <div className="hidden lg:block lg:w-[60%] h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-couple.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-16 left-0 right-0 text-center text-white z-10">
          <p className="font-alex text-3xl mb-2 opacity-90">The Wedding of</p>
          <h1 className="font-prata text-4xl font-bold tracking-wider uppercase">
            FANDI & CHERY
          </h1>
          <p className="mt-3 text-sm tracking-widest opacity-90 font-cormorant">
            Ahad, 7 Juni 2026
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - Scrollable Content */}
      <div
        ref={scrollRef}
        className={`w-full lg:w-[40%] h-screen relative ${coverHidden ? "overflow-y-auto invitation-scroll" : "overflow-hidden"}`}
      >
        {/* COVER SECTION */}
        {!coverHidden && (
          <div
            className={`absolute inset-0 z-50 flex flex-col items-center justify-center text-center ${isOpen ? "cover-slide-up" : ""}`}
            style={{
              backgroundImage: "url(/images/panel-3.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Top floral */}
            <div className="absolute top-0 right-0 w-48 opacity-80">
              <Image src="/images/bunga-ivory-kanan.png" alt="Floral" width={300} height={400} className="w-full" />
            </div>
            <div className="absolute top-0 left-0 w-48 opacity-80 scale-x-[-1]">
              <Image src="/images/bunga-ivory-kanan.png" alt="Floral" width={300} height={400} className="w-full" />
            </div>

            {/* Bottom floral */}
            <div className="absolute bottom-0 right-0 w-48 opacity-80 rotate-180">
              <Image src="/images/bunga-ivory-kanan.png" alt="Floral" width={300} height={400} className="w-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-48 opacity-80 rotate-180 scale-x-[-1]">
              <Image src="/images/bunga-ivory-kanan.png" alt="Floral" width={300} height={400} className="w-full" />
            </div>

            {/* Cover content */}
            <div className="relative z-10 px-8">
              <p className="text-[#a0875e] text-xs tracking-[0.3em] uppercase mb-6 font-cormorant font-semibold">
                THE WEDDING OF
              </p>
              <h2 className="font-alex text-6xl text-[#3a3a3a] mb-2">Fandi</h2>
              <p className="font-alex text-4xl text-[#a0875e] my-1">&</p>
              <h2 className="font-alex text-6xl text-[#3a3a3a] mb-6">Chery</h2>
              <p className="text-[#a0875e] text-sm tracking-[0.2em] font-cormorant">
                07 . 06 . 2026
              </p>

              <div className="mt-10">
                <p className="text-[#666] text-xs mb-1 font-cormorant">Kepada Yth.</p>
                <p className="text-[#666] text-xs mb-6 font-cormorant">Bapak/Ibu/Saudara/i</p>
                <button onClick={handleOpenInvitation} className="btn-gold text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757ZM16 11.801V4.697l-5.803 3.546L16 11.801Z" />
                  </svg>
                  BUKA UNDANGAN
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INVITATION CONTENT */}
        <div className="bg-[#fdf8f0]">

          {/* Section: We Found Love */}
          <section
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-16"
            style={{
              backgroundImage: "url(/images/panel-2.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute top-0 right-0 w-40 opacity-70">
              <Image src="/images/bunga-ivory-kanan.png" alt="" width={300} height={400} className="w-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-40 opacity-70 rotate-180">
              <Image src="/images/bunga-ivory-kanan.png" alt="" width={300} height={400} className="w-full" />
            </div>

            <div className="relative z-10 max-w-sm mx-auto">
              {/* Couple photo */}
              <div className="w-64 h-80 mx-auto mb-8 rounded-2xl overflow-hidden shadow-lg rotate-[-3deg]">
                <Image
                  src="/images/we-found-love.jpg"
                  alt="Fandi & Chery"
                  width={683}
                  height={1024}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="font-alex text-4xl text-[#3a3a3a] mb-6">We Found Love</h2>

              <p className="text-[#555] text-xs leading-relaxed mb-6 px-4">
                &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
                pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan
                merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan
                sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda
                (kebesaran Allah) bagi kaum yang berpikir.&rdquo;
              </p>
              <p className="text-[#a0875e] text-sm font-cormorant font-semibold">
                - QS. Ar-Rum : 21 -
              </p>
            </div>
          </section>

          {/* Section: We Are Getting Married */}
          <section
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-16"
            style={{
              backgroundImage: "url(/images/panel-3.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute top-0 right-0 w-36 opacity-60">
              <Image src="/images/bunga-ivory-kanan.png" alt="" width={300} height={400} className="w-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-36 opacity-60 rotate-180">
              <Image src="/images/bunga-ivory-kanan.png" alt="" width={300} height={400} className="w-full" />
            </div>

            <div className="relative z-10 max-w-sm mx-auto">
              {/* Rings icon */}
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="1.5" className="mx-auto">
                  <circle cx="9" cy="12" r="5" />
                  <circle cx="15" cy="12" r="5" />
                </svg>
              </div>

              <h2 className="font-alex text-3xl text-[#3a3a3a] mb-1">We Are</h2>
              <h2 className="font-alex text-4xl text-[#3a3a3a] mb-6">Getting Married!</h2>

              <p className="text-[#555] text-xs leading-relaxed mb-10 px-2">
                Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan.
                Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami:
              </p>

              {/* Groom */}
              <div className="mb-10">
                <div className="oval-frame mx-auto mb-4">
                  <Image
                    src="/images/groom-portrait.jpg"
                    alt="Fandi"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-alex text-4xl text-[#3a3a3a] mb-2">Fandi</h3>
                <p className="text-[#555] text-sm font-semibold">Danu Fandiyana</p>
                <p className="text-[#888] text-xs mt-1">
                  Putra Pertama dari Bapak Mardiyono & Ibu Widayati
                </p>
                <a
                  href="https://instagram.com/crenzafr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#a0875e] text-xs mt-2 hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  crenzafr
                </a>
              </div>

              {/* Ampersand */}
              <p className="font-alex text-5xl text-[#a0875e] my-4">&</p>

              {/* Bride */}
              <div className="mb-6">
                <div className="oval-frame mx-auto mb-4">
                  <Image
                    src="/images/gallery-7.jpg"
                    alt="Chery"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-alex text-4xl text-[#3a3a3a] mb-2">Chery</h3>
                <p className="text-[#555] text-sm font-semibold">Chery Afrenza, S.Ak.</p>
                <p className="text-[#888] text-xs mt-1">
                  Putri Pertama dari Bapak Rustan Barid (Alm) & Ibu Supriyanti
                </p>
              </div>
            </div>
          </section>

          {/* Section: Save The Date */}
          <section
            className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-16"
            style={{
              backgroundImage: "url(/images/panel-2.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute top-0 right-0 w-40 opacity-60">
              <Image src="/images/bunga-ivory-kanan.png" alt="" width={300} height={400} className="w-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-40 opacity-60 rotate-180">
              <Image src="/images/bunga-ivory-kanan.png" alt="" width={300} height={400} className="w-full" />
            </div>

            <div className="relative z-10">
              <h2 className="font-alex text-4xl text-[#3a3a3a] mb-8">Save The Date</h2>

              <div className="grid grid-cols-2 gap-3 mb-8 max-w-xs mx-auto">
                <div className="countdown-box">
                  <div className="number">{countdown.days}</div>
                  <div className="label">Days</div>
                </div>
                <div className="countdown-box">
                  <div className="number">{countdown.hours}</div>
                  <div className="label">Hours</div>
                </div>
                <div className="countdown-box">
                  <div className="number">{countdown.minutes}</div>
                  <div className="label">Minutes</div>
                </div>
                <div className="countdown-box">
                  <div className="number">{countdown.seconds}</div>
                  <div className="label">Seconds</div>
                </div>
              </div>

              <button onClick={saveToCalendar} className="btn-outline text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Save to Calendar
              </button>
            </div>
          </section>

          {/* Section: Event Details */}
          <section className="relative px-6 py-16 bg-[#fdf8f0]">
            <div className="max-w-sm mx-auto text-center">
              <p className="text-[#555] text-xs leading-relaxed mb-10">
                Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i,
                untuk menghadiri acara pernikahan kami:
              </p>

              {/* Akad Nikah */}
              <div
                className="relative rounded-3xl overflow-hidden mb-8 p-8"
                style={{
                  backgroundImage: "url(/images/panel-3.jpg)",
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute top-0 right-0 w-28 opacity-50">
                  <Image src="/images/bunga-ivory-kanan.png" alt="" width={200} height={300} className="w-full" />
                </div>
                <div className="absolute bottom-0 left-0 w-28 opacity-50 rotate-180">
                  <Image src="/images/bunga-ivory-kanan.png" alt="" width={200} height={300} className="w-full" />
                </div>

                <div className="relative z-10">
                  <h3 className="font-alex text-3xl text-[#3a3a3a] mb-2">Akad Nikah</h3>
                  <p className="text-[#888] text-xs mb-4">Insya Allah akan dilaksanakan pada:</p>

                  <div className="bg-white/60 rounded-xl p-5 mb-3">
                    <p className="font-cormorant font-bold text-[#3a3a3a] text-lg">Ahad, 7 Juni 2026</p>
                    <p className="text-[#a0875e] text-sm mt-1">07.00 - 08.00 WIB</p>
                  </div>

                  <div className="bg-white/60 rounded-xl p-5 mb-3">
                    <p className="font-cormorant font-bold text-[#3a3a3a] text-base">Crystal Ballroom</p>
                    <p className="text-[#888] text-xs mt-1 leading-relaxed">
                      Jl. Jambon, Kragilan, Sinduadi, Mlati, Sleman, Daerah Istimewa Yogyakarta
                    </p>
                  </div>

                  <div className="bg-[#a0875e]/10 rounded-xl p-4">
                    <p className="text-[#a0875e] text-xs font-semibold">Note:</p>
                    <p className="text-[#888] text-xs">Dress Code acara Akad warna Putih</p>
                  </div>
                </div>
              </div>

              {/* Resepsi */}
              <div
                className="relative rounded-3xl overflow-hidden p-8"
                style={{
                  backgroundImage: "url(/images/panel-3.jpg)",
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute top-0 right-0 w-28 opacity-50">
                  <Image src="/images/bunga-ivory-kanan.png" alt="" width={200} height={300} className="w-full" />
                </div>
                <div className="absolute bottom-0 left-0 w-28 opacity-50 rotate-180">
                  <Image src="/images/bunga-ivory-kanan.png" alt="" width={200} height={300} className="w-full" />
                </div>

                <div className="relative z-10">
                  <h3 className="font-alex text-3xl text-[#3a3a3a] mb-2">Resepsi</h3>
                  <p className="text-[#888] text-xs mb-4">Insya Allah akan dilaksanakan pada:</p>

                  <div className="bg-white/60 rounded-xl p-5 mb-3">
                    <p className="font-cormorant font-bold text-[#3a3a3a] text-lg">Ahad, 7 Juni 2026</p>
                    <p className="text-[#a0875e] text-sm mt-1">10.00 - 12.00 WIB</p>
                  </div>

                  <div className="bg-white/60 rounded-xl p-5">
                    <p className="font-cormorant font-bold text-[#3a3a3a] text-base">Crystal Ballroom</p>
                    <p className="text-[#888] text-xs mt-1 leading-relaxed">
                      Jl. Jambon, Kragilan, Sinduadi, Mlati, Sleman, Daerah Istimewa Yogyakarta
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Doa Pengantin */}
          <section
            className="relative px-6 py-16 text-center"
            style={{
              backgroundImage: "url(/images/panel-2.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="max-w-sm mx-auto">
              <Image
                src="/images/bismillah.png"
                alt="Bismillah"
                width={400}
                height={100}
                className="w-48 mx-auto mb-6 opacity-60"
              />

              <h2 className="font-alex text-3xl text-[#3a3a3a] mb-6">Doa Pengantin</h2>

              <p className="font-amiri text-2xl text-[#3a3a3a] leading-loose mb-4 direction-rtl" dir="rtl">
                بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِى خَيْرٍ
              </p>

              <p className="text-[#555] text-xs leading-relaxed mb-3 px-4">
                &ldquo;Semoga Allah memberkahimu dan memberkahi apa yang menjadi tanggung jawabmu,
                serta menyatukan kalian berdua dalam kebaikan.&rdquo;
              </p>
              <p className="text-[#a0875e] text-xs font-cormorant">(HR. Abu Dawud no. 2130)</p>
            </div>
          </section>

          {/* Section: Our Gallery */}
          <section className="relative px-6 py-16 bg-[#fdf8f0]">
            <div className="max-w-sm mx-auto text-center">
              <h2 className="font-alex text-4xl text-[#3a3a3a] mb-8">Our Gallery</h2>

              <div className="gallery-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={`/images/gallery-${i}.jpg`}
                      alt={`Gallery ${i}`}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Love Story */}
          <section
            className="relative px-6 py-16 text-left"
            style={{
              backgroundImage: "url(/images/panel-2.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="max-w-sm mx-auto">
              <h2 className="font-alex text-4xl text-[#3a3a3a] mb-10 text-center">Love Story</h2>

              <div>
                {/* Awal Bertemu */}
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <h4 className="font-cormorant font-bold text-[#3a3a3a] text-lg mb-2">Awal Bertemu</h4>
                  <p className="text-[#555] text-xs leading-relaxed">
                    Tidak ada yang kebetulan di dunia ini. Pertemuan kami dimulai dari sebuah momen
                    sederhana yang tanpa disadari menjadi awal dari perjalanan yang indah. Dari
                    sapaan singkat, obrolan hangat, hingga tumbuhnya rasa nyaman, kami perlahan
                    saling mengenal. Waktu mengajarkan kami bahwa cinta hadir bukan karena
                    kesempurnaan, melainkan karena dua hati yang saling menerima.
                  </p>
                </div>

                {/* Komitmen */}
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <h4 className="font-cormorant font-bold text-[#3a3a3a] text-lg mb-2">Komitmen</h4>
                  <p className="text-[#555] text-xs leading-relaxed">
                    Setelah melewati berbagai cerita, tawa, dan doa yang kami panjatkan bersama,
                    kami semakin yakin bahwa kami adalah rumah bagi satu sama lain. Dengan restu
                    keluarga dan penuh rasa syukur, kami melangkah ke tahap yang lebih serius.
                    Dalam sebuah momen yang penuh haru dan bahagia, kami mengikat komitmen untuk
                    melangkah bersama menuju masa depan.
                  </p>
                </div>

                {/* Menikah */}
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <h4 className="font-cormorant font-bold text-[#3a3a3a] text-lg mb-2">Menikah</h4>
                  <p className="text-[#555] text-xs leading-relaxed">
                    Kini, dengan cinta yang telah tumbuh dan keyakinan yang semakin kuat, kami
                    memutuskan untuk menyempurnakan perjalanan ini dalam ikatan suci pernikahan.
                    Kami percaya, cinta bukan hanya tentang menemukan seseorang untuk dicintai,
                    tetapi juga tentang memilih orang yang sama setiap hari. Semoga langkah kami
                    selalu dipenuhi cinta, keberkahan, dan kebahagiaan sepanjang hayat.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Wedding Gift */}
          <section className="relative px-6 py-16 bg-[#fdf8f0]">
            <div className="max-w-sm mx-auto text-center">
              <h2 className="font-alex text-4xl text-[#3a3a3a] mb-4">Wedding Gift</h2>
              <p className="text-[#555] text-xs leading-relaxed mb-8 px-4">
                Doa restu anda merupakan karunia yang sangat berarti bagi kami. Namun jika
                memberi adalah ungkapan tanda kasih, kami akan senang hati menerimanya yang
                tentu akan semakin melengkapi kebahagiaan kami.
              </p>

              <button
                onClick={() => setShowGiftModal(true)}
                className="btn-gold text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                Lihat Rekening
              </button>
            </div>
          </section>

          {/* Gift Modal */}
          {showGiftModal && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4" onClick={() => setShowGiftModal(false)}>
              <div className="bg-white rounded-2xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-cormorant font-bold text-lg text-[#3a3a3a]">Wedding Gift</h3>
                  <button onClick={() => setShowGiftModal(false)} className="text-[#999] hover:text-[#333] text-xl">&times;</button>
                </div>

                {/* BCA */}
                <div className="bank-card mb-4">
                  <p className="text-[#3a3a3a] text-sm font-semibold mb-1">Bank BCA</p>
                  <p className="text-[#888] text-xs mb-3">No. Rekening a.n Chery Afrenza</p>
                  <p className="font-prata text-xl text-[#3a3a3a] mb-3">0292256858</p>
                  <button
                    onClick={() => copyToClipboard("0292256858", "bca")}
                    className={`btn-outline text-xs ${copySuccess === "bca" ? "copy-success" : ""}`}
                  >
                    {copySuccess === "bca" ? "Tersalin!" : "Copy Nomor Rekening"}
                  </button>
                </div>

                {/* BRI */}
                <div className="bank-card mb-4">
                  <p className="text-[#3a3a3a] text-sm font-semibold mb-1">Bank BRI</p>
                  <p className="text-[#888] text-xs mb-3">No. Rekening a.n Danu Fandiyana</p>
                  <p className="font-prata text-xl text-[#3a3a3a] mb-3">010001129886507</p>
                  <button
                    onClick={() => copyToClipboard("010001129886507", "bri")}
                    className={`btn-outline text-xs ${copySuccess === "bri" ? "copy-success" : ""}`}
                  >
                    {copySuccess === "bri" ? "Tersalin!" : "Copy Nomor Rekening"}
                  </button>
                </div>

                {/* Address */}
                <div className="bank-card">
                  <p className="text-[#3a3a3a] text-sm font-semibold mb-1">Kirim Kado:</p>
                  <p className="text-[#888] text-xs mb-3 leading-relaxed">
                    Sidorejo RT 005 RW 021, Caturharjo, Sleman, Sleman, Daerah Istimewa Yogyakarta
                  </p>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        "Sidorejo RT 005 RW 021, Caturharjo, Sleman, Sleman, Daerah Istimewa Yogyakarta",
                        "address"
                      )
                    }
                    className={`btn-outline text-xs ${copySuccess === "address" ? "copy-success" : ""}`}
                  >
                    {copySuccess === "address" ? "Tersalin!" : "Copy Alamat"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section: RSVP & Wishes */}
          <section
            className="relative px-6 py-16"
            style={{
              backgroundImage: "url(/images/panel-2.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="max-w-sm mx-auto text-center">
              <h2 className="font-alex text-4xl text-[#3a3a3a] mb-2">Wishes</h2>
              <p className="text-[#555] text-xs mb-8">Ucapan Selamat & Do&apos;a</p>

              <form onSubmit={handleSubmitWish} className="text-left space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="Nama"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="wedding-input"
                  required
                  minLength={2}
                />
                <textarea
                  placeholder="Ucapan & Doa"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="wedding-textarea"
                  required
                  minLength={2}
                />
                <select
                  value={formData.attendance}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="wedding-select"
                >
                  <option value="">Konfirmasi Kehadiran</option>
                  <option value="hadir">Hadir</option>
                  <option value="tidak">Tidak Hadir</option>
                </select>
                <button type="submit" className="btn-gold w-full justify-center text-sm">
                  Kirim Ucapan
                </button>
              </form>

              {/* Wishes list */}
              {wishes.length > 0 && (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {wishes.map((wish, idx) => (
                    <div key={idx} className="bg-white/80 rounded-xl p-4 text-left">
                      <p className="font-semibold text-sm text-[#3a3a3a]">{wish.name}</p>
                      {wish.attendance && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${wish.attendance === "hadir" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                          {wish.attendance === "hadir" ? "Hadir" : "Tidak Hadir"}
                        </span>
                      )}
                      <p className="text-[#555] text-xs mt-2">{wish.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Section: Closing */}
          <section
            className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-16"
            style={{
              backgroundImage: "url(/images/panel-3.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute top-0 right-0 w-40 opacity-60">
              <Image src="/images/bunga-ivory-kanan.png" alt="" width={300} height={400} className="w-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-40 opacity-60 rotate-180">
              <Image src="/images/bunga-ivory-kanan.png" alt="" width={300} height={400} className="w-full" />
            </div>

            <div className="relative z-10 max-w-sm mx-auto">
              <p className="text-[#555] text-xs leading-relaxed mb-6 px-4">
                Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila
                Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan doa restu kepada kami
              </p>

              <p className="text-[#888] text-xs mb-4 font-cormorant">Kami Yang Berbahagia,</p>

              <h2 className="font-alex text-5xl text-[#3a3a3a] mb-1">Fandi</h2>
              <p className="font-alex text-3xl text-[#a0875e] my-2">&</p>
              <h2 className="font-alex text-5xl text-[#3a3a3a] mb-8">Chery</h2>

              <div className="w-16 h-px bg-[#a0875e] mx-auto mb-6" />

              <Image
                src="/images/ir-flower.png"
                alt="Flower"
                width={200}
                height={200}
                className="w-24 mx-auto opacity-60"
              />
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-[#3a3a3a] text-center py-6 px-4">
            <p className="text-white/50 text-[10px]">
              Designed with love by: memonika.com
            </p>
            <p className="text-white/30 text-[9px] mt-1">
              Music by: Lagu Pernikahan Kita - Tiara Andini, Arsy Widianto Piano Karaoke by Andre Panggabean
            </p>
          </footer>

          {/* Bottom Nav Bar */}
          <div
            className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-[#eee] py-3 px-4 flex items-center justify-center gap-2 z-40"
          >
            <p className="font-alex text-lg text-[#3a3a3a]">The Wedding of</p>
            <p className="font-prata text-sm text-[#a0875e] ml-1">Fandi & Chery</p>
            <p className="text-[#999] text-[10px] ml-2">Ahad, 7 Juni 2026</p>
          </div>
        </div>
      </div>

      {/* Music Button */}
      {coverHidden && (
        <button onClick={toggleMusic} className={`music-btn ${isPlaying ? "playing" : ""}`}>
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
        </button>
      )}
    </main>
  );
}
