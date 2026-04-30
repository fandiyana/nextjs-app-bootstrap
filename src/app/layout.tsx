import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Amiri:wght@400;700&family=Cormorant+Infant:wght@400;500;600;700&family=Pinyon+Script&family=Poppins:wght@300;400;500;600;700&family=Prata&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
