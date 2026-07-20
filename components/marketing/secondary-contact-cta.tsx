"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_CONTACT_URL } from "@/lib/site";
import { track } from "@/lib/analytics";

/**
 * CTA secundário "Falar com a Festei" (prompt de melhorias, item 18).
 * Depende de NEXT_PUBLIC_WHATSAPP_NUMBER estar configurado — se não
 * estiver, o componente não renderiza nada, para nunca expor um canal
 * fictício.
 */
export function SecondaryContactCta({ className }: { className?: string }) {
  if (!WHATSAPP_CONTACT_URL) return null;

  return (
    <Button
      asChild
      variant="secondary"
      size="lg"
      className={className}
    >
      <a
        href={WHATSAPP_CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("owner_whatsapp_clicked", {})}
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        Falar com a Festei
      </a>
    </Button>
  );
}
