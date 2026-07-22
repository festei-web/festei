"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { SearchBar } from "./search-bar";
import { track } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Foto de celebração real como pano de fundo, não um local vazio —
          decisão explícita para diferenciar da estética "imóvel" do Airbnb.
          Texto branco direto sobre a foto (referência enviada por Rafael);
          overlay escuro moderado + text-shadow garantem legibilidade sem
          esconder a foto atrás de um painel. */}
      <div className="absolute inset-0">
        <SafeImage
          src="/images/hero-celebration.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-ink/70" />
      </div>

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-10">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/90 px-4 py-1.5 text-xs font-medium text-ink/70 backdrop-blur">
          Cada festa merece o cenário certo
        </span>

        <h1 className="max-w-3xl text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-6xl md:text-[68px]">
          Sua festa começa encontrando o lugar certo.
        </h1>

        <p className="mt-6 max-w-xl text-base text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] sm:text-lg">
          Casas, sítios e salões para aniversários, casamentos,
          confraternizações e muito mais.
        </p>

        <div className="mt-10 w-full max-w-3xl">
          <SearchBar />
        </div>

        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
          <span className="text-sm text-white/80">Tem um espaço para festas?</span>
          <Link
            href="/anunciar"
            onClick={() => track("owner_cta_clicked", { mode: "hero" })}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            Quero anunciar meu espaço
          </Link>
        </div>
      </div>
    </section>
  );
}
