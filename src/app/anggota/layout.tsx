import AppShell from "@/components/AppShell";
import { requireRole } from "@/lib/auth";

export default function AnggotaLayout({ children }: { children: React.ReactNode }) {
  const user = requireRole("anggota");
  return (
    <AppShell
      user={user}
      nav={[
        { href: "/anggota", label: "Dashboard" },
        { href: "/anggota/simpanan", label: "Simpanan" },
        { href: "/anggota/pinjaman", label: "Pinjaman" },
      ]}
    >
      {children}
    </AppShell>
  );
}
