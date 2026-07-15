import { PartyPopper, SlidersHorizontal, Send, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    icon: PartyPopper,
    title: "Conte como será seu evento",
    text: "Informe o tipo de comemoração, a região e a quantidade aproximada de convidados.",
  },
  {
    icon: SlidersHorizontal,
    title: "Compare locais compatíveis",
    text: "Veja fotos, capacidade, estrutura, regras e valores iniciais.",
  },
  {
    icon: Send,
    title: "Solicite disponibilidade",
    text: "Envie os dados do evento para o responsável pelo local.",
  },
  {
    icon: MessageCircle,
    title: "Combine os detalhes",
    text: "Converse diretamente para confirmar condições, contrato e reserva.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Como funciona
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Organizar seu evento pode ser muito mais simples
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div
            className="absolute left-0 right-0 top-8 hidden h-px bg-border md:block"
            aria-hidden
          />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 100} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[var(--shadow-md)]">
                <step.icon className="h-7 w-7 text-primary" aria-hidden />
              </div>
              <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary">
                Passo {i + 1}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 max-w-[240px] text-sm text-gray-medium">{step.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-gray-light/50 p-5 text-center">
          <p className="text-sm text-gray-medium">
            A solicitação não confirma uma reserva automaticamente. A negociação
            acontece diretamente entre você e o responsável pelo local, e não há
            cobrança no momento do envio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
