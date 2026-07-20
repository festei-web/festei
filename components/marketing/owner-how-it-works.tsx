import { FileEdit, Search, PhoneCall, ClipboardList, Layout, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    icon: FileEdit,
    title: "Envie os dados iniciais",
    text: "Preencha o cadastro com as principais informações do local.",
  },
  {
    icon: Search,
    title: "A Festei analisa o perfil",
    text: "A equipe verifica se o local combina com a fase inicial da plataforma.",
  },
  {
    icon: PhoneCall,
    title: "Nossa equipe entra em contato",
    text: "Solicitamos fotos e informações complementares quando necessário.",
  },
  {
    icon: ClipboardList,
    title: "Você conhece as condições",
    text: "Todas as condições comerciais e operacionais são apresentadas antes da publicação.",
  },
  {
    icon: Layout,
    title: "O anúncio é preparado",
    text: "As informações do local são organizadas para apresentação na plataforma.",
  },
  {
    icon: BadgeCheck,
    title: "O local é publicado após aprovação",
    text: "A inscrição não representa publicação automática.",
  },
];

export function OwnerHowItWorks() {
  return (
    <section className="bg-gray-light/40 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Como funciona
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Do cadastro à publicação
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 70}
              className="relative rounded-2xl border border-border bg-white p-5"
            >
              <span
                className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-coral text-sm font-bold text-coral-foreground shadow-[var(--shadow-sm)]"
                aria-hidden
              >
                {i + 1}
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
                <step.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-sm text-gray-medium">{step.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={450} className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-white p-5 text-center">
          <p className="text-sm text-gray-medium">
            O envio do formulário não garante a entrada do local no catálogo
            da Festei. Cada perfil passa por uma análise inicial da nossa
            equipe.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
