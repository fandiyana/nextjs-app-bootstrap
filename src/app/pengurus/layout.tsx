import AppShell from "@/components/AppShell";
import { requireRole } from "@/lib/auth";

export default function PengurusLayout({ children }: { children: React.ReactNode }) {
  const user = requireRole("pengurus");
  return (
    <AppShell
      user={user}
      nav={[
        { href: "/pengurus", label: "Dashboard" },
        { href: "/pengurus/anggota", label: "Anggota" },
        { href: "/pengurus/simpanan", label: "Simpanan" },
        { href: "/pengurus/pinjaman", label: "Pinjaman" },
        { href: "/pengurus/angsuran", label: "Angsuran" },
      ]}
    >
      {children}
    </AppShell>
  );
}
