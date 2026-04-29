import type { Metadata } from "next";
import {
  Poppins,
  Cormorant_Infant,
  Alex_Brush,
  Prata,
  Amiri,
} from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Infant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: ["400"],
});

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  weight: ["400"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Fandi & Chery - Wedding Invitation",
  description:
    "The Wedding of Fandi & Chery - Ahad, 7 Juni 2026",
  openGraph: {
    title: "Fandi & Chery - Wedding Invitation",
    description: "The Wedding of Fandi & Chery - Ahad, 7 Juni 2026",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${cormorant.variable} ${alexBrush.variable} ${prata.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
