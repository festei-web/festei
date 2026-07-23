"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_OWNER_URL } from "@/lib/site";
import { track } from "@/lib/analytics";

/**
 * CTA secundário "Falar com a Festei" (prompt de melhorias, item 18).
 */
export function SecondaryContactCta({ className }: { className?: string }) {
  return (
    <Button
      asChild
      variant="secondary"
      size="lg"
      className={className}
    >
      <a
        href={WHATSAPP_OWNER_URL}
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
