"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/locais", label: "Explorar" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/anunciar", label: "Proprietários" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-[300] w-full transition-all duration-200",
        scrolled
          ? "bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-white/0 backdrop-blur-0"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-200 sm:px-6 lg:px-10",
          scrolled ? "h-16" : "h-20"
        )}
      >
        <Link href="/" aria-label="Festei, página inicial">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="secondary" size="sm">
            <Link href="/anunciar">Anunciar Local</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/locais">Encontrar Locais</Link>
          </Button>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-lg text-ink md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-white px-4 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-gray-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Button asChild variant="secondary" fullWidth onClick={closeMobileMenu}>
              <Link href="/anunciar">Anunciar Local</Link>
            </Button>
            <Button asChild fullWidth onClick={closeMobileMenu}>
              <Link href="/locais">Encontrar Locais</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
