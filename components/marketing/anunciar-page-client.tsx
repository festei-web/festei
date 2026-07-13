"use client";

import { useSearchParams } from "next/navigation";
import { TrendingUp, Users, Camera, ShieldCheck } from "lucide-react";
import { OwnerLeadForm } from "@/components/marketplace/owner-lead-form";
import { Breadcrumb } from "@/components/marketplace/breadcrumb";

const benefits = [
  {
    icon: Users,
    title: "Novos clientes qualificados",
    text: "Pessoas que já estão procurando exatamente o tipo de local que você tem.",
  },
  {
    icon: TrendingUp,
    title: "Mais visibilidade",
    text: "Apareça para quem pesquisa por região, tipo de evento e capacidade.",
  },
  {
    icon: Camera,
    title: "Apresentação profissional",
    text: "Fotos e informações organizadas, sem depender só do Instagram.",
  },
  {
    icon: ShieldCheck,
    title: "Sem mensalidade na primeira fase",
    text: "Cadastro gratuito. Comissão apenas sobre reservas concluídas.",
  },
];

export function AnunciarPageClient() {
  const searchParams = useSearchParams();
  const modo = searchParams.get("modo");
  const initialMode = modo === "ligacao" ? "ligacao" : "cadastro";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-10">
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Anunciar local" }]} />

      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">
          Seu local pode receber muito mais eventos
        </h1>
        <p className="mt-4 text-gray-medium">
          Cadastre seu local na Festei e aumente sua visibilidade para
          pessoas que estão procurando exatamente o tipo de ambiente que você
          oferece.
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

      <div className="mt-14 rounded-2xl border border-border bg-white p-6 sm:p-8">
        <OwnerLeadForm initialMode={initialMode} />
      </div>
    </div>
  );
}
