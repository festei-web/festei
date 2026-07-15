import { SafeImage } from "@/components/ui/safe-image";
import { Check } from "lucide-react";
import { OwnerDualCTA } from "./owner-dual-cta";
import { Reveal } from "@/components/ui/reveal";

const benefits = [
  "Solicitações mais completas",
  "Alcance fora do Instagram",
  "Página profissional do local",
  "Autonomia para aceitar ou recusar",
];

export function OwnerSection() {
  return (
    <section className="bg-ink py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-10">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wide text-primary/90">
            Para proprietários
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Transforme datas disponíveis em novas oportunidades
          </h2>
          <p className="mt-4 max-w-lg text-white/70">
            Mostre seu local para pessoas que já estão planejando uma festa e
            receba solicitações com data, tipo de evento, horário e
            quantidade de convidados.
          </p>

          <ul className="mt-7 grid grid-cols-2 gap-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-white/90">
                <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-9 max-w-md">
            <OwnerDualCTA />
          </div>
          <p className="mt-3 text-xs text-white/50">
            Alguém da nossa equipe vai te ligar para te ajudar a cadastrar, sem
            burocracia — caso você prefira essa opção.
          </p>
        </Reveal>

        <Reveal delay={120} className="relative h-64 overflow-hidden rounded-2xl shadow-[var(--shadow-lg)] sm:h-80 md:h-[420px]">
          <SafeImage
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80"
            alt="Local bonito preparado para receber convidados de um evento"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
