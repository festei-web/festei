"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { Check } from "lucide-react";
import { OwnerCTA } from "./owner-cta";
import { Reveal } from "@/components/ui/reveal";
import { track } from "@/lib/analytics";

// Benefícios realistas — nada de renda garantida, agenda cheia ou
// proteção contra danos (prompt de melhorias, item 6).
const benefits = [
  "Página organizada com fotos e informações",
  "Solicitações com os dados da festa",
  "Controle sobre disponibilidade e valores",
  "Liberdade para aceitar ou recusar",
];

export function OwnerSection() {
  return (
    <section className="bg-primary py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-10">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wide text-white/80">
            Para proprietários
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Transforme datas disponíveis em novas oportunidades
          </h2>
          <p className="mt-4 max-w-lg text-white/70">
            A Festei está selecionando casas, sítios, salões e outros
            locais para formar seu catálogo inicial de festas no Rio de
            Janeiro.
          </p>

          <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-white/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="max-w-md sm:flex-1">
              <OwnerCTA variant="secondary" />
            </div>
            <Link
              href="/anunciar#formulario"
              onClick={() => track("owner_cta_clicked", { mode: "enviar_para_analise" })}
              className="text-sm font-medium text-white underline underline-offset-4 hover:text-white/80"
            >
              Enviar meu local para análise
            </Link>
          </div>
          <p className="mt-3 text-xs text-white/50">
            Cadastro simples, sem burocracia — leva poucos minutos.
          </p>
        </Reveal>

        {/* PLACEHOLDER: foto genérica de banco de imagens — trocar por
            foto real de local/proprietário Festei assim que houver
            acervo próprio. */}
        <Reveal delay={120} className="relative h-64 overflow-hidden rounded-2xl shadow-[var(--shadow-lg)] sm:h-80 md:h-[420px]">
          <SafeImage
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80"
            alt="Local bonito preparado para receber convidados de uma festa"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
