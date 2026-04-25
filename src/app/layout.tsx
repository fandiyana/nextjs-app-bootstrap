import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koperasi Simpan Pinjam",
  description: "Aplikasi koperasi simpan pinjam untuk anggota dan pengurus.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
