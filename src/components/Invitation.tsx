"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Cover from "./sections/Cover";
import OpeningArch from "./sections/OpeningArch";
import WeFoundLove from "./sections/WeFoundLove";
import BrideGroom from "./sections/BrideGroom";
import SaveTheDate from "./sections/SaveTheDate";
import EventDetails from "./sections/EventDetails";
import LiveStreaming from "./sections/LiveStreaming";
import Doa from "./sections/Doa";
import AdabWalimah from "./sections/AdabWalimah";
import Gallery from "./sections/Gallery";
import LoveStory from "./sections/LoveStory";
import WeddingGift from "./sections/WeddingGift";
import Wishes from "./sections/Wishes";
import Closing from "./sections/Closing";
import MusicToggle from "./MusicToggle";

export default function Invitation() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reveal-on-scroll
  useEffect(() => {
    if (!opened) return;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [opened]);

  const handleOpen = () => {
    setOpened(true);
    // Try to start music
    setTimeout(() => {
      const a = audioRef.current;
      if (a) {
        a.volume = 0.6;
        a.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
      }
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, 50);
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (musicOn) {
      a.pause();
      setMusicOn(false);
    } else {
      a.play().then(() => setMusicOn(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/wedding.mp3"
        loop
        preload="auto"
      />

      {!opened && <Cover onOpen={handleOpen} />}

      {opened && (
        <div className="relative">
          <OpeningArch />
          <WeFoundLove />
          <BrideGroom />
          <SaveTheDate targetDate="2026-06-07T07:00:00+07:00" />
          <EventDetails />
          <LiveStreaming />
          <Doa />
          <AdabWalimah />
          <Gallery />
          <LoveStory />
          <WeddingGift />
          <Wishes />
          <Closing />
          <Footer />
          <MusicToggle on={musicOn} onToggle={toggleMusic} />
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-[#2a2722] text-[#cdbfa9] text-center py-6 text-[11px] tracking-wider">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Image
          src="/images/bismillah.png"
          alt=""
          width={20}
          height={20}
          className="opacity-0"
        />
        <span className="font-[family-name:var(--font-pinyon)] text-2xl text-white">
          F &amp; C
        </span>
      </div>
      <p className="opacity-80">Designed with love by memonika.com</p>
      <p className="opacity-60 mt-1">
        Music: Romantic Piano — royalty-free (Internet Archive)
      </p>
    </footer>
  );
}
