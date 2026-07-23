import { Reveal } from "@/components/ui/reveal";

export function AboutHero() {
  return (
    <section className="border-b border-border bg-primary-light/30 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-10">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Sobre a Festei
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-ink sm:text-4xl md:text-5xl">
            A Festei nasceu para transformar a forma como as pessoas
            encontram locais para celebrar.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-medium sm:text-lg">
            Acreditamos que encontrar o espaço ideal para um evento deve ser
            simples, rápido e seguro.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-gray-medium sm:text-lg">
            Estamos construindo uma plataforma que conecta pessoas e
            proprietários de locais com transparência, tecnologia e
            praticidade.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
