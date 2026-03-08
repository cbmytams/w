export function TopBar() {
  return (
    <div className="sticky top-0 z-20 -mx-6 lg:-mx-12 px-6 lg:px-12 backdrop-blur-xl bg-white/70 dark:bg-black/30 border-b border-black/10 dark:border-white/10">
      <div className="app-container flex items-center justify-between gap-4 py-6">
        <div>
          <div className="text-sm text-soft uppercase tracking-[0.4em]">Workspace</div>
          <div className="text-2xl font-semibold">Wafia</div>
        </div>
        <div className="flex items-center gap-3">
        <div className="rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2 text-xs text-muted">
          Dernier sync : 2h
        </div>
          <div className="rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-xs font-semibold">
            Ajouter un talent
          </div>
        </div>
      </div>
    </div>
  );
}
