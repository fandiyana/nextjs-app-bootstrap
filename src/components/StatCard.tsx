export default function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "brand" | "amber" | "rose";
}) {
  const ring =
    tone === "brand"
      ? "border-brand/30 bg-brand/5"
      : tone === "amber"
        ? "border-amber-200 bg-amber-50"
        : tone === "rose"
          ? "border-rose-200 bg-rose-50"
          : "border-slate-200 bg-white";
  return (
    <div className={`card ${ring}`}>
      <div className="card-body">
        <div className="text-sm text-slate-600">{label}</div>
        <div className="mt-1 text-2xl font-semibold text-slate-900">{value}</div>
        {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
      </div>
    </div>
  );
}
