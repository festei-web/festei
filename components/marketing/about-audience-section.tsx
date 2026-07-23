import { Cake, Heart, Users, Briefcase, PartyPopper, Search, MessagesSquare } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const occasions = [
  { icon: Cake, label: "Aniversários" },
  { icon: Heart, label: "Casamentos" },
  { icon: Users, label: "Confraternizações" },
  { icon: Briefcase, label: "Eventos corporativos" },
  { icon: PartyPopper, label: "Festas particulares" },
];

export function AboutAudienceSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Para quem fazemos
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-border bg-white p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
              <Search className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink">
              Para quem procura um local
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-medium">
              Um único lugar para comparar opções e decidir com clareza,
              independentemente da ocasião:
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {occasions.map((o) => (
                <li key={o.label} className="flex items-center gap-2.5 text-sm text-ink">
                  <o.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {o.label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="rounded-2xl border border-border bg-white p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-coral-soft text-coral-hover">
              <MessagesSquare className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink">
              Para proprietários
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-medium">
              A Festei aumenta a visibilidade dos espaços cadastrados e
              facilita o contato com pessoas realmente interessadas —
              organizando as solicitações em um único lugar, sem depender só
              de indicação ou redes sociais.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
