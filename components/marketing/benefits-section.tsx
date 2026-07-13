import { LayoutGrid, Zap, FileText, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const benefits = [
  {
    icon: LayoutGrid,
    title: "Diversas opções",
    text: "Encontre casas, sítios, salões e outros locais em um único lugar.",
  },
  {
    icon: Zap,
    title: "Busca rápida",
    text: "Pesquise por localização, tipo de evento e capacidade.",
  },
  {
    icon: FileText,
    title: "Informações claras",
    text: "Fotos, estrutura e detalhes organizados para facilitar sua escolha.",
  },
  {
    icon: Clock,
    title: "Mais praticidade",
    text: "Menos tempo pesquisando. Mais tempo planejando sua comemoração.",
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-gray-light/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Por que a Festei
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Tudo o que você precisa para encontrar o lugar certo
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <div className="flex h-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                  <b.icon className="h-6 w-6 text-primary" aria-hidden />
                </div>
                <div>
                  <h3 className="font-semibold text-ink">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-medium">{b.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
