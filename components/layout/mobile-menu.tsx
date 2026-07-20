"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/locais", label: "Encontrar locais" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/anunciar", label: "Para proprietários" },
];

/**
 * Menu mobile do cabeçalho (prompt de melhorias, item 4).
 *
 * Requisitos de acessibilidade implementados:
 * - aria-label, aria-expanded e aria-controls no botão de abrir/fechar;
 * - fecha com o próprio botão, com Escape e ao selecionar um link;
 * - foco visível e retorno de foco ao botão após o fechamento;
 * - bloqueio de rolagem da página enquanto o menu está aberto;
 * - áreas de toque de pelo menos 44px.
 */
export function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const panelId = React.useId();

  const close = React.useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-gray-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
      </button>

      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={cn(
          "fixed inset-0 top-16 z-[290] bg-white transition-opacity duration-200",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav className="flex h-full flex-col gap-1 px-4 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-ink transition-colors hover:bg-gray-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              {link.label}
            </Link>
          ))}

          <Button asChild size="lg" className="mt-4" onClick={close}>
            <Link href="/anunciar">Anunciar meu local</Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
