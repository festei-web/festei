import { Layers, SplitSquareHorizontal, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const points = [
  {
    icon: Layers,
    title: "Tudo espalhado",
    text: "Fotos em um perfil, preço por mensagem e disponibilidade somente depois de conversar.",
  },
  {
    icon: SplitSquareHorizontal,
    title: "Comparação difícil",
    text: "Cada proprietário apresenta valores, estrutura e regras de uma maneira diferente.",
  },
  {
    icon: Clock,
    title: "Tempo perdido",
    text: "Sem informações completas de cara, você só descobre se o local atende ao seu evento depois de muita ida e volta.",
  },
];

export function ProblemSection() {
  return (
    <section className="bg-gray-light/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Chega de procurar locais em dezenas de perfis
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {points.map((point, i) => (
            <Reveal
              key={point.title}
              delay={i * 100}
              className="rounded-2xl border border-border bg-white p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
                <point.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{point.title}</h3>
              <p className="mt-2 text-sm text-gray-medium">{point.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-base font-medium text-ink">
            A Festei reúne as informações essenciais para você encontrar opções
            compatíveis antes de iniciar a negociação.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
