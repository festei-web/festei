"use client";

import Link from "next/link";
import { FileEdit, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

/**
 * Exceção documentada à regra de "um único CTA por seção" (Design System,
 * Cap. 5, seção 5.3; Brand Book, Cap. 6, seção 6.10; PRD, Cap. 13, seção 13.11).
 *
 * Os dois botões abaixo DEVEM manter o mesmo peso visual entre si — nenhum é
 * "principal" e o outro "secundário". Isso existe para não afastar o
 * proprietário cético (persona "Seu Roberto", PRD Cap. 3, seção 3.9), que só
 * confia em cadastrar seu local depois de uma conversa humana.
 */
export function OwnerDualCTA({ stacked = false }: { stacked?: boolean }) {
  return (
    <div
      className={
        stacked
          ? "flex flex-col gap-3"
          : "flex flex-col gap-3 sm:flex-row sm:gap-4"
      }
    >
      <Button asChild size="lg" variant="primary" className="flex-1">
        <Link
          href="/anunciar?modo=cadastro"
          onClick={() => track("owner_cta_clicked", { mode: "cadastro" })}
        >
          <FileEdit className="h-4 w-4" aria-hidden />
          Cadastrar meu local
        </Link>
      </Button>
      <Button asChild size="lg" variant="primary" className="flex-1">
        <Link
          href="/anunciar?modo=ligacao"
          onClick={() => track("owner_cta_clicked", { mode: "ligacao" })}
        >
          <PhoneCall className="h-4 w-4" aria-hidden />
          Prefiro que me liguem
        </Link>
      </Button>
    </div>
  );
}
