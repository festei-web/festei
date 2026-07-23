"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { track } from "@/lib/analytics";

export function AboutFinalCtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] bg-primary px-6 py-16 text-center text-white sm:px-12 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.16)_0%,transparent_60%)]"
            aria-hidden
          />
          <h2 className="relative mx-auto max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
            Faça parte da nova forma de encontrar locais para eventos.
          </h2>
          <div className="relative mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="flex-1 bg-white text-primary shadow-[var(--shadow-lg)] hover:bg-white/90"
            >
              <Link href="/locais">Encontrar um local</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="flex-1 border-white bg-transparent text-white hover:bg-white/10"
            >
              <Link
                href="/anunciar"
                onClick={() => track("owner_cta_clicked", { mode: "sobre_final_cta" })}
              >
                Anunciar meu local
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
