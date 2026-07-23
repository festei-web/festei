import { Search, MessagesSquare, EyeOff } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const frictionPoints = [
  {
    icon: Search,
    text: "Pesquisar em diferentes lugares e comparar informações manualmente",
  },
  {
    icon: MessagesSquare,
    text: "Trocar inúmeras mensagens só para entender o básico",
  },
  {
    icon: EyeOff,
    text: "Lidar com pouca transparência sobre preços, regras e disponibilidade",
  },
];

export function AboutStorySection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Por que a Festei surgiu?
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Organizar um evento deveria ser um momento de entusiasmo, não de
            preocupação.
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-12 grid gap-4 sm:grid-cols-3">
          {frictionPoints.map((point) => (
            <div
              key={point.text}
              className="rounded-2xl border border-border bg-white p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
                <point.icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="mt-4 text-sm font-medium text-ink">{point.text}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={200} className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-gray-medium">
            Hoje, encontrar um espaço ideal ainda exige esse esforço. Ao mesmo
            tempo, milhares de excelentes espaços têm dificuldade para
            alcançar novos clientes.
          </p>
          <p className="mt-3 text-base font-medium text-ink">
            Foi para aproximar esses dois lados que nasceu a Festei.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
