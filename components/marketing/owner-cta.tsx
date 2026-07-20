"use client";

import Link from "next/link";
import { FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

export function OwnerCTA({
  variant = "primary",
  fullWidth = false,
  label = "Quero anunciar meu local",
}: {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  label?: string;
}) {
  return (
    <Button asChild size="lg" variant={variant} fullWidth={fullWidth}>
      <Link href="/anunciar" onClick={() => track("owner_cta_clicked", {})}>
        <FileEdit className="h-4 w-4" aria-hidden />
        {label}
      </Link>
    </Button>
  );
}
