import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function AboutFutureSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
            <Sparkles className="h-5 w-5" aria-hidden />
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Estamos apenas começando.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-medium sm:text-lg">
            Hoje conectamos pessoas a locais para eventos.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-medium sm:text-lg">
            Nossa visão é construir um ecossistema cada vez mais completo
            para facilitar toda a jornada de organização de eventos,
            oferecendo novas funcionalidades, categorias e ferramentas para
            clientes e proprietários.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
