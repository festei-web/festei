"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { FOUNDER_SPOTS_FILLED, FOUNDER_SPOTS_TOTAL } from "@/data/founders";

/**
 * Hero da página /parceiros-fundadores.
 *
 * PLACEHOLDER DE IMAGEM: reaproveita a foto de um local com piscina já
 * usada em data/venues.ts (mesma origem Unsplash liberada em
 * next.config.ts). Trocar por um ensaio fotográfico próprio da Festei
 * (arquitetura, piscina, luz de fim de tarde) assim que houver acervo —
 * mesmo padrão de aviso usado em owner-section.tsx.
 */
export function FoundersHero() {
  const percent = Math.round((FOUNDER_SPOTS_FILLED / FOUNDER_SPOTS_TOTAL) * 100);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <SafeImage
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/10" />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 md:min-h-[76vh] lg:px-10">
        <div className="max-w-2xl">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-coral-border bg-coral-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-coral-hover">
            Parceiros Fundadores · Vagas limitadas
          </span>

          <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl">
            Faça parte dos 50 Parceiros Fundadores da Festei
          </h1>

          <p className="mt-5 max-w-xl text-base text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] sm:text-lg">
            Estamos selecionando os primeiros proprietários que irão
            construir conosco um novo padrão para o mercado de locação de
            espaços para eventos.
          </p>

          <div className="mt-9 flex flex-col gap-7 sm:flex-row sm:items-center sm:gap-8">
            <Button
              asChild
              size="xl"
              className="shadow-[var(--shadow-primary)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
            >
              <Link
                href="#candidatura"
                onClick={() => track("owner_cta_clicked", { mode: "parceiros_fundadores_hero" })}
              >
                Quero me candidatar
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>

            <div className="w-full max-w-[240px]">
              <div
                role="progressbar"
                aria-valuenow={FOUNDER_SPOTS_FILLED}
                aria-valuemin={0}
                aria-valuemax={FOUNDER_SPOTS_TOTAL}
                aria-label="Vagas preenchidas no programa Parceiros Fundadores"
                className="h-1.5 w-full overflow-hidden rounded-full bg-white/25"
              >
                <div
                  className="h-full rounded-full bg-coral transition-[width] duration-500 ease-out"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-white/90">
                {FOUNDER_SPOTS_FILLED} de {FOUNDER_SPOTS_TOTAL} vagas preenchidas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
