"use client";

import { TrendingUp, FileEdit, Camera, ClipboardCheck } from "lucide-react";
import { OwnerLeadForm } from "@/components/marketplace/owner-lead-form";
import { Breadcrumb } from "@/components/marketplace/breadcrumb";

const benefits = [
  {
    icon: TrendingUp,
    title: "Solicitações mais completas",
    text: "Receba pedidos com data, tipo de evento, horário e quantidade de convidados já detalhados.",
  },
  {
    icon: ClipboardCheck,
    title: "Alcance além das redes sociais",
    text: "Apareça para pessoas que já estão planejando um evento e pesquisando por região, tipo e capacidade.",
  },
  {
    icon: Camera,
    title: "Página profissional do local",
    text: "Fotos e informações organizadas em uma página só sua, com apresentação profissional.",
  },
  {
    icon: FileEdit,
    title: "Autonomia total",
    text: "Aceite ou recuse cada solicitação e defina diretamente suas próprias regras e condições.",
  },
];

export function AnunciarPageClient() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-10">
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Anunciar local" }]} />

      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">
          Anuncie seu local e comece a receber solicitações
        </h1>
        <p className="mt-4 text-gray-medium">
          Mostre seu local para pessoas que já estão planejando uma festa e
          receba solicitações com data, tipo de evento, horário e quantidade
          de convidados.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {benefits.map((b) => (
          <div key={b.title} className="flex gap-4 rounded-xl border border-border bg-white p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-light">
              <b.icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <div>
              <h3 className="font-semibold text-ink">{b.title}</h3>
              <p className="mt-1 text-sm text-gray-medium">{b.text}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-gray-medium">
        Condições especiais para os primeiros proprietários parceiros —
        cadastre-se para conhecer as condições da fase inicial da Festei.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-white p-6 sm:p-8">
        <OwnerLeadForm />
      </div>
    </div>
  );
}
