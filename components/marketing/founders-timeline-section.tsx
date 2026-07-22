import { Reveal } from "@/components/ui/reveal";

const steps = [
  { title: "Inscrição", text: "Envie o cadastro do seu local." },
  { title: "Avaliação", text: "Nossa equipe analisa o perfil." },
  { title: "Aprovação", text: "Confirmamos sua participação no programa." },
  { title: "Cadastro", text: "Fotos e informações são organizadas." },
  { title: "Publicação", text: "O local entra no catálogo inicial." },
  { title: "Boas-vindas como Parceiro Fundador", text: "Você recebe o selo e os benefícios do programa." },
];

export function FoundersTimelineSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Como funciona
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Do primeiro contato ao selo de fundador
          </h2>
        </Reveal>

        <Reveal delay={100} className="relative mt-14">
          <div
            className="absolute left-5 top-0 bottom-0 w-px bg-border md:left-0 md:right-0 md:top-5 md:bottom-auto md:h-px md:w-auto"
            aria-hidden
          />

          <ol className="relative flex flex-col gap-10 md:flex-row md:gap-0">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 md:flex-1 md:flex-col md:items-center md:gap-3 md:px-2 md:text-center"
              >
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral text-sm font-bold text-coral-foreground ring-4 ring-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ink sm:text-base">{step.title}</h3>
                  <p className="mt-1 text-sm text-gray-medium md:mx-auto md:max-w-[11rem]">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
