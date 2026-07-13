import { Search, SlidersHorizontal, MessageCircleQuestion } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    icon: Search,
    title: "Encontre",
    text: "Pesquise locais de acordo com sua necessidade.",
  },
  {
    icon: SlidersHorizontal,
    title: "Compare",
    text: "Veja fotos, capacidade e informações importantes.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Solicite",
    text: "Entre em contato e encontre a melhor opção para o seu evento.",
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

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
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
              <h3 className="mt-1 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 max-w-[240px] text-sm text-gray-medium">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
