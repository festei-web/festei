"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

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
      className={cn(
        "font-bold shadow-[var(--shadow-primary)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]",
        // O texto "Quero ser Parceiro Fundador" é mais longo que o CTA
        // anterior — em telas muito estreitas (~320px) o tamanho "xl"
        // padrão (text-lg px-8) estourava a largura do botão. Ajuste
        // discreto só abaixo do breakpoint sm; a partir de sm (≥640px,
        // já cobre a maioria dos celulares) volta ao texto/espaçamento
        // originais do tamanho xl.
        size === "xl" && "px-5 text-base sm:px-8 sm:text-lg"
      )}
    >
      <Link
        href="/parceiros-fundadores"
        onClick={() => track("owner_cta_clicked", { mode: "parceiros_fundadores_home_block" })}
      >
        Quero ser Parceiro Fundador
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </Button>
  );
}
