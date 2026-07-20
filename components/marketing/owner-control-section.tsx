import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const controlItems = [
  "Valores",
  "Disponibilidade",
  "Horários",
  "Capacidade",
  "Regras",
  "Tipos de festas permitidos",
  "Serviços incluídos",
  "Aceitação ou recusa de solicitações",
];

export function OwnerControlSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
        <Reveal className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Seu local, suas decisões
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {controlItems.map((item) => (
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

        <Reveal delay={200} className="mt-6 text-center text-sm text-gray-medium">
          A Festei organiza e apresenta as informações, mas o responsável
          pelo local mantém o controle sobre suas condições e disponibilidade.
        </Reveal>
      </div>
    </section>
  );
}
