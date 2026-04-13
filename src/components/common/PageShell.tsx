import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageShellProps {
  nav?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function PageShell({ nav, children, className }: PageShellProps) {
  return (
    <main
      id="main-content"
      className={cn(
        "min-h-screen relative overflow-x-hidden text-slate-900 dark:text-white bg-transparent",
        className
      )}
    >
      <div className="relative z-10">
        {nav}
        {children}
      </div>
    </main>
  );
}
