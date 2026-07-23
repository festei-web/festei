"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_CONTACT_URL } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const AVOID_SELECTOR = "[data-fab-avoid]";
const AVOID_MARGIN = 12;

/**
 * Botão flutuante de WhatsApp, presente em todas as páginas (renderizado
 * uma única vez em app/layout.tsx). No mobile mostra só o ícone; a partir
 * de sm/ exibe também o texto "Fale com a Festei". Respeita a área segura
 * inferior de dispositivos com notch/gestos via env(safe-area-inset-*).
 *
 * Páginas com um CTA fixo/sticky próprio no canto inferior direito (ex.:
 * o painel de disponibilidade de /locais/[slug], que usa md:sticky
 * md:top-24) podem marcar esse elemento com o atributo data-fab-avoid.
 * Enquanto ele ocupar o mesmo canto da tela, o botão flutuante recua
 * suavemente para nunca cobrir o CTA — e volta assim que o espaço libera.
 */
export function WhatsappFloatButton() {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const [suppressed, setSuppressed] = React.useState(false);

  React.useEffect(() => {
    function checkOverlap() {
      const button = ref.current;
      if (!button) return;

      const avoidTargets = document.querySelectorAll(AVOID_SELECTOR);
      if (avoidTargets.length === 0) {
        setSuppressed(false);
        return;
      }

      const buttonRect = button.getBoundingClientRect();
      const overlaps = Array.from(avoidTargets).some((target) => {
        const rect = target.getBoundingClientRect();
        return (
          buttonRect.left - AVOID_MARGIN < rect.right &&
          buttonRect.right + AVOID_MARGIN > rect.left &&
          buttonRect.top - AVOID_MARGIN < rect.bottom &&
          buttonRect.bottom + AVOID_MARGIN > rect.top
        );
      });
      setSuppressed(overlaps);
    }

    checkOverlap();
    window.addEventListener("scroll", checkOverlap, { passive: true });
    window.addEventListener("resize", checkOverlap);
    const interval = window.setInterval(checkOverlap, 500);

    return () => {
      window.removeEventListener("scroll", checkOverlap);
      window.removeEventListener("resize", checkOverlap);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={WHATSAPP_CONTACT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale com a Festei pelo WhatsApp (abre em nova aba)"
      aria-hidden={suppressed || undefined}
      tabIndex={suppressed ? -1 : undefined}
      onClick={() => track("owner_whatsapp_clicked", {})}
      className={cn(
        "fixed z-[200] flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-whatsapp text-white shadow-[var(--shadow-lg)] transition-all duration-200 ease-out right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] hover:-translate-y-0.5 hover:bg-whatsapp-hover hover:shadow-xl active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-auto sm:w-auto sm:justify-start sm:rounded-full sm:py-3.5 sm:pl-4 sm:pr-5 sm:right-[max(1.5rem,env(safe-area-inset-right))] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]",
        suppressed && "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <MessageCircle className="h-6 w-6 shrink-0 sm:h-5 sm:w-5" aria-hidden />
      <span className="hidden text-sm font-semibold sm:inline">Fale com a Festei</span>
    </a>
  );
}
