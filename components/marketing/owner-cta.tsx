"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

export function OwnerCTA({
  variant = "primary",
  size = "lg",
  fullWidth = false,
  label = "Quero anunciar meu espaço",
}: {
  variant?: "primary" | "secondary";
  size?: "md" | "lg" | "xl";
  fullWidth?: boolean;
  label?: string;
}) {
  return (
    <Button
      asChild
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      className="font-bold shadow-[var(--shadow-primary)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
    >
      <Link href="/anunciar" onClick={() => track("owner_cta_clicked", {})}>
        <Check className="h-4 w-4" aria-hidden />
        {label}
      </Link>
    </Button>
  );
}
