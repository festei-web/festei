import { Gauge, Layers, Users, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const reasons = [
  {
    icon: Gauge,
    title: "Crescimento controlado",
    text: "Preferimos avançar em um ritmo que nos permita cuidar de cada parceiro de perto, em vez de crescer rápido demais.",
  },
  {
    icon: Layers,
    title: "Qualidade antes de quantidade",
    text: "Um catálogo inicial menor e mais cuidado constrói uma base mais sólida do que um catálogo grande e desigual.",
  },
  {
    icon: Users,
    title: "Evolução junto dos parceiros",
    text: "As primeiras versões da plataforma serão moldadas com a experiência de quem já está participando.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento próximo",
    text: "Um grupo menor significa mais tempo da nossa equipe dedicado a cada Parceiro Fundador.",
  },
];

export function FoundersWhyFiftySection() {
  return (
    <section className="bg-gray-light/40 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Por que apenas 50?
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {reasons.map((reason, i) => (
            <Reveal
              key={reason.title}
              delay={i * 70}
              className="flex h-full gap-4 rounded-2xl border border-border bg-white p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                <reason.icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-semibold text-ink">{reason.title}</h3>
                <p className="mt-1.5 text-sm text-gray-medium">{reason.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
