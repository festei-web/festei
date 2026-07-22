import { Layers, SplitSquareHorizontal, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const points = [
  {
    icon: Layers,
    title: "Tudo espalhado",
    text: "Fotos numa rede social, preço só por mensagem direta e disponibilidade que você só descobre insistindo.",
  },
  {
    icon: SplitSquareHorizontal,
    title: "Comparação difícil",
    text: "Cada anfitrião conta as coisas do seu jeito — fica quase impossível colocar duas opções lado a lado.",
  },
  {
    icon: Clock,
    title: "Tempo perdido",
    text: "Você só descobre se o espaço serve para a sua festa depois de trocar uma dúzia de mensagens.",
  },
];

export function ProblemSection() {
  return (
    <section className="bg-gray-light/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Chega de garimpar local de festa no Instagram e no grupo da família
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
            A Festei reúne o que importa para você decidir sem enrolação.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
