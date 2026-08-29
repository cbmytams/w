import type { ReactNode } from "react";

/**
 * Hero title with a masked vertical word carousel (pure CSS, reduced-motion safe).
 */
export function KineticTitle({
  prefix,
}: {
  prefix: [ReactNode, ReactNode];
}) {
  return (
    <h1 className="max-w-[820px] text-[40px] font-extrabold leading-[1.12] tracking-[-0.02em] text-white sm:text-[58px]">
      {prefix[0]}
      <br />
      {prefix[1]}
      <br />
      <span className="orb-kine">
        <span className="orb-kine-col">
          <span className="text-orange-400">les marques.</span>
          <span className="text-violet-400">les talents.</span>
          <span className="text-pink-400">les agences.</span>
          <span className="text-orange-400">les marques.</span>
        </span>
      </span>
    </h1>
  );
}
