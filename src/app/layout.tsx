import type { Metadata, Viewport } from "next";
import {
  Pinyon_Script,
  Alex_Brush,
  Cormorant_Infant,
  Prata,
  Poppins,
  Amiri,
} from "next/font/google";
import "./globals.css";

const pinyon = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
});

const alex = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alex",
  display: "swap",
});

const cormorant = Cormorant_Infant({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const prata = Prata({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-prata",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Wedding of Fandi & Chery — 07.06.2026",
  description:
    "Undangan pernikahan Fandi & Chery, Ahad 7 Juni 2026 di Crystal Ballroom, Sleman, Yogyakarta.",
  openGraph: {
    title: "The Wedding of Fandi & Chery",
    description: "Ahad, 7 Juni 2026 — Crystal Ballroom, Sleman, Yogyakarta",
    images: ["/images/cover-couple.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ddd1c0",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${pinyon.variable} ${alex.variable} ${cormorant.variable} ${prata.variable} ${poppins.variable} ${amiri.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
