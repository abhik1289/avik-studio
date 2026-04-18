import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm text-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset] transition-[border-color,box-shadow,background-color] outline-none placeholder:text-muted-foreground/90 focus-visible:border-primary/70 focus-visible:ring-4 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background/40",
        className
      )}
      {...props}
    />
  );
}

export { Input };
