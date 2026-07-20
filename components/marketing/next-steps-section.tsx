import { Reveal } from "@/components/ui/reveal";

const steps = [
  "A Festei recebe as informações.",
  "A equipe realiza uma análise inicial.",
  "O responsável pelo local é contatado.",
  "Fotos, regras e condições são complementadas.",
  "As condições de participação são apresentadas.",
  "O anúncio é preparado após aprovação.",
  "O local pode ser publicado no catálogo inicial.",
];

export function NextStepsSection() {
  return (
    <section className="bg-primary-light/30 py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-10">
        <Reveal className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Próximos passos
          </h2>
          <p className="mt-3 text-sm text-gray-medium">
            O que acontece depois do cadastro:
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ol className="mt-8 flex flex-col gap-4">
            {steps.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coral text-xs font-bold text-coral-foreground">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-sm text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
