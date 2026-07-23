import { Target, Eye } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function AboutMissionVisionSection() {
  return (
    <section className="bg-gray-light/40 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-border bg-white p-8 sm:p-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
              <Target className="h-5 w-5" aria-hidden />
            </div>
            <h2 className="mt-5 text-xl font-bold text-ink sm:text-2xl">Missão</h2>
            <p className="mt-3 text-base leading-relaxed text-gray-medium">
              Tornar simples encontrar e anunciar locais para eventos.
            </p>
          </Reveal>

          <Reveal delay={100} className="rounded-2xl border border-border bg-white p-8 sm:p-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-coral-soft text-coral-hover">
              <Eye className="h-5 w-5" aria-hidden />
            </div>
            <h2 className="mt-5 text-xl font-bold text-ink sm:text-2xl">Visão</h2>
            <p className="mt-3 text-base leading-relaxed text-gray-medium">
              Ser a principal plataforma brasileira para descoberta e reserva
              de locais para eventos.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
