export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0b111a] text-white/60"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Chargement</span>
      <div className="h-7 w-7 animate-spin rounded-full border border-white/25 border-t-white/80" />
    </div>
  );
}
