import { Heart, ShieldCheck, Sparkles, Handshake, Rocket } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const values = [
  {
    icon: Heart,
    title: "Pessoas em primeiro lugar",
    text: "Cada decisão parte de quem vai celebrar e de quem abre as portas do seu espaço.",
  },
  {
    icon: ShieldCheck,
    title: "Confiança",
    text: "Informações claras e um processo transparente, do primeiro contato à reserva.",
  },
  {
    icon: Sparkles,
    title: "Simplicidade",
    text: "Menos fricção, menos mensagens perdidas, menos incerteza em cada etapa.",
  },
  {
    icon: Handshake,
    title: "Parceria",
    text: "Crescemos junto com quem procura um local e com quem tem um espaço para oferecer.",
  },
  {
    icon: Rocket,
    title: "Evolução contínua",
    text: "Estamos sempre aprendendo e aprimorando a plataforma com base em uso real.",
  },
];

export function AboutValuesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Valores
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-border bg-white p-6 transition-shadow duration-200 hover:shadow-[var(--shadow-md)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
                <value.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-medium">{value.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
