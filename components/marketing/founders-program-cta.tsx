"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

/**
 * CTA do bloco "Parceiros fundadores" da home — aponta para a página
 * dedicada de candidatura (/parceiros-fundadores) em vez do fluxo genérico
 * de anúncio. Espelha o mesmo padrão visual de OwnerCTA.
 */
export function FoundersProgramCTA({
  size = "lg",
  fullWidth = false,
}: {
  size?: "md" | "lg" | "xl";
  fullWidth?: boolean;
}) {
  return (
    <Button
      asChild
      size={size}
      fullWidth={fullWidth}
      className="font-bold shadow-[var(--shadow-primary)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
    >
      <Link
        href="/parceiros-fundadores"
        onClick={() => track("owner_cta_clicked", { mode: "parceiros_fundadores_home_block" })}
      >
        Quero me candidatar
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </Button>
  );
}
