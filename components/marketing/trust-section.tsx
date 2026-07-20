import { Users2, LayoutList, FileCheck2, BadgeCheck, UserCheck, FolderCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const items = [
  { icon: LayoutList, text: "Capacidade informada" },
  { icon: FolderCheck, text: "Estrutura disponível" },
  { icon: FileCheck2, text: "Regras do local" },
  { icon: UserCheck, text: "Identificação do responsável" },
  { icon: BadgeCheck, text: "Solicitação sem cobrança" },
  { icon: Users2, text: "Informações organizadas em um só lugar" },
];

export function TrustSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Informações mais claras antes do primeiro contato
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.text}
              delay={i * 60}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-5 text-center"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
                <item.icon className="h-5 w-5" aria-hidden />
              </div>
              <span className="text-sm font-medium text-ink">{item.text}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
