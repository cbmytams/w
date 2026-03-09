import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HighlightProps = {
  children: ReactNode;
  color?: "primary" | "neutral";
  className?: string;
};

export function Highlight({ children, color = "primary", className }: HighlightProps) {
  return (
    <span
      className={cn(
        "inline-block",
        color === "primary" ? "text-blue-600" : "text-slate-900",
        className
      )}
    >
      {children}
    </span>
  );
}
