import { Reveal } from "@/components/ui/reveal";

export function FoundersWhatSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-10">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            O programa
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            O que significa ser um Parceiro Fundador?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-medium sm:text-lg">
            Antes de abrir a plataforma para milhares de clientes, queremos
            construir uma base sólida ao lado de proprietários comprometidos
            com qualidade. Os Parceiros Fundadores são esse primeiro grupo:
            um número limitado de locais que vai acompanhar de perto os
            próximos passos da Festei e ajudar a moldar a experiência que
            todos os futuros parceiros vão encontrar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
