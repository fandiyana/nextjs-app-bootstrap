"use client";
import Image from "next/image";
import { useState } from "react";

const photos = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
  "/images/gallery5.jpg",
  "/images/gallery6.jpg",
];

export default function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="bg-sand py-12 px-5 reveal">
      <h2 className="text-center font-[family-name:var(--font-pinyon)] text-[48px] leading-none text-ink mb-6">
        Our Gallery
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {photos.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpen(src)}
            className="relative aspect-[3/4] overflow-hidden rounded-md bg-white/40 active:scale-95 transition"
          >
            <Image
              src={src}
              alt={`Galeri ${i + 1}`}
              fill
              sizes="240px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <Image
            src={open}
            alt=""
            width={900}
            height={1200}
            className="max-h-[90vh] w-auto h-auto object-contain rounded-md"
          />
        </div>
      )}
    </section>
  );
}
