import Link from "next/link";
import { sitePaths } from "@/lib/site";

export function WikiBand() {
  return (
    <div className="mt-9 flex max-w-[600px] items-center justify-between gap-4 rounded-full border border-white/10 bg-[#1c1c1e]/35 py-4 pl-6 pr-4 backdrop-blur-xl">
      <div>
        <p className="mb-0.5 text-[9px] uppercase tracking-[0.24em] text-white/45">
          Ressource libre
        </p>
        <p className="text-[14.5px] font-bold text-white">
          Le Wiki de l&apos;influence
        </p>
      </div>
      <Link
        href={sitePaths.wiki}
        className="orb-shimmer-btn relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-full border border-white/10 bg-white/5 px-5 py-3 text-[13px] font-semibold text-white transition-colors duration-300 hover:border-white/25 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span
          aria-hidden="true"
          className="inline-block h-3 w-[15px] rounded-[2px_4px_4px_2px] border-[1.5px] border-current"
          style={{ borderRadius: "2px 4px 4px 2px" }}
        />
        Ouvrir
        <span aria-hidden="true" className="orb-nudge-arrow not-italic">
          →
        </span>
      </Link>
    </div>
  );
}
