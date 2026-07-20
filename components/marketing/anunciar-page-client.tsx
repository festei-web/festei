"use client";

import { Layout, ClipboardList, SlidersHorizontal, Sparkles } from "lucide-react";
import { OwnerLeadForm } from "@/components/marketplace/owner-lead-form";
import { Breadcrumb } from "@/components/marketplace/breadcrumb";
import { AnunciarHero } from "./anunciar-hero";
import { WhoCanListSection } from "./who-can-list-section";
import { OwnerHowItWorks } from "./owner-how-it-works";
import { OwnerControlSection } from "./owner-control-section";
import { FounderProgramSection } from "./founder-program-section";
import { NextStepsSection } from "./next-steps-section";
import { OwnerFaqSection } from "./owner-faq-section";
import { SecondaryContactCta } from "./secondary-contact-cta";
import { Reveal } from "@/components/ui/reveal";

// Benefícios realistas — sem promessas de renda, reservas ou demanda
// garantidas (prompt de melhorias, item 6 e item 32).
const benefits = [
  {
    icon: Layout,
    title: "Página organizada com fotos e informações",
    text: "Uma nova forma de apresentar seu local, com estrutura, capacidade e regras em um único lugar.",
  },
  {
    icon: ClipboardList,
    title: "Solicitações com os dados da festa",
    text: "Receba pedidos contendo tipo de festa, data, horário e quantidade de convidados já organizados.",
  },
  {
    icon: SlidersHorizontal,
    title: "Controle sobre disponibilidade, valores e regras",
    text: "Você mantém a liberdade para aceitar ou recusar cada solicitação recebida.",
  },
  {
    icon: Sparkles,
    title: "Participação na fase inicial",
    text: "Faça parte da formação do catálogo inicial da Festei no Rio de Janeiro.",
  },
];

export function AnunciarPageClient() {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-10">
        <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Anunciar local" }]} />
      </div>

      <AnunciarHero />

      {/* Benefícios */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <div className="flex h-full gap-4 rounded-xl border border-border bg-white p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                    <b.icon className="h-5 w-5 text-primary" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{b.title}</h3>
                    <p className="mt-1 text-sm text-gray-medium">{b.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhoCanListSection />
      <OwnerHowItWorks />
      <OwnerControlSection />
      <FounderProgramSection />
      <NextStepsSection />
      <OwnerFaqSection />

      {/* Formulário */}
      <section id="formulario" className="py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Enviar meu local para análise
            </h2>
            <p className="mt-3 text-sm text-gray-medium">
              O envio não garante a publicação. A equipe da Festei analisará
              as informações e entrará em contato para apresentar os
              próximos passos.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-white p-6 sm:p-8">
            <OwnerLeadForm />
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-gray-medium">
              Prefere conversar antes de enviar o cadastro?
            </p>
            <SecondaryContactCta />
          </div>
        </div>
      </section>
    </div>
  );
}
