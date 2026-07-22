import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const expectations = [
  "Fotos de qualidade",
  "Informações verdadeiras",
  "Bom atendimento",
  "Compromisso com os clientes",
  "Vontade de crescer junto",
];

export function FoundersExpectationsSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-10">
        <Reveal className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            O que esperamos dos parceiros
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-8 flex flex-col gap-3">
          {expectations.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-white px-4 py-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral-soft text-coral-hover">
                <Check className="h-3.5 w-3.5" aria-hidden />
              </span>
              <span className="text-sm font-medium text-ink">{item}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
