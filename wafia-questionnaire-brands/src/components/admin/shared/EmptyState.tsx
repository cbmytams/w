import type { LucideIcon } from "lucide-react";
import { cn } from "../../../utils/cn";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  variant?: "default" | "minimal";
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  variant = "default",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        variant === "default" ? "py-12 px-6" : "py-6 px-4",
        className
      )}
    >
      <div
        className={cn(
          "rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4",
          variant === "default" ? "w-16 h-16" : "w-12 h-12"
        )}
      >
        <Icon
          className={cn(
            "text-zinc-600",
            variant === "default" ? "w-8 h-8" : "w-6 h-6"
          )}
        />
      </div>

      <h3
        className={cn(
          "font-bold text-white mb-2",
          variant === "default" ? "text-lg" : "text-base"
        )}
      >
        {title}
      </h3>

      <p
        className={cn(
          "text-zinc-500 max-w-sm",
          variant === "default" ? "text-sm" : "text-xs"
        )}
      >
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
