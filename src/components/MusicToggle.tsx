"use client";

export default function MusicToggle({
  on,
  onToggle,
}: {
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={on ? "Pause music" : "Play music"}
      className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-black/85 text-white shadow-lg flex items-center justify-center"
      style={{
        right: "calc(max(0px, (100vw - 480px) / 2) + 20px)",
      }}
    >
      <svg
        className={`w-5 h-5 ${on ? "spin-slow" : ""}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M9 18V6l11-2v12.5A2.5 2.5 0 1117.5 14H17V8.4l-7 1.3V19a2.5 2.5 0 11-2.5-2.5H9z" />
      </svg>
    </button>
  );
}
