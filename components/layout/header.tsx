"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

        <Button asChild size="sm">
          <Link href="/anunciar">Anunciar meu local</Link>
        </Button>
      </div>
    </header>
  );
}
