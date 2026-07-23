import { Search, SlidersHorizontal, MessageCircle, CalendarCheck, PartyPopper, ArrowRight, ArrowDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  { icon: Search, label: "Encontrar um local" },
  { icon: SlidersHorizontal, label: "Comparar opções" },
  { icon: MessageCircle, label: "Entrar em contato" },
  { icon: CalendarCheck, label: "Reservar" },
  { icon: PartyPopper, label: "Celebrar" },
];

export function AboutHowItWorksSection() {
  return (
    <section className="bg-gray-light/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Como a Festei funciona
          </h2>
        </Reveal>

        <Reveal
          delay={100}
          className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-3"
        >
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center gap-3 sm:flex-row">
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white px-5 py-5 text-center sm:w-36">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
                  <step.icon className="h-5 w-5" aria-hidden />
                </div>
                <span className="text-sm font-semibold text-ink">{step.label}</span>
              </div>

              {i < steps.length - 1 && (
                <span className="text-gray-medium/60" aria-hidden>
                  <ArrowDown className="h-4 w-4 sm:hidden" />
                  <ArrowRight className="hidden h-4 w-4 sm:ml-3 sm:block" />
                </span>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
