"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
}) {
  const variants = {
    default: "bg-brand-800 text-white",
    secondary: "bg-slate-100 text-slate-700",
    destructive: "bg-red-100 text-red-700",
    outline: "border border-slate-200 bg-white text-slate-700",
    ghost: "text-slate-700",
    link: "text-brand-700 underline underline-offset-4",
  };

  return (
    <span
      data-slot="badge"
      className={cn("inline-flex h-5 items-center justify-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap", variants[variant], className)}
      {...props}
    />
  );
}

export { Badge };
